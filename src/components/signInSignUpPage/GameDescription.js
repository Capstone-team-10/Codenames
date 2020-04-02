import React from "react";

const GameDescription = () => {
  return (
    <div className="description-container">
      <h3>RULES OF THE GAME</h3>
<p>Imagine you are a spy trying to figure out who is one your team. There are 25 people in front of you, each with their own codename. You do not know the identity of these people, only your handler knows who is part of your team, and who is an enemy spy.</p>


<p>Unfortunately, for security reasons, your handler can’t just tell you who is who... but they can give you a clue. Your clue comes in the form of a word that relates to the codenames of the spies on your team, and the number of names that the word matches.</p>


<p>It’s up to you and your logic skills to identify all the spies on your team before the enemy does.</p>
      {/* <p>
        Players split into two teams: red and blue. One player of each team is
        selected as the team's spymaster; the others are field operatives.
      </p>
      <p>
        Teams take turns. On each turn, the appropriate spymaster gives a verbal
        hint about the words on the respective cards. Each hint may only consist
        of one single word and a number. The spymaster gives a hint that is
        related to as many of the words on his/her own agents' cards as
        possible, but not to any others – lest they accidentally lead their team
        to choose a card representing an innocent bystander, an opposing agent,
        or the assassin.
      </p>
      <p>
        The hint's word can be chosen freely, as long as it is not (and does not
        contain) any of the words on the code name cards still showing at that
        time. Code name cards are covered as guesses are made.
      </p>
      <p>
        The hint's number tells the field operatives how many words in the grid
        are related to the word of the clue. It also determines the maximum
        number of guesses the field operatives may make on that turn, which is
        the hint's number plus one. Field operatives must make at least one
        guess per turn, risking a wrong guess and its consequences. They may
        also end their turn voluntarily at any point thereafter.
      </p>
      <p>
        After a spymaster gives the hint with its word and number, their field
        operatives make guesses about which code name cards bear words related
        to the hint and point them out, one at a time. When a code name card is
        pointed out, the spymaster covers that card with an appropriate identity
        card – a blue agent card, a red agent card, an innocent bystander card,
        or the assassin card – as indicated on the spymasters' map of the grid.
        If the assassin is pointed out, the game ends immediately, with the team
        who identified him losing. If an agent of the other team is pointed out,
        the turn ends immediately, and that other team is also one agent closer
        to winning. If an innocent bystander is pointed out, the turn simply
        ends.
      </p>
      <p>
        The game ends when all of one team's agents are identified (winning the
        game for that team),[3] or when one team has identified the assassin
        (losing the game).
      </p> */}
    </div>
  );
};

export default GameDescription;
