"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_server_1 = require("./game-server");
let app = new game_server_1.GameServer().getApp();
exports.app = app;
