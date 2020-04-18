import { Card } from './card';

export interface Player {
  id: number;
  name: string;
  hand: Card[];
  land: Card[][];
  bank: Card[];
  unAssigned: Card[];
  isHost?: boolean;
}
