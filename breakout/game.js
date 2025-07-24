// game.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 10;
const paddleWidth = 120;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 4; // horizontal speed
let ballDY = -4; // vertical speed
let gameOver = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FF4136";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddleX,
    canvas.height - paddleHeight - 10,
    paddleWidth,
    paddleHeight
  );
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function updatePaddle() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

// Game Loop
function draw() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  updatePaddle();

  ballX += ballDX;
  ballY += ballDY;

  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballDX = -ballDX;
  }

  if (ballY - ballRadius < 0) {
    ballDY = -ballDY;
  }

  if (
    ballY + ballRadius > canvas.height - paddleHeight - 10 &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    ballDY = -ballDY;
  }

  if (ballY + ballRadius > canvas.height) {
    gameOver = true;
    setTimeout(() => {
      alert("Game Over");
      document.location.reload();
    }, 100);
    return;
  }

  requestAnimationFrame(draw);
}

draw();
