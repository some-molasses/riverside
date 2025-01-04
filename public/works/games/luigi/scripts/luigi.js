/* eslint-disable */
// @ts-nocheck

// this code has pretty much not been touched since 2017

// 2024: use runLuigiGame wrapper function to namespace global vars
function runLuigiGame() {
  var player;
  var bricks = [];
  var grounds = [];
  var entities = [];
  var fireworks = [];
  var otherThings = [];
  var loadScreenItems = [];
  var startScreenItems = [];

  var animator;

  var brickCollisionData;
  var gameState = "start";
  var endGameAnimation = false;

  var scoreText;
  var scoreNumText;
  var coinCounter;

  var playerDirection = "right";
  var marioOrLuigi;
  var playerType = "mario";
  var starFire = false;
  var usingTwoPlayer = false;

  var playerHitTimer = 0;
  var playerDeathTimer = 0;
  var playerAnimationTimer = 0;

  var waitTime; // for the end cinematic's fireworks
  var flagScore;
  var endGameTime;
  var starTimer = 0;
  var pipeEntryTimer = 0;
  var worldEntryTimer = 0;
  var endGameAnimationTimer = 0;

  var pipeExitPoint;
  var pipeEntryPoint;

  var timeTotal;
  var initialFullTime = new Date();
  var initialMSTime;
  var currentFullTime = new Date();
  var currentMSTime;
  var timeLimit;

  var moveWorldDistance = 0;

  var lives = 3;
  var score = 0;
  var coins = 0;

  var livesM = 3;
  var scoreM = 0;
  var coinsM = 0;
  var livesL = 3;
  var scoreL = 0;
  var coinsL = 0;

  function startGame() {
    gameBox.start();
    player = new component(
      50,
      50,
      "/works/games/luigi/images/player/mariosmall.png",
      0,
      600,
      "entity",
      "image",
    );
    player.fireballTimer = 0;
    player.goombaCollateral = 0;
    createWorld1_1();
    player.isJumping = true;
    player.isWalking = false;

    startScreenItems.push(
      new component(
        704,
        352,
        "/works/games/luigi/images/title.png",
        148,
        90,
        "image",
      ),
    );
    startScreenItems.push(
      new component("bold 36px", "Tahoma", "white", 350, 500, "text"),
    );
    startScreenItems[startScreenItems.length - 1].text = "1 PLAYER GAME";
    startScreenItems.push(
      new component("bold 36px", "Tahoma", "white", 350, 560, "text"),
    );
    startScreenItems[startScreenItems.length - 1].text = "2 PLAYER GAME";
    startScreenItems.push(
      new component(
        36,
        36,
        "/works/games/luigi/images/goombaone.png",
        280,
        1000,
        "image",
      ),
    );

    initialMSTime = initialFullTime.getTime();
    requestAnimationFrame(updateGameArea);
  }

  var gameBox = {
    canvas: document.createElement("canvas"),
    start: function () {
      this.canvas.width = 1000;
      this.canvas.height = 750;
      this.context = this.canvas.getContext("2d", { alpha: false });
      document
        .getElementById("canvasBox")
        .insertBefore(this.canvas, document.getElementById("canvasFoundation"));
      // this.interval = setInterval(updateGameArea, 16);
      window.addEventListener("keydown", function (e) {
        gameBox.keys = gameBox.keys || [];
        gameBox.keys[e.keyCode] = true;
      });
      window.addEventListener("keyup", function (e) {
        gameBox.keys[e.keyCode] = false;
      });
    },
    stop: function () {
      // clearInterval(this.interval);
      cancelAnimationFrame(animator);
      gameBox.erase();
    },
    erase: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  };

  function component(width, height, inputColour, x, y, type, extraType) {
    //variable calls
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.colour = inputColour;
    this.type = type;
    // to be used on more than just items
    this.itemRise = 0;
    if (type == "image" || extraType == "image") {
      this.image = new Image();
      this.image.src = inputColour;
    }
    if (type == "entity") {
      this.gravity = 0.8;
      this.gravitySpeed = 0;
      this.jumpPersistence = -19;
      this.movementWeight = 0.025;
      this.movementWeightPercentage = 0;
      this.movementShadow = 0;
      this.isJumping = false;
      this.killMovement = false;
      this.hasAi = false;
      this.movingDirection = "none";
      this.isDead = false;
      this.deathAnimation = null;
      // to be used on player only
      this.state = "small";
    }
    ctx = gameBox.context;

    this.imageReset = function () {
      this.image = document.getElementById(this.colour);
    };
    this.redraw = function () {
      var redrawX = Math.floor(this.x);
      var redrawY = Math.floor(this.y);
      if (this.type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = this.colour;
        ctx.fillText(this.text, redrawX, redrawY);
      } else if (type == "image" || extraType == "image") {
        ctx.drawImage(this.image, redrawX, redrawY, this.width, this.height);
      } else if (this.type == "ground") {
        ctx.fillStyle = this.colour;
        ctx.translate(redrawX, 0);
        // ctx.fill();
        ctx.fillRect(0, redrawY, this.width, this.height);
        ctx.translate(-redrawX, 0);
      } else {
        ctx.fillStyle = this.colour;
        ctx.fillRect(redrawX, redrawY, this.width, this.height);
      }
    };
    this.newPos = function () {
      // adding movement to position
      if (this.speedX !== 0 && this.movementWeightPercentage < 1) {
        this.movementWeightPercentage =
          (this.movementWeightPercentage * 1000 + this.movementWeight * 1000) /
          1000;
      } else if (this.speedX === 0 && this.movementWeightPercentage !== 0) {
        this.movementWeightPercentage =
          (this.movementWeightPercentage * 1000 - this.movementWeight * 1000) /
          1000;
        // (this.movementWeightPercentage * 10 + this.movementWeight * 10) / 10;
      }
      if (this.type == "entity") {
        if (player.isDead === false) {
          // if the player is going offscreen
          if (this.speedX != this.movementShadow && this == player) {
            // this.movementWeightPercentage = (this.movementWeightPercentage * 1000 - this.movementWeight * 1000) / 1000;
            if (this.movementShadow < this.speedX) {
              this.movementShadow = (this.movementShadow * 10 + 4) / 10;
            } else if (this.movementShadow > this.speedX) {
              this.movementShadow = (this.movementShadow * 10 - 4) / 10;
            }
            if (
              this == player &&
              ((this.x < 150 && this.movementShadow < 0) ||
                (this.x > 600 && this.movementShadow > 0))
            ) {
              // ^ if the player has released the movement buttons
              if (this.movementShadow * this.movementWeightPercentage !== 0) {
                // ^ if the amount the world must be moved is not zero
                if (Math.sign(this.movementShadow) == -1) {
                  // ^ if the player was moving left, move world right
                  moveWorld(
                    "right",
                    this.movementShadow * -this.movementWeightPercentage,
                  );
                } else {
                  // ^ if the player was not moving left, move world left
                  moveWorld(
                    "left",
                    this.movementShadow * this.movementWeightPercentage,
                  );
                }
              }
            } else {
              // ^ if the player is not holding a movement key
              this.x += this.movementShadow * this.movementWeightPercentage;
              // ^ move player by shadow (drift)
            }
          } else {
            if (
              this == player &&
              ((this.x < 150 && this.movementShadow < 0) ||
                (this.x > 600 && this.movementShadow > 0))
            ) {
              // if the player is moving
              if (this.speedX !== 0) {
                // if the player is moving left
                if (Math.sign(this.speedX) == -1) {
                  // move the world right
                  moveWorld(
                    "right",
                    this.speedX * -this.movementWeightPercentage,
                  );
                } else {
                  // if the player is not moving left, but still moving, then it must be moving right.
                  // therefore move the world left
                  moveWorld(
                    "left",
                    this.speedX * this.movementWeightPercentage,
                  );
                }
              } else {
                // ^ if the player has released the movement buttons
                if (this.movementShadow * this.movementWeightPercentage !== 0) {
                  // ^ if the amount the world must be moved is not zero
                  if (Math.sign(this.movementShadow) == -1) {
                    // ^ if the player was moving left, move world right
                    moveWorld(
                      "right",
                      this.movementShadow * -this.movementWeightPercentage,
                    );
                  } else {
                    // ^ if the player was not moving left, move world left
                    moveWorld(
                      "left",
                      this.movementShadow * this.movementWeightPercentage,
                    );
                  }
                }
              }
            } else {
              // ^if the player is not going offscreen
              if (this.speedX !== 0) {
                // ^ if the player is holding a movement key
                this.movementShadow = this.speedX;
                this.x += this.speedX * this.movementWeightPercentage;
                // ^ move player by intended speed
              } else {
                // ^ if the player is not holding a movement key
                this.x += this.movementShadow * this.movementWeightPercentage;
                // ^ move player by shadow (drift)
              }
            } // player off/in bounds
          }
        } // player != dead
      } else {
        //    not for entities
        this.x += this.speedX;
      }
      if (this.hasAi === true) {
        switch (this.movingDirection) {
          case "left":
            moveLeft(this, 1);
            break;
          case "right":
            moveRight(this, 1);
            break;
        }
      }
      if (this.type == "entity" && this.deathAnimation !== "toBeSpliced") {
        this.gravitySpeed += this.gravity;
        if (this == player && player.isJumping) {
          if (playerDirection == "left") {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmalljumpleft.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismalljumpleft.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigjumpleft.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigjumpleft.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigjumpleft.png";
              }
            }
          } else {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmalljumpright.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismalljumpright.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigjumpright.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigjumpright.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigjumpright.png";
              }
            }
          }
          player.imageReset();
        }
        if (this.y + this.height < this.groundPos) {
          if (this.isJumping) {
            this.speedY = this.gravitySpeed + this.jumpPersistence;
          } else {
            if (this == player && player.isDead === true) {
            } else {
              this.speedY = this.gravitySpeed;
            }
          }
          this.y += this.speedY;
        } else if (this.y + this.height >= this.groundPos) {
          // ensure entity does not fall through the ground by setting Y to ground minus height
          this.y = this.groundPos - this.height;
          // enable jumping
          this.y += this.speedY;
          this.speedY = 0;
          // reset forceOfGravity
          this.gravitySpeed = 0;
          this.isJumping = false;
        }
      }
    };
    this.collideWith = function (otherEntity) {
      var thisLeft = this.x;
      var thisRight = this.x + this.width;
      var thisTop = this.y;
      var thisBottom = this.y + this.height;
      var thisHalfW = this.width / 2;
      var thatLeft = otherEntity.x;
      var thatRight = otherEntity.x + otherEntity.width;
      var thatTop = otherEntity.y;
      var thatBottom = otherEntity.y + otherEntity.height;
      var isThereCollision = [];
      var directionX;
      var directionY;
      var directionPure;
      if (
        thisLeft > thatRight ||
        thisRight < thatLeft ||
        thisTop > thatBottom ||
        thisBottom < thatTop
      ) {
        isThereCollision.push(false);
      } else {
        isThereCollision.push(true);
      }
      if (thatTop < thisTop) {
        directionY = "above";
      } else if (thatBottom > thisBottom) {
        directionY = "below";
      }
      if (thisLeft + thisHalfW >= thatRight) {
        directionX = "port";
      } else if (thisRight - thisHalfW <= thatLeft) {
        directionX = "starboard";
      }
      switch (true) {
        case directionX == "port" && directionY == "below":
          switch (true) {
            case Math.abs(thisLeft - thatRight) <
              Math.abs(thisBottom - thatTop):
              directionPure = "port";
              break;
            case Math.abs(thisLeft - thatRight) >
              Math.abs(thisBottom - thatTop):
              directionPure = "below";
              break;
          }
          break;
        case directionX == "port" && directionY == "above":
          switch (true) {
            case Math.abs(thisTop - thatBottom) <
              Math.abs(thisLeft - thatRight):
              directionPure = "above";
              break;
            case Math.abs(thisTop - thatBottom) >
              Math.abs(thisLeft - thatRight):
              directionPure = "port";
              break;
          }
          break;
        case directionX == "starboard" && directionY == "below":
          switch (true) {
            case Math.abs(thisBottom - thatTop) <
              Math.abs(thatLeft - thisRight):
              directionPure = "below";
              break;
            case Math.abs(thisBottom - thatTop) >
              Math.abs(thatLeft - thisRight):
              directionPure = "starboard";
              break;
          }
          break;
        case directionX == "starboard" && directionY == "above":
          switch (true) {
            case Math.abs(thisRight - thatLeft) >
              Math.abs(thisTop - thatBottom):
              directionPure = "above";
              break;
            case Math.abs(thisRight - thatLeft) <
              Math.abs(thisTop - thatBottom):
              directionPure = "starboard";
              break;
          }
          break;
        case directionX == "port":
          directionPure = "port";
          break;
        case directionX == "starboard":
          directionPure = "starboard";
          break;
        case directionY == "above":
          directionPure = "above";
          break;
        case directionY == "below":
          directionPure = "below";
          break;
      }
      isThereCollision.push(directionX);
      isThereCollision.push(directionY);
      isThereCollision.push(directionPure);
      return isThereCollision;
    };
    this.isGround = function (ground) {
      this.groundPos = ground.y;
    };
    this.killEntity = function (animationToUse) {
      if (animationToUse == "jump" || this.deathAnimation == "jump") {
        jump(this);
        moveUp(this, -this.jumpPersistence);
        this.deathAnimation = "jump";
      } else if (animationToUse == "coin" || this.deathAnimation == "coin") {
        jump(this);
        moveUp(this, -this.jumpPersistence);
        if (this.deathAnimation != "coin") {
          this.lastGroundPos = this.y;
        }
        this.deathAnimation = "coin";
        this.gravity = 1.4;
        if (this.y > this.lastGroundPos) {
          displayScore(200, this.x, this.y);
          this.deathAnimation = "toBeSpliced";
          coins++;
          this.colour = "rgba(0,0,0,0)";
        }
      } else if (animationToUse == "score" || this.deathAnimation == "score") {
        // score

        this.y -= 5;
        this.deathAnimation = "score";

        if (this.itemRise >= 50) {
          this.deathAnimation = "toBeSpliced";
        }

        this.itemRise++;
      } else if (
        animationToUse == "fireball" ||
        this.deathAnimation == "fireball"
      ) {
        this.deathAnimation = "fireball";
        // score
        if (this.gravitySpeed >= -this.jumpPersistence) {
          this.deathAnimation = "toBeSpliced";
        }
      } else if (animationToUse == "stomp" || this.deathAnimation == "stomp") {
        if (this.hasAi) {
          this.stompTimer = 0;
          this.y += this.height - this.height / 8;
          this.height = this.height / 8;
        }
        this.deathAnimation = "stomp";
        this.hasAi = false;
        this.speedX = 0;
        this.movementShadow = 0;
        this.gravity = 0;
        if (this.stompTimer > 75) {
          this.deathAnimation = "toBeSpliced";
        }
        this.stompTimer++;
      } else if (
        animationToUse == "brickCoin" ||
        this.deathAnimation == "brickCoin"
      ) {
        jump(this);
        moveUp(this, -this.jumpPersistence);
        this.deathAnimation = "brickCoin";
        this.gravity = 1.4;
        if (this.y >= this.lastGroundPos) {
          displayScore(200, this.x, this.y);
          this.deathAnimation = "toBeSpliced";
          // this.colour = "rgba(0,0,0,0)";
          coins++;
        }
      } else if (
        animationToUse == "firework" ||
        this.deathAnimation == "firework"
      ) {
        this.deathAnimation = "firework";
        this.itemRise++;
        if (this.itemRise == 10) {
          this.x -= 8;
          this.y -= 8;
          this.width += 16;
          this.height += 16;
          this.colour = "/works/games/luigi/images/fireworkone.png";
          this.imageReset();
        } else if (this.itemRise == 20) {
          this.x -= 4;
          this.y -= 4;
          this.width += 8;
          this.height += 8;
          this.colour = "/works/games/luigi/images/fireworktwo.png";
          this.imageReset();
        } else if (this.itemRise == 30) {
          this.x -= 6;
          this.y -= 6;
          this.width += 12;
          this.height += 12;
          this.colour = "/works/games/luigi/images/fireworkthree.png";
          this.imageReset();
        } else if (this.itemRise == 35) {
          this.deathAnimation = "toBeSpliced";
          score += 500;
        }
      }
      this.isDead = true;
    };
  }

  function updateGameArea() {
    gameBox.erase();
    player.speedX = 0;
    player.speedY = 0;
    player.imageReset();
    player.redraw();
    sky.redraw();
    // Score Updates
    otherThings[1].text = addZeros(score, 6);
    // Coin Updates
    otherThings[2].text = "\u17F0 \u00D7 " + addZeros(coins, 2);

    // Player Walking

    if (
      (player.x >= 600 ||
        (player.x <= 150 &&
          (player.isDead == false || player.state == "star") &&
          moveWorldDistance !== 0)) &&
      gameState !== "start" &&
      player.isWalking === true
    ) {
      switch (true) {
        case Math.ceil(moveWorldDistance % 90) <= 30:
          if (playerDirection == "right") {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkrightone.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkrightone.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkrightone.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkrightone.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkrightone.png";
              }
            }
          } else {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkleftone.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkleftone.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkleftone.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkleftone.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkleftone.png";
              }
            }
          }
          break;
        case Math.ceil(moveWorldDistance % 90) <= 60:
          if (playerDirection == "right") {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkrighttwo.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkrighttwo.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkrighttwo.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkrighttwo.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkrighttwo.png";
              }
            }
          } else {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalklefttwo.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalklefttwo.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalklefttwo.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalklefttwo.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalklefttwo.png";
              }
            }
          }
          break;
        case Math.ceil(moveWorldDistance % 90) <= 90:
          if (playerDirection == "right") {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkrightthree.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkrightthree.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkrightthree.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkrightthree.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkrightthree.png";
              }
            }
          } else {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkleftthree.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkleftthree.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkleftthree.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkleftthree.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkleftthree.png";
              }
            }
          }
          break;
      }
    } else if (player.isWalking === true) {
      switch (true) {
        case Math.ceil(player.x % 90) < 30 &&
          (player.isDead == false || player.state == "star"):
          if (playerDirection == "right") {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkrightone.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkrightone.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkrightone.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkrightone.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkrightone.png";
              }
            }
          } else {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkleftone.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkleftone.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkleftone.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkleftone.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkleftone.png";
              }
            }
          }
          break;
        case Math.ceil(player.x % 90) < 60 &&
          (player.isDead == false || player.state == "star"):
          if (playerDirection == "right") {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkrighttwo.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkrighttwo.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkrighttwo.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkrighttwo.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkrighttwo.png";
              }
            }
          } else {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalklefttwo.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalklefttwo.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalklefttwo.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalklefttwo.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalklefttwo.png";
              }
            }
          }
          break;
        case Math.ceil(player.x % 90) <= 90 &&
          (player.isDead == false || player.state == "star"):
          if (playerDirection == "right") {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkrightthree.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkrightthree.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkrightthree.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkrightthree.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkrightthree.png";
              }
            }
          } else {
            if (player.height == 50) {
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmallwalkleftthree.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismallwalkleftthree.png";
              }
            } else {
              if (player.state == "fire" || starFire) {
                player.colour =
                  "/works/games/luigi/images/player/firebigwalkleftthree.png";
              } else if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariobigwalkleftthree.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigibigwalkleftthree.png";
              }
            }
          }
          break;
      }
    } else {
      if (playerDirection == "right") {
        if (player.height == 50) {
          if (playerType == "mario") {
            player.colour = "/works/games/luigi/images/player/mariosmall.png";
          } else {
            player.colour = "/works/games/luigi/images/player/luigismall.png";
          }
        } else {
          if (player.state == "fire" || starFire) {
            player.colour = "/works/games/luigi/images/player/firebig.png";
          } else if (playerType == "mario") {
            player.colour = "/works/games/luigi/images/player/mariobig.png";
          } else {
            player.colour = "/works/games/luigi/images/player/luigibig.png";
          }
        }
      } else {
        if (player.height == 50) {
          if (playerType == "mario") {
            player.colour =
              "/works/games/luigi/images/player/mariosmallleft.png";
          } else {
            player.colour =
              "/works/games/luigi/images/player/luigismallleft.png";
          }
        } else {
          if (player.state == "fire" || starFire) {
            player.colour = "/works/games/luigi/images/player/firebigleft.png";
          } else if (playerType == "mario") {
            player.colour = "/works/games/luigi/images/player/mariobigleft.png";
          } else {
            player.colour = "/works/games/luigi/images/player/luigibigleft.png";
          }
        }
      }
    }
    player.imageReset();
    player.isWalking = false;

    if (
      gameBox.keys &&
      (gameBox.keys[87] || gameBox.keys[38]) &&
      endGameAnimation === false &&
      gameState == "game"
    ) {
      // w
      if (player.isDead === false) {
        jump(player);
        moveUp(player, -player.jumpPersistence);
      }
    }
    if (
      gameBox.keys &&
      (gameBox.keys[68] || gameBox.keys[39]) &&
      endGameAnimation === false &&
      gameState == "game"
    ) {
      // d
      playerDirection = "right";
      player.isWalking = true;
      moveRight(player, 9);
      if (player.movementShadow < 1 && player.movementWeightPercentage > 0.7) {
        if (player.height == 50) {
          if (playerType == "mario") {
            player.colour =
              "/works/games/luigi/images/player/mariosmallslideright.png";
          } else {
            player.colour =
              "/works/games/luigi/images/player/luigismallslideright.png";
          }
        } else {
          if (player.state == "fire" || starFire) {
            player.colour =
              "/works/games/luigi/images/player/firebigslideright.png";
          } else if (playerType == "mario") {
            player.colour =
              "/works/games/luigi/images/player/mariobigslideright.png";
          } else {
            player.colour =
              "/works/games/luigi/images/player/luigibigslideright.png";
          }
        }
        playerDirection = "right";
        player.imageReset();
      }
    }
    if (
      gameBox.keys &&
      (gameBox.keys[65] || gameBox.keys[37]) &&
      endGameAnimation === false &&
      gameState == "game"
    ) {
      // a
      playerDirection = "left";
      moveLeft(player, 9);
      player.isWalking = true;
      if (player.movementShadow > -1 && player.movementWeightPercentage > 0.7) {
        if (player.height == 50) {
          if (playerType == "mario") {
            player.colour =
              "/works/games/luigi/images/player/mariosmallslideleft.png";
          } else {
            player.colour =
              "/works/games/luigi/images/player/luigismallslideleft.png";
          }
        } else {
          if (player.state == "fire" || starFire) {
            player.colour =
              "/works/games/luigi/images/player/firebigslideleft.png";
          } else if (playerType == "mario") {
            player.colour =
              "/works/games/luigi/images/player/mariobigslideleft.png";
          } else {
            player.colour =
              "/works/games/luigi/images/player/luigibigslideleft.png";
          }
        }
        player.imageReset();
      }
    }
    if (
      gameBox.keys &&
      (gameBox.keys[83] || gameBox.keys[40]) &&
      endGameAnimation === false &&
      gameState == "game" &&
      (player.state == "fire" || starFire || player.state == "star")
    ) {
      // sKey
      throwFireball(player);
    }
    player.newPos();
    //   SHIFT KEY
    if (gameBox.keys && gameBox.keys[16]) {
      console.log(player.x);
    }
    if (gameBox.keys && gameBox.keys[88]) {
      // xKey
      player.isDead = true;
      playerDeathTimer = 151;
      initialFullTime = new Date();
      initialMSTime = initialFullTime.getTime();

      gameState = "worldEntry";
      endGameAnimation = false;
      endGameAnimationTimer = 0;
      worldEntryTimer = 0;
      player.speedY = 0;
      player.gravity = 0.8;
      player.y = 650;
      player.isJumping = false;
      player.gravitySpeed = 0;
    }

    if (gameState == "start") {
      //         START
      //
      //         STARTS
      //
      //         HERE
      player.groundPos = 800;
      player.newPos();
      player.redraw();
      otherThings[6].text = 400;

      if (gameBox.keys && gameBox.keys[87]) {
        // w
        startScreenItems[3].y = 469;
      }

      if (gameBox.keys && gameBox.keys[83]) {
        // s
        startScreenItems[3].y = 530;
      }

      if (gameBox.keys && gameBox.keys[68]) {
        // d
        if (startScreenItems[3].y == 530) {
          usingTwoPlayer = true;
          marioOrLuigi = "luigi"; // worldEntry will switch this to true
          player.x++;
        } else {
          player.x++;
        }
      }

      if (player.x !== 0) {
        player.x += 12 * player.movementWeightPercentage;
        player.isWalking = true;
        player.movementWeightPercentage += 0.08;
        if (player.x > 1000) {
          gameState = "worldEntry";
        }
      }

      for (var o = 0; o < otherThings.length; o++) {
        otherThings[o].redraw();
      }

      for (var s = 0; s < startScreenItems.length; s++) {
        startScreenItems[s].redraw();
      }

      //collision detections

      for (var g = 0; g < grounds.length; g++) {
        if (
          player.x > grounds[g].x &&
          player.x < grounds[g].x + grounds[g].width
        ) {
          player.isGround(grounds[g]);
        }
        var groundCollisionData = grounds[g].collideWith(player);
        if (groundCollisionData[0] === true && player.isDead === false) {
          switch (groundCollisionData[3]) {
            case "above":
              player.isGround(grounds[g]);
              player.goombaCollateral = 0;
              break;
            case "port":
              player.x = grounds[g].x - player.width;
              break;
            case "starboard":
              player.x = grounds[g].x + grounds[g].width;
              break;
          }
        }

        if (grounds[g].colour == null) {
          groundPattern = gameBoxCtx.createPattern(
            document.getElementById(
              "/works/games/luigi/images/groundimage.png",
            ),
            "repeat",
          );
          grounds[g].colour = groundPattern;
        }

        grounds[g].newPos();
        grounds[g].speedX = 0;
        grounds[g].redraw();
      }
    } else if (gameState == "game") {
      //         GAME
      //
      //         STARTS
      //
      //         HERE

      player.groundPos = 800;

      if (endGameAnimation !== true) {
        if (player.isDead === false || playerAnimationTimer !== 1) {
          currentFullTime = new Date();
          currentMSTime = currentFullTime.getTime();
          otherThings[6].text = addZeros(
            timeLimit - Math.floor((currentMSTime - initialMSTime) / 1000),
            3,
          );
        }
      } else {
        otherThings[6].text = addZeros(endGameTime, 3);
      }

      if (timeLimit - Math.floor((currentMSTime - initialMSTime) / 1000) <= 0) {
        player.isDead = true;
        lives--;
        pipeEntryTimer = 0;
        playerAnimationTimer = 0;
      }

      if (playerHitTimer !== 0) {
        playerHitTimer--;
      }

      if (starTimer !== 0) {
        if (starTimer == 1) {
          starFire = false;
          player.state = "fire";
        }
        starTimer--;
      }

      for (var o = 0; o < otherThings.length; o++) {
        otherThings[o].redraw();
      }

      //collision detections

      for (var g = 0; g < grounds.length; g++) {
        if (
          player.x > grounds[g].x &&
          player.x < grounds[g].x + grounds[g].width
        ) {
          player.isGround(grounds[g]);
        }
        var groundCollisionData = grounds[g].collideWith(player);
        if (groundCollisionData[0] === true && player.isDead === false) {
          switch (groundCollisionData[3]) {
            case "above":
              player.isGround(grounds[g]);
              player.goombaCollateral = 0;
              break;
            case "port":
              player.x = grounds[g].x - player.width;
              break;
            case "starboard":
              player.x = grounds[g].x + grounds[g].width;
              break;
          }
        }
        grounds[g].newPos();
        grounds[g].redraw();
        grounds[g].speedX = 0;
      }
      // brick collisions
      for (var b = 0; b < bricks.length; b += 2) {
        if (bricks[b].itemRise > 0) {
          if (bricks[b].itemRise < 6) {
            bricks[b].y -= bricks[b].itemRise;
            bricks[b].itemRise++;
          } else if (bricks[b].itemRise < 12) {
            bricks[b].y += bricks[b].itemRise - 6;
            bricks[b].itemRise++;
            if (bricks[b].itemRise == 11 && bricks[b + 1] === "qitem") {
              createLuigiGameItem((bricks[b].x + 50) / 50, bricks[b].y - 10);
              bricks[b + 1] = "qUsed";
            } else if (bricks[b].itemRise == 11 && bricks[b + 1] === "qoneup") {
              createLuigiGameItem(
                (bricks[b].x + 50) / 50,
                bricks[b].y,
                "oneUp",
              );
              bricks[b + 1] = "qUsed";
              bricks[b].colour = "/works/games/luigi/images/qusedimage.png";
              bricks[b].imageReset();
            }
          }
        }

        // bricks with player
        var brickCollisionData = bricks[b].collideWith(player);
        if (
          brickCollisionData[0] === true &&
          player.isDead === false &&
          endGameAnimation === false &&
          bricks[b + 1] !== "flagCloth"
        ) {
          switch (brickCollisionData[3]) {
            case "above":
              if (bricks[b + 1] != "qoneup") {
                player.isGround(bricks[b]);
                player.goombaCollateral = 0;
              }
              if (
                bricks[b + 1] == "transport" &&
                player.movementWeightPercentage === 0 &&
                player.x > bricks[b].x &&
                player.x + player.width < bricks[b].x + bricks[b].width
              ) {
                pipeTransport(11900);
              }
              break;
            case "port":
              if (bricks[b + 1] == "flag") {
                endGameAnimation = true;
                flagScore = bricks[b].scoreIfHit;
              } else if (
                bricks[b + 1] == "transportX" &&
                player.movementWeightPercentage === 0 &&
                player.y >= bricks[b].y
              ) {
                pipeTransport(11900);
              }
              if (bricks[b + 1] != "qoneup") {
                player.x = bricks[b].x - player.width;
                player.movementWeightPercentage = 0;
              }
              break;
            case "starboard":
              if (bricks[b + 1] == "flag") {
                endGameAnimation = true;
                flagScore = bricks[b].scoreIfHit;
              }
              if (bricks[b + 1] != "qoneup") {
                player.x = bricks[b].x + bricks[b].width;
                player.movementWeightPercentage = 0;
              }
              break;
            case "below":
              if (
                bricks[b + 1] != "qoneup" &&
                player.jumpPersistence < -player.gravitySpeed
              ) {
                player.y = bricks[b].y + bricks[b].height;
              }
              // Entity kill checks
              for (var e = 0; e < entities.length; e += 2) {
                if (
                  ((entities[e].x > bricks[b].x &&
                    entities[e].x < bricks[b].x + bricks[b].width) ||
                    (entities[e].x + entities[e].width > bricks[b].x &&
                      entities[e].x + entities[e].width <
                        bricks[b].x + bricks[b].width)) &&
                  entities[e].y + entities[e].height == bricks[b].y &&
                  entities[e + 1] != "item"
                ) {
                  entities[e].killEntity("jump");
                  score += 100;
                  displayScore(100, entities[e].x, entities[e].y);
                }
              }
              if (bricks[b + 1] === "q" && player.speedY < 0) {
                createEntity(
                  50,
                  50,
                  "/works/games/luigi/images/coin.png",
                  bricks[b].x,
                  bricks[b].y - 50,
                  "coin",
                  true,
                );
                entities[entities.length - 2].hasAi = false;
                entities[entities.length - 2].gravity = 0.1;
                entities[entities.length - 2].lastGroundPos = bricks[b].y;
                entities[entities.length - 2].killEntity("brickCoin");

                score += 200;
                bricks[b].colour = "/works/games/luigi/images/qusedimage.png";
                bricks[b].imageReset();
                bricks[b + 1] = "qUsed";
                bricks[b].itemRise = 1;
                player.gravitySpeed = -player.speedY;
                player.y++;
              } else if (bricks[b + 1] === "qitem" && player.speedY < 0) {
                player.gravitySpeed = -player.speedY;
                bricks[b].itemRise = 1;
                bricks[b].colour = "/works/games/luigi/images/qusedimage.png";
                bricks[b].imageReset();
                player.y++;
              } else if (bricks[b + 1] === "normal" && player.speedY < 0) {
                if (player.state != "small") {
                  brickParticles(bricks[b]);
                  bricks.splice(b, 2);
                  score += 50;
                } else {
                  bricks[b].itemRise = 1;
                }
                player.gravitySpeed = -player.speedY;
                player.y++;
              } else if (
                bricks[b + 1][0] === "normalTenCoin" &&
                player.speedY < 0
              ) {
                if (player.state != "small") {
                  createEntity(
                    50,
                    50,
                    "/works/games/luigi/images/coin.png",
                    bricks[b].x,
                    bricks[b].y - 50,
                    "coin",
                    true,
                  );
                  entities[entities.length - 2].hasAi = false;
                  entities[entities.length - 2].gravity = 0.1;
                  entities[entities.length - 2].lastGroundPos = bricks[b].y;
                  entities[entities.length - 2].killEntity("brickCoin");
                  score += 200;

                  bricks[b + 1][1]--;
                  if (bricks[b + 1][1] <= 0) {
                    bricks[b].colour =
                      "/works/games/luigi/images/qusedimage.png";
                    bricks[b].imageReset();
                    bricks[b + 1] = "qUsed";
                  }
                } else {
                  bricks[b].itemRise = 1;
                }
                player.gravitySpeed = -player.speedY;
              } else if (bricks[b + 1] === "qoneup" && player.speedY < 0) {
                if (
                  player.state != "small" &&
                  player.movementWeightPercentage < 1
                ) {
                  player.movementWeightPercentage = 0.5;
                  bricks[b].colour = "/works/games/luigi/images/qusedimage.png";
                  bricks[b].imageReset();
                  bricks[b].itemRise = 1;
                  player.gravitySpeed = -player.jumpPersistence;
                  player.y = bricks[b].y + bricks[b].height + 1;
                }
              } else if (bricks[b + 1] === "star" && player.speedY < 0) {
                createLuigiGameItem(
                  (bricks[b].x + 50) / 50,
                  bricks[b].y - 50,
                  "star",
                );
                bricks[b].colour = "/works/games/luigi/images/qusedimage.png";
                bricks[b].imageReset();
                bricks[b + 1] = "qUsed";
                player.gravitySpeed = -player.speedY;
              }
              if (bricks[b + 1] != "qoneup") {
                player.gravitySpeed = -player.jumpPersistence;
              }
              break;
          }
        }
        if (player.isDead === false) {
          bricks[b].newPos();
        }
        bricks[b].speedX = 0;
      }

      //     Entity Collision
      for (var e = 0; e < entities.length; e += 2) {
        var thisWillDie = false;
        if (player.isDead === false) {
          entities[e].newPos();
        }
        entities[e].groundPos = 800;
        entities[e].speedX = 0;

        for (var g = 0; g < grounds.length; g++) {
          if (
            entities[e].x > grounds[g].x &&
            entities[e].x + entities[e].width < grounds[g].x + grounds[g].width
          ) {
            entities[e].isGround(grounds[g]);
          }
          var groundCollisionData = grounds[g].collideWith(entities[e]);
          if (groundCollisionData[0] === true && entities[e].isDead === false) {
            switch (groundCollisionData[3]) {
              case "port":
                entities[e].x = grounds[g].x - entities[e].width;
                break;
              case "starboard":
                entities[e].x = grounds[g].x + grounds[g].width;
                break;
            }
          }
          grounds[g].newPos();
          grounds[g].speedX = 0;
          grounds[g].redraw();
        }
        // Dead Entity Special Conditions

        if (entities[e].isDead === true) {
          if (
            entities[e].y > 800 ||
            entities[e].deathAnimation == "toBeSpliced"
          ) {
            thisWillDie = true;
          } else {
            if (
              entities[e + 1] == "firework" &&
              entities[e].width >= 36 &&
              entities[e + 3] == "firework"
            ) {
              entities[e + 2].killEntity("firework");
            }
            entities[e].killEntity();
          }
          entities[e].groundPos = 1000;
        }

        // Entity Movement

        if (entities[e].hasAi === true) {
          // anti-suicide
          if (entities[e].groundPos === 800) {
            if (
              entities[e + 1] != "koopashell" &&
              entities[e + 1] != "fireball" &&
              entities[e + 1] != "item"
            ) {
              if (entities[e].movingDirection === "left") {
                entities[e].movingDirection = "right";
              } else if (entities[e].movingDirection === "right") {
                entities[e].movingDirection = "left";
              }
            } else if (
              (entities[e + 1] == "fireball" && entities[e].y < 700) === false
            ) {
              entities[e].killEntity();
            }
          }
          if (entities[e].x < 1000 || entities[e + 1] == "koopashell") {
            if (entities[e].movingDirection === "left") {
              switch (entities[e + 1]) {
                case "koopashell":
                  moveLeft(entities[e], 10);
                  break;
                case "fireball":
                  moveLeft(entities[e], 7);
                  break;
                default:
                  moveLeft(entities[e], 2);
              }
            } else if (entities[e].movingDirection === "right") {
              switch (entities[e + 1]) {
                case "koopashell":
                  moveRight(entities[e], 10);
                  break;
                case "fireball":
                  moveRight(entities[e], 7);
                  break;
                default:
                  moveRight(entities[e], 2);
              }
            }
          }
          if (entities[e + 1] == "fireball") {
            if (
              entities[e].fireballBounceCount >= 3 &&
              entities[e].deathAnimation !== "fireball"
            ) {
              entities[e].killEntity("fireball");
            } else if (
              entities[e].y + entities[e].height >=
              entities[e].groundPos + 1
            ) {
              jump(entities[e]);
              moveUp(entities[e], 10);
              if (entities[e].gravitySpeed > -entities[e].jumpPersistence) {
                entities[e].fireballBounceCount++;
                entities[e].gravitySpeed = 0;
              }
            } else if (
              entities[e].y + entities[e].height >=
              entities[e].lastGroundPos - player.height
            ) {
              jump(entities[e]);
              moveUp(entities[e], 10);
            } else if (
              entities[e].groundPos ==
              entities[e].y + entities[e].height
            ) {
              jump(entities[e]);
              entities[e].fireballBounceCount++;
              moveUp(entities[e], 10);
            }
          }
        } else if (entities[e + 1] == "item") {
          if (entities[e].movementWeight === 0) {
            entities[e].y -= 5;
          }
        }
        // Entity Collision Data
        // Entity collides with Player
        var entityCollisionDataPlayer = entities[e].collideWith(player);
        if (
          entityCollisionDataPlayer[0] === true &&
          player.isDead === false &&
          entities[e].isDead === false &&
          entities[e + 1] !== "fireball"
        ) {
          switch (entityCollisionDataPlayer[3]) {
            case "above":
              switch (entities[e + 1]) {
                case "goomba":
                  player.isGround(entities[e]);
                  jump(player);
                  player.y -= 10;
                  player.gravitySpeed = 0;

                  player.isJumping = true;
                  player.goombaCollateral++;
                  score += 100 * player.goombaCollateral;
                  displayScore(
                    100 * player.goombaCollateral,
                    entities[e].x,
                    entities[e].y,
                  );
                  entities[e].killEntity("stomp");
                  break;
                case "koopatroopa":
                  player.isGround(entities[e]);
                  if (player.state == "small") {
                    player.isGround(entities[e]);
                    jump(player);
                    player.y -= 10;
                    player.gravitySpeed = 2;
                    player.isJumping = true;
                  } else {
                    player.isGround(entities[e]);
                    jump(player);
                    player.y -= 10;
                    player.gravitySpeed = 7;
                    player.isJumping = true;
                    createEntity(
                      50,
                      43,
                      "/works/games/luigi/images/koopashell.png",
                      entities[e].x / 50 + 1,
                      entities[e].y / 50 - 8,
                      "koopashell",
                    );
                    thisWillDie = true;
                  }
                  break;
                case "item":
                  if (entities[e].movementWeight !== 0) {
                    score += 1000;
                    displayScore(1000, entities[e].x, entities[e].y);
                    switch (entities[e].item) {
                      case "sizeMushroom":
                        player.y -= 50;
                        player.state = "smallToBig";
                        playerAnimationTimer++;
                        player.isDead = true;
                        break;
                      case "fireFlower":
                        player.state = "bigToFire";
                        playerAnimationTimer++;
                        player.isDead = true;
                        break;
                      case "star":
                        player.state = "star";
                        playerAnimationTimer++;
                        starTimer = 600;
                        starFire = true;
                        break;
                      case "oneUp":
                        lives++;
                        break;
                    }
                    thisWillDie = true;
                  }
                  break;
                case "coin":
                  score += 200;
                  entities[e].killEntity("coin");
                  break;
                default:
                  player.isGround(entities[e]);
              }
              break;
            case "port":
              player.x = entities[e].x - player.width;
              if (
                entities[e + 1] == "koopashell" &&
                entities[e].hasAi === false
              ) {
                entities[e].hasAi = true;
                entities[e].movingDirection = "right";
                moveRight(entities[e], 10);
              } else {
                if (
                  (entities[e + 1] == "goomba" ||
                    entities[e + 1] == "koopatroopa" ||
                    (entities[e + 1] == "koopashell" &&
                      entities[e].movementWeightPercentage == 1)) &&
                  entities[e].isDead === false
                ) {
                  if (player.state == "star") {
                    entities[e].killEntity("jump");
                  } else {
                    playerHit();
                  }
                } else if (entities[e + 1] == "item") {
                  score += 1000;
                  displayScore(1000, entities[e].x, entities[e].y);
                  switch (entities[e].item) {
                    case "sizeMushroom":
                      // player.height = 100;
                      player.state = "smallToBig";
                      playerAnimationTimer++;
                      player.isDead = true;
                      break;
                    case "fireFlower":
                      player.state = "bigToFire";
                      playerAnimationTimer++;
                      player.isDead = true;
                      break;
                    case "star":
                      player.state = "star";
                      playerAnimationTimer++;
                      starTimer = 600;
                      starFire = true;
                      break;
                    case "oneUp":
                      lives++;
                      break;
                  }
                  thisWillDie = true;
                } else if (entities[e + 1] == "coin") {
                  score += 200;
                  entities[e].killEntity("coin");
                }
              }
              break;
            case "starboard":
              player.x = entities[e].x + entities[e].width;
              if (
                entities[e + 1] == "koopashell" &&
                entities[e].hasAi === false
              ) {
                entities[e].hasAi = true;
                entities[e].movingDirection = "left";
                moveLeft(entities[e], 10);
              } else {
                if (
                  (entities[e + 1] == "goomba" ||
                    entities[e + 1] == "koopatroopa" ||
                    (entities[e + 1] == "koopashell" &&
                      entities[e].movementWeightPercentage == 1)) &&
                  entities[e].isDead === false
                ) {
                  if (player.state == "star") {
                    entities[e].killEntity("jump");
                  } else {
                    playerHit();
                  }
                } else if (entities[e + 1] == "item") {
                  score += 1000;
                  displayScore(1000, entities[e].x, entities[e].y);
                  switch (entities[e].item) {
                    case "sizeMushroom":
                      // player.height = 100;
                      player.state = "smallToBig";
                      playerAnimationTimer++;
                      player.isDead = true;
                      break;
                    case "fireFlower":
                      player.state = "bigToFire";
                      playerAnimationTimer++;
                      player.isDead = true;
                      break;
                    case "star":
                      player.state = "star";
                      playerAnimationTimer++;
                      starTimer = 600;
                      starFire = true;
                      break;
                    case "oneUp":
                      lives++;
                      break;
                  }
                  thisWillDie = true;
                } else if (entities[e + 1] == "coin") {
                  score += 200;
                  entities[e].killEntity("coin");
                }
              }
              break;
            case "below":
              if (
                entities[e].isDead === false &&
                entities[e + 1] != "item" &&
                entities[e + 1] != "coin"
              ) {
                player.y = entities[e].y + entities[e].height + 1;
                player.isJumping = false;
                console.log("registered as below");
                if (player.state == "star") {
                  entities[e].killEntity("jump");
                } else {
                  playerHit();
                }
              } else if (entities[e + 1] == "item") {
                score += 1000;
                displayScore(1000, entities[e].x, entities[e].y);
                switch (entities[e].item) {
                  case "sizeMushroom":
                    // player.height = 100;
                    player.state = "smallToBig";
                    playerAnimationTimer++;
                    player.isDead = true;
                    break;
                  case "fireFlower":
                    player.state = "bigToFire";
                    playerAnimationTimer++;
                    player.isDead = true;
                    break;
                  case "star":
                    player.state = "star";
                    playerAnimationTimer++;
                    starTimer = 600;
                    starFire = true;
                    break;
                  case "oneUp":
                    lives++;
                    break;
                }
                thisWillDie = true;
              } else if (entities[e + 1] == "coin") {
                score += 200;
                entities[e].killEntity("coin");
              }
              break;
          }
        }
        // Entity collides with Bricks
        for (var b2 = 0; b2 < bricks.length; b2 += 2) {
          var entityCollisionDataBricks = entities[e].collideWith(bricks[b2]);
          if (
            entityCollisionDataBricks[0] === true &&
            player.isDead === false &&
            entities[e].isDead === false
          ) {
            switch (entityCollisionDataBricks[3]) {
              case "above":
                entities[e].isGround(bricks[b2]);
                break;
              case "port":
                entities[e].x = bricks[b2].x + bricks[b2].width;
                entities[e].movingDirection = "right";
                break;
              case "starboard":
                entities[e].x = bricks[b2].x - entities[e].width;
                entities[e].movingDirection = "left";
                break;
              case "below":
                if (
                  entities[e + 1] == "item" &&
                  entities[e].movementWeightPercentage === 0
                ) {
                  if (entities[e].itemRise > 50) {
                    entities[e].movementWeightPercentage = 0.1;
                    if (entities[e].item == "sizeMushroom") {
                      entities[e].movementWeight = 0.025;
                      entities[e].hasAi = true;
                    }
                  } else {
                    entities[e].groundPos = bricks[b2].y + 50;
                    entities[e].y = bricks[b2].y - entities[e].itemRise;
                    entities[e].itemRise++;
                    entities[e].gravitySpeed = 0;
                  }
                } else {
                  entities[e].isGround(bricks[b2]);
                  if (entities[e + 1] == "fireball") {
                    entities[e].lastGroundPos = entities[e].groundPos;
                    jump(entities[e]);
                    moveUp(entities[e], 10);
                    entities[e].gravitySpeed = 0;
                  } else {
                    entities[e].y = bricks[b2].y - entities[e].height;
                    entities[e].gravitySpeed += 5;
                  }
                }
                entities[e].isJumping = false;
                break;
              default:
                entities[e].isGround(bricks[b2]);
                entities[e].y = bricks[b2].y - entities[e].height;
            }
          }
          // bricks[b2].redraw();
          if (entities[e].x > -100 && entities[e].x < 1000)
            entities[e].redraw();
        }
        // Entity collides with entity
        for (var e2 = 0; e2 < entities.length; e2 += 2) {
          var entityCollisionDataBricks = entities[e].collideWith(entities[e2]);
          if (
            entityCollisionDataBricks[0] === true &&
            player.isDead === false &&
            entities[e].isDead === false &&
            entities[e2].isDead === false
          ) {
            switch (entityCollisionDataBricks[3]) {
              case "above":
                if (
                  entities[e + 1] == "fireball" ||
                  entities[e2 + 1] == "fireball"
                ) {
                  entities[e].killEntity("jump");
                  entities[e2].killEntity("jump");
                  entities[e2].deathAnimation = "toBeSpliced";
                  thisWillDie = true;
                  score += 100;
                } else {
                  entities[e2].isGround(entities[e]);
                }
                break;
              case "port":
                if (
                  entities[e + 1] == "koopashell" &&
                  entities[e].movementWeightPercentage !== 0
                ) {
                  entities[e2].killEntity("jump");
                } else if (entities[e2 + 1] != "fireball") {
                  entities[e].x = entities[e2].x + entities[e2].width;
                  entities[e].movingDirection = "right";
                  entities[e2].movingDirection = "left";
                } else if (
                  entities[e + 1] == "fireball" ||
                  entities[e2 + 1] == "fireball"
                ) {
                  entities[e].killEntity("jump");
                  entities[e2].killEntity("jump");
                  entities[e2].deathAnimation = "toBeSpliced";
                  thisWillDie = true;
                  score += 100;
                }
                break;
              case "starboard":
                if (
                  entities[e + 1] == "koopashell" &&
                  entities[e].movementWeightPercentage !== 0
                ) {
                  entities[e2].killEntity("jump");
                } else if (entities[e + 1] == "fireball") {
                  thisWillDie = true;
                  entities[e2].killEntity("jump");
                  score += 100;
                } else if (entities[e2 + 1] != "fireball") {
                  entities[e].x = entities[e2].x - entities[e].width;
                  entities[e].movingDirection = "left";
                  entities[e2].movingDirection = "right";
                } else if (
                  entities[e + 1] == "fireball" ||
                  entities[e2 + 1] == "fireball"
                ) {
                  entities[e].killEntity("jump");
                  entities[e2].killEntity("jump");
                  entities[e2].deathAnimation = "toBeSpliced";
                  thisWillDie = true;
                  score += 100;
                }
                break;
              case "below":
                entities[e].isJumping = false;
                break;
            }
          }
        }
        if (thisWillDie === true) {
          entities.splice(e, 2);
        }
      }
      castleFlag.redraw();
      castle.redraw();
      player.redraw();
      for (var b = 0; b < bricks.length; b += 2) {
        bricks[b].redraw();
      }
      if (player.y > 650 && player.isDead === false) {
        playerHit();
        if (player.height == 50) {
          player.gravitySpeed = 0;
          jump(player);
          moveUp(player, -player.jumpPersistence);
        }
        lives--;
      }

      // FlagAnimation

      if (endGameAnimation === true) {
        // player.gravity = 0;
        endGameAnimationTimer++;
        if (endGameAnimationTimer == 699) {
          endGameAnimationTimer = 5001;
          gameState = "worldEntry";
        } else if (
          endGameAnimationTimer > 50 &&
          bricks[bricks.length - 4].y < 550
        ) {
          if (
            bricks[bricks.length - 4].y + bricks[bricks.length - 4].height <=
            600
          ) {
            bricks[bricks.length - 4].y += 5;
          }
        } else if (endGameAnimationTimer > 50 && endGameAnimationTimer < 1000) {
          player.y = 650 - player.height;
          endGameAnimationTimer = 1000;
        } else if (endGameAnimationTimer > 1040 && moveWorldDistance < 9485) {
          moveWorld("left", 5);
          player.isWalking = true;
        } else if (endGameAnimationTimer == 1) {
          score += flagScore;
          player.x += 70;
          displayScore(flagScore, player.x, player.y);
          endGameTime =
            timeLimit - Math.floor((currentMSTime - initialMSTime) / 1000);
        } else if (endGameTime > 0 && endGameAnimationTimer > 1040) {
          player.colour = "/works/games/luigi/images/transparent.png";
          player.imageReset();
          player.redraw();
          if (player.gravity !== 0) {
            player.gravity = 0;
          }
          player.y = -200;
          endGameTime--;
          score += 50;
        } else if (endGameTime === 0 && endGameAnimationTimer < 5000) {
          player.colour = "/works/games/luigi/images/transparent.png";
          player.imageReset();
          if (castleFlag.itemRise <= 30) {
            if (castleFlag.y >= 355) {
              castleFlag.y -= 5;
            }
            castleFlag.itemRise++;
          } else if (castleFlag.itemRise > 30) {
            var endTimeArray = (
              timeLimit - Math.floor((currentMSTime - initialMSTime) / 1000)
            )
              .toString()
              .split("");
            if (castleFlag.itemRise == 31) {
              switch (endTimeArray[endTimeArray.length - 1]) {
                case "1":
                  createFirework(12, 11);
                  entities[entities.length - 2].killEntity("firework");
                  waitTime = 60;
                  break;
                case "3":
                  createFirework(12, 11);
                  createFirework(10, 9);
                  createFirework(16, 10);
                  entities[entities.length - 6].killEntity("firework");
                  waitTime = 160;
                  break;
                case "6":
                  createFirework(12, 11);
                  createFirework(10, 9);
                  createFirework(16, 10);
                  createFirework(17, 8);
                  createFirework(13, 11);
                  createFirework(10, 7);
                  entities[entities.length - 12].killEntity("firework");
                  waitTime = 260;
                  break;
              }
            }
            if (
              castleFlag.itemRise > 30 &&
              castleFlag.itemRise < waitTime + 20
            ) {
              castleFlag.itemRise++;
            } else {
              endGameAnimationTimer = 5001;
              castleFlag.itemRise = 0;
              player.gravity = 0.8;
              gameState = "worldEntry";
            }
          }
        }
      }

      // Player Death
      if (
        player.isDead === true &&
        pipeEntryTimer === 0 &&
        playerAnimationTimer === 0
      ) {
        player.groundPos = 1000;
        if (playerDeathTimer < 25) {
          player.speedY = 0;
          player.isJumping = false;
          player.gravitySpeed = 0;
        } else if (playerDeathTimer < 75 && playerDeathTimer > 25) {
          if (playerType == "mario") {
            player.colour = "/works/games/luigi/images/player/mariodead.png";
          } else {
            player.colour = "/works/games/luigi/images/player/luigidead.png";
          }
          player.imageReset();
          player.redraw();
          jump(player);
          moveUp(player, -player.jumpPersistence);
        } else if (playerDeathTimer > 75 && playerDeathTimer < 150) {
          player.speedX = 0;
          player.movementShadow = 0;
          worldEntryTimer = 0;
        } else if (playerDeathTimer > 150) {
          // Building the Loading Screen

          buildLoadingScreen();
          gameState = "worldEntry";
          createWorld1_1();
        }
        if (endGameAnimation === false) {
          playerDeathTimer++;
        }
      } else if (
        (player.isDead === true || starTimer !== 0) &&
        playerAnimationTimer !== 0
      ) {
        if (player.state != "star") {
          player.speedY = 0;
          player.isJumping = false;
          player.gravitySpeed = 0;
        }

        if (player.state == "smallToBig") {
          playerAnimationTimer++;
        } else if (player.state == "bigToSmall") {
          playerAnimationTimer--;
        } else if (player.state == "bigToFire") {
          if (player.height == 50) {
            player.state = "smallToBig";
          }
          playerAnimationTimer++;
        } else if (player.state == "star") {
          playerAnimationTimer++;
        }
        if (
          player.state == "smallToBig" ||
          player.state == "bigToSmall" ||
          player.state == "bigToFire" ||
          player.state == "star"
        ) {
          // starts at h = 50
          var interval = 5;
          if (playerAnimationTimer == 1) {
            player.height = 50;
            if (player.state == "bigToSmall") {
              player.state = "small";
              playerAnimationTimer = 0;
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmall.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismall.png";
              }
              player.imageReset();
              player.isDead = false;
              playerHitTimer = 50;
              player.y += 25;
            } else if (player.state == "bigToFire" && player.height == 50) {
              player.state = "smallToBig";
            }
          } else if (playerAnimationTimer == interval) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 75;
              if (playerType == "mario") {
                player.colour = "/works/games/luigi/images/player/mariomed.png";
              } else {
                player.colour = "/works/games/luigi/images/player/luigimed.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y -= 25;
            } else if (player.state == "bigToSmall") {
              player.y -= 25;
            } else if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/firebig.png";
              starFire = true;
              player.imageReset();
              player.height = 100;
            }
          } else if (playerAnimationTimer == interval * 2) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 50;
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmall.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismall.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y += 25;
            } else if (player.state == "bigToSmall") {
              player.y += 25;
            } else if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/darkbig.png";
              starFire = false;
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 3) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 75;
              if (playerType == "mario") {
                player.colour = "/works/games/luigi/images/player/mariomed.png";
              } else {
                player.colour = "/works/games/luigi/images/player/luigimed.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y -= 25;
            } else if (player.state == "bigToSmall") {
              player.y -= 25;
            } else if (player.state == "bigToFire" || player.state == "star") {
              // player.colour = "/works/games/luigi/images/player/mariobig.png";
              // if (player.state == "star"){
              playerType = "mario";
              // }
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 4) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 50;
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmall.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismall.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y += 25;
            } else if (player.state == "bigToSmall") {
              player.y += 25;
            } else if (player.state == "bigToFire" || player.state == "star") {
              // player.colour = "/works/games/luigi/images/player/luigibig.png";
              // if (player.state == "star"){
              playerType = "luigi";
              // }
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 5) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 75;
              if (playerType == "mario") {
                player.colour = "/works/games/luigi/images/player/mariomed.png";
              } else {
                player.colour = "/works/games/luigi/images/player/luigimed.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y -= 25;
            } else if (player.state == "bigToSmall") {
              player.y += 25;
            } else if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/firebig.png";
              starFire = true;
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 6) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 100;
              if (playerType == "mario") {
                player.colour = "/works/games/luigi/images/player/mariobig.png";
              } else {
                player.colour = "/works/games/luigi/images/player/luigibig.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y -= 25;
            } else if (player.state == "bigToSmall") {
              player.y -= 50;
            } else if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/darkbig.png";
              starFire = false;
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 7) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 50;
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmall.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismall.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y += 50;
            } else if (player.state == "bigToSmall") {
              player.y += 25;
            } else if (player.state == "bigToFire" || player.state == "star") {
              // player.colour = "/works/games/luigi/images/player/luigibig.png";
              // player.imageReset();
              // if (player.state == "star"){
              playerType = "luigi";
              // }
            }
          } else if (playerAnimationTimer == interval * 8) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 75;
              if (playerType == "mario") {
                player.colour = "/works/games/luigi/images/player/mariomed.png";
              } else {
                player.colour = "/works/games/luigi/images/player/luigimed.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y -= 25;
            } else if (player.state == "bigToSmall") {
              player.y += 25;
            } else if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/firebig.png";
              starFire = true;
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 9) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 100;
              if (playerType == "mario") {
                player.colour = "/works/games/luigi/images/player/mariobig.png";
              } else {
                player.colour = "/works/games/luigi/images/player/luigibig.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y -= 25;
            } else if (player.state == "bigToSmall") {
              player.y -= 50;
            } else if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/darkbig.png";
              starFire = false;
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 10) {
            if (player.state == "smallToBig" || player.state == "bigToSmall") {
              player.height = 50;
              if (playerType == "mario") {
                player.colour =
                  "/works/games/luigi/images/player/mariosmall.png";
              } else {
                player.colour =
                  "/works/games/luigi/images/player/luigismall.png";
              }
              player.imageReset();
            }
            if (player.state == "smallToBig") {
              player.y += 50;
            } else if (player.state == "bigToSmall") {
              player.y += 50;
            } else if (player.state == "bigToFire" || player.state == "star") {
              // player.colour = "/works/games/luigi/images/player/mariobig.png";
              // if (player.state == "star"){
              playerType = "mario";
              // }
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 11) {
            if (player.state == "smallToBig") {
              player.y -= 50;
              if (playerType == "mario") {
                player.colour = "/works/games/luigi/images/player/mariobig.png";
              } else {
                player.colour = "/works/games/luigi/images/player/luigibig.png";
              }
              player.imageReset();
              player.state = "big";
              playerAnimationTimer = 0;
              player.isDead = false;
              playerHitTimer = 50;
              player.height = 100;
            } else if (player.state == "bigToFire" || player.state == "star") {
              // player.colour = "/works/games/luigi/images/player/luigibig.png";
              // if (player.state == "star"){
              playerType = "luigi";
              // }
              player.imageReset();
            } else if (player.state == "bigToSmall") {
              player.height = 100;
            }
          } else if (playerAnimationTimer == interval * 12) {
            if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/firebig.png";
              starFire = true;
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 13) {
            if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/darkbig.png";
              starFire = false;
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 14) {
            if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/mariobig.png";
              if (player.state == "star") {
                playerType = "mario";
              }
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 15) {
            if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/luigibig.png";
              if (player.state == "star") {
                playerType = "luigi";
              }
              player.imageReset();
            }
          } else if (playerAnimationTimer == interval * 16) {
            if (player.state == "bigToFire" || player.state == "star") {
              player.colour = "/works/games/luigi/images/player/firebig.png";
              player.imageReset();
              if (marioOrLuigi == "mario") {
                playerType = "mario";
              } else {
                playerType = "luigi";
              }
              if (player.state == "star") {
                playerAnimationTimer = 1;
              } else {
                player.state = "fire";
                playerAnimationTimer = 0;
                player.isDead = false;
                playerHitTimer = 50;
              }
            }
          }
        }
        if (starTimer == 1) {
          player.colour = "/works/games/luigi/images/player/firebig.png";
          player.state = "fire";
          player.imageReset();
        }
      }
      if (pipeEntryTimer !== 0) {
        if (pipeEntryTimer > 0 && pipeEntryTimer < 50) {
          pipeEntryTimer++;
          if (moveWorldDistance < 10000) {
            player.y += 2;
          } else {
            player.x += 2;
            player.colour = "/works/games/luigi/images/transparent.png";
            player.imageReset();
            player.redraw();
          }
        } else if (pipeEntryTimer < 0) {
          player.isDead = true;
          if (pipeEntryTimer >= -1) {
            player.isDead = false;
          }
          player.y--;
          pipeEntryTimer++;
        } else {
          player.isDead = false;
          if (moveWorldDistance < 10000) {
            pipeTransport(pipeEntryPoint);
            player.x = 0;
            sky.colour = "black";
            pipeEntryTimer = 0;
          } else {
            pipeTransport(pipeExitPoint);
            pipeEntryTimer = -50;
            sky.colour = "rgb(92,148,252)";
            player.y = 550;
            player.x = 200;
          }
        }
      }
    } else if (gameState == "worldEntry") {
      if (worldEntryTimer == 1) {
        // TwoPlayer Things

        if (marioOrLuigi == "mario") {
          livesM = lives;
          coinsM = coins;
          scoreM = score;
        } else {
          livesL = lives;
          coinsL = coins;
          scoreL = score;
        }

        if (usingTwoPlayer && marioOrLuigi == "mario") {
          marioOrLuigi = "luigi";
          playerType = "luigi";
          otherThings[0].text = "LUIGI";
          player.colour = "/works/games/luigi/images/player/luigismall.png";
        } else {
          marioOrLuigi = "mario";
          playerType = "mario";
          otherThings[0].text = "MARIO";
          player.colour = "/works/games/luigi/images/player/mariosmall.png";
        }
        player.imageReset();
        if (usingTwoPlayer) {
          if (marioOrLuigi == "mario") {
            lives = livesM;
            coins = coinsM;
            score = scoreM;
          } else {
            lives = livesL;
            coins = coinsL;
            score = scoreL;
          }
        }

        // TwoPlayer Things End

        buildLoadingScreen();
        sky.colour = "black";
        player.y = 0;
        player.x = 0;
        endGameAnimation = false;
        endGameAnimationTimer = 0;
        player.height = 50;
        player.state = "small";
        player.groundPos = 600;
        player.movementWeightPercentage = 0;
        moveWorld("right", moveWorldDistance);
        playerDeathTimer = 0;
        player.isDead = false;
      } else if (worldEntryTimer < 125) {
        for (var L = 0; L < loadScreenItems.length; L++) {
          loadScreenItems[L].redraw();
        }
        for (var o = 0; o < otherThings.length; o++) {
          otherThings[o].redraw();
        }
        otherThings[6].text = 400;
      } else if (lives <= 0) {
        sky.colour = "rgb(92,148,252)";
        worldEntryTimer = 0;
        coins = 0;
        score = 0;
        lives = 3;
        livesM = 3;
        livesL = 3;
        createGround(69, 2, groundPattern, 0, 2);
        gameState = "start";
      } else {
        sky.colour = "rgb(92,148,252)";
        worldEntryTimer = 0;
        initialFullTime = new Date();
        initialMSTime = initialFullTime.getTime();
        createWorld1_1();
        gameState = "game";
      }
      worldEntryTimer++;
    }
    player.fireballTimer++;
    animator = requestAnimationFrame(updateGameArea);
  }

  function moveWorld(direction, speed) {
    // if (endGameAnimation == 0 ){
    if (direction === "left") {
      for (var r = 0; r < bricks.length; r++) {
        moveLeft(bricks[r], speed);
      }
      for (var e = 0; e < entities.length; e++) {
        entities[e].x -= speed;
      }
      for (var g = 0; g < grounds.length; g++) {
        moveLeft(grounds[g], speed);
      }
      castle.x -= speed;
      castleFlag.x -= speed;
      moveWorldDistance += speed;
    } else if (direction === "right") {
      for (var r2 = 0; r2 < bricks.length; r2++) {
        moveRight(bricks[r2], speed);
      }
      for (var e2 = 0; e2 < entities.length; e2++) {
        entities[e2].x += speed;
      }
      for (var g2 = 0; g2 < grounds.length; g2++) {
        moveRight(grounds[g2], speed);
      }
      castle.x += speed;
      castleFlag.x += speed;
      moveWorldDistance -= speed;
    }
  }

  function moveLeft(entity, speed) {
    entity.speedX -= speed;
  }

  function moveRight(entity, speed) {
    entity.speedX += speed;
  }

  function moveUp(entity, speed) {
    // analogy: pushes the entity
    entity.speedY -= speed;
  }

  function jump(entity) {
    if (entity.isJumping === false) {
      moveUp(entity, 1);
      entity.isJumping = true;
    }
  }

  function moveStop(entity) {
    entity.speedX = 0;
    entity.speedY = 0;
  }

  function addZeros(number, width) {
    return new Array(width + 1 - (number + "").length).join("0") + number;
  }

  function playerHit() {
    if (playerHitTimer === 0) {
      if (player.state == "fire" || starFire) {
        player.isDead = true;
        player.state = "bigToSmall";
        playerAnimationTimer = 61;
        playerHitTimer = 50;
      } else if (player.state == "big") {
        player.isDead = true;
        player.state = "bigToSmall";
        playerAnimationTimer = 61;
        playerHitTimer = 50;
      } else if (player.state == "small") {
        player.isDead = true;
        lives--;
      }
    }
  }

  function pipeTransport(distance) {
    if (pipeEntryTimer === 0) {
      player.isDead = true;
      pipeEntryTimer++;
    } else {
      moveWorld("left", distance - moveWorldDistance);
    }
  }

  function brickParticles(inputBrick) {
    var numberOfParticles = Math.ceil(Math.random() * 3 + 1);
    for (var i = 0; i <= numberOfParticles; i++) {
      var randomizedX = Math.ceil(Math.random() * 70 - 10);
      createEntity(
        12,
        12,
        brickImage,
        inputBrick.x + randomizedX,
        inputBrick.y,
        "item",
        true,
      );
      if (Math.round(Math.random()) == 1) {
        entities[entities.length - 2].movingDirection = "right";
      }
      entities[entities.length - 2].jumpPersistence = -17 + Math.random() * 3;
      entities[entities.length - 2].gravity = 1.2;
      entities[entities.length - 2].killEntity("jump");
    }
  }

  function displayScore(text, x, y) {
    if (text == 100) {
      createEntity(
        29,
        13,
        "/works/games/luigi/images/onehundred.png",
        x,
        y,
        "score",
        true,
      );
    } else if (text == 200) {
      createEntity(
        29,
        13,
        "/works/games/luigi/images/twohundred.png",
        x,
        y,
        "score",
        true,
      );
    } else if (text == 1000) {
      createEntity(
        39,
        13,
        "/works/games/luigi/images/onethousand.png",
        x,
        y,
        "score",
        true,
      );
    } else {
      createEntity("18px", "Tahoma", "white", x, y, "score", true);
      entities[entities.length - 2].type = "text";
      entities[entities.length - 2].text = text;
    }
    entities[entities.length - 2].imageReset();
    entities[entities.length - 2].hasAi = false;
    entities[entities.length - 2].killEntity("score");
    entities[entities.length - 2].gravity = 0;
    entities[entities.length - 2].jumpPersistence = 0;
  }

  // fireball
  function throwFireball(entity) {
    if (player.fireballTimer > 50) {
      createEntity(
        16,
        16,
        "/works/games/luigi/images/fireball.png",
        entity.x + entity.width,
        entity.y,
        "fireball",
        true,
      );
      if (playerDirection == "right") {
        entities[entities.length - 2].movingDirection = "right";
      }
      entities[entities.length - 2].lastGroundPos = 650;
      entities[entities.length - 2].fireballBounceCount = 0;
      entities[entities.length - 2].movementWeight = 1;
      entities[entities.length - 2].jumpPersistence = -10;
      player.fireballTimer = 0;
    }
  }
  // items
  // bricks[b].y
  function createLuigiGameItem(xInput, yInput, type) {
    if (type == "oneUp") {
      createEntity(
        50,
        50,
        "/works/games/luigi/images/greenmushroom.png",
        xInput,
        0,
        "item",
      );
      entities[entities.length - 2].item = "oneUp";
      // entities[entities.length - 2].movementWeight = 0.8;
      entities[entities.length - 2].y =
        yInput - entities[entities.length - 2].height + 50;
    } else if (type == "star") {
      createEntity(
        50,
        50,
        "/works/games/luigi/images/star.png",
        xInput,
        0,
        "item",
      );
      entities[entities.length - 2].item = "star";
      entities[entities.length - 2].y =
        yInput - entities[entities.length - 2].height + 50;
    } else if (player.state == "small") {
      // mushroom
      createEntity(
        50,
        50,
        "/works/games/luigi/images/redmushroom.png",
        xInput,
        0,
        "item",
      );
      entities[entities.length - 2].item = "sizeMushroom";
      entities[entities.length - 2].movementWeight = 0;
      entities[entities.length - 2].y =
        yInput - entities[entities.length - 2].height + 50;
    } else if (player.state == "big" || player.state == "fire") {
      // fire flower
      createEntity(
        50,
        50,
        "/works/games/luigi/images/fireflower.png",
        xInput,
        0,
        "item",
      );
      entities[entities.length - 2].item = "fireFlower";
      entities[entities.length - 2].hasAi = false;
      entities[entities.length - 2].y =
        yInput - entities[entities.length - 2].height + 50;
    }
  }

  function createFirework(xInput, yInput) {
    createEntity(
      0,
      0,
      "/works/games/luigi/images/fireworkone.png",
      xInput,
      yInput,
      "firework",
    );
    entities[entities.length - 2].gravity = 0;
    entities[entities.length - 2].hasAi = false;
  }

  //findCG
  function createGround(w, h, colour, xInput, yInput) {
    grounds.push(
      new component(
        w * 50,
        h * 50,
        colour,
        xInput * 50 - 50,
        750 - yInput * 50,
        "ground",
      ),
    );
  }

  function createBrick(w, h, colour, xInput, yInput, type) {
    bricks.push(
      new component(w, h, colour, xInput * 50 - 50, 750 - yInput * 50, "image"),
    );
    if (type == "normalTenCoin") {
      bricks.push([type, 10]);
    } else {
      bricks.push(type);
    }
  }

  function createPipe(hInput, xInput, yInput, type, exitPoint) {
    switch (hInput) {
      case 2:
        if (type == "transportX") {
          bricks.push(
            new component(
              100,
              hInput * 50,
              "/works/games/luigi/images/pipetwox.png",
              xInput * 50 - 50,
              750 - yInput * 50,
              "image",
            ),
          );
        } else {
          bricks.push(
            new component(
              100,
              hInput * 50,
              "/works/games/luigi/images/pipetwo.png",
              xInput * 50 - 50,
              750 - yInput * 50,
              "image",
            ),
          );
        }
        break;
      case 3:
        bricks.push(
          new component(
            100,
            hInput * 50,
            "/works/games/luigi/images/pipethree.png",
            xInput * 50 - 50,
            750 - yInput * 50,
            "image",
          ),
        );
        break;
      case 4:
        bricks.push(
          new component(
            100,
            hInput * 50,
            "/works/games/luigi/images/pipefour.png",
            xInput * 50 - 50,
            750 - yInput * 50,
            "image",
          ),
        );
        break;
    }
    bricks.push(type);
    bricks[bricks.length - 2].itemRise = exitPoint;
  }

  function createEntity(w, h, colour, xInput, yInput, type, rawValues) {
    if (rawValues === true) {
      if (colour == "white") {
        entities.push(new component(w, h, colour, xInput, yInput, "entity"));
      } else {
        entities.push(
          new component(w, h, colour, xInput, yInput, "entity", "image"),
        );
      }
    } else {
      entities.push(
        new component(
          w,
          h,
          colour,
          xInput * 50 - 50,
          750 - yInput * 50,
          "entity",
          "image",
        ),
      );
    }
    if (type != "koopashell") {
      entities[entities.length - 1].hasAi = true;
    }
    entities[entities.length - 1].movingDirection = "left";
    entities.push(type);
  }

  function createBannerText(x, y, text, placement) {
    if (placement == "loadScreen") {
      loadScreenItems.push(
        new component("bold 36px", "Tahoma", "white", x, y, "text"),
      );
      loadScreenItems[loadScreenItems.length - 1].text = text;
    } else {
      otherThings.push(
        new component("bold 36px", "Tahoma", "white", x, y, "text"),
      );
      otherThings[otherThings.length - 1].text = text;
    }
  }

  function createStair(w, xInput, yInput, direction) {
    for (var verticalIndex = 0; verticalIndex < w; verticalIndex++) {
      if (direction == "ascending") {
        for (
          var horizontalIndex = w;
          horizontalIndex > verticalIndex;
          horizontalIndex--
        ) {
          bricks.push(
            new component(
              50,
              50,
              stairImage,
              xInput * 50 + horizontalIndex * 50 - 100,
              750 - yInput * 50 - verticalIndex * 50,
              "image",
            ),
          );
          bricks.push("stair");
        }
      } else if (direction == "descending") {
        for (
          var horizontalIndex2 = w;
          horizontalIndex2 > verticalIndex;
          horizontalIndex2--
        ) {
          bricks.push(
            new component(
              50,
              50,
              stairImage,
              xInput * 50 + w * 50 - horizontalIndex2 * 50 - 50,
              750 - yInput * 50 - verticalIndex * 50,
              "image",
            ),
          );
          bricks.push("stair");
        }
      }
    }
  }
  var brickImage = "/works/games/luigi/images/bricksimage.png";
  var undergroundImage = "/works/games/luigi/images/underbricksimage.png";
  var questionImage = "/works/games/luigi/images/qbricksimage.png";
  var stairImage = "/works/games/luigi/images/stairImage.png";
  var flagImage = "/works/games/luigi/images/flagpoleimage.png";
  var flagClothImage = "/works/games/luigi/images/flagclothimage.png";
  var goombaImage = "/works/games/luigi/images/goombaone.png";
  var koopaImage = "/works/games/luigi/images/koopatroopa.png";
  var gameBoxCtx = gameBox.canvas.getContext("2d");
  var groundPattern = gameBoxCtx.createPattern(
    document.getElementById("/works/games/luigi/images/groundimage.png"),
    "repeat",
  );
  var underGroundPattern = gameBoxCtx.createPattern(
    document.getElementById("/works/games/luigi/images/undergroundimage.png"),
    "repeat",
  );

  function buildLoadingScreen() {
    loadScreenItems = [];
    if (lives > 0) {
      createBannerText(375, 350, "WORLD 1-1", "loadScreen");
      createBannerText(400, 450, "LIVES: " + lives, "loadScreen");
    } else {
      createBannerText(350, 400, "GAME OVER", "loadScreen");
    }
  }

  function createWorld1_1() {
    bricks = [];
    grounds = [];
    entities = [];
    otherThings = [];
    pipeExitPoint = 7925;
    pipeEntryPoint = 11900;

    timeLimit = 400;

    if (playerType == "mario") {
      createBannerText(100, 40, "MARIO");
    } else {
      createBannerText(100, 40, "LUIGI");
    }
    createBannerText(100, 80, addZeros(score, 6));
    createBannerText(350, 80, "\u17F0 \u00D7 " + addZeros(coins, 2));
    createBannerText(575, 40, "WORLD");
    createBannerText(613, 80, "1-1");
    createBannerText(800, 40, "TIME");
    createBannerText(
      825,
      80,
      timeLimit - Math.floor((currentMSTime - initialMSTime) / 1000),
    );

    // Question Blocks
    createBrick(50, 50, questionImage, 17, 6, "q");
    createBrick(50, 50, questionImage, 22, 6, "qitem");
    createBrick(50, 50, questionImage, 24, 6, "q");
    createBrick(50, 50, questionImage, 23, 10, "q");
    createBrick(
      50,
      50,
      "/works/games/luigi/images/transparent.png",
      66,
      7,
      "qoneup",
    );
    createBrick(50, 50, questionImage, 79, 6, "qitem");
    createBrick(50, 50, questionImage, 95, 10, "qitem");
    createBrick(50, 50, brickImage, 102, 6, "star");
    for (var i = 0; i < 3; i++) {
      createBrick(50, 50, questionImage, 107 + i * 3, 6, "q");
    }
    createBrick(50, 50, questionImage, 110, 10, "qitem");
    for (var i = 0; i < 2; i++) {
      createBrick(50, 50, questionImage, 130 + i, 10, "q");
    }
    createBrick(50, 50, questionImage, 170, 6, "q");

    // Normal Bricks

    createBrick(50, 50, brickImage, 21, 6, "normal");
    createBrick(50, 50, brickImage, 23, 6, "normal");
    createBrick(50, 50, brickImage, 25, 6, "normal");
    for (var i = 0; i <= 2; i += 2) {
      createBrick(50, 50, brickImage, 78 + i, 6, "normal");
    }
    for (var i = 0; i < 8; i++) {
      createBrick(50, 50, brickImage, 81 + i, 10, "normal");
    }
    for (var i = 0; i < 3; i++) {
      createBrick(50, 50, brickImage, 92 + i, 10, "normal");
    }
    createBrick(50, 50, brickImage, 95, 6, "normalTenCoin");
    createBrick(50, 50, brickImage, 101, 6, "normal");
    createBrick(50, 50, brickImage, 119, 6, "normal");
    for (var i = 0; i < 3; i++) {
      createBrick(50, 50, brickImage, 122 + i, 10, "normal");
    }
    for (var i = 0; i < 2; i++) {
      createBrick(50, 50, brickImage, 129 + i * 3, 10, "normal");
    }
    for (var i = 0; i < 2; i++) {
      createBrick(50, 50, brickImage, 130 + i, 6, "normal");
    }
    for (var i = 0; i < 2; i++) {
      createBrick(50, 50, brickImage, 168 + i, 6, "normal");
    }
    createBrick(50, 50, brickImage, 171, 6, "normal");
    // Underground
    createBrick(
      50,
      500,
      "/works/games/luigi/images/pipetall.png",
      253,
      12,
      "normal",
    );
    for (var i = 0; i < 10; i++) {
      createBrick(50, 50, undergroundImage, 238, 3 + i, "normal");
    }
    for (var i = 0; i < 7; i++) {
      for (var x = 0; x < 3; x++) {
        createBrick(50, 50, undergroundImage, 242 + i, 3 + x, "normal");
      }
    }
    for (var i = 0; i < 7; i++) {
      for (var x = 0; x < 3; x++) {
        createBrick(50, 50, undergroundImage, 242 + i, 3 + x, "normal");
      }
    }
    for (var i = 0; i < 7; i++) {
      createBrick(50, 50, undergroundImage, 242 + i, 12, "normal");
    }
    createPipe(2, 251, 4, "transportX", 7925);
    for (var i = 0; i < 7; i++) {
      for (var x = 0; x < 2; x++) {
        createEntity(
          50,
          50,
          "/works/games/luigi/images/coin.png",
          242 + i,
          6 + x * 2,
          "coin",
        );
        entities[entities.length - 2].hasAi = false;
        entities[entities.length - 2].gravity = 0;
      }
    }
    for (var i = 0; i < 5; i++) {
      createEntity(
        50,
        50,
        "/works/games/luigi/images/coin.png",
        243 + i,
        10,
        "coin",
      );
      entities[entities.length - 2].hasAi = false;
      entities[entities.length - 2].gravity = 0;
    }

    // Pipes
    createPipe(2, 29, 4, "null");
    createPipe(3, 39, 5, "null");
    createPipe(4, 47, 6, "null");
    createPipe(4, 57, 6, "transport", 11900);
    createPipe(2, 163, 4, "null");
    createPipe(2, 179, 4, "null");
    // ENTITY DECLARATIONS
    createEntity(50, 50, goombaImage, 17, 3, "goomba");
    createEntity(50, 50, goombaImage, 41, 3, "goomba");
    createEntity(50, 50, goombaImage, 52, 3, "goomba");
    createEntity(50, 50, goombaImage, 54, 3, "goomba");
    createEntity(50, 50, goombaImage, 81, 11, "goomba");
    createEntity(50, 50, goombaImage, 83, 11, "goomba");
    createEntity(50, 50, goombaImage, 100, 3, "goomba");
    createEntity(50, 50, goombaImage, 102, 3, "goomba");
    createEntity(50, 67, koopaImage, 108, 4, "koopatroopa");
    createEntity(50, 50, goombaImage, 115, 3, "goomba");
    createEntity(50, 50, goombaImage, 117, 3, "goomba");
    createEntity(50, 50, goombaImage, 125, 3, "goomba");
    createEntity(50, 50, goombaImage, 127, 3, "goomba");
    createEntity(50, 50, goombaImage, 130, 3, "goomba");
    createEntity(50, 50, goombaImage, 132, 3, "goomba");
    createEntity(50, 50, goombaImage, 174, 3, "goomba");
    createEntity(50, 50, goombaImage, 176, 3, "goomba");
    // OTHER DECLARATIONS
    // Grounds
    createGround(69, 2, groundPattern, 0, 2);
    createGround(15, 2, groundPattern, 72, 2);
    createGround(63, 2, groundPattern, 90, 2);
    createGround(68, 2, groundPattern, 155, 2);
    createGround(16, 2, underGroundPattern, 238, 2);
    // Stairs
    createStair(4, 135, 3, "ascending");
    createStair(4, 141, 3, "descending");
    createStair(4, 148, 3, "ascending");
    for (var i = 0; i < 4; i++) {
      createBrick(50, 50, stairImage, 152, 3 + i, "stair");
    }
    createStair(4, 155, 3, "descending");
    createStair(9, 181, 3, "ascending");
    // Flag
    createBrick(50, 50, stairImage, 198, 3, "stair");
    for (var i = 0; i < 9; i++) {
      createBrick(50, 50, flagImage, 198, 4 + i, "flag");
      if (i == 0) {
        bricks[bricks.length - 2].scoreIfHit = 5000;
      } else {
        bricks[bricks.length - 2].scoreIfHit = 3000 + (i - 8) * 250;
      }
    }
    createBrick(50, 50, flagClothImage, 197.5, 12, "flagCloth");
    createBrick(
      50,
      150,
      "/works/games/luigi/images/transparent.png",
      198,
      15,
      "normal",
    );
    castleFlag.y = 450;
  }
  var castleFlag = new component(
    50,
    50,
    "/works/games/luigi/images/castleflag.png",
    10150,
    450,
    "image",
  );
  var readyPlayerOne = new component(
    "bold 36px",
    "Tahoma",
    "white",
    320,
    390,
    "text",
  );
  readyPlayerOne.text = "READY PLAYER ONE";
  var sky = new component(1000, 750, "rgb(93,148,251)", 0, 0);
  var castle = new component(
    250,
    250,
    "/works/games/luigi/images/castle.png",
    10050,
    400,
    "image",
  );

  startGame();
}

// new addition to not use body onload
runLuigiGame();
