var hangman = {
  lives: 12,
  used_letters: [],
  movie_title: '',
  guessed_title: '',
  getLettersIndex: function(letter,string) {
    if (string.indexOf(letter) == -1)
    {
      return [];
    }
    return [string.indexOf(letter)];
  },
  makeGuess: function(letter) {
    if (this.used_letters.indexOf(letter) != -1)
    {
      console.log('Letter already tried');
      return;
    }
    letters_index_found = this.getLettersIndex(letter,this.movie_title);
    if (letters_index_found.length != 0)
    {
      console.log('Letter in movie title!');
    }
    else
    {
      console.log('Letter not in movie title!');
      this.lives -= 1;
      console.log('Remaining lives: ' + this.lives);
    }

    if (this.lives == 0)
    {
      console.log('Game over!');
    }

    this.used_letters.push(letter);
  },
  generateMovieTitle: function() {
    this.movie_title = 'Spectral';
    this.guessed_title = Array(this.movie_title.length+1).join('_');
    return this;
  }
}.generateMovieTitle();

debugger;
