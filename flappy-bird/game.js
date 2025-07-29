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

// Handle flap
function flap() {
  bird.velocity = bird.jumpStrength;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    flap();
  }
});

canvas.addEventListener("click", flap);

// Game loop
function draw() {
  // Clear canvas
  ctx.fillStyle = "#70c5ce"; // sky blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Apply gravity
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Draw bird
  ctx.fillStyle = bird.color;
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  requestAnimationFrame(draw);
}

draw();
