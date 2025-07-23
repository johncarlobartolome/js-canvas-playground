const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let nextDirection = "RIGHT";
let food = spawnFood();
let score = 0;
let gameRunning = true;

let lastMoveTime = 0;
const moveDelay = 100;

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  if (e.key === "ArrowUp" && direction !== "DOWN") {
    nextDirection = "UP";
  } else if (e.key === "ArrowDown" && direction !== "UP") {
    nextDirection = "DOWN";
  } else if (e.key === "ArrowLeft" && direction !== "RIGHT") {
    nextDirection = "LEFT";
  } else if (e.key === "ArrowRight" && direction !== "LEFT") {
    nextDirection = "RIGHT";
  }
});

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

function checkCollision(head, body) {
  return body.some((part) => part.x === head.x && part.y === head.y);
}

function updateSnake() {
  direction = nextDirection;

  const head = { ...snake[0] };

  if (direction === "RIGHT") head.x += box;
  else if (direction === "LEFT") head.x -= box;
  else if (direction === "UP") head.y -= box;
  else if (direction === "DOWN") head.y += box;

  const hitWall =
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height;
  const hitSelf = checkCollision(head, snake);

  if (hitWall || hitSelf) {
    gameRunning = false;
    setTimeout(() => {
      alert("Game Over! Your Score: " + score);
    }, 100);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
    score++;
  } else {
    snake.pop();
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
  ctx.fillStyle = "#0f0";
  snake.forEach((part) => {
    ctx.fillRect(part.x, part.y, box, box);
  });
}

function gameLoop(timestamp) {
  if (!gameRunning) return;

  if (timestamp - lastMoveTime > moveDelay) {
    updateSnake();
    lastMoveTime = timestamp;
  }

  drawGame();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
