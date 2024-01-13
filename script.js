const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [];
let Score;
let food;
let game;
let d;
let sessionCount = 0;
let snakeColor = "pink"; // Początkowy kolor węża
document.addEventListener("keydown", direction);
function startGame() {
sessionCount++;
document.getElementById("menuGlowne").style.display = "none";
document.getElementById("tablicaScoreow").style.display = "block";
document.getElementById("gameCanvas").style.display = "block";
resetGame();
game = setInterval(draw, 100);
}
function resetGame() {
snake = [{ x: 15 * box, y: 15 * box }];
Score = 0;
d = null;
snakeColor = "pink"; // Reset koloru węża przy każdym nowym rozpoczęciu gry
generateFood();
document.getElementById("tablicaScoreow").innerText = "Score: " + Score; // Inicjalizacja Scoreu
}
function generateFood() {
let foodX, foodY;
do {
foodX = Math.floor(Math.random() * (canvas.width / box)) * box;
foodY = Math.floor(Math.random() * (canvas.height / box)) * box;
} while (snake.some(segment => segment.x === foodX && segment.y === foodY));
food = { x: foodX, y: foodY };
}
function drawBoard() {
for (let x = 0; x < canvas.width / box; x++) {
for (let y = 0; y < canvas.height / box; y++) {
ctx.fillStyle = (x + y) % 2 === 0 ? "#a4c639" : "#8aa62f"; // Kolory dla szachownicy
ctx.fillRect(x * box, y * box, box, box);
}
}
}
function draw() {
drawBoard(); // Rysuj planszę jako szachownicę
for (let i = 0; i < snake.length; i++) {
ctx.fillStyle = (i === 0) ? snakeColor : "grey";
ctx.fillRect(snake[i].x, snake[i].y, box, box);
ctx.strokeStyle = "red";
ctx.strokeRect(snake[i].x, snake[i].y, box, box);
}
ctx.fillStyle = "red";
ctx.fillRect(food.x, food.y, box, box);
let snakeX = snake[0].x;
let snakeY = snake[0].y;
if (d === "LEFT") snakeX -= box;
if (d === "UP") snakeY -= box;
if (d === "RIGHT") snakeX += box;
if (d === "DOWN") snakeY += box;
if (snakeX === food.x && snakeY === food.y) {
Score++;
document.getElementById("tablicaScoreow").innerText = "Score: " + Score; // Aktualizacja Scoreu
snakeColor = snakeColor === "pink" ? "Purple" : "pink"; // Zmiana koloru węża
generateFood();
} else {
snake.pop();
}
let newHead = { x: snakeX, y: snakeY };
if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
gameOver();
return;
}
snake.unshift(newHead);
}
function collision(head, array) {
for (let i = 0; i < array.length; i++) {
if (head.x === array[i].x && head.y === array[i].y) {
return true;
}
}
return false;
}
function gameOver() {
clearInterval(game);
updateScorei(Score, sessionCount);
document.getElementById("gameCanvas").style.display = "none";
document.getElementById("tablicaScoreow").style.display = "none";
document.getElementById("przegrana").style.display = "block";
}
function updateScorei(newScore, sessionNum) {
let Scorei = JSON.parse(localStorage.getItem("Scorei")) || [];
Scorei.push({ Score: newScore, session: sessionNum });
Scorei.sort((a, b) => b.Score - a.Score);
Scorei = Scorei.slice(0, 5);
localStorage.setItem("Scorei", JSON.stringify(Scorei));
}
function displayScorei() {
const Scorei = JSON.parse(localStorage.getItem("Scorei")) || [];
const ScoreiList = document.getElementById("Scorei");
ScoreiList.innerHTML = "<h3>Najlepsze Scorei:</h3>" +
Scorei.map((item, index) =>
"<p>" + (index + 1) + ". Score: " + item.Score + " (Sesja: " + item.session + ")</p>").join("");
}
function resetScoreow() {
localStorage.removeItem("Scorei");
displayScorei();
}
function pokazWyzniki() {
document.getElementById("ScoreiPanel").style.display = "block";
document.getElementById("menuGlowne").style.display = "none";
displayScorei();
}
function powrotDoMenu() {
document.getElementById("ScoreiPanel").style.display = "none";
document.getElementById("menuGlowne").style.display = "block";
}
function resetGry() {
document.getElementById("przegrana").style.display = "none";
document.getElementById("tablicaScoreow").style.display = "block";
document.getElementById("gameCanvas").style.display = "block";
resetGame();
game = setInterval(draw, 100);
}
function powrotMenu() {
document.getElementById("przegrana").style.display = "none";
document.getElementById("tablicaScoreow").style.display = "none";
document.getElementById("menuGlowne").style.display = "block";
}
function direction(event) {
let key = event.keyCode;
if (key === 37 && d !== "RIGHT") {
d = "LEFT";
} else if (key === 38 && d !== "DOWN") {
d = "UP";
} else if (key === 39 && d !== "LEFT") {
d = "RIGHT";
} else if (key === 40 && d !== "UP") {
d = "DOWN";
}
}
