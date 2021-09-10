var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.drawImage(image, this.x, this.y)
  },
};

var jumpInterval = 0;
var animation;
function Cactus() {
  this.x = 500;
  this.y = 200;
  this.width = 50;
  this.height = 50;
}

var image = new Image();
image.src = "cactus.png";

Cactus.prototype.draw = function () {
  ctx.fillStyle = "red";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusList = [];
function updateFrame() {
  animation = requestAnimationFrame(updateFrame);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (timer % 160 === 0) {
    var cactus = new Cactus();
    cactusList.push(cactus);
  }
  cactusList.forEach((a, index, obj) => {
    if (a.x < 0) {
      obj.splice(index, 1);
    }
    a.x -= 3;

    checkCollision(dino, a);
    if (jump) {
      dino.y -= 3;
      jumpInterval++;
    }

    if (jump == false) {
      if (dino.y < 200) {
        dino.y += 3;
      }
    }
    if (jumpInterval > 50) {
      jump = false;
      jumpInterval = 0;
    }
    a.draw();
  });
  dino.draw();
}
updateFrame();

// 충돌 확인
function checkCollision(dino, cactus) {
  var xDiff = cactus.x - (dino.x + dino.width);
  var yDiff = cactus.y - (dino.y + dino.height);
  if (xDiff < 0 && yDiff < 0) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // cancelAnimationFrame(animation);
  }
}

var jump = false;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump = true;
  }
});
