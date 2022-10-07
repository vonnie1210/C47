var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var bgImg, blueOrbImg, ghostImg, ghostCatcherImg;
var catcher;
var ghost;
var bg;
var obstaclesGroup, rock;
var orb;
var invisibleGround;
var gameOverImg;
var gameOver;

function preload(){
  bgImg = loadImage("./assets/background.png");
  blueOrbImg = loadImage("./assets/blueOrb.png");
  rock = loadImage("./assets/rock.png");
  ghostImg = loadImage("./assets/ghost.PNG");
  ghostCatcherImg = loadImage("./assets/ghostCatching.PNG");
  gameOverImg = loadImage("./assets/gameOver.png");
}

function setup() {
  createCanvas(1000,600);
  bg = createSprite(700,100);
  bg.addImage("bgImg", bgImg);
  bg.scale = 0.9;
  bg.x = width/2;

  ghost = createSprite(850,455,20,20);
  ghost.scale = 0.2;
  ghost.addImage(ghostImg);

  catcher = createSprite(150,450,20,20);
  catcher.scale = 0.13;
  catcher.addImage(ghostCatcherImg);
  catcher.setCollider('circle',0,0,350);

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 0.5;

  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
 
}

function draw() {
  background(220);
  text(mouseX+","+mouseY,mouseX,mouseY);

  if (gameState === PLAY){
    bg.velocityX = -2

    catcher.velocityY = catcher.velocityY + 0.8;

    if (bg.x < 50){
        bg.x = bg.width/2;
    }
    
    if(keyDown("space") && catcher.y>270) {
      catcher.velocityY = -13;
    }
  
    spawnObstacles();

    catcher.collide(invisibleGround);

    gameOver.visible = false;

    if(obstaclesGroup.isTouching(catcher)){
      catcher.destroy(); 
      gameState = END;
    }
  }
  else if (gameState === END){
    bg.velocityX = 0;
    catcher.velocityY = 0;
    obstaclesGroup.setVelocityXEach = 0;
    gameOver.visible = true;
  }
  
  drawSprites();
}

function spawnObstacles() {
    if(frameCount % 120 === 0) {
      var obstacle = createSprite(camera.position.x+400,575,40,40);
      obstacle.setCollider("rectangle",0,0,200,200)
      obstacle.addImage(rock);
      obstacle.velocityX = -6;
      obstacle.scale = 0.15;      
      obstacle.lifetime = 400;
      obstaclesGroup.add(obstacle);
    }
  }