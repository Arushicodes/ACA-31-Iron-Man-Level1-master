var iron, ironImg;
var bg, backgroundImg;
var stoneGroup, stoneImg;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImg= loadImage("images/iron.png");
  stoneImg=loadImage("images/stone.png")

 
 
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale=2
  bg.velocityY=-5
  iron = createSprite(200,505,20,50);
  iron.addImage(ironImg);
  iron.scale= 0.5
  ground = createSprite(200,585,400,10);
 
  ground.visible = false;
  stoneGroup=new Group()
}

function draw() {
  if(keyDown("space") ) {
    iron.velocityY = -16;
  }
  if(iron.y<50){
    iron.y=50;
  }
  if(bg.y<200)
  bg.y=bg.width/4

  iron.velocityY = iron.velocityY + 0.5;
  if(keyDown("left") )
  iron.x -=5
  if(keyDown("right") )
  iron.x +=5
  iron.collide(ground);
 generateStones();
 for(var i = 0 ; i< (stoneGroup).length ;i++){
  var temp = (stoneGroup).get(i) ;
  
  if (temp.isTouching(iron)) {
     iron.collide(temp);
    }
      
  }

    
    drawSprites();
   
}
function generateStones(){
  if (frameCount % 70 === 0) {
    var stone = createSprite(1200,120,40,10);
    stone.x = random(50,450);
    stone.addImage(stoneImg);
    stone.scale = 0.5;
    stone.velocityY = 5;
    
    stone.lifetime =250;
    stoneGroup.add(stone);
  }
}
