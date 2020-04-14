// Display an underlying character or a blank placeholder (such as an underscore)
// Depending on hether or not the user has guess the letter.

var Letter = function(letter) {
    this.guessed = false;
    // Additional function to check if a character in our word is not an alphabetic letter - default it so guess is true
    this.specialChar = () => {
        this.guessed = true;
        return letter;
    }
    // check if real letter, if not setup as special character
    this.ulc = letter.match(/[a-z]/i) ? letter : this.specialChar();
    // if letter is guessed, reveal it, otherwise show log an underscore
    this.checkIfGuessed = () => { 
        return char = this.guessed ? this.ulc : "_";
    };
    // Check if guess is current letter, if so, set it to be revealed
    this.checkNewGuess = (guess) => {
        if (this.ulc === guess) {
            this.guessed = true;
            return true;
        }
    }
}

module.exports = Letter;