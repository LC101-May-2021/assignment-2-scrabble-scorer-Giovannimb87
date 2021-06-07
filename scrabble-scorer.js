// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
let letterPoints = "";
let userWord;
let score = 0;

const isWordValid = function (str) {
  const iChars = "1234567890~`!#$%^&*+=-[]\\';,/{}|\":<>?" + " " + "(" + ")";

  for (let i = 0; i < str.length; i++) {
    if (iChars.indexOf(str.charAt(i)) != -1) {
      return false;
    }
  }
  return true;
};

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      score += Number(pointValue);
		 }
 
	  }
	}
console.log(letterPoints);
console.log(`Score for ${word}: ${score}`);
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
     userWord = input.question("Let's play some scrabble! Enter a word: ");

  while (isWordValid(userWord) == false) {
    console.log(
      "Your word can not include spaces, special characters, or numbers."
    );
    userWord = input.question("Enter a word: ");
  }
};

let simpleScore = function (word) {
  word = word.toUpperCase();
  for(let i in word) letterPoints += `Points for '${word[i]}': "1"\n`, score++;
console.log(letterPoints);
console.log(`Score for ${word}: ${score}`);
return score;
};

let vowelBonusScore = function(word) {
  word = word.toUpperCase();
    for(let i in word)
    word[i].match(/[aeiou]/gi) ? (letterPoints += `Points for '${word[i]}': "3"\n`, score+=3) : (letterPoints += `Points for '${word[i]}': "1"\n`, score++);
console.log(letterPoints);
console.log(`Score for ${word}: ${score}`);
return score;
};

let scrabbleScore = function(word) {
  word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    for (const letterKey in newPointStructure) {
      if (letterKey.includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${newPointStructure[letterKey]}\n`;
        score += Number(newPointStructure[letterKey]);
      }
    }
  }
console.log(letterPoints);
console.log(`Score for ${word}: ${score}`);
return score;
}
const simple = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore
};
const vowel = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScore
};
const scrabble = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: scrabbleScore
};

const scoringAlgorithms = [simple, vowel, scrabble];

function scorerPrompt(
  scoreChoice = input.question(
    "Which scoring system would you like to use?\n0: Simple Scoring\n1: Vowel-Bonus Scoring\n2: Traditional Scoring\n..."
  )
) {
  if (
    Number(scoreChoice) < 3 &&
    Number(scoreChoice) >= 0 &&
    scoreChoice.length == 1
  ) {
    console.log(`Algorithm Name: ${scoringAlgorithms[scoreChoice].name}`)
    console.log(`Algorithm Description: ${scoringAlgorithms[scoreChoice].description}`)
    return scoringAlgorithms[scoreChoice].scoringFunction(userWord);
  } else {
    console.clear();
    console.log(`Your word is: ${userWord.toUpperCase()}`);
    console.log(`Selection not found. Please choose again: `);
    return scorerPrompt();
  }
}

function transform(object) {
  let newObject = {};
  Object.keys(object).forEach((key) => {
    object[key].forEach((character) => {
      newObject[character.toUpperCase()] = Number(key);
    });
  });
  return newObject;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

