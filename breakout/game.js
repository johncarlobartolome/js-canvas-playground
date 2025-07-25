const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ===== Game Settings =====
const paddleHeight = 15;
const paddleWidth = 120;
let paddleX = (canvas.width - paddleWidth) / 2;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 60; // higher above the paddle

// Random angle between -60° and +60° (in radians)
const angle = (Math.random() * 120 - 60) * (Math.PI / 180);

// Constant speed
const speed = 5;

let ballDX = speed * Math.sin(angle);
let ballDY = -Math.abs(speed * Math.cos(angle)); // upward direction

let rightPressed = false;
let leftPressed = false;
let score = 0;
let gameOver = false;

// ===== Brick Settings =====
const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 60;
const totalBrickWidth =
  brickColumnCount * (brickWidth + brickPadding) - brickPadding;
const brickOffsetLeft = (canvas.width - totalBrickWidth) / 2;

// ===== Bricks =====
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    bricks[c][r] = { x: brickX, y: brickY, status: 1 };
  }
}

// ===== Event Listeners =====
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

// ===== Drawing Functions =====
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

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FF4136";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        ctx.beginPath();
        ctx.rect(b.x, b.y, brickWidth, brickHeight);
        ctx.fillStyle = "#00CED1";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "18px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 10, 30);
}

// ===== Game Logic =====
function updatePaddle() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          ballX + ballRadius > b.x &&
          ballX - ballRadius < b.x + brickWidth &&
          ballY + ballRadius > b.y &&
          ballY - ballRadius < b.y + brickHeight
        ) {
          // Determine where the ball came from
          const ballPrevX = ballX - ballDX;
          const ballPrevY = ballY - ballDY;

          const hitFromLeft = ballPrevX + ballRadius <= b.x;
          const hitFromRight = ballPrevX - ballRadius >= b.x + brickWidth;
          const hitFromTop = ballPrevY + ballRadius <= b.y;
          const hitFromBottom = ballPrevY - ballRadius >= b.y + brickHeight;

          if (hitFromLeft || hitFromRight) {
            ballDX = -ballDX;
          } else if (hitFromTop || hitFromBottom) {
            ballDY = -ballDY;
          } else {
            ballDY = -ballDY; // fallback
          }

          b.status = 0;
          score++;

          if (score === brickRowCount * brickColumnCount) {
            setTimeout(() => {
              alert("You Win!");
              document.location.reload();
            }, 100);
          }
        }
      }
    }
  }
}

// ===== Main Game Loop =====
function draw() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  updatePaddle();
  collisionDetection();

  // Ball movement
  ballX += ballDX;
  ballY += ballDY;

  // Wall collisions
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballDX = -ballDX;
  }

  if (ballY - ballRadius < 0) {
    ballDY = -ballDY;
  }

  // Paddle collision
  if (
    ballY + ballRadius > canvas.height - paddleHeight - 10 &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    ballDY = -ballDY;
  }

  // Bottom collision (Game Over)
  if (ballY + ballRadius > canvas.height) {
    gameOver = true;
    setTimeout(() => {
      alert("Game Over");
      document.location.reload();
    }, 100);
  }

  requestAnimationFrame(draw);
}

draw();
