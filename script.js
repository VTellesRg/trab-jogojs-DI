const start = document.querySelector('.start');
const gameOver = document.querySelector('.gameOver');
const pontos = document.querySelector('.pontos');
const Cat = document.querySelector('.cat');
const background = document.querySelector('.background');
const victims = ['bird', 'mice', 'rabbit', 'butterfly', 'dog'];
const pointAudio = document.querySelectorAll('audio')[0];
const dieAudio = document.querySelectorAll('audio')[1];
const gameBoard = document.querySelector('.gameBoard');

let catSetting = Cat.getBoundingClientRect();
let pontuacao = 0;
let backgroundTimer = null;
let monitorTimer = null;
let downTimer = null;
let game = null;
let posicaoAtual = 0;
const victimSpeed = 2; // Velocidade de movimento das vítimas (em pixels por intervalo)
const victimInterval = 20; // Intervalo de tempo para atualização do movimento (em milissegundos)

// Adicionando evento de clique para iniciar o jogo
start.addEventListener('click', startGame);

function updatePoints() {
	pontos.innerHTML = pontuacao;
}

function toggleCat() {
	Cat.classList.toggle("baseMove");
}

function startGame() {
	console.log('Iniciando o jogo');
	gameBoard.addEventListener('click', jump);
	pontuacao = 0;
	cleanBoard();
	toggleCat();
	handleGame();
	updatePoints();
	start.style.display = 'none';
	gameOver.style.display = 'none';
}

function handleGame() {
	setInterval(() => {
		cleanBoard();
		createVictim();
		checkCollision();
	}, 5000);
}

function createVictim() {
	const victimType = victims[Math.floor(Math.random() * victims.length)];
	let victimElement = document.createElement('img');
	victimElement.src = `./assets/img/${victimType}.png`;
	victimElement.classList.add(victimType);
	victimElement.bottom = '72px';
	gameBoard.appendChild(victimElement);

	setInterval(moveVictims, victimInterval);
}
function moveVictims(victim) {
	// Pega a posição atual do elemento
	let currentRight = parseFloat(window.getComputedStyle(victim).getPropertyValue('right'));

	// Atualiza a posição horizontal movendo para a esquerda
	victim.style.right = (currentRight + victimSpeed) + 'px';

	// Verifica se a vítima saiu do quadro e remove-a se necessário
	if (currentRight >= gameBoard.clientWidth) {
		victim.remove(); // Remove o elemento da DOM
	}
}
function jump() {
	clearInterval(downTimer);
	const salto = 150; // Define a altura do salto

	// Calcula a nova posição com base na posição atual e no salto
	let novaPosicao = posicaoAtual + salto;
	const maxHeight = gameBoard.clientHeight - Cat.clientHeight;

	if (novaPosicao > maxHeight) {
		novaPosicao = maxHeight;
	}

	// Atualiza a posição do personagem
	Cat.style.bottom = novaPosicao + 'px';

	// Atualiza a posição atual
	posicaoAtual = novaPosicao;

	// Chama o movimento de descida após um tempo
	setTimeout(() => {
		downMovement();
	}, 400);
}

function downMovement() {
	downTimer = setInterval(() => {
		let novaPosicao = posicaoAtual - 10;

		// Se atingir o fundo do tabuleiro, para o movimento
		if (novaPosicao <= 72) {
			novaPosicao = 72;
			clearInterval(downTimer);
		}

		// Atualiza a posição atual
		posicaoAtual = novaPosicao;
		// Atualiza a posição do personagem
		Cat.style.bottom = novaPosicao + "px";
	}, 400);
}

function checkCollision() {
	const catPosition = Cat.getBoundingClientRect();
	const victimElements = document.querySelectorAll('.victim');

	victimElements.forEach(victim => {
		const victimPosition = victim.getBoundingClientRect();
		const isDog = victim.classList.contains('dog');

		if (
			catPosition.left < victimPosition.left + victimPosition.width &&
			catPosition.left + catPosition.width > victimPosition.left &&
			catPosition.top < victimPosition.top + victimPosition.height &&
			catPosition.top + catPosition.height > victimPosition.top
		) {
			if (isDog) {
				dieAudio.play();
				endGame();
			} else {
				pointAudio.play();
				victim.remove();
				pontuacao++;
				updatePoints();
			}
		}
	});
}

function endGame() {
	clearInterval(game);
	clearInterval(backgroundTimer);
	clearInterval(monitorTimer);
	clearInterval(downTimer);
	gameOver.style.display = 'block';
	start.style.display = 'block';
	toggleCat();
	gameBoard.removeEventListener('click', jump);
}

function cleanBoard() {
	victims.forEach(victim => {
		gameBoard.querySelectorAll(`.${victim}`).forEach(victim => victim.remove());
	});
}
