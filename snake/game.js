const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = spawnFood();
let score = 0;
let gameRunning = true;

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

function checkCollision(head, body) {
  return body.some((part) => part.x === head.x && part.y === head.y);
}

function draw() {
  if (!gameRunning) return;
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };

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
    clearInterval(game);
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

  ctx.fillStyle = "#0f0";
  snake.forEach((part) => {
    ctx.fillRect(part.x, part.y, box, box);
  });
}

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

const game = setInterval(draw, 200);
