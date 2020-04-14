// Display an underlying character or a blank placeholder (such as an underscore)
// Depending on hether or not the user has guess the letter.

var Letter = function(letter) {
    this.guessed = false;
    this.specialChar = () => {
        this.guessed = true;
        return letter;
    }
    this.ulc = letter.match(/[a-z]/i) ? letter : this.specialChar();
    this.checkIfGuessed = () => { 
        return char = this.guessed ? this.ulc : "_";
    };
    this.checkNewGuess = (guess) => {
        if (this.ulc === guess) {
            this.guessed = true;
            return true;
        }
    }
}

module.exports = Letter;