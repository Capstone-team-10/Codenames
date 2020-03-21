import masterWordList from "./wordBank";

function shuffle(cardDeck) {
  let currentIndex = cardDeck.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = cardDeck[currentIndex];
    cardDeck[currentIndex] = cardDeck[randomIndex];
    cardDeck[randomIndex] = temporaryValue;
  }

  return cardDeck;
}

//max is the length of the wordList array
const getRandomNumbers = max => {
  const numbers = [];
  for (let i = 0; i < max; i++) {
    //add index numbers up to wordList length to the array
    numbers.push(i);
  }
  //after the loop numbers is [1,2,3,4,5...up to 600]

  //we shuffle the array of numbers to randomize them
  const randomNumbers = shuffle(numbers);
  return randomNumbers.slice(0, 26);
};

export const buildDeck = wordList => {
  const randomNumbers = getRandomNumbers(wordList.length);
  const cardDeck = [];
  let red = 9;
  let blue = 9;
  let black = 1;
  let white = 6;

  // function getUniqueWord() {
  //   const wordSelected = {};
  //   let randomWord = wordList[Math.floor(Math.random() * 600)];
  //   if (wordSelected[randomWord] === true) {
  //     getUniqueWord();
  //   }
  //   wordSelected[randomWord] = true;
  //   return randomWord;
  // }

  while (red || blue || black || white) {
    if (red > 0) {
      cardDeck.push({
        color: "red",
        word: `${wordList[randomNumbers.shift()]}`,
        flipped: false
      });
      red--;
    }
    if (blue > 0) {
      cardDeck.push({
        color: "blue",
        word: `${wordList[randomNumbers.shift()]}`,
        flipped: false
      });
      blue--;
    }
    if (black > 0) {
      cardDeck.push({
        color: "black",
        word: `${wordList[randomNumbers.shift()]}`,
        flipped: false
      });
      black--;
    }
    if (white > 0) {
      cardDeck.push({
        color: "white",
        word: `${wordList[randomNumbers.shift()]}`,
        flipped: false
      });
      white--;
    }
  }
  return cardDeck;
};

const dealCards = (wordList = masterWordList) => {
  let deck = buildDeck(wordList);
  return shuffle(deck);
};

export default dealCards;
