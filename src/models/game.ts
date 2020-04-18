import { GameStatus } from './game-status';
import { Player } from './player';
import { Card } from './card';

export interface GameList {
  [gameId: string]: Game;
}

export interface GameState {
  firstConnected: string;
  id: string;
  status: GameStatus;
  startTime: number;
  success?: boolean;
  deck: Card[];
  trash: Card[];
  players: Player[];
  winner?: Player;
}

export interface Game {
  allUsersReady: boolean;
  gameState: GameState;
  isFirstConnection: boolean;
}
