import { Game, GameList } from "../models/game";

export const randomizeArray = (choices: any[]) => {
  return choices.sort(function(a, b) {
    const number1 = Math.random();
    const number2 = Math.random();

    if (number1 < number2) {
      return -1;
    }

    return 1;
  });
};

export const getRandomText = (length = 4) => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export const generateGameId = (gamePrefix: string, activeGames: GameList) => {
  let gameId = gamePrefix + getRandomText();

  // Generate new id until one doesn't exist.
  while (activeGames[gameId]) {
    gameId = gamePrefix + getRandomText();
  }

  return gameId;
}

export const isExpired = (startTime: number) => {
  const hour = 60 * 60 * 1000;
  const currentTime = new Date().getTime();
  return startTime + hour < currentTime;
}
