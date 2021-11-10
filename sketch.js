//global variables
var iron, ironImg;
var bg, backgroundImg;
var stoneGroup, stoneImg;
var diamond, diamondGroup, diamondImage;
var diamondScore=0;
var spike, spikesGroup, spikesImage;
var gameState= "PLAY";

//definition of function preload to load the game assets
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImg= loadImage("images/iron.png");
  stoneImg=loadImage("images/stone.png");
  diamondImage= loadImage("images/diamond.png");
  spikesImage= loadImage("images/spikes.png");
  restartImage= loadImage("images/restart.png");


 
 
}

function setup() {
  createCanvas(1000, 600);
  
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale=2
  //make bg move
  
  iron = createSprite(200,505,20,50);
  iron.addImage(ironImg);
  iron.scale= 0.5
  ground = createSprite(200,585,1200,10);
 
  ground.visible = false;
  //new groups
  stoneGroup=new Group()
  diamondGroup=new Group()
  spikesGroup= new Group()
  restart = createSprite(500,300);
  restart.addImage(restartImage);
  restart.visible= false;

}

function draw() {
  if(gameState=== "PLAY"){
    bg.velocityY=-5
  
  iron.setCollider("rectangle",0,0,200,500);
  //jump on space
  if(keyDown("space") ) {
    iron.velocityY = -16;
  }
  //prevent iron man from moving out of the canvas
  if(iron.y<50){
    iron.y=50;
  }
  if(bg.y<200)
  bg.y=bg.width/4
//iron man movements
  iron.velocityY = iron.velocityY + 0.5;
  //move left
  if(keyDown("left") )
  iron.x -=5
  //move right
  if(keyDown("right") )
  iron.x +=5
  iron.collide(ground);
  //call function to generate stones
 generateStones();
 for(var i = 0 ; i< (stoneGroup).length ;i++){
  var temp = (stoneGroup).get(i) ;
  //to make iron man collide with stone
  if (temp.isTouching(iron)) {
     iron.collide(temp);
    }

      
  }
  //call out function to generate diamond
   generateDiamond()
   //to catch the diamond
   for(var i = 0 ; i< (diamondGroup).length ;i++){
    var temp = (diamondGroup).get(i) ;
    
    if (temp.isTouching(iron)) {
      //increase score when diamond is caught
      diamondScore++;
      //destroy diamond when it is caught
      temp.destroy();
      temp=null;
      }
        
    }
    //call function to generate spikes
    generateSpikes()
    for(var i = 0 ; i< (spikesGroup).length ;i++){
      var temp = (spikesGroup).get(i) ;
      //to make iron man collide with spikes
      if (temp.isTouching(iron)) {
        //decrease score when colliding with spikes
        diamondScore=diamondScore-5;
//destroy spikes when collided
        temp.destroy();
        temp=null;
        }
      }
        if(diamondScore<=-10 || iron.y>610){
          gameState="END";
        }
     
      }
      if(gameState==="END"){
        bg.velocityY=0;
        iron.velocityY=0;
        diamondGroup.setVelocityEach(0);
        spikesGroup.setVelocityEach(0);
        stoneGroup.setVelocityEach(0);
        diamondGroup.setLifetimeEach(-1);
        spikesGroup.setLifetimeEach(-1);
        stoneGroup.setLifetimeEach(-1);

        restart.visible= true;
        if(mousePressedOver (restart)){
          restartGame();
        }
        
      }
      


    
    drawSprites();
    textSize(20);
  fill("white")
  //to display score
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
function restartGame(){
  gameState= "PLAY";
  stoneGroup.destroyEach();
  spikesGroup.destroyEach();
  diamondGroup.destroyEach();
  diamondScore=0;

  iron.y=50;
  restart.visible= false;
}
      


