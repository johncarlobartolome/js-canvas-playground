const sound_hit = new Audio("sounds/hit.mp3");
const sound_wall = new Audio("sounds/wall.mp3");
const sound_score = new Audio("sounds/score.mp3");
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const paddleWidth = 10,
  paddleHeight = 100;
let upPressed = false;
let downPressed = false;

const paddleOffset = 20;

const player = {
  x: paddleOffset,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0,
};

const computer = {
  x: canvas.width - paddleWidth - paddleOffset,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 7,
  velocityX: 5,
  velocityY: 5,
  color: "white",
};

const net = {
  x: canvas.width / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "white",
};

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px Arial";
  ctx.fillText(text, x, y);
}

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "black");

  drawNet();

  drawText(player.score, canvas.width / 4, 50, "white");
  drawText(computer.score, (3 * canvas.width) / 4, 50, "white");

  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height,
    computer.color
  );

  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function collision(b, p) {
  return (
    b.x - b.radius < p.x + p.width &&
    b.x + b.radius > p.x &&
    b.y < p.y + p.height &&
    b.y + b.radius > p.y
  );
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 7;
}

function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  const playerSpeed = 7;

  if (upPressed) {
    player.y -= playerSpeed;
    if (player.y < 0) player.y = 0;
  }

  if (downPressed) {
    player.y += playerSpeed;
    if (player.y + player.height > canvas.height) {
      player.y = canvas.height - player.height;
    }
  }

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
    sound_wall.play();
  }

  const paddle = ball.x < canvas.width / 2 ? player : computer;

  if (collision(ball, paddle)) {
    sound_hit.play();
    let collidePoint = ball.y - (paddle.y + paddle.height / 2);
    collidePoint = collidePoint / (paddle.height / 2);

    let angleRad = (Math.PI / 4) * collidePoint;
    let direction = ball.x < canvas.width / 2 ? 1 : -1;

    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);
    ball.speed += 0.3;
  }

  if (ball.x - ball.radius < 0) {
    sound_score.play();
    computer.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    sound_score.play();
    player.score++;
    resetBall();
  }

  computer.y += (ball.y - (computer.y + computer.height / 2)) * 0.1;
  if (computer.y < 0) computer.y = 0;
  if (computer.y + computer.height > canvas.height) {
    computer.y = canvas.height - computer.height;
  }
}

function game() {
  update();
  render();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") upPressed = true;
  if (e.key === "ArrowDown") downPressed = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") upPressed = false;
  if (e.key === "ArrowDown") downPressed = false;
});

const framePerSecond = 60;
setInterval(game, 1000 / framePerSecond);
