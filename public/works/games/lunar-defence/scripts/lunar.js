/* eslint-disable */
// @ts-nocheck

var player;

var timedBox;
var survivalBox;
var endlessBox;
var timedBoxText;
var survivalBoxText;
var endlessBoxText;
var controlsBox;
var controlsBoxText;

var endBox;
var endBoxBorder;
var endSidesBorder;
var endBoxText;
var endRetryBox;
var endNewBox;

var scoreBox;
var scoreBoxBorder;
var scoreTitleText;
var scoreText;

var timeBox;
var timeBoxBorder;
var timeTitleText;
var timeText;

var projectiles = [];
var ducks = [];

var frameNumber = 0;
var shootTimer = 0;
var firstShot = [];
var endToggle = 0;
firstShot[0] = 99999;
firstShot[1] = 0;
var score = 0;
var gameMode;
var gameState = "else";

//  menu stuffs

function openHam() {
  document.getElementById("hamMenu").style.width = "25%";
  document.getElementById("main").style.marginRight = "25%";
  document.getElementById("header").style.width = "75%";
  document.getElementById("showcase").style.width = "75%";
  document.getElementById("hamImage").style.opacity = "0";
}

function closeHam() {
  document.getElementById("hamMenu").style.width = "0%";
  document.getElementById("main").style.marginRight = "0%";
  document.getElementById("header").style.width = "100%";
  document.getElementById("showcase").style.width = "100%";
  document.getElementById("hamImage").style.opacity = "1";
}

//  game stuffs

function frigginStart() {
  player = new component(
    50,
    40,
    "/works/games/lunar-defence/images/player.png",
    375,
    360,
    "image",
  );
  background = new component(
    800,
    400,
    "/works/games/lunar-defence/images/bg.png",
    0,
    0,
    "image",
  );
  gameState = "start";
  gameBox.start();
  startMenu();
}

function startMenu() {
  timedBox = new component(
    150,
    100,
    "/works/games/lunar-defence/images/timed.png",
    100,
    200,
    "image",
  );
  survivalBox = new component(
    150,
    100,
    "/works/games/lunar-defence/images/survival.png",
    325,
    200,
    "image",
  );
  endlessBox = new component(
    150,
    100,
    "/works/games/lunar-defence/images/endless.png",
    550,
    200,
    "image",
  );
  controlsBox = new component(
    600,
    70,
    "/works/games/lunar-defence/images/controls.png",
    100,
    100,
    "image",
  );
}

function startGame() {
  frameNumber = 0;
  scoreBoxBorder = new component(100, 40, "black", 700, 0);
  scoreBox = new component(95, 35, "rgb(60,180,45)", 705, 0);
  scoreTitleText = new component("12px", "Tahoma", "black", 710, 15, "text");
  scoreText = new component("12px", "Tahoma", "black", 710, 30, "text");
  timeBoxBorder = new component(100, 40, "black", 0, 0);
  timeBox = new component(95, 35, "rgb(180,60,45)", 0, 0);
  timeTitleText = new component("12px", "Tahoma", "black", 5, 15, "text");
  timeText = new component("12px", "Tahoma", "black", 5, 30, "text");
  endToggle = 1;
}

function endMenu() {
  endBoxBorder = new component(420, 220, "black", 190, 90);
  endBox = new component(400, 200, "blue", 200, 100);
  endRetryBox = new component(
    100,
    100,
    "/works/games/lunar-defence/images/retry.png",
    90,
    150,
    "image",
  );
  endNewBox = new component(
    100,
    100,
    "/works/games/lunar-defence/images/new.png",
    610,
    150,
    "image",
  );
  endBoxText = new component("30px", "Tahoma", "white", 250, 150, "text");
  endBoxText.text = "GAME OVER";
  projectiles = [];
  scoreTitleText.x = 250;
  scoreTitleText.y = 250;
  scoreTitleText.width = "20px";
  scoreTitleText.colour = "white";
  scoreText.x = 310;
  scoreText.y = 250;
  scoreText.width = "20px";
  scoreText.colour = "white";
  timeTitleText.x = 250;
  timeTitleText.y = 220;
  timeTitleText.width = "20px";
  timeTitleText.colour = "white";
  if (gameMode == "survival" && score == 0) {
    timeText.text = "0";
  }
  if (endToggle == 1) {
    timeTitleText.text =
      timeTitleText.text + " " + Math.round(frameNumber / 62);
    endToggle = 0;
  }
}

var gameBox = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");

    document
      .getElementById("canvasBox")
      .insertBefore(this.canvas, document.getElementById("canvasFoundation"));

    this.interval = setInterval(updateGameArea, 16);
    window.addEventListener("keydown", function (e) {
      gameBox.keys = gameBox.keys || [];
      gameBox.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function (e) {
      gameBox.keys[e.keyCode] = false;
    });
  },
  stop: function () {
    clearInterval(this.interval);
    gameBox.erase();
  },
  erase: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, inputColour, x, y, type) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.colour = inputColour;
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = inputColour;
  }
  ctx = gameBox.context;
  this.redraw = function () {
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = this.colour;
      ctx.fillText(this.text, this.x, this.y);
    } else if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.colour;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.collideWith = function (otherEntity) {
    var thisLeft = this.x;
    var thisRight = this.x + this.width;
    var thisTop = this.y;
    var thisBottom = this.y + this.height;
    var thatLeft = otherEntity.x;
    var thatRight = otherEntity.x + otherEntity.width;
    var thatTop = otherEntity.y;
    var thatBottom = otherEntity.y + otherEntity.height;
    var isThereCollision = true;
    if (
      thisLeft > thatRight ||
      thisRight < thatLeft ||
      thisTop > thatBottom ||
      thisBottom < thatTop
    ) {
      isThereCollision = false;
    }
    return isThereCollision;
  };
}

function updateGameArea() {
  gameBox.erase();
  player.speedX = 0;
  frameNumber++;
  shootTimer++;
  background.newPos();
  background.redraw();

  if (gameBox.keys && gameBox.keys[65]) {
    if (player.x >= 0) {
      moveLeft(player, 8);
    }
  }
  if (gameBox.keys && gameBox.keys[68]) {
    if (player.x <= 750) {
      moveRight(player, 8);
    }
  }
  if (gameBox.keys && gameBox.keys[83]) {
    shoot(player, player.x + 14, player.y);
    if (firstShot[0] == frameNumber) {
      player.image.src = "/works/games/lunar-defence/images/playerl.png";
    }
  }
  if (gameBox.keys && gameBox.keys[88]) {
    endMenu();
    gameState = "end";
  }

  if (frameNumber - firstShot[0] == 5 && firstShot[1] == 1) {
    firstShot[1] = 2;
    shoot(player, player.x + 32, player.y);
    player.image.src = "/works/games/lunar-defence/images/playerr.png";
    firstShot[0] = frameNumber;
    firstShot[1] = 3;
  }

  if (frameNumber - firstShot[0] == 2 && firstShot[1] == 3) {
    firstShot[1] = 0;
    player.image.src = "/works/games/lunar-defence/images/player.png";
  }

  for (var i = 0; i < projectiles.length; i++) {
    moveUp(projectiles[i], 7);
    projectiles[i].newPos();
    projectiles[i].speedY = 0;
    projectiles[i].redraw();

    if (projectiles[i].y < -100) {
      projectiles.splice(0, 1);
    }
  }

  player.newPos();
  player.redraw();

  if (gameState == "start") {
    //         START
    //
    //         STARTS
    //
    //         HERE

    for (i = 0; i < projectiles.length; i++) {
      if (projectiles[i].collideWith(timedBox)) {
        gameMode = "timed";
        gameState = "game";
        startGame();
      } else if (projectiles[i].collideWith(survivalBox)) {
        gameMode = "survival";
        score = 20;
        gameState = "game";
        startGame();
      } else if (projectiles[i].collideWith(endlessBox)) {
        gameMode = "endless";
        gameState = "game";
        startGame();
      }
    }
    timedBox.redraw();
    survivalBox.redraw();
    endlessBox.redraw();
    controlsBox.redraw();
  } else if (gameState == "game") {
    //       GAME
    //
    //       STARTS
    //
    //       HERE

    // Duck Creation
    if (frameNumber % 16 == 0) {
      if (Math.ceil(Math.random() * 10) < 4) {
        createDuck();
      }
    }

    // Ducks

    for (var i = 0; i < ducks.length; i += 3) {
      // Duck Movement
      if (ducks[i + 1] == true) {
        moveRight(ducks[i], 4);
      } else {
        moveLeft(ducks[i], 4);
      }

      // Duck-Projectile Collision
      for (var p = 0; p < projectiles.length; p++) {
        if (projectiles[p].collideWith(ducks[i]) == true) {
          if (ducks[i + 2] == 0) {
            ducks[i].image.src =
              "/works/games/lunar-defence/images/target2.png";
            ducks[i + 2] = 1;
            if (gameMode != "survival") {
              score += 100;
            }
          }
        }
      }

      ducks[i].newPos();
      ducks[i].speedX = 0;
      ducks[i].redraw();

      if (ducks[i].x < -50 || ducks[i].x > 800) {
        if (gameMode == "survival") {
          if (ducks[i + 2] == 0) {
            score--;
          }
        }
        ducks.splice(0, 3);
      }
    }

    if (gameMode == "survival") {
      if (score <= 0) {
        gameState = "end";
        endMenu();
      }
    }

    if (gameMode == "survival") {
      scoreTitleText.text = "Lives:";
      scoreText.text = score;
    } else {
      scoreTitleText.text = "Score:";
      scoreText.text = score;
    }

    if (gameMode == "timed") {
      timeTitleText.text = "Time Remaining: ";
      timeText.text = 60 - Math.round(frameNumber / 62);
      if (60 - Math.round(frameNumber / 62) <= 0) {
        gameState = "end";
        endMenu();
      }
    } else if (gameState != "end") {
      timeTitleText.text = "Time Elapsed: ";
      timeText.text = Math.round(frameNumber / 62);
    }

    scoreBoxBorder.redraw();
    scoreBox.redraw();
    scoreTitleText.redraw();
    scoreText.redraw();
    timeBoxBorder.redraw();
    timeBox.redraw();
    timeTitleText.redraw();
    timeText.redraw();
    //
    //
    //
  } else if (gameState == "end") {
    //       END
    //
    //       STARTS
    //
    //       HERE
    for (var i = 0; i < projectiles.length; i++) {
      if (endNewBox.collideWith(projectiles[i])) {
        score = 0;
        frameNumber = 0;
        ducks = [];
        projectiles = [];
        gameState = "start";
        startMenu();
      }
      if (endRetryBox.collideWith(projectiles[i])) {
        score = 0;
        if (gameMode == "survival") {
          score = 20;
        }
        frameNumber = 0;
        ducks = [];
        projectiles = [];
        gameState = "game";
        startGame();
      }
    }

    if (gameMode == "timed") {
      timeTitleText.text = "Time Remaining: " + timeText.text;
    }

    endBoxBorder.redraw();
    endBox.redraw();
    endRetryBox.redraw();
    endNewBox.redraw();
    endBoxText.redraw();
    scoreTitleText.redraw();
    scoreText.redraw();
    timeTitleText.redraw();
  } else {
    gameState = "start";
    startMenu();
  }
}

function moveLeft(entity, speed) {
  entity.speedX -= speed;
}

function moveRight(entity, speed) {
  entity.speedX += speed;
}

function moveUp(entity, speed) {
  entity.speedY -= speed;
}

function moveStop(entity) {
  entity.speedX = 0;
  entity.speedY = 0;
}

function shoot(entity, x, y) {
  if (shootTimer > 40 || firstShot[1] == 2) {
    // Ensuring enough time has passed to "reload"
    firstShot[0] = frameNumber;
    projectiles.push(
      new component(
        4,
        20,
        "/works/games/lunar-defence/images/laser.png",
        x,
        y,
        "image",
      ),
    );
    firstShot[1] = 1;
    shootTimer = 0;
  }
}

function createDuck() {
  var duckWidth = 50;
  var side = parseInt(Math.round(Math.random() * 1));
  if (side == 1) {
    side = gameBox.canvas.width - duckWidth;
  }
  var y = Math.random() * (gameBox.canvas.height / 8) * 4 + 40;
  ducks.push(
    new component(
      duckWidth,
      20,
      "/works/games/lunar-defence/images/target.png",
      side,
      y,
      "image",
    ),
  );
  if (side == 0) {
    ducks.push(true);
  } else {
    ducks.push(false);
  }
  ducks.push(0);
}

frigginStart();
