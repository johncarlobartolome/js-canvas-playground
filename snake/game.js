const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = spawnFood();

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

  let head = { ...snake[0] };

  if (direction === "RIGHT") head.x += box;
  else if (direction === "LEFT") head.x -= box;
  else if (direction === "UP") head.y -= box;
  else if (direction === "DOWN") head.y += box;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }

  ctx.fillStyle = "#0f0";
  ctx.fillRect(snake[0].x, snake[0].y, box, box);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

setInterval(draw, 500);
