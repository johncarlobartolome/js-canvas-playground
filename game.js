const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

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
