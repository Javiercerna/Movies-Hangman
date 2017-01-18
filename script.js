const WIN = 1;
const LOSE = 0;

var hangman = {
  lives: 12,
  used_letters: [],
  movie_title: '',
  guessed_title: '',
  findLetterIndexes: function(letter,string) {
    var letter_indexes = [];
    var letter_index = -1;

    while (true)
    {
      letter_index = string.toUpperCase().indexOf(letter,letter_index+1);
      if (letter_index == -1)
      {
        break;
      }
      letter_indexes.push(letter_index);
    }

    return letter_indexes;
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
      window.removeEventListener('keyup',handler.keyUpListener);
      return WIN;
    }

    if (this.lives == 0)
    {
      window.removeEventListener('keyup',handler.keyUpListener);
      return LOSE;
    }

    return -1;
  },
  generateMovieTitle: function() {
    this.movie_title = 'Spectral';
    this.guessed_title = Array(this.movie_title.length+1).join('_');
    return this;
  }
}.generateMovieTitle();

var handler = {
  keyUpListener: function(event) {
    var key_pressed = event.key.toUpperCase();
    if (key_pressed >= 'A' && key_pressed <= 'Z' && key_pressed.length === 1)
    {
      hangman.makeGuess(key_pressed);
      view.updateGuessedTitle();
      view.showUsedLetters();
      view.showGameEnd();
    }
  }
};

var view = {
  updateGuessedTitle: function() {
    var guessed_title = document.querySelector('.hangman-guessed p');
    guessed_title.textContent = hangman.guessed_title;
  },
  showUsedLetters: function() {
    var used_letters = document.querySelector('.used-letters p');
    used_letters.textContent = 'Used letters: ';
    hangman.used_letters.forEach(function(letter) {
      used_letters.textContent += letter + ' ';
    });
  },
  showGameEnd: function() {
    var container = document.querySelector('.container');
    var game_end_title = document.createElement('h1');
    if (hangman.checkGameEnd() == WIN)
    {
      game_end_title.textContent = 'You won!';
      container.appendChild(game_end_title);
    }
    else if (hangman.checkGameEnd() == LOSE)
    {
      game_end_title.textContent = 'You lost!';
      container.appendChild(game_end_title);
    }
  }
};

window.addEventListener('keyup',handler.keyUpListener);
