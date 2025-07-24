const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
ctx.scale(30, 30);

const player = {
  pos: { x: 3, y: 0 },
  matrix: createPiece_T(),
};

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function createPiece_T() {
  return [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        ctx.fillStyle = "purple";
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

const arena = createMatrix(10, 20);

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    player.pos.y = 0;
  }
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(player.matrix, player.pos);
}

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
    dropCounter = 0;
  }

  draw();
  requestAnimationFrame(update);
}

update();
