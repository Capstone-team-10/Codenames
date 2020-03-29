const isItYourTurn = (currentTurn, yourTeam, areYouSpyMaster) => {
  switch (currentTurn) {
    case "redHint":
      return (yourTeam === "red" && areYouSpyMaster === true);
    case "redGuess":
      return (yourTeam === "red" && areYouSpyMaster === false);
    case "blueHint":
      return (yourTeam === "blue" && areYouSpyMaster === true);
    case "blueGuess":
      return (yourTeam === "blue" && areYouSpyMaster === false);
    default:
      return "";
  }
}

export default isItYourTurn;
