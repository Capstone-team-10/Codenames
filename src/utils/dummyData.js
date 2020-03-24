const allPlayers = [
  {
    displayName: "Bob",
    team: "red",
    spyMaster: false
  },
  {
    displayName: "Fred",
    team: "red",
    spyMaster: false
  },
  {
    displayName: "George",
    team: "red",
    spyMaster: false
  },
  {
    displayName: "Alan",
    team: "blue",
    spyMaster: true
  },
  {
    displayName: "Charles",
    team: "blue",
    spyMaster: false
  },
  {
    displayName: "James",
    team: "blue",
    spyMaster: false
  }
];

const chatLog = [
  {
    sender: "Bob",
    message: "Is red team ready to go?"
  },
  {
    sender: "Fred",
    message: "We're all ready."
  },
  {
    sender: "Alan",
    message: "You're ready to lose?"
  },
  {
    sender: "Charles",
    message: "That must be it blue team is winning this one."
  }
];

const displayName = "displayName";

const gameStatus = false;

const spyMaster = true;

const teamColor = "color";

export default {
  allPlayers,
  chatLog,
  displayName,
  gameStatus,
  spyMaster,
  teamColor
};
