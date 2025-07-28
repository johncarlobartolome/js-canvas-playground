const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Step 1: Define the player object
const player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 60,
  width: 40,
  height: 20,
  color: "lime",
  speed: 5,
};

// Step 2: Draw the player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Step 3: Clear and draw the canvas each frame
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  requestAnimationFrame(update);
}

// Start the game loop
update();
