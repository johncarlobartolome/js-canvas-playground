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
const invaders = [];
const rows = 4;
const cols = 8;
const spacing = 50;
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

function createInvaders() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      invaders.push({
        x: 60 + col * spacing,
        y: 40 + row * spacing,
        width: 30,
        height: 20,
        color: "red",
        alive: true,
      });
    }
  }
}

function drawInvaders() {
  invaders.forEach((inv) => {
    if (!inv.alive) return;
    ctx.fillStyle = inv.color;
    ctx.fillRect(inv.x, inv.y, inv.width, inv.height);
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
  drawInvaders();
  moveInvaders();
  detectCollisions();
  requestAnimationFrame(update);
}

let invaderDirection = 1;

function moveInvaders() {
  let shouldReverse = false;

  invaders.forEach((inv) => {
    if (!inv.alive) return;
    inv.x += invaderDirection * 2;
    if (inv.x + inv.width >= canvas.width || inv.x <= 0) {
      shouldReverse = true;
    }
  });

  if (shouldReverse) {
    invaderDirection *= -1;
    invaders.forEach((inv) => (inv.y += 20));
  }
}

function detectCollisions() {
  player.bullets.forEach((bullet, bi) => {
    invaders.forEach((inv) => {
      if (!inv.alive) return;

      if (
        bullet.x < inv.x + inv.width &&
        bullet.x + bullet.width > inv.x &&
        bullet.y < inv.y + inv.height &&
        bullet.y + bullet.height > inv.y
      ) {
        inv.alive = false;
        player.bullets.splice(bi, 1);
      }
    });
  });
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
createInvaders();
