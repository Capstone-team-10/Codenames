const turnTranslation = (currentTurn) => {
  switch (currentTurn) {
    case "redHint":
      return "Red Spymaster's turn";
    case "redGuess":
      return "Red team's turn to guess";
    case "blueHint":
      return "Blue Spymaster's turn";
    case "blueGuess":
      return "Blue team's turn to guess";
    default:
      return "";
  }
}

export default turnTranslation;
