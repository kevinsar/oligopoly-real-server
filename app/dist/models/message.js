"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(from, messageType, action, content, gameId) {
        this.from = from;
        this.content = content;
        this.action = action;
        this.messageType = messageType;
        this.gameId = gameId;
    }
}
exports.Message = Message;
