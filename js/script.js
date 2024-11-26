$(document).ready(function () {
  // Game variables
  let playerTotalScore = 0;
  let computerTotalScore = 0;
  let roundsPlayed = 0;

  // Sound effects
  const rollSound = new Audio('sounds/dice-roll.mp3');
  const winSound = new Audio('sounds/win.mp3');
  const loseSound = new Audio('sounds/lose.mp3');

  // Dice roll function
  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Update dice images with rolling animation
  function updateDiceImages(playerRoll, computerRoll) {
    // Add rolling animation (CSS)
    $('#player-dice1, #player-dice2, #computer-dice1, #computer-dice2').addClass('rolling');

    // After animation ends, update the dice images
    setTimeout(() => {
      $('#player-dice1').attr('src', `images/dice${playerRoll[0]}.png`).removeClass('rolling');
      $('#player-dice2').attr('src', `images/dice${playerRoll[1]}.png`).removeClass('rolling');
      $('#computer-dice1').attr('src', `images/dice${computerRoll[0]}.png`).removeClass('rolling');
      $('#computer-dice2').attr('src', `images/dice${computerRoll[1]}.png`).removeClass('rolling');
    }, 500);
  }

  // Update scores with jQuery animation
  function updateScores(playerRoll, computerRoll) {
    const playerScore = calculateScore(playerRoll);
    const computerScore = calculateScore(computerRoll);

    playerTotalScore += playerScore;
    computerTotalScore += computerScore;

    // Animate player score
    $('#player-round-score')
      .text(playerScore)
      .animate({ fontSize: '2rem', color: '#2ecc71' }, 200)
      .animate({ fontSize: '1rem', color: '#333' }, 200);

    $('#player-total-score')
      .text(playerTotalScore)
      .animate({ fontSize: '2rem', color: '#3498db' }, 200)
      .animate({ fontSize: '1rem', color: '#333' }, 200);

    // Animate computer score
    $('#computer-round-score')
      .text(computerScore)
      .animate({ fontSize: '2rem', color: '#e74c3c' }, 200)
      .animate({ fontSize: '1rem', color: '#333' }, 200);

    $('#computer-total-score')
      .text(computerTotalScore)
      .animate({ fontSize: '2rem', color: '#9b59b6' }, 200)
      .animate({ fontSize: '1rem', color: '#333' }, 200);
  }

  // Calculate score
  function calculateScore(roll) {
    if (roll.includes(1)) return 0;
    if (roll[0] === roll[1]) return (roll[0] + roll[1]) * 2;
    return roll[0] + roll[1];
  }

  // Check winner with fade-in animation
  function checkWinner() {
    if (roundsPlayed >= 3) {
      $('#roll-dice').prop('disabled', true);
      let message = '';

      if (playerTotalScore > computerTotalScore) {
        message = 'Player Wins!';
        winSound.play();
      } else if (playerTotalScore < computerTotalScore) {
        message = 'Computer Wins!';
        loseSound.play();
      } else {
        message = "It's a Tie!";
      }

      // Use jQuery fade-in animation
      $('#winner-message').hide().text(message).fadeIn(1000);
    }
  }

  // Event listeners
  $('#roll-dice').on('click', function () {
    if (roundsPlayed < 3) {
      rollSound.play();

      const playerRoll = [rollDice(), rollDice()];
      const computerRoll = [rollDice(), rollDice()];

      updateDiceImages(playerRoll, computerRoll);
      updateScores(playerRoll, computerRoll);
      roundsPlayed += 1;

      checkWinner();
    }
  });

  $('#reset-game').on('click', function () {
    playerTotalScore = 0;
    computerTotalScore = 0;
    roundsPlayed = 0;

    $('#player-round-score, #computer-round-score').text('0');
    $('#player-total-score, #computer-total-score').text('0');
    $('#player-dice1, #player-dice2, #computer-dice1, #computer-dice2').attr('src', 'images/dice-placeholder.png');
    $('#winner-message').fadeOut(500, function () {
      $(this).text('');
    });
    $('#roll-dice').prop('disabled', false);
  });
});