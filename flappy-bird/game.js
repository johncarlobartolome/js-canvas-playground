const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Bird properties
const bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  color: "yellow",
};

// Game loop
function draw() {
  // Clear canvas
  ctx.fillStyle = "#70c5ce"; // sky blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw bird
  ctx.fillStyle = bird.color;
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  requestAnimationFrame(draw);
}

draw();
