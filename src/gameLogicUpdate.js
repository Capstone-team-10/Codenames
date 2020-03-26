// Starting Point
//   teams are already selected
//   spymasters are chosen

// Who goes First Logic
//   Math Random if 0 then blue if 1 then red

// Shuffled, Deal, Generate color taken care of by dealing method

// step 1: select 9 cards for the red team randomly from the word bank
//  -add index number to wordSelected object
//  -add create cardObj and add to the deck array {color: "red", word: "current word", flipped: false}

//Choose Game Words and assign colors
/*
 function buildDeck(){
   wordSelected = {}
   cardDeck = []
   red = 9
   blue = 9
   black = 1
   white = 6

   while(red|| blue||black||white){
     randomWord = wordlist(Random *600)
     if(wordSelected[randomWord] = true){
       continue
     }
     wordSelected[randomWord] = true
     if(red > 0){
     cardDeck.push({color: "red", word: ``${randomWord}, flipped: false})
     red--
   }...

   return cardDeck
 }
*/

//Choose shuffle deck
/*
 function shuffle(cardDeck) {

  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

};
*/

// Handling player turns. Who goes. When their turn ends. What needs to happen each turn

// During turn
// while both teams have cards left not selected and black card is not selected
// step 1: spymaster sends hint word and hint count
//  -update hint and hint count in the store
// step 2: display hint word and count
// step 3: team picks cards while hint count is greater than zero and wrong card is not chosen
// if team colored card chosen
//  step 3A: on correct pick decrement hint count and swap card for image card.
//    -update hint count in the store
//    -update card object to flipped
// else if
//  step 3B: other team's card is chosen, or neutral card is chosen end turn
//    -if other teams card is chosen it is flipped and update card object to flipped
// else
//  step 3C: black card is chosen team looses and game is over
// step 4: teams turn ends opposite team get to go. Start back at step 1
//  -other team is set in the state as current turn
// step 5: Whichever team has 0 cards left unselected is declared the winner

// const result = deck.reduce(
//   (curr, cardObj) => {
//     if (cardObj.color === "blue" && cardObj.flipped === true) {
//       curr.blueFlipped += 1;
//     } else if (cardObj.color === "red" && cardObj.flipped === true) {
//       curr.redFlipped += 1;
//     }
//     return curr;
//   },
//   { redFlipped: 0, blueFlipped: 0 }
// );

/*
In game lobby:
  -select team thunk
  -set spyMaster thunk

  On press start:
    -Thunk sets currentTurn with turnTracker
    -Thunk sets cards remaining for both teams to 9
    -Finally thunk sets gameStatus to true

In game play:
  None play actions available at all times:
    chat messages can be typed and submitted
      -Thunk to update the chat message log

  All play actions (select cards, submit hints) are blocked if it is not the players turn:
  spyMaster gives hint and hintNumber
    -thunk to set hint and hintNumber
    -thunk to set next turn to with turnTracker
  spys guess cards
    -Thunk to update cards that have been flipped
    -Thunk to decrement hint count
    check if hint count is < 0 or player ends turn
      -Thunk sets currentTurn to the next turn using turnTracker

      If a teams cards remaining is zero game over that team wins
      If assassin card is picked game over that team loses

On game over
  option to play again with same players
    -Thunk sets game status to false
  option to play with new players
    -Thunk for player to leave game
*/
