// word that depends on the Letter constructor, this is used to create an object representing the current
// word the user is attempting to guess.

var Letter = require("./letter.js");

var Word = function(word) {
    this.brand = word;
    this.letterObjs = []
    this.letters = word.split('').forEach(c => {this.letterObjs.push(new Letter(c))});
    this.displayWord = () => {
        // check if letter is guess here
        var word = "";

        for (var x = 0; x < this.letterObjs.length; x++) {
            word += this.letterObjs[x].checkIfGuessed() + " ";
        }
        return word;
    }
    this.checkNewLetter = (newLetter) => {
        // check each letter against new guess
        var found = false;

        if (newLetter.length === 1 && newLetter.match(/[a-z\s]/i)){
            this.letterObjs.forEach(element => {
                var flag = element.checkNewGuess(newLetter);
                if (!found && flag) {found = true;}
            })
            return found ? true : false;
        }
        else {
            return 3;
        }
    }
}

module.exports = Word;

// var test = new Word("ruf   fio");
// test.displayWord();
// test.checkNewLetter("f");
// test.displayWord();
// test.checkNewLetter("r");
// test.displayWord();
// test.checkNewLetter("i");
// test.displayWord();
// test.checkNewLetter("u");
// test.displayWord();
// test.checkNewLetter("o");
// test.displayWord();