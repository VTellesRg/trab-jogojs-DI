const cat = document.querySelector('.cat');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.gameOver');
const pontos = document.querySelector('.pontos');
const gameBase = document.querySelector('.gameBase');
const background = document.querySelector('.background');
const victims = ['bird',  'mice', 'rabbit', 'butterfly', 'dog'];
const pointAudio = document.querySelectorAll('audio')[0];
const dieAudio = document.querySelectorAll('audio')[1];

let catSetting = cat.getBoundingClientRect();
let catPosition = cat.getBoundingClientRect().bottom;
let pontuacao = 0;
let backgroundTimer = null;
let monitorTimer = null;
let downTimer = null;
let timer = null;
let i = 0;




start.addEventListener('click', startGame);

function toggleGameBase() {
    gameBase.classList.toggle("baseMov")
  }
function startGame() {
    gameBoard.addEventListener('click', jump)
    pontuacao = 0;
    cleanBoard()
    toggleGameBase()
    updatePoints()
    handleBackground()
    handleGame()
    start.style.display = 'none'
  
  }
function handleGame () {
    game = setInterval(() => {
      const catTop = parseInt(window.getComputedStyle(cat).getPropertyValue('top'))
      if (cat ==false) {

        dieAudio.play()
      }
    }, 10)
  }
  
function createVictim() {
    let bird = document.createElement('img');
    bird.src = "./assets"
    
  }

function jump() {
    clearInterval(downTimer)
    const salto = 11 // Define a altura do salto
  
    // Calcula a nova posição com base na posição atual e no salto
    let novaPosicao = posicaoAtual + salto
    if (novaPosicao >= board.height) {
      novaPosicao = board.height - catSetting.height / 2
    }
    // Atualiza a posição do personagem
    cat.style.bottom = novaPosicao + 'vw'
  
    // Atualiza a posição atual
    posicaoAtual = novaPosicao
    downMovement()
  }
function downMovement() {
    downTimer = setInterval(() => {
      // Calcula a nova posição com base na posição atual na queda de 10px a cada 0.1s
      let novaPosicao = parseFloat(posicaoAtual - 10);
  
      
      // Atualiza a posição atual
      posicaoAtual = novaPosicao;
      // Atualiza a posição do personagem
      cat.style.bottom = novaPosicao + "vw";
    }, 50)
  }
function checkCollision() {
  
    
  }
  
  setInterval(checkCollision, 10);