import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { createServer, Server } from 'http';

import { GameStatus } from './models/game-status';
import { MessageType, CardAction } from './models/message-type';
import { CardLocation } from './enums/card-location.enum';
import { Game, GameList, GameState } from './models/game';
import { Player } from './models/player';
import { randomizeArray, generateGameId, isExpired } from './shared/utils';
import { deck } from './data/deck';
import { Message } from './models/message';
import { Card } from './models/card';
import { CardType } from './enums/card-type.enum';

export class GameServer {
  public static readonly PORT: number = 8080;
  activeGames: GameList = {};
  app: express.Application;
  gamePrefix = 'M';
  gameRoute = '/game';
  io: SocketIO.Server;
  port: string | number;
  server: Server;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  /* Handle when a new player is connected */
  playerConnectedMessageHandler(message: Message) {
    if (this.activeGames[message.gameId]) {
      const connectingPlayer = this.activeGames[message.gameId].gameState.players.find(
        (player: Player) => {
          return player.id === message.from.id;
        }
      );
      const msg = `${
        connectingPlayer ? connectingPlayer.name : message.from.name
      } has connected.`;
      this.emitPlayerAction(message.gameId, msg);
    }
  }

  /* Game Logic */
  actionHandler(cardAction: CardAction, actionParams: any, gameId: string) {
    const playerName = this.activeGames[gameId].gameState.players.find(
      (player: Player) => {
        return player.id === actionParams.playerId;
      }
    ).name;

    let message = '';
    switch (cardAction) {
      case CardAction.DRAW:
        this.drawCards(gameId, actionParams);
        message = ` drew ${actionParams.amount} cards.`;
        this.emitPlayerAction;
        break;
      case CardAction.BUILD:
        this.buildProperty(gameId, actionParams);
        message = ` built ${actionParams.card.name} on lot ${actionParams.lot + 1}.`;
        break;
      case CardAction.PLAY:
        this.addToTrash(gameId, actionParams);
        message = ` played ${actionParams.card.name} card. `;
        if (actionParams.card.name === 'Rent') {
          message += '(';
          for (let i = 0; i < (actionParams.card.rentColors || []).length; i++) {
            message += `${actionParams.card.rentColors[i]}, `;
          }
          message += ') ';
        }

        if (actionParams.opponent) {
          message += `against ${actionParams.opponent.name}`;
        }

        this.emitNotification(playerName, gameId, actionParams);
        break;
      case CardAction.TRASH:
        this.addToTrash(gameId, actionParams);
        message = ` threw ${actionParams.card.name} in the trash.`;
        break;
      case CardAction.PAY:
        this.payPlayer(gameId, actionParams);
        message = ` paid ${actionParams.playerToPay.name} with ${
          actionParams.card.name
        }.`;
        break;
      case CardAction.BANK:
        this.addToBank(gameId, actionParams);
        message = ` added ${actionParams.card.name} to their bank.`;
        break;
      default:
    }

    message = `${playerName}${message}`;
    this.emitPlayerAction(gameId, message);
  }

  drawCards(gameId: string, body: { playerId: number; amount: number }) {
    const currentGame = this.activeGames[gameId];
    const currentPlayer = currentGame.gameState.players.find((player: Player) => {
      return player.id === body.playerId;
    });

    if (body.amount >= currentGame.gameState.deck.length) {
      const trash = randomizeArray(currentGame.gameState.trash);
      currentGame.gameState.deck = currentGame.gameState.deck.concat(trash);
      currentGame.gameState.trash = [];
    }

    for (let i = 0; i < body.amount; i++) {
      currentPlayer.hand.push(currentGame.gameState.deck.pop());
    }
  }

  buildProperty(gameId: string, body: { playerId: number; card: Card; lot: number }) {
    const currentPlayer = this.activeGames[gameId].gameState.players.find(
      (player: Player) => {
        return player.id === body.playerId;
      }
    );

    currentPlayer.land = currentPlayer.land.map((plot: Card[]) => {
      return [...plot].filter((plotCard: Card) => {
        return plotCard.id !== body.card.id;
      });
    });

    currentPlayer.hand = currentPlayer.hand.filter((handCard: Card) => {
      return handCard.id !== body.card.id;
    });

    currentPlayer.unAssigned = currentPlayer.unAssigned.filter((unassignedCard: Card) => {
      return unassignedCard.id !== body.card.id;
    });

    if (body.card.type === CardType.PROPERTY) {
      currentPlayer.land[body.lot].push(body.card);
    } else {
      currentPlayer.land[body.lot].unshift(body.card);
    }

    const addNewLot =
      currentPlayer.land.filter((currentLot: Card[]) => {
        return currentLot.length === 0;
      }).length === 0;

    if (addNewLot) {
      currentPlayer.land.push([]);
    }
  }

  addToTrash(gameId: string, body: { playerId: number; card: Card }) {
    const currentPlayer = this.activeGames[gameId].gameState.players.find(
      (player: Player) => {
        return player.id === body.playerId;
      }
    );

    this.activeGames[gameId].gameState.trash.push(body.card);

    currentPlayer.hand = currentPlayer.hand.filter((handCard: Card) => {
      return handCard.id !== body.card.id;
    });
  }

  payPlayer(
    gameId: string,
    body: {
      playerId: number;
      playerToPay: Player;
      card: Card;
      cardLocation: CardLocation;
    }
  ) {
    const payer = this.activeGames[gameId].gameState.players.find((player: Player) => {
      return player.id === body.playerId;
    });

    const receiver = this.activeGames[gameId].gameState.players.find((player: Player) => {
      return player.id === body.playerToPay.id;
    });

    if (body.cardLocation === CardLocation.BANK) {
      const cardToRemoveIndex = payer.bank.findIndex((bankCard: Card) => {
        return bankCard.id === body.card.id;
      });

      payer.bank.splice(cardToRemoveIndex, 1);

      receiver.bank.push(body.card);
    } else if (body.cardLocation === CardLocation.LAND) {
      let cardLotLocationIndex = -1;
      const lotLocationIndex = payer.land.findIndex((lot: Card[]) => {
        const cardIndex = lot.findIndex((lotCard: Card) => {
          return lotCard.id === body.card.id;
        });

        if (cardIndex > -1) {
          cardLotLocationIndex = cardIndex;
        }

        return cardIndex > -1;
      });

      payer.land[lotLocationIndex].splice(cardLotLocationIndex, 1);

      receiver.unAssigned.push(body.card);
    }
  }

  addToBank(gameId: string, body: { playerId: number; card: Card }) {
    const currentPlayer = this.activeGames[gameId].gameState.players.find(
      (player: Player) => {
        return player.id === body.playerId;
      }
    );

    currentPlayer.bank.push(body.card);

    currentPlayer.hand = currentPlayer.hand.filter((handCard: Card) => {
      return handCard.id !== body.card.id;
    });
  }

  /* User Connection and Messaging Logic */
  httpRequestHandler() {
    this.app.post('/client-login', (req, res) => {
      console.log('Login Request...');
      console.log(req.body);
      console.log(' ----- ');
      res.setHeader('Content-Type', 'application/json');
      if (!req.body.gameId) {
        const gameId = generateGameId(this.gamePrefix, this.activeGames);
        this.createNewGame(gameId);
        const player = this.addPlayer({ from: { name: req.body.name }, gameId } as any);
        res.send(
          JSON.stringify({ success: true, route: `${this.gameRoute}/${gameId}`, player })
        );
      } else if (
        this.activeGames[req.body.gameId] &&
        this.activeGames[req.body.gameId].gameState.status !== GameStatus.COMPLETE
      ) {
        let player = this.activeGames[req.body.gameId].gameState.players.find(
          (existingPlayer: Player) => {
            return existingPlayer.name === req.body.name;
          }
        );

        if (!player) {
          player = this.addPlayer({
            from: { name: req.body.name },
            gameId: req.body.gameId
          } as any);
        }
        res.send(
          JSON.stringify({
            success: true,
            route: `${this.gameRoute}/${req.body.gameId}`,
            player
          })
        );
      } else {
        if (!this.activeGames[req.body.gameId]) {
          res.send(JSON.stringify({ error: 'Game does not exist.' }));
        } else {
          res.send(JSON.stringify({ error: 'Game has already started.' }));
        }
      }
    });

    this.app.post('/verify-game', (req, res) => {
      console.log('Verifying Game Request...');
      console.log(req.body);
      console.log(' ----- ');
      res.setHeader('Content-Type', 'application/json');
      if (this.activeGames[req.body.gameId]) {
        // Host game exists, send the host the game state
        res.send(JSON.stringify({ success: true }));
      } else {
        res.send(JSON.stringify({ success: false }));
      }
    });

    this.app.get('/get-active-games', (req, res) => {
      console.log('Get Game Ids Request...');
      console.log(req.body);
      console.log(' ----- ');
      res.setHeader('Content-Type', 'application/json');

      const games: { name: string; gameId: string }[] = [];

      try {
        Object.keys(this.activeGames).forEach((gameId: string) => {
          games.push({
            gameId,
            name:
              this.activeGames[gameId] &&
              this.activeGames[gameId].gameState &&
              this.activeGames[gameId].gameState.players &&
              this.activeGames[gameId].gameState.players[0]
                ? this.activeGames[gameId].gameState.players[0].name
                : ''
          });
        });
        // Host game exists, send the host the game state
        const body = { success: true, games };
        res.send(JSON.stringify(body));
      } catch (e) {
        const body = { success: false, games: [] as any[] };
        res.send(JSON.stringify(body));
      }
    });

    this.app.post('/get-game-state', (req, res) => {
      console.log('Get Game State Request...');
      console.log(req.body);
      console.log(' ----- ');
      res.setHeader('Content-Type', 'application/json');
      if (this.activeGames[req.body.gameId]) {
        // Host game exists, send the host the game state
        const gameState = this.activeGames[req.body.gameId].gameState as GameState;
        gameState.success = true;
        res.send(JSON.stringify(gameState));
      } else {
        res.send(JSON.stringify({ success: false, error: 'Game does not exist.' }));
      }
    });

    this.app.post('/new-game', (req, res) => {
      console.log('Start New Game In Exisiting Room... ' + req.body.gameId);
      console.log(req.body);
      console.log(' ----- ');
      res.setHeader('Content-Type', 'application/json');
      if (this.activeGames[req.body.gameId]) {
        this.restartExisitingGame(req.body.gameId);
        // Host game exists, send the host the game state
        const gameState = this.activeGames[req.body.gameId].gameState as GameState;
        gameState.success = true;
        res.send(JSON.stringify(gameState));
        this.sendGameState(req.body.gameId);
      } else {
        res.send(JSON.stringify({ success: false, error: 'Game does not exist.' }));
      }
    });

    this.app.post('/player-action', (req, res) => {
      console.log('Player Action...');
      console.log(req.body);
      console.log(' ----- ');
      res.setHeader('Content-Type', 'application/json');
      if (this.activeGames[req.body.gameId]) {
        this.actionHandler(req.body.action, req.body.params, req.body.gameId);
        // Host game exists, send the host the game state
        const gameState = this.activeGames[req.body.gameId].gameState as GameState;
        gameState.success = true;
        res.send(JSON.stringify(gameState));
        this.sendGameState(req.body.gameId);
      } else {
        res.send(JSON.stringify({ success: false, error: 'Game does not exist.' }));
      }
    });

    this.app.post('/chat', (req, res) => {
      console.log('Chat Message...');
      console.log(req.body);
      console.log(' ----- ');
      res.setHeader('Content-Type', 'application/json');
      if (this.activeGames[req.body.gameId]) {
        this.chatMessageHandler(
          req.body.gameId,
          `${req.body.player.name}: ${req.body.message}`
        );
        res.send(JSON.stringify({ success: true }));
      } else {
        res.send(JSON.stringify({ success: false, error: 'Game does not exist.' }));
      }
    });
  }

  restartExisitingGame(gameId: string) {
    this.activeGames[gameId].gameState.trash = [];
    this.activeGames[gameId].gameState.players.forEach((player: Player) => {
      player.hand = [];
      player.land = [[]];
      player.bank = [];
      player.unAssigned = [];

      for (let i = 0; i < 5; i++) {
        player.hand.push(this.activeGames[gameId].gameState.deck.pop());
      }
    });
    this.activeGames[gameId].gameState.deck = randomizeArray(deck());
  }

  createNewGame(gameId: string) {
    this.cleanUpGames();
    this.activeGames[gameId] = {
      allUsersReady: false,
      gameState: {
        firstConnected: '',
        id: gameId,
        startTime: new Date().getTime(),
        status: GameStatus.WAITING,
        players: [],
        trash: [],
        deck: randomizeArray(deck())
      } as any,
      isFirstConnection: true
    } as Game;
  }

  addPlayer(message: Message) {
    const newPlayer: Player = {
      id: new Date().getTime(),
      name: message.from.name,
      hand: [],
      land: [[]],
      bank: [],
      unAssigned: []
    };

    for (let i = 0; i < 5; i++) {
      newPlayer.hand.push(this.activeGames[message.gameId].gameState.deck.pop());
    }

    this.activeGames[message.gameId].gameState.players.push(newPlayer);
    return newPlayer;
  }

  chatMessageHandler(gameId: string, message: string) {
    this.io.to(gameId).emit('action', message);
    console.log('Message Being Sent...');
  }

  emitPlayerAction(gameId: string, message: string) {
    this.io.to(gameId).emit('action', message);
    console.log('Message Being Sent...');
  }

  emitNotification(
    playerName: string,
    gameId: string,
    actionParams: { playerId: number; card: Card; opponent: Player }
  ) {
    let message = `${playerName} played ${actionParams.card.name} card `;
    if (actionParams.card.name === 'Rent') {
      message += '(';
      for (let i = 0; i < (actionParams.card.rentColors || []).length; i++) {
        message += `${actionParams.card.rentColors[i]}, `;
      }
      message += ') ';
    }
    message += 'against you, please pay them or give property.';

    const userId = actionParams.opponent ? actionParams.opponent.id : 'all';

    const advancedActionCardNames = [
      'Sly Deal',
      'Deal Breaker',
      'Forced Deal',
      'Debt Collector',
      'It`s My Birthday'
    ];
    const isAdvancedActionCard = advancedActionCardNames.find((name: string) => {
      return name === actionParams.card.name;
    });
    if (isAdvancedActionCard || actionParams.card.type === CardType.RENT) {
      this.io.to(gameId).emit('snackbar', { userId, message });
      console.log('Notification Being Sent...');
    }
  }

  emitMessage(gameId: string, message: Message) {
    this.io.to(gameId).emit('message', message.content);
    console.log('Message Being Sent...');
  }

  sendGameState(gameId: string) {
    const body = this.activeGames[gameId].gameState;
    this.io.to(gameId).emit('message', body);
    console.log('Game State Sent... to ', gameId);
  }

  cleanUpGames() {
    const activeGameKeys = Object.keys(this.activeGames);
    console.log('Pre Cleaned Games: ' + activeGameKeys.length);

    for (let i = 0; i < activeGameKeys.length; i++) {
      const gameId = activeGameKeys[i];

      if (this.activeGames[gameId]) {
        let game = this.activeGames[gameId];

        if (isExpired(game.gameState.startTime)) {
          console.log(
            'Is Expired: ' + gameId + ' ' + game.gameState.startTime + ' ' + Date.now()
          );
          delete this.activeGames[gameId];
        }
      }
    }

    console.log('Post Cleaned Games: ' + Object.keys(this.activeGames).length);
  }

  /* Server Setup */
  createApp(): void {
    this.app = express();
    this.app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
    this.app.use(bodyParser.json());
  }

  config(): void {
    this.port = process.env.PORT || GameServer.PORT;
  }

  createServer(): void {
    this.server = createServer(this.app);
  }

  sockets(): void {
    this.io = socketIo(this.server);
  }

  listen(): void {
    this.httpRequestHandler();

    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connect', (socket: any) => {
      socket.on('message', (m: any) => {
        this.messageHandler(m, socket);
      });

      socket.on('disconnect', (m: Message) => {
        console.log(m);
        console.log('Client disconnected');
      });
    });
  }

  getApp(): express.Application {
    return this.app;
  }

  messageHandler(message: Message, socket: any) {
    console.log('Receiving Message...');
    console.log(message);
    switch (message.messageType) {
      case MessageType.CONNECTED:
        socket.join(message.gameId);
        console.log('Connecting Player to ' + message.gameId);
        this.playerConnectedMessageHandler(message);
        break;
    }
    console.log(' ----- ');
  }
}
