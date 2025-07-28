const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Step 1: Define the player object
const keys = {};
const player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 60,
  width: 40,
  height: 20,
  color: "lime",
  speed: 5,
  bullets: [],
};
let canShoot = true;

// Step 2: Draw the player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = "white";

  player.bullets.forEach((bullet, index) => {
    bullet.y -= 7;

    // Draw bullet
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

    // Remove if out of bounds
    if (bullet.y < 0) {
      player.bullets.splice(index, 1);
    }
  });
}

// Step 3: Clear and draw the canvas each frame
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (keys["ArrowLeft"]) {
    player.x -= player.speed;
    if (player.x < 0) player.x = 0;
  }
  if (keys["ArrowRight"]) {
    player.x += player.speed;
    if (player.x + player.width > canvas.width) {
      player.x = canvas.width - player.width;
    }
  }

  drawPlayer();
  drawBullets();
  requestAnimationFrame(update);
}

// Step 4: Handle keyboard inpu

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if ((e.key === " " || e.key === "ArrowUp") && canShoot) {
    player.bullets.push({
      x: player.x + player.width / 2 - 2,
      y: player.y,
      width: 4,
      height: 10,
    });

    canShoot = false;
    setTimeout(() => (canShoot = true), 250); // adjust fire rate
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Start the game loop
update();
