var iron, ironImg;
var bg, backgroundImg;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImg= loadImage("images/iron.png");

 
 
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  iron = createSprite(200,505,20,50);
  iron.addImage(ironImg);
  iron.scale= 0.5
  ground = createSprite(200,585,400,10);
 
  ground.visible = false;
}

function draw() {
  if(keyDown("space") ) {
    iron.velocityY = -16;
  }

  iron.velocityY = iron.velocityY + 0.5;
  if(keyDown("left") )
  iron.x -=5
  if(keyDown("right") )
  iron.x +=5
  iron.collide(ground);
 
    
    drawSprites();
   
}

