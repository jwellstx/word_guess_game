var Word = require("./word.js");
var inquirer = require("inquirer");

// randomize the list of car brands
// var brandsOfCars = ['dodge', 'chevy', 'ford', 'bmw', 'porsche', 'toyota', 'alfa romero',
    // 'mercedes-benz', 'rolls-royce', 'bentley', 'land rover', 'genesis', 'maserati'].sort(() => Math.random() - 0.5);

var brandsOfCars = ['dodge', 'chevy'].sort(() => Math.random() - 0.5);
var index = 0;
var numOfGuesses = 10;
var numOfWins = 0;
var numOfLosses = 0;

var newWord = new Word(brandsOfCars[index]);
guessWord(newWord);

function guessWord() {
    console.log("\n" + newWord.displayWord() + '\n');
    console.log("Number of guesses left:", numOfGuesses, "guesses\n");
    inquirer.prompt([
        {
            type: "input",
            message: "What letter would you like to guess?",
            name: "guess"
        },
    ]).then(answer => {
        console.log("\n");
        var found = newWord.checkNewLetter(answer.guess);
        if (found === 3) { console.log("Not a valid character, please try again.\n")}
        else if (!found) {
            console.log("INCORRECT!!\n");
            numOfGuesses--;
            if (numOfGuesses === 0) {
                console.log("Sorry you ran out of guesses!");
                numOfLosses++;
                index++;
                numOfGuesses = 10;
                if (index >= brandsOfCars.length) {
                    console.log("Thats all the guesses we have");
                    console.log("Youre final score is ", numOfWins, "wins and", numOfLosses, "losses!");
                    return;
                }
                newWord = new Word(brandsOfCars[index]);
            }
        } else {
            console.log("CORRECT!!\n");
            var guessedWord = newWord.displayWord().replace(/\s/g, "").trim();
            var expectedWord = brandsOfCars[index].replace(/\s/g, "").trim();
            if (guessedWord === expectedWord) {
                console.log("You won!! \n");
                numOfWins++;
                index++;
                numOfGuesses = 10;
                if (index >= brandsOfCars.length) {
                    console.log("Thats all the guesses we have");
                    console.log("Youre final score is ", numOfWins, "wins and", numOfLosses, "losses!");
                    return;
                }
                newWord = new Word(brandsOfCars[index]);
            }
        }
        guessWord();
    });
}