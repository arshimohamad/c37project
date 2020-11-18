var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY = 1, END = 0, gameState = PLAY;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6

var cloudsGroup, cloudsImage;
var obstaclesGroup;
var gameOver;
var gameOverImg;
var restart;
var restartImg;
var score=0;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(300, 180, 600, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -2;

  invisibleGround = createSprite(300, 190, 600, 10);
  invisibleGround.visible = false;

  gameOver = createSprite(300,50);
  gameOver.scale=0.5;
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;

  restart = createSprite(300,100);
  restart.scale=0.5;
  restart.addImage(restartImg);
  restart.visible=false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(180);
  fill("black");
  textSize(15);
  text("Score:"+score,500,20);
  

  if (gameState === PLAY) {
   // score = Math.round(frameCount/4);
    if (frameCount % 10 === 0){
      score = score+1;
    }

    if (keyDown("space")) {
      trex.velocityY = -10;
    }

    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    spawnObstacles();
    spawnClouds();

    if(trex.isTouching(obstaclesGroup)){
      gameState = END
    }
  }
  if(gameState === END){
    ground.velocityX=0;
    trex.changeAnimation("collided", trex_collided);
    cloudsGroup.setVelocityXEach(0); 
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;

    if(mousePressedOver(restart)){
      gameState = PLAY
      cloudsGroup.destroyEach();
      obstaclesGroup.destroyEach();
      gameOver.visible=false;
      restart.visible=false;
      trex.changeAnimation("running",trex);
      score=0;
    }
  }
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud);
  }

}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle);
  }
}