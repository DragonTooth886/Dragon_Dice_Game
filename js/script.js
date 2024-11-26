$(document).ready(function () {
  // 初始化变量
  let playerTotalScore = 0;
  let computerTotalScore = 0;
  let roundsPlayed = 0;

  // 音效文件路径
  const rollSound = new Audio('sounds/dice-roll.mp3');
  const winSound = new Audio('sounds/win.mp3');
  const loseSound = new Audio('sounds/lose.mp3');

  // 更新骰子图片的函数
  function updateDiceImages(playerRoll, computerRoll) {
    $('#player-dice1').attr('src', `images/dice${playerRoll[0]}.png`);
    $('#player-dice2').attr('src', `images/dice${playerRoll[1]}.png`);
    $('#computer-dice1').attr('src', `images/dice${computerRoll[0]}.png`);
    $('#computer-dice2').attr('src', `images/dice${computerRoll[1]}.png`);
  }

  // 更新分数显示的函数
  function updateScores(playerRoll, computerRoll) {
    let playerScore = calculateScore(playerRoll);
    let computerScore = calculateScore(computerRoll);

    playerTotalScore += playerScore;
    computerTotalScore += computerScore;

    $('#player-round-score').text(playerScore);
    $('#player-total-score').text(playerTotalScore);

    $('#computer-round-score').text(computerScore);
    $('#computer-total-score').text(computerTotalScore);
  }

  // 计算分数的函数
  function calculateScore(roll) {
    if (roll.includes(1)) return 0;
    if (roll[0] === roll[1]) return (roll[0] + roll[1]) * 2;
    return roll[0] + roll[1];
  }

  // 检查谁是赢家
  function checkWinner() {
    if (roundsPlayed >= 3) {
      $('#roll-dice').prop('disabled', true);

      let message = '';
      if (playerTotalScore > computerTotalScore) {
        message = 'Player Wins!';
        winSound.play(); // 播放胜利音效
      } else if (playerTotalScore < computerTotalScore) {
        message = 'Computer Wins!';
        loseSound.play(); // 播放失败音效
      } else {
        message = "It's a Tie!";
      }
      $('#winner-message').text(message);
    }
  }

  // 骰子滚动的函数
  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // 绑定“Roll Dice”按钮事件
  $('#roll-dice').on('click', function () {
    if (roundsPlayed < 3) {
      rollSound.play(); // 播放骰子滚动音效

      const playerRoll = [rollDice(), rollDice()];
      const computerRoll = [rollDice(), rollDice()];

      updateDiceImages(playerRoll, computerRoll); // 更新骰子图片
      updateScores(playerRoll, computerRoll);
      roundsPlayed += 1;

      checkWinner();
    }
  });

  // 绑定“Reset Game”按钮事件
  $('#reset-game').on('click', function () {
    playerTotalScore = 0;
    computerTotalScore = 0;
    roundsPlayed = 0;

    $('#player-round-score, #computer-round-score').text('0');
    $('#player-total-score, #computer-total-score').text('0');
    $('#player-dice1, #player-dice2, #computer-dice1, #computer-dice2').attr('src', 'images/dice-placeholder.png');
    $('#winner-message').text('');
    $('#roll-dice').prop('disabled', false);
  });
});