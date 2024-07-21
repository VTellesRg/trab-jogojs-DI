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
console.log(start);
console.log(gameOver);
console.log(pontos);
console.log(gameBase);
console.log(background);
console.log(victims);
console.log(pointAudio);
console.log(dieAudio);
console.log(catSetting);
console.log(catPosition);
console.log(pontuacao);
console.log(backgroundTimer);
console.log(monitorTimer);
console.log(downTimer);
console.log(timer);

function updatePoints() {
    pontos.innerHTML = pontuacao
  }

function toggleGameBase() {
    gameBase.classList.toggle("baseMove")
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
        clearInterval(monitorTimer)
        cleanBoard()
        createVictim()
        gameBoard.appendChild(victimElement)
      const catTop = parseInt(window.getComputedStyle(cat).getPropertyValue('top'))
    //   if (cat ==false) {

    //     dieAudio.play()
    //   }
    }, 50)
  }
  
function createVictim() {
    victims.forEach(victim => {
        let victimElement = document.createElement('div')
        victimElement.classList.add(victim);
        const imgSrc = `assets/img/${victim}.png`;
        victimElement.style.backgroundImage = `url(${imgSrc})`;
        gameBase.appendChild(victimElement);
    });
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
    const catPosition = cat.getBoundingClientRect();
    const victims = document.querySelectorAll('.victim');
    victims.forEach(victim => {
      const victimPosition = victim.getBoundingClientRect();
    if(victim[i] !== victim[4]) { 
      if (
        catPosition.left < victimPosition.left + victimPosition.width &&
        catPosition.left + catPosition.width > victimPosition.left &&
        catPosition.top < victimPosition.top + victimPosition.height &&
        catPosition.top + catPosition.height > victimPosition.top
      ) {
        pointAudio.play()
        victim.remove()
        pontuacao++
        updatePoints()
      }
    } else {
        if (
            catPosition.left < victimPosition.left + victimPosition.width &&
            catPosition.left + catPosition.width > victimPosition.left &&
            catPosition.top < victimPosition.top + victimPosition.height &&
            catPosition.top + catPosition.height > victimPosition.top
        ) {
            dieAudio.play()
            clearInterval(game)
            clearInterval(backgroundTimer)
            clearInterval(monitorTimer)
            clearInterval(downTimer)
            clearInterval(timer)
            gameOver.style.display = 'block'
            start.style.display = 'block'
            toggleGameBase()
            gameBoard.removeEventListener('click', jump)
        }
    }
    })
  }
  

  function cleanBoard() {
    if (gameBoard.querySelectorAll('.victim') !== null) {
      gameBoard.querySelector('.victim').remove()
    }
  }
  setInterval(checkCollision, 10);