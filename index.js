var Word = require("./word.js");
var inquirer = require("inquirer");

// randomize the list of car brands
var brandsOfCars = ['dodge', 'chevy', 'ford', 'bmw', 'porsche', 'toyota', 'alfa romero',
    'mercedes-benz', 'rolls-royce', 'bentley', 'land rover', 'genesis', 'maserati'].sort(() => Math.random() - 0.5);

var index = 0;
var numOfGuesses = 10;
var numOfWins = 0;
var numOfLosses = 0;

// select initial word
var newWord = new Word(brandsOfCars[index]);
guessWord(newWord);

function guessWord() {
    // Display current word and number of guesses left
    console.log(newWord.displayWord());
    console.log("Number of guesses left:", numOfGuesses, "guesses");
    // Prompt user to enter a letter
    inquirer.prompt([
        {
            type: "input",
            message: "What letter would you like to guess?",
            name: "guess"
        },
    ]).then(answer => {
        // If not a valid alphabetic char, log that and try again
        if (!(answer.guess.length === 1 && answer.guess.match(/[a-z]/i))) {
            console.log("Not a valid character! Please try again!");
        }
        // if guess letter is not in current word, report incorrect, decrement guesses.
        // if no guesses left, increases losses and check if we have any more words, otherwise quit.
        else if (!newWord.checkNewLetter(answer.guess)) {
            console.log("INCORRECT!!");
            numOfGuesses--;
            if (numOfGuesses === 0) {
                console.log("Sorry you ran out of guesses!");
                numOfLosses++;
                var exit = checkIfFinished();
                if (exit) return;
            }
        }
        else {
        // Guessed letter is in our word.  Display correct, check if user guess full word,
        // increment wins and check if we have any more words, otherwise quit.
            console.log("CORRECT!!");
            var guessedWord = newWord.displayWord().replace(/\s/g, "").trim();
            var expectedWord = brandsOfCars[index].replace(/\s/g, "").trim();
            if (guessedWord === expectedWord) {
                console.log("You guessed the correct brand: " + expectedWord + "! Continuing to next word!");
                numOfWins++;
                var exit = checkIfFinished();
                if (exit) return;
            }
        }
        guessWord();
    });
}

function checkIfFinished() {
    // used to check if the word was guess.  also check if all words guessed and print results.
    // lastly pick a new word to guess if not finished.
    index++;
    numOfGuesses = 10;
    if (index >= brandsOfCars.length) {
        console.log("You've guessed all the available words!");
        console.log("Youre final score is", numOfWins, "wins and", numOfLosses, "losses!");
        return true;
    }
    newWord = new Word(brandsOfCars[index]);
}