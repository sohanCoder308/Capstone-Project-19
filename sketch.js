var player,playerImage,backImage,scene,invisibleGround,coinImage1,coinImage2;
var jumpSound,gameOvers,coinSound;
var coins1,coins2,coinsGroup1,coinsGroup2;
var invisibleBlock1,invisibleBlock2;
var o1,o2,o3,o4,o5;
var obstacleGroup,gObs,lk,lkg;
var ryt=0,restart,restartI,gameOver,gameOverIm;
var bSound,coin,gOver,jump;
var START = 1;
var PLAY = 2;
var END = 0;
var gameState = START;
var score=0;

function preload() {
  playerImage = loadAnimation("1.png","2.png","3.png","4.png","5.png");
  backImage = loadImage("background.png");
  coinImage1 = loadImage("3coin.png");
  coinImage2 = loadImage("coin.png");
  o1 = loadImage("ob1.png");
  o2 = loadImage("ob2.png");
  o3 = loadImage("ob3.png");
  o4 = loadImage("obs50.png");
  lk = loadImage("58.PNG");
  restartI = loadImage("r1.png");
  gameOverIm = loadImage("gameOver.png");
  
  coin = loadSound("coin.wav");
  gOver = loadSound("gameover.mp3");
  jump = loadSound("jump.wav");
}

function setup() {
  createCanvas(900,900);
  
  scene = createSprite(445,445,600,600);
  scene.addImage(backImage);
  
  obstacleGroup = new Group();
  coinsGroup1 = new Group();
  coinsGroup2 = new Group();
  gObs = new Group();
  
  player = createSprite(100,828);
  player.addAnimation("running",playerImage);
  player.scale=0.4;
  
  lkg = createSprite(470,400,800,800);
  lkg.addImage(lk);
  lkg.scale=1.2;
  
  invisibleGround = createSprite(300,830,1912,20);
  invisibleGround.visible=false;
  
  restart = createSprite(400,200);
  restart.addImage(restartI);
  gameOver = createSprite(400,175);
  gameOver.addImage(gameOverIm);
}

function draw() {
  
  player.collide(invisibleGround);
  
  if((gameState === START)){
    lkg.visible=true;
    gameOver.visible=false;
    restart.visible=false;
    
    if(keyDown("S")){
      gameState = PLAY;
    }
  }
  
  else if((gameState === PLAY)){
    
    player.scale=0.4;
     
      lkg.visible=false; 
      gameOver.visible=false;
      restart.visible=false;
     
  scene.velocityX = -5;
    
  if((scene.x < 0)){
    scene.x=scene.width/2;
  }
    
  player.setCollider("rectangle",0,0,100,220);
    
  obstacle1();
  obstacle2();
  obstacle3();
  obstacle4();
  
  if((keyDown("space"))){
    player.velocityY = -6;
    jump.play();
  }
   player.velocityY=player.velocityY+0.7;
  if(coinsGroup1.isTouching(player)){
    coinsGroup1.destroyEach();
    score=score+2;
  }
  
  if(coinsGroup2.isTouching(player)){
    coinsGroup2.destroyEach();
    score=score+3;
    coin.play();
  }
   
  if((gObs.isTouching(player))){
    score=score+2;
    gObs.destroyEach();
  }  
    
  if((obstacleGroup.isTouching(player))&&ryt===1){
    gameState = 0;
  }
  if((obstacleGroup.isTouching(player))&&ryt===0){
    ryt=ryt+1;
    player.scale=0.3;
    obstacleGroup.destroyEach();
    coinsGroup1.destroyEach();
    coinsGroup2.destroyEach();
  }
    
  }
  
  else if((gameState === END)){
    gOver.play();
    scene.velocityX = 0;
    gameOver.visible = true;
    restart.visible=true;
    
    player.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    coinsGroup1.setVelocityXEach(0);
    coinsGroup2.setVelocityXEach(0);
    
    if(mousePressedOver(restart)){
    reset();
  }
    
  }
  
  drawSprites();
 
  stroke("black");
  fill("black");
  textSize(30);
  text("COINS COLLECTED: "+score,50,50); 
}

function reset(){
    gameState = PLAY;
    gameOver.visible=false;
    restart.visible=false;
  
    obstacleGroup.destroyEach();
    coinsGroup1.destroyEach();
    coinsGroup2.destroyEach();
    gObs.destroyEach();
  
    score=0;
    ryt=0;
}
function obstacle1(){
  if((frameCount % 210 === 0)){
  var obs1 = createSprite(1000,Math.round(random(730,740)));
  obs1.velocityX = -9;
  obs1.addImage(o1);
  obs1.scale=2;
  obstacleGroup.add(obs1); 
      
  coins2 = createSprite(obs1.x,obs1.y-150);
  coins2.addImage(coinImage2);
  coins2.scale=0.1;
  coins2.velocityX = -9; 
  coinsGroup1.add(coins2);  
    
  }
}

function obstacle2(){
  if((frameCount % 150 === 0)){
    var obs2 = createSprite(1200,795);
    obs2.velocityX =-7;
    obs2.addImage(o2);
    obs2.scale=2;
    obstacleGroup.add(obs2);
  }
}

function obstacle3(){
   if((frameCount % 195 === 0)){
    obs3 = createSprite(1200,Math.round(random(410,540)));
    obs3.velocityX = -6;
    obs3.addImage(o3);
    obs3.scale=1.9;
    obstacleGroup.add(obs3); 
    
    coins1 = createSprite(obs3.x,obs3.y-90);
    coins1.addImage(coinImage1); 
    coins1.scale=0.1; 
    coins1.velocityX = -6;
    coinsGroup2.add(coins1); 
   }
  
}

function obstacle4(){
  if((frameCount % 165 === 0)){
    var obs4 = createSprite(1200,300);
    obs4.velocityX = -5;
    obs4.addImage(o4);
    obs4.scale=2;
    gObs.add(obs4);
  }
}