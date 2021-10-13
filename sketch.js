var iron, ironImg;
var bg, backgroundImg;
var stoneGroup, stoneImg;
var diamond, diamondGroup, diamondImage;
var diamondScore=0;
var spike, spikesGroup, spikesImage;


function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImg= loadImage("images/iron.png");
  stoneImg=loadImage("images/stone.png");
  diamondImage= loadImage("images/diamond.png");
  spikesImage= loadImage("images/spikes.png");


 
 
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
  ground = createSprite(200,585,1200,10);
 
  ground.visible = false;
  stoneGroup=new Group()
  diamondGroup=new Group()
  spikesGroup= new Group()
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
   generateDiamond()
   for(var i = 0 ; i< (diamondGroup).length ;i++){
    var temp = (diamondGroup).get(i) ;
    
    if (temp.isTouching(iron)) {
      
      diamondScore++;
      temp.destroy();
      temp=null;
      }
        
    }
    generateSpikes()
    for(var i = 0 ; i< (spikesGroup).length ;i++){
      var temp = (spikesGroup).get(i) ;
      
      if (temp.isTouching(iron)) {
        diamondScore=diamondScore-5;
        temp.destroy();
        temp=null;
        }
          
      }
      


    
    drawSprites();
    textSize(20);
  fill("white")
  text("Diamonds Collected: "+ diamondScore, 500,50);
   
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
function generateDiamond(){
  if (frameCount % 70 === 0) {
    var diamond = createSprite(1200,120,40,10);
    diamond.x = random(50,450);
    diamond.addImage(diamondImage);
    diamond.scale = 0.5;
    diamond.velocityY = 5;
    
    diamond.lifetime =250;
    diamondGroup.add(diamond);
}
}
function generateSpikes(){
  if (frameCount % 150 === 0) {
    var spike = createSprite(1200, 90, 10, 40);
    spike.addAnimation("spike", spikesImage);
    spike.x = random(50, 850);
    spike.scale = 0.5;
    spike.velocityY = 3;
    spike.lifetime = 600;
    spikesGroup.add(spike);
  }
}
      


