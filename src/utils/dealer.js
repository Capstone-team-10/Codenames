import masterWordList from "./wordBank";

export const buildDeck = wordList => {
  const cardDeck = [];
  let red = 9;
  let blue = 9;
  let black = 1;
  let white = 6;

  function getUniqueWord() {
    const wordSelected = {};
    let randomWord = wordList[Math.floor(Math.random() * 600)];
    if (wordSelected[randomWord] === true) {
      getUniqueWord();
    }
    wordSelected[randomWord] = true;
    return randomWord;
  }

  // const promiseUniqueWord = new Promise((resolve, reject) => {
  //   let uniqueWord = null;
  //   uniqueWord = getUniqueWord();
  //   if (uniqueWord) {
  //     resolve(uniqueWord);
  //   } else {
  //     reject(new Error("An error occurred while getting a unique word."));
  //   }
  // });

  while (red || blue || black || white) {
    if (red > 0) {
      cardDeck.push({
        color: "red",
        word: `${getUniqueWord()}`,
        flipped: false
      });
      red--;
    }
    if (blue > 0) {
      cardDeck.push({
        color: "blue",
        word: `${getUniqueWord()}`,
        flipped: false
      });
      blue--;
    }
    if (black > 0) {
      cardDeck.push({
        color: "black",
        word: `${getUniqueWord()}`,
        flipped: false
      });
      black--;
    }
    if (white > 0) {
      cardDeck.push({
        color: "white",
        word: `${getUniqueWord()}`,
        flipped: false
      });
      white--;
    }
  }
  return cardDeck;
};

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

const dealCards = (wordList = masterWordList) => {
  let deck = buildDeck(wordList);
  return shuffle(deck);
};

export default dealCards;
