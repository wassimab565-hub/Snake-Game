const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const quitBtn = document.getElementById('quitBtn');

const box = 20;
const canvasSize = 400;
let snake, direction, fruit, score, gameInterval;
let gameRunning = false;

function initGame() {
    snake = [{x: 10 * box, y: 10 * box}];
    direction = 'RIGHT';
    fruit = {x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box};
    score = 0;
    scoreElement.textContent = score;
}

function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#111";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw fruit
    ctx.fillStyle = "red";
    ctx.fillRect(fruit.x, fruit.y, box, box);
}

function update() {
    let head = {...snake[0]};

    switch(direction) {
        case 'LEFT': head.x -= box; break;
        case 'UP': head.y -= box; break;
        case 'RIGHT': head.x += box; break;
        case 'DOWN': head.y += box; break;
    }

    // Check collision with border
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        endGame();
        return;
    }

    // Check collision with tail
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        scoreElement.textContent = score;
        fruit = {x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box};
    } else {
        snake.pop();
    }

    draw();
}

function endGame() {
    clearInterval(gameInterval);
    gameRunning = false;
    alert(`Game Over! Final Score: ${score}`);
}

document.addEventListener('keydown', e => {
    if(!gameRunning) return;
    switch(e.key) {
        case 'ArrowLeft': if(direction !== 'RIGHT') direction = 'LEFT'; break;
        case 'ArrowUp': if(direction !== 'DOWN') direction = 'UP'; break;
        case 'ArrowRight': if(direction !== 'LEFT') direction = 'RIGHT'; break;
        case 'ArrowDown': if(direction !== 'UP') direction = 'DOWN'; break;
    }
});

startBtn.addEventListener('click', () => {
    if (!gameRunning) {
        initGame();
        gameRunning = true;
        gameInterval = setInterval(update, 150);
    }
});

quitBtn.addEventListener('click', () => {
    clearInterval(gameInterval);
    gameRunning = false;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    scoreElement.textContent = 0;
    snake = [];
});
