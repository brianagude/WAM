const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const mole = document.querySelectorAll('.mole');
const moles = document.querySelectorAll('.mole img');
const gameTime = document.querySelector('.timer');
const difficultyBtn = document.querySelectorAll('.difficulty-wrapper button')

let 
  lastHole,
  timeUp = false,
  timeLeft,
  timer,
  minimum = 500,
  maximum = 1200;

function setDifficulty(min, max){
  minimum = min
  maximum = max
}

function startTimer() {
  clearInterval(timer)
  timeLeft = 10
  gameTime.innerHTML = timeLeft
  
  timer = setInterval(function(){ 
    timeLeft--

    if (timeLeft <= 0) {
      clearInterval(timer);
    }

    gameTime.innerHTML = timeLeft
  }, 1000);
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function pop() {
  const time = randomTime(minimum, maximum);
  const hole = randomHole(holes);
  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) pop();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  window.scrollTo(0,document.body.scrollHeight);
  timeUp = false;
  score = 0;
  startTimer()
  pop();
  setTimeout(() => timeUp = true, 10000)
}

function whack(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  $(this).parent().addClass('whacked')

  var that = this;
  setTimeout(function() {
    $(that).parent().removeClass('whacked')
  }, 1000);

  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));

$('img').on('dragstart', function(event) { event.preventDefault(); });

$(difficultyBtn).click(function(){
  $(this).addClass('selected').siblings().removeClass('selected')
})

