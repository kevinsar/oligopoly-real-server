"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeArray = (choices) => {
    return choices.sort(function (a, b) {
        const number1 = Math.random();
        const number2 = Math.random();
        if (number1 < number2) {
            return -1;
        }
        return 1;
    });
};
exports.getRandomText = (length = 4) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
exports.generateGameId = (gamePrefix, activeGames) => {
    let gameId = gamePrefix + exports.getRandomText();
    // Generate new id until one doesn't exist.
    while (activeGames[gameId]) {
        gameId = gamePrefix + exports.getRandomText();
    }
    return gameId;
};
exports.isExpired = (startTime) => {
    const hour = 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    return startTime + hour < currentTime;
};
