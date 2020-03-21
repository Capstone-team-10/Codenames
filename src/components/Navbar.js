import React from "react";
import firebase, { db } from "../fireStore";

import "../css/navbar.css";

const Navbar = () => {
  //GET
  db.collection("Users")
    .get()
    .then(snapshot => {
      console.log(snapshot.docs);
      //to get the actual data in the document. you have to use the method below
    });

  db.collection("Users")
    .where("Name", "==", "AAron")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log("GET", doc.data().Email);
      });
    });

  db.collection("Games")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log("CARDS ON TABLE", doc.data().CardsOnTable[1].Word);
      });
    });

  //Displaying the Deck
  const deckOnBoard = document.querySelector("#deck-on-board");

  function renderDeck(doc) {
    let li = document.createElement("li");
    let word = document.createElement("span");

    //below attaching the card word or some kind of unique id to the data attribute of each li
    li.setAttribute("card-on-board-id", doc.Word); //
    li.setAttribute("flipped", doc.Flipped);
    li.setAttribute("color", doc.Color);
    word.textContent = doc.Word;

    li.appendChild(word);

    deckOnBoard.appendChild(li);
  }

  db.collection("Games")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        renderDeck(doc.data().CardsOnTable); // or doc
      });
    });

  return (
    <nav id="navbar" className="navbar nav-wrapper red darken-4">
      <button className="btn controls-btn waves-effect waves-dark teal darken-2">
        Controls
      </button>
      <div className="logo-container brand-logo teal darken-2 center">
        <h1 id="header-logo" className="header-logo hide-on-med-and-down">
          Codenames
        </h1>
        <h3
          id="header-logo"
          className="header-logo hide-on-large-only hide-on-small-only"
        >
          Codenames
        </h3>
      </div>
      <div className="btns-right-container">
        <button className="btn right waves-effect waves-dark teal darken-2">
          Login
        </button>
        <button className="btn right waves-effect waves-dark teal darken-2">
          User Info
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
