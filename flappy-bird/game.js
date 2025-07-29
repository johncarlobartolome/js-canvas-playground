const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

  // Draw bird
  ctx.fillStyle = bird.color;
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  requestAnimationFrame(draw);
}

draw();
