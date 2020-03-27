const displayCurrentPlayersTurn = currentTurn => {
  switch (currentTurn) {
    case "redHint":
      return "Red Spy Master";
    case "redGuess":
      return "Red team";
    case "blueHint":
      return "Blue Spy Master";
    case "blueGuess":
      return "Blue team";
    default:
      return "";
  }
};

export default displayCurrentPlayersTurn;
