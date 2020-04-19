"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType["HOST"] = "host";
    MessageType["ALL"] = "all";
    MessageType["CONNECTED"] = "connected";
    MessageType["DISCONNECTED"] = "disconnected";
    MessageType["READY"] = "ready";
    MessageType["WAITING"] = "waiting";
    MessageType["GAME_STATE"] = "game-state";
    MessageType["ACTION"] = "action";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var CardAction;
(function (CardAction) {
    CardAction["DRAW"] = "draw";
    CardAction["PLAY"] = "play";
    CardAction["BANK"] = "bank";
    CardAction["BUILD"] = "build";
    CardAction["TRASH"] = "trash";
    CardAction["PAY"] = "pay";
    CardAction["MOVE"] = "move";
})(CardAction = exports.CardAction || (exports.CardAction = {}));
