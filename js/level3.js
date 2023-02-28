const IMAGE_WIDTH = 64;
const IMAGE_HEIGHT = 64;
const CATEGORIES = ["proteins", "fats", "carbohydrates", "fibers"];
const GAME_DURATION = 15; // in seconds
const MAX_LIVES = 3;

let images = [];
let currentCategory;
let score;
let lives;
let timeLeft;
let categoryEl;
let scoreEl;
let livesEl;
let timeEl;
let speed;
let win_score;
const resultModal = document.getElementById('result-modal');
const resultTextDiv = document.getElementById("result-text");
const btnTryAgain = document.getElementById('try-again');
const btnExit = document.getElementById('exit');

const carbohydrates = [
	{ name: 'beet', category: 'carbohydrates', img: '../images/carbohydrates/beet.png' },
	{ name: 'buckwheat', category: 'carbohydrates', img: '../images/carbohydrates/buckwheat.png' },
	{ name: 'quinoa', category: 'carbohydrates', img: '../images/carbohydrates/quinoa.png' },
	{ name: 'sweet-potato', category: 'carbohydrates', img: '../images/carbohydrates/sweet-potato.png' }
]
const fibers = [
	{ name: 'apple', category: 'fibers', img: '../images/cellular/apple.png' },
	{ name: 'cabbage', category: 'fibers', img: '../images/cellular/cabbage.png' },
	{ name: 'dill', category: 'fibers', img: '../images/cellular/dill.png' },
	{ name: 'kiwi', category: 'fibers', img: '../images/cellular/kiwi.png' }
]
const fats = [
	{ name: 'avocado', category: 'fats', img: '../images/fats/avocado.png' },
	{ name: 'natural-yogurt', category: 'fats', img: '../images/fats/natural-yogurt.png' },
	{ name: 'nuts', category: 'fats', img: '../images/fats/nuts.png' },
	{ name: 'olives', category: 'fats', img: '../images/fats/olives.png' }
]
const proteins = [
	{ name: 'beef', category: 'proteins', img: '../images/protein/beef.png' },
	{ name: 'eggs', category: 'proteins', img: '../images/protein/eggs.png' },
	{ name: 'salmon', category: 'proteins', img: '../images/protein/salmon.png' },
	{ name: 'tofu', category: 'proteins', img: '../images/protein/tofu.png' }
]

let total_img_count = carbohydrates.length + fibers.length + fats.length + proteins.length;

function getRandomPosition() {
	const x = Math.random() * (window.innerWidth - IMAGE_WIDTH);
	const y = Math.random() * (window.innerHeight - IMAGE_HEIGHT);
	return { x, y };
}

function createImage(product) {
	const img = new Image();
	img.classList.add("food");
	img.src = product.img;
	img.category = product.category;
	img.addEventListener("click", handleLeftClick);
	const { x, y } = getRandomPosition();
	img.style.left = `${x}px`;
	img.style.top = `${y}px`;
	img.velocityX = Math.random() * 2 - 1;
	img.velocityY = Math.random() * 2 - 1;
	document.body.appendChild(img);
	return img;
}

function updateImages(speed) {
	images.forEach(img => {
		const rect = img.getBoundingClientRect();
		const vx = img.velocityX * speed;
		const vy = img.velocityY * speed;
		const x = rect.left + vx;
		const y = rect.top + vy;
		if (x < 0 || x + IMAGE_WIDTH > window.innerWidth) {
			img.velocityX = -img.velocityX;
		}
		if (y < 0 || y + IMAGE_HEIGHT > window.innerHeight) {
			img.velocityY = -img.velocityY;
		}
		img.style.left = `${x}px`;
		img.style.top = `${y}px`;
	});
	requestAnimationFrame(() => updateImages(speed));
}

function handleLeftClick(event) {
	event.preventDefault();
	const clickedImg = event.target;
	if (clickedImg.category === currentCategory) {
		clickedImg.remove();
		score++;
		scoreEl.textContent = `Score: ${score}`;
		if (score == win_score) {
			gameOver(true);
		}
	} else {
		lives--;
		livesEl.textContent = `Lives: ${lives}`;
		if (lives === 0) {
			gameOver(false);
		}
	}
}

function updateTimer() {
	timeLeft--;
	timeEl.textContent = `Time: ${timeLeft} seconds`;
	if (timeLeft === 0) {
		gameOver(false);
	} else {
		setTimeout(updateTimer, 1000);
	}
}

function startGame() {
	currentCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
	if (currentCategory == 'proteins') {
		win_score = proteins.length;
	}
	else if (currentCategory == 'fibers') {
		win_score = fibers.length;
	}
	else if (currentCategory == 'fats') {
		win_score = fats.length;
	}
	else {
		win_score = carbohydrates.length;
	}

	categoryEl.textContent = `Find: ${currentCategory}`;
	score = 0;
	lives = MAX_LIVES;
	timeLeft = GAME_DURATION;
	scoreEl.textContent = `Score: ${score}`;
	livesEl.textContent = `Lives: ${lives}`;
	timeEl.textContent = `Time: ${timeLeft} seconds`;
	images.forEach(img => img.remove());
	images = [];
	for (let i = 0; i < carbohydrates.length; i++) {
		const img = createImage(carbohydrates[i]);
		images.push(img);
	}
	for (let i = 0; i < fats.length; i++) {
		const img = createImage(fats[i]);
		images.push(img);
	}
	for (let i = 0; i < proteins.length; i++) {
		const img = createImage(proteins[i]);
		images.push(img);
	}
	for (let i = 0; i < fibers.length; i++) {
		const img = createImage(fibers[i]);
		images.push(img);
	}
}

function gameOver(hasWon) {
	images.forEach(img => img.remove());
	images = [];
	resultModal.style.display = "block";
	const text = hasWon ? "Ты победил!" : "Попробуй ещё разок";
	resultTextDiv.innerText = text;
	startGame();
}

// Game setup
window.addEventListener("load", () => {
	speed = 30;
	categoryEl = document.getElementById("category");
	scoreEl = document.getElementById("score");
	livesEl = document.getElementById("lives");
	timeEl = document.getElementById("time");
	startBtn = document.getElementById("start-btn");
	rules = document.getElementById("rules");
	startBtn.addEventListener("click", () => {
		startGame();
		updateTimer();
		updateImages(speed);
		rules.style.display = "none";
		startBtn.style.display = "none"; // hide the Start Game button
	});
});

btnTryAgain.onclick = function () {
	window.location.href = `level3.html`
}

btnExit.onclick = function () {
	window.location.href = '../index.html'
}




