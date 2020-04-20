"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const socketIo = require("socket.io");
const http_1 = require("http");
const game_status_1 = require("./models/game-status");
const message_type_1 = require("./models/message-type");
const card_location_enum_1 = require("./enums/card-location.enum");
const utils_1 = require("./shared/utils");
const deck_1 = require("./data/deck");
const card_type_enum_1 = require("./enums/card-type.enum");
class GameServer {
    constructor() {
        this.activeGames = {};
        this.gamePrefix = 'M';
        this.gameRoute = '/game';
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    /* Handle when a new player is connected */
    playerConnectedMessageHandler(message) {
        if (this.activeGames[message.gameId]) {
            const connectingPlayer = this.activeGames[message.gameId].gameState.players.find((player) => {
                return player.id === message.from.id;
            });
            const msg = `${connectingPlayer ? connectingPlayer.name : message.from.name} has connected.`;
            this.emitPlayerAction(message.gameId, msg);
        }
    }
    /* Game Logic */
    actionHandler(cardAction, actionParams, gameId) {
        const playerName = this.activeGames[gameId].gameState.players.find((player) => {
            return player.id === actionParams.playerId;
        }).name;
        let message = '';
        switch (cardAction) {
            case message_type_1.CardAction.DRAW:
                this.drawCards(gameId, actionParams);
                message = ` drew ${actionParams.amount} cards.`;
                this.emitPlayerAction;
                break;
            case message_type_1.CardAction.BUILD:
                this.buildProperty(gameId, actionParams);
                message = ` built ${actionParams.card.name} on lot ${actionParams.lot + 1}.`;
                break;
            case message_type_1.CardAction.PLAY:
                this.addToTrash(gameId, actionParams);
                message = ` played ${actionParams.card.name} card.`;
                if (actionParams.card.name === 'Rent') {
                    message += '(';
                    for (let i = 0; i < (actionParams.card.rentColors || []).length; i++) {
                        message += `${actionParams.card.rentColors[i]}, `;
                    }
                    message += ')';
                }
                break;
            case message_type_1.CardAction.TRASH:
                this.addToTrash(gameId, actionParams);
                message = ` threw ${actionParams.card.name} in the trash.`;
                break;
            case message_type_1.CardAction.PAY:
                this.payPlayer(gameId, actionParams);
                message = ` paid ${actionParams.playerToPay.name} with ${actionParams.card.name}.`;
                break;
            case message_type_1.CardAction.BANK:
                this.addToBank(gameId, actionParams);
                message = ` added ${actionParams.card.name} to their bank.`;
                break;
            default:
        }
        message = `${playerName}${message}`;
        this.emitPlayerAction(gameId, message);
    }
    drawCards(gameId, body) {
        const currentGame = this.activeGames[gameId];
        const currentPlayer = currentGame.gameState.players.find((player) => {
            return player.id === body.playerId;
        });
        if (body.amount >= currentGame.gameState.deck.length) {
            const trash = utils_1.randomizeArray(currentGame.gameState.trash);
            currentGame.gameState.deck = currentGame.gameState.deck.concat(trash);
            currentGame.gameState.trash = [];
        }
        for (let i = 0; i < body.amount; i++) {
            currentPlayer.hand.push(currentGame.gameState.deck.pop());
        }
    }
    buildProperty(gameId, body) {
        const currentPlayer = this.activeGames[gameId].gameState.players.find((player) => {
            return player.id === body.playerId;
        });
        currentPlayer.land = currentPlayer.land.map((plot) => {
            return [...plot].filter((plotCard) => {
                return plotCard.id !== body.card.id;
            });
        });
        currentPlayer.hand = currentPlayer.hand.filter((handCard) => {
            return handCard.id !== body.card.id;
        });
        currentPlayer.unAssigned = currentPlayer.unAssigned.filter((unassignedCard) => {
            return unassignedCard.id !== body.card.id;
        });
        if (body.card.type === card_type_enum_1.CardType.PROPERTY) {
            currentPlayer.land[body.lot].push(body.card);
        }
        else {
            currentPlayer.land[body.lot].unshift(body.card);
        }
        const addNewLot = currentPlayer.land.filter((currentLot) => {
            return currentLot.length === 0;
        }).length === 0;
        if (addNewLot) {
            currentPlayer.land.push([]);
        }
    }
    addToTrash(gameId, body) {
        const currentPlayer = this.activeGames[gameId].gameState.players.find((player) => {
            return player.id === body.playerId;
        });
        this.activeGames[gameId].gameState.trash.push(body.card);
        currentPlayer.hand = currentPlayer.hand.filter((handCard) => {
            return handCard.id !== body.card.id;
        });
    }
    payPlayer(gameId, body) {
        const payer = this.activeGames[gameId].gameState.players.find((player) => {
            return player.id === body.playerId;
        });
        const receiver = this.activeGames[gameId].gameState.players.find((player) => {
            return player.id === body.playerToPay.id;
        });
        if (body.cardLocation === card_location_enum_1.CardLocation.BANK) {
            const cardToRemoveIndex = payer.bank.findIndex((bankCard) => {
                return bankCard.id === body.card.id;
            });
            payer.bank.splice(cardToRemoveIndex, 1);
            receiver.bank.push(body.card);
        }
        else if (body.cardLocation === card_location_enum_1.CardLocation.LAND) {
            let cardLotLocationIndex = -1;
            const lotLocationIndex = payer.land.findIndex((lot) => {
                const cardIndex = lot.findIndex((lotCard) => {
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
    addToBank(gameId, body) {
        const currentPlayer = this.activeGames[gameId].gameState.players.find((player) => {
            return player.id === body.playerId;
        });
        currentPlayer.bank.push(body.card);
        currentPlayer.hand = currentPlayer.hand.filter((handCard) => {
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
                const gameId = utils_1.generateGameId(this.gamePrefix, this.activeGames);
                this.createNewGame(gameId);
                const player = this.addPlayer({ from: { name: req.body.name }, gameId });
                res.send(JSON.stringify({ success: true, route: `${this.gameRoute}/${gameId}`, player }));
            }
            else if (this.activeGames[req.body.gameId] &&
                this.activeGames[req.body.gameId].gameState.status !== game_status_1.GameStatus.COMPLETE) {
                let player = this.activeGames[req.body.gameId].gameState.players.find((existingPlayer) => {
                    return existingPlayer.name === req.body.name;
                });
                if (!player) {
                    player = this.addPlayer({
                        from: { name: req.body.name },
                        gameId: req.body.gameId
                    });
                }
                res.send(JSON.stringify({
                    success: true,
                    route: `${this.gameRoute}/${req.body.gameId}`,
                    player
                }));
            }
            else {
                if (!this.activeGames[req.body.gameId]) {
                    res.send(JSON.stringify({ error: 'Game does not exist.' }));
                }
                else {
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
            }
            else {
                res.send(JSON.stringify({ success: false }));
            }
        });
        this.app.post('/get-game-state', (req, res) => {
            console.log('Get Game State Request...');
            console.log(req.body);
            console.log(' ----- ');
            res.setHeader('Content-Type', 'application/json');
            if (this.activeGames[req.body.gameId]) {
                // Host game exists, send the host the game state
                const gameState = this.activeGames[req.body.gameId].gameState;
                gameState.success = true;
                res.send(JSON.stringify(gameState));
            }
            else {
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
                const gameState = this.activeGames[req.body.gameId].gameState;
                gameState.success = true;
                res.send(JSON.stringify(gameState));
                this.sendGameState(req.body.gameId);
            }
            else {
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
                const gameState = this.activeGames[req.body.gameId].gameState;
                gameState.success = true;
                res.send(JSON.stringify(gameState));
                this.sendGameState(req.body.gameId);
            }
            else {
                res.send(JSON.stringify({ success: false, error: 'Game does not exist.' }));
            }
        });
        this.app.post('/chat', (req, res) => {
            console.log('Chat Message...');
            console.log(req.body);
            console.log(' ----- ');
            res.setHeader('Content-Type', 'application/json');
            if (this.activeGames[req.body.gameId]) {
                this.chatMessageHandler(req.body.gameId, `${req.body.player.name}: ${req.body.message}`);
                res.send(JSON.stringify({ success: true }));
            }
            else {
                res.send(JSON.stringify({ success: false, error: 'Game does not exist.' }));
            }
        });
    }
    restartExisitingGame(gameId) {
        this.activeGames[gameId].gameState.trash = [];
        this.activeGames[gameId].gameState.players.forEach((player) => {
            player.hand = [];
            player.land = [[]];
            player.bank = [];
            player.unAssigned = [];
        });
        this.activeGames[gameId].gameState.deck = utils_1.randomizeArray(deck_1.deck());
    }
    createNewGame(gameId) {
        this.cleanUpGames();
        this.activeGames[gameId] = {
            allUsersReady: false,
            gameState: {
                firstConnected: '',
                id: gameId,
                startTime: new Date().getTime(),
                status: game_status_1.GameStatus.WAITING,
                players: [],
                trash: [],
                deck: utils_1.randomizeArray(deck_1.deck())
            },
            isFirstConnection: true
        };
    }
    addPlayer(message) {
        const newPlayer = {
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
    chatMessageHandler(gameId, message) {
        this.io.to(gameId).emit('action', message);
        console.log('Message Being Sent...');
    }
    emitPlayerAction(gameId, message) {
        this.io.to(gameId).emit('action', message);
        console.log('Message Being Sent...');
    }
    emitMessage(gameId, message) {
        this.io.to(gameId).emit('message', message.content);
        console.log('Message Being Sent...');
    }
    sendGameState(gameId) {
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
                if (utils_1.isExpired(game.gameState.startTime)) {
                    console.log('Is Expired: ' + gameId + ' ' + game.gameState.startTime + ' ' + Date.now());
                    delete this.activeGames[gameId];
                }
            }
        }
        console.log('Post Cleaned Games: ' + Object.keys(this.activeGames).length);
    }
    /* Server Setup */
    createApp() {
        this.app = express();
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.app.use(bodyParser.json());
    }
    config() {
        this.port = process.env.PORT || GameServer.PORT;
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    sockets() {
        this.io = socketIo(this.server);
    }
    listen() {
        this.httpRequestHandler();
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.io.on('connect', (socket) => {
            socket.on('message', (m) => {
                this.messageHandler(m, socket);
            });
            socket.on('disconnect', (m) => {
                console.log(m);
                console.log('Client disconnected');
            });
        });
    }
    getApp() {
        return this.app;
    }
    messageHandler(message, socket) {
        console.log('Receiving Message...');
        console.log(message);
        switch (message.messageType) {
            case message_type_1.MessageType.CONNECTED:
                socket.join(message.gameId);
                console.log('Connecting Player to ' + message.gameId);
                this.playerConnectedMessageHandler(message);
                break;
        }
        console.log(' ----- ');
    }
}
GameServer.PORT = 8080;
exports.GameServer = GameServer;
