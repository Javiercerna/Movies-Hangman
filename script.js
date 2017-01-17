var hangman = {
  lives: 12,
  used_letters: [],
  movie_title: '',
  guessed_title: '',
  findLetterIndexes: function(letter,string) {
    if (string.toLowerCase().indexOf(letter) == -1)
    {
      return [];
    }
    return [string.toLowerCase().indexOf(letter)];
  },
  makeGuess: function(letter) {
    if (this.used_letters.indexOf(letter) != -1)
    {
      console.log('Letter already tried');
      console.log('Guessed Title: ' + this.guessed_title);
      return;
    }
    letter_indexes_found = this.findLetterIndexes(letter,this.movie_title);
    if (letter_indexes_found.length != 0)
    {
      this.revealLetter(letter,letter_indexes_found);
      console.log('Letter in movie title!');
    }
    else
    {
      console.log('Letter not in movie title!');
      this.lives -= 1;
      console.log('Remaining lives: ' + this.lives);
    }

    this.checkGameEnd();
    this.used_letters.push(letter);
    console.log('Guessed Title: ' + this.guessed_title);
  },
  revealLetter: function(letter,letter_indexes) {
    var temp_title_array = this.guessed_title.split('');
    letter_indexes.forEach(function(index) {
      temp_title_array[index] = letter;
    });
    this.guessed_title = temp_title_array.join('');
  },
  isMovieTitleComplete: function(guessed_title) {
    return guessed_title.indexOf('_') === -1;
  },
  checkGameEnd: function()
  {
    if (this.isMovieTitleComplete(this.guessed_title))
    {
      console.log('You won!');
    }

    if (this.lives == 0)
    {
      console.log('Game over!');
    }
  },
  generateMovieTitle: function() {
    this.movie_title = 'Spectral';
    this.guessed_title = Array(this.movie_title.length+1).join('_');
    return this;
  }
}.generateMovieTitle();

debugger;
