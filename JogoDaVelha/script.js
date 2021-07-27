// Initial Data
let board = {
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: ''
};
let player = '';
let warning = '';
let isPlaying = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', itemClick);
});

// Functions
function itemClick(event) {
  let item = event.target.getAttribute('data-item');
  if (isPlaying && board[item] === '') {
    board[item] = player;
    renderBoard();
    togglePlayer();
  }
};

function reset() {
  warning = '';
  let random = Math.floor(Math.random() * 2);
  player = (random === 0) ? 'o' : 'x';

  for (let i in board) {
    board[i] = '';
  }

  isPlaying = true;

  renderBoard();
  renderInfo();
};

function renderBoard() {
  for (let i in board) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = board[i];
  }

  checkGame();
};

function renderInfo() {
  document.querySelector('.turn').innerHTML = player;
  document.querySelector('.result').innerHTML = warning;
};

function togglePlayer() {
  player = (player === 'x') ? 'o' : 'x';
  renderInfo();
};

function checkGame() {
  if(checkWinnerFor('x')) {
    warning = 'The "X" won';
    isPlaying = false;
  } else if (checkWinnerFor('o')) {
    warning = 'The "O" won';
    isPlaying = false;
  } else if(isFull()) {
    warning = 'It was a tie'
    isPlaying = false;
  }
};

function checkWinnerFor(player) {
  let possibilities = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',
    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',
    'a1,b2,c3',
    'a3,b2,c1'
  ]

  for (let i in possibilities) {
    let possibleArray = possibilities[i].split(',');
    let hasWon = possibleArray.every(option => board[option] === player);
    if (hasWon) {
      return true;
    }
  }

  return false;
}

function isFull() {
  for (let i in board) {
    if(board[i] === '') {
      return false;
    }
  }
  return true;
}