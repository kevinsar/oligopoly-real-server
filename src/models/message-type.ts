export enum MessageType {
  HOST = 'host',
  ALL = 'all',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  READY = 'ready',
  WAITING = 'waiting',
  GAME_STATE = 'game-state',
  ACTION = 'action'
}

export enum CardAction {
  DRAW = 'draw',
  PLAY = 'play',
  BANK = 'bank',
  BUILD = 'build',
  TRASH = 'trash',
  PAY = 'pay',
  MOVE = 'move'
}
