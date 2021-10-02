const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $gameTime = document.querySelector('#game-time');

let score = 0 ;
let isGameStarted = false ;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show ($el) {
  $el.classList.remove('hide')
}

function hide ($el) {
  $el.classList.add('hide')
}

function startGame () {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')
  isGameStarted = true;
  $game.style.backgroundColor = '#fff';
  hide($start)

  let interval = setInterval( function () {
    let time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }

  }, 100);

  renderBox();
}

function handleBoxClick (event) {
  if(!isGameStarted) {
    return
  }
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function setGameScore () {
  $result.textContent = score.toString()
}

function setGameTime () {
  let time = +$gameTime.value
  $time.innerHTML = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

function colorGame () {
  let symbol = '0123456789ABCDEF'
  let color = '#'

  for (i = 0; i<6; i++) {
    color += symbol[Math.floor(Math.random() * 16)]
  }
  return color
}

function endGame () {
  isGameStarted = false;
  setGameScore ()
  $gameTime.removeAttribute('disabled')
  show($start)
  $game.innerHTML = '';
  $game.style.backgroundColor = '#ccc';
  hide($timeHeader)
  show($resultHeader)
}

function renderBox () {
  $game.innerHTML = '';
  let box = document.createElement('div');
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = colorGame ();
  box.style.top =  getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  $game.insertAdjacentElement('afterbegin', box);
}

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}