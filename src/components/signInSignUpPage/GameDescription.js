import React from "react";

const GameDescription = () => {
  return (
    <div className="description-container">
      <h3 className="description-header-text">RULES OF THE GAME</h3>
      <p>
        Imagine you are a spy trying to figure out who is on your team. There
        are 25 people in front of you, each with their own codename. You do not
        know the identity of these people, only your handler knows who is part
        of your team, and who is an enemy spy.
      </p>

      <p>
        Unfortunately, for security reasons, your handler can’t just tell you
        who is who... but they can give you a clue. Your clue comes in the form
        of a word that relates to the codenames of the spies on your team, and
        the number of names that the word matches.
      </p>

      <p>
        It’s up to you and your logic skills to identify all the spies on your
        team before the enemy does.
      </p>
    </div>
  );
};

export default GameDescription;
