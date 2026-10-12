/*-------------------------------- Constants --------------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

const winningCombos = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonals
  [0, 4, 8],
  [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

console.log(squareEls);
console.log(messageEl);
console.log(resetBtnEl);

/*-------------------------------- Functions --------------------------------*/

function init() {
  console.log('init function called');

  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;

  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((cell, idx) => {
    squareEls[idx].textContent = cell;
  });
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn}'s turn`;
  } else if (!winner && tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `Congratulations ${turn}! winner winner chicken dinner!`;
  }
}

function placePiece(index) {
  board[index] = turn;
  console.log(board);
}

function checkForWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;

    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      winner = true;
      console.log(winner);
      break;
    }
  }
}

function checkForTie() {
  if (winner) return;

  if (!board.includes('')) {
    tie = true;
    console.log(tie);
  }
}

function switchPlayerTurn() {
  if (winner) return;

  if (turn === 'X') {
    turn = 'O';
  } else {
    turn = 'X';
  }

  console.log(turn);
}

function handleClick(event) {
  const squareIndex = event.target.id;

  if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
    return;
  }

  if (winner) {
    return;
  }

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);

/*-------------------------------- Start Game -------------------------------*/

init();