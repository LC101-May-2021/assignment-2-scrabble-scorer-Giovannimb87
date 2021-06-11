// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
let letterPoints = "";
let userWord;
//let totalScore = 0;
//function to check for illegal characters.
const isWordValid = function (str) {
  const iChars = "1234567890~`!#$%^&*+=-[]\\';,/{}|\":<>?" + " " + "(" + ")";

  for (let i = 0; i < str.length; i++) {
    if (iChars.indexOf(str.charAt(i)) != -1) {
      return false;
    }
  }
  return true;
};
//this object will later be transformed using a function that iterates through its key and values in order to re-assign to a new object.
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
  let score = 0;
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
return score
 }

//asks user for a word to be scored.
function initialPrompt() {
     userWord = input.question("Let's play some scrabble! Enter a word: ");
//checks word for illegal characters and returns true or false. If false, re-prompts the user.
  while (isWordValid(userWord) == false) {
    console.log(
      "Your word can not include spaces, special characters, or numbers."
    );
    userWord = input.question("Enter a word: ");
  }
};
//simple score, iterates through a verified strings index to =+ points to score, and concatinate flavor text into letterpoints variable.
let simpleScore = function (word) {
  let score = 0;
  word = word.toUpperCase();
  for(let i in word) letterPoints += `Points for '${word[i]}': "1"\n`, score++;
console.log(letterPoints);
console.log(`Score for ${word}: ${score}`);
return score;
};
//vowel score, iterates through a verified strings index to check for vowels and then uses a ternary to assign points based on true or false for index match [aeiou], += points to score, accordingly, based on ternary result, and concatinates flavor text into letterpoints variable.
let vowelBonusScore = function(word) {
  let score = 0;
  word = word.toUpperCase();
    for(let i in word)
    word[i].match(/[aeiou]/gi) ? (letterPoints += `Points for '${word[i]}': "3"\n`, score+=3) 
    : (letterPoints += `Points for '${word[i]}': "1"\n`, score++);
console.log(letterPoints);
console.log(`Score for ${word}: ${score}`);
return score;
};
//original score, iterates through a verified strings index, passes that index value into a for-in loop of an object, checks object for the value of the key which matches the string index value, += points to score accordingly, and concatinates falvor text to letterpoints variable.
let scrabbleScore = function(word) {
  let score = 0;
  word = word.toLowerCase();
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

//objects that store information about the various scoring algorithms.
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

//asks the user which scoring algorithm they wish to use, displays information and calls the appropriate object method to score the word.
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
//function that take an object and reverses the key-value pair so that the values are now the keys, and the original key is set as the value.
function transform(object) {
  let newObject = {};
  Object.keys(object).forEach((key) => {
    object[key].forEach((character) => {
      newObject[character.toLowerCase()] = Number(key);
    });
  });
  return newObject;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();
  scorerPrompt();
  //playAgainPrompt();
}


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

