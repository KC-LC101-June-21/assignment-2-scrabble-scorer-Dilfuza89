// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const newPointStructure = transform(oldPointStructure);

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
    console.log("Let's play some scrabble!\n");
    let condition = true;
    let word = input.question("Enter a word to score: ");;
    while (Number(word)) {
      word = input.question("You should only enter a word: ");
    }
    return word;
};

function simpleScore(word) {
  word = word.toLowerCase();
  let score = 0;
  let letters = ['a','b','c','d','e','f','g','h','i','j',
                 'k','l','m','n','o','p','q','r','s','t',
                 'u','v','w','x','y','z']
  for (let i = 0; i < word.length; i++){
    if (letters.includes(word[i])){
      score += 1;
    }
  }
  return score;
};

function vowelBonusScore(word) { 
  word = word.toLowerCase();
  let vowels = ['a','e','i','o','u'];
  let consonants = ['b','c','d','f','g','h','j','k','l','m',
                    'n','p','q','r','s','t','v','w','x','y',
                    'z'];
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])){
      score += 3;
    }
    else if (consonants.includes(word[i])){
      score += 1;
    }
  }
  return score;
};

function scrabbleScore(word){
  word = word.toLowerCase();
	let score = 0;
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in newPointStructure) {
		 if (pointValue == word[i]) {
			score += newPointStructure[pointValue];
		 } 
	  }
	}
	return score;
};

const scoringAlgorithms = [ 
      { 
        name: 'Simple Score',
        description: 'Each letter is worth 1 point.',
        scoringFunction: simpleScore
      },
      {
        name: 'Bonus Vowels',
        description: 'Vowels are 3 pts, consonants are 1 pt.',
        scoringFunction: vowelBonusScore 
      },
      {
        name: 'Scrabble',
        description: 'The traditional scoring algorithm.',
        scoringFunction: scrabbleScore } ];


function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?\n\n");
  console.log("0 - Simple: One point per character\n");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points\n");
  console.log("2 - Scrabble: Uses scrabble point system\n");
  let selection = Number(input.question("Enter 0, 1, or 2: "));
  while (selection != 0 && 
         selection != 1 && 
         selection != 2){
    selection = Number(input.question("You can only enter 0, 1, or 2: "));
  }
  return scoringAlgorithms[selection];
}

function transform(oldPointStructure) {
  let newStructure = { }
  for (key in oldPointStructure){
    for (index in oldPointStructure[key]){
      newStructure[oldPointStructure[key][index].toLowerCase()] = Number(key);
    }
  }
  return newStructure;
};

function runProgram() {
  let word = initialPrompt();
  let algorithmToUse = scorerPrompt();
  let score = algorithmToUse.scoringFunction(word);
  console.log(`Score for '${word}': ${score}`);
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

