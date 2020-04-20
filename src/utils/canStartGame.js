const canStartGame = allPlayers => {
  const playerCheck = allPlayers.reduce(
    (acc, { Team, isSpyMaster }) => {
      if (Team === "red") {
        acc.red += 1;
        if (isSpyMaster) {
          acc.redSpyMaster = 1;
        }
      } else if (Team === "blue") {
        acc.blue += 1;
        if (isSpyMaster) {
          acc.blueSpyMaster = 1;
        }
      } else {
        acc.freeAgent += 1;
      }
      return acc;
    },
    {
      freeAgent: 0,
      red: 0,
      redSpyMaster: 0,
      blue: 0,
      blueSpyMaster: 0
    }
  );

  if (
    playerCheck.red >= 2 &&
    playerCheck.redSpyMaster > 0 &&
    playerCheck.blue >= 2 &&
    playerCheck.blueSpyMaster > 0 &&
    playerCheck.freeAgent === 0
  ) {
    return false;
  } else {
    return true;
  }
};

export default canStartGame;
