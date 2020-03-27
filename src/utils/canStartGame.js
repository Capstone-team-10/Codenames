const canStartGame = allPlayers => {
  const playerCheck = allPlayers.reduce(
    (acc, { Team, isSpyMaster }) => {
      if (Team === "red") {
        acc.red += 1;
        if (isSpyMaster) {
          acc.redSpyMaster = 1;
        }
      } else {
        acc.blue += 1;
        if (isSpyMaster) {
          acc.blueSpyMaster = 1;
        }
      }
      return acc;
    },
    {
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
    playerCheck.blueSpyMaster > 0
  ) {
    return false;
  } else {
    return true;
  }
};

export default canStartGame;
