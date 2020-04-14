// word that depends on the Letter constructor, this is used to create an object representing the current
// word the user is attempting to guess.

var Letter = require("./letter.js");

var Word = function (word) {
    this.brand = word;
    this.letterObjs = []
    // Array full of letter objects
    this.letters = word.split('').forEach(c => { this.letterObjs.push(new Letter(c)) });
    // Diplay current word with letters and underscores
    this.displayWord = () => {
        // Check which letters have been guessed and display the results
        var word = "";
        for (var x = 0; x < this.letterObjs.length; x++) {
            word += this.letterObjs[x].checkIfGuessed() + " ";
        }
        return word;
    }
    // Given a new character, check all letter objects and see if its a valid guess
    this.checkNewLetter = (newLetter) => {
        var found = false;
        this.letterObjs.forEach(element => {
            var flag = element.checkNewGuess(newLetter);
            if (flag) { found = true; }
        })
        // This will return to index.js if the guess was valid or not
        return found ? true : false;
    }
}

module.exports = Word;