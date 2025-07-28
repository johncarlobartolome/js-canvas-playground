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
  bullets: [],
};

// Step 2: Draw the player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = "white";
  player.bullets.forEach((bullet, index) => {
    bullet.y -= 7;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    if (bullet.y < 0) {
      player.bullets.splice(index, 1);
    }
  });
}

// Step 3: Clear and draw the canvas each frame
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  requestAnimationFrame(update);
}

// Step 4: Handle keyboard input
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
  if (e.key === " " || e.key === "ArrowUp") {
    // Shoot bullet
    player.bullets.push({
      x: player.x + player.width / 2 - 2,
      y: player.y,
      width: 4,
      height: 10,
    });
  }
});

// Start the game loop
update();
