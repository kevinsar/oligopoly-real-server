import { Player } from './player';
import { MessageType, CardAction } from './message-type';

export class Message {
  from: Player;
  content: any;
  action: CardAction;
  messageType?: MessageType;
  gameId?: string;

  constructor(
    from: Player,
    messageType: MessageType,
    action: CardAction,
    content: any,
    gameId?: string
  ) {
    this.from = from;
    this.content = content;
    this.action = action;
    this.messageType = messageType;
    this.gameId = gameId;
  }
}
