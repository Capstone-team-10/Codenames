//keeps track of who is going from spy master giving hint
//to spy guessing then to opposing spy master and spy

class TurnTracker {
  constructor() {
    this.currentTurn = "redHint";
  }

  startWithTeam(team) {
    const randomStart = ["redHint", "blueHint"];
    //either start with specific team or if left empty randomly pick a team
    this.currentTurn =
      team && (team === "red" || team === "blue")
        ? `${team}Hint`
        : randomStart[Math.floor(Math.random() * 2)];
    return this.currentTurn;
  }

  getCurrentTurn() {
    return this.currentTurn;
  }

  nextTurn() {
    switch (this.currentTurn) {
      case "redHint":
        this.currentTurn = "redGuess";
        break;
      case "redGuess":
        this.currentTurn = "blueHint";
        break;
      case "blueHint":
        this.currentTurn = "blueGuess";
        break;
      case "blueGuess":
        this.currentTurn = "redHint";
        break;
      default:
        console.error("Error invalid input");
    }
    return this.currentTurn;
  }
}
const turnTracker = new TurnTracker();
export default turnTracker;
