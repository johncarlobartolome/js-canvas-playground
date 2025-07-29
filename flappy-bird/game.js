const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const pipeWidth = 50;
const pipeGap = 120;
const pipeSpeed = 2;
const pipes = [];
let frameCount = 0;

let score = 0;

// Bird properties
const bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  color: "yellow",
  velocity: 0,
  gravity: 0.5,
  jumpStrength: -8,
};

let gameOver = false;

// Handle flap
function flap() {
  if (!gameOver) {
    bird.velocity = bird.jumpStrength;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    flap();
  }
});

canvas.addEventListener("click", flap);

// Generate a new pipe
function createPipe() {
  const minHeight = 50;
  const maxHeight = canvas.height - pipeGap - minHeight;
  const topHeight = Math.floor(Math.random() * maxHeight) + minHeight;

  pipes.push({
    x: canvas.width,
    topHeight,
    bottomY: topHeight + pipeGap,
  });
}

// Game loop
function draw() {
  if (gameOver) return;
  // Clear canvas
  ctx.fillStyle = "#70c5ce"; // sky blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Apply gravity
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Check for collision with ground or ceiling
  if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
    bird.y = Math.min(bird.y, canvas.height - bird.height);
    gameOver = true;
    alert("Game Over!");
    return;
  }

  // Update and draw pipes
  frameCount++;
  if (frameCount % 90 === 0) {
    createPipe();
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    const pipe = pipes[i];
    pipe.x -= pipeSpeed;

    // Draw top pipe
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);

    // Draw bottom pipe
    ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY);

    // Collision detection
    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY)
    ) {
      gameOver = true;
      alert("Game Over!");
      return;
    }

    if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
      pipe.passed = true;
      score++;
    }

    // Remove off-screen pipes
    if (pipe.x + pipeWidth < 0) {
      pipes.splice(i, 1);
    }
  }

  // Draw bird
  ctx.fillStyle = bird.color;
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "32px Arial";
  ctx.fillText(`Score: ${score}`, 10, 50);

  requestAnimationFrame(draw);
}

draw();
