const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const paddleWidth = 10,
  paddleHeight = 100;

const player = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0,
};

const computer = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 7,
  velocityX: 5,
  velocityY: 5,
  color: "white",
};

const net = {
  x: canvas.width / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "white",
};

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px Arial";
  ctx.fillText(text, x, y);
}

function drawNet() {
  for (let i = 0; i <= canvas.heigt; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "black");

  drawNet();

  drawText(player.score, canvas.width / 4, 50, "white");
  drawText(computer.score, (3 * canvas.width) / 4, 50, "white");

  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height,
    computer.color
  );

  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
  render();
}

const framePerSecond = 60;
setInterval(game, 1000 / framePerSecond);
