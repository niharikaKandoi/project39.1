var monkey , monkey_running, monkey_standing;
var banana,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;
var score = 0;
var END= 0;
var PLAY= 1;
var gameState= PLAY;
var jungle, junlgeImage;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_standing= loadImage("sprite_8.png");
    
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  jungleImage= loadImage("jungle.jpg");
}



function setup() {
  createCanvas(windowWidth-50,windowHeight-20);
  
  jungle= createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  jungle.addImage(jungleImage);
  /*jungle.velocityX=-4;*/
  jungle.x= jungle.width /2;
  jungle.scale=1.5;
  
  monkey= createSprite(50,windowHeight-60,20,50);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  monkey.debug=false;
  
  ground= createSprite(windowWidth/2-200,windowHeight-40,windowWidth-150,20);
  ground.visible=false;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  window.focus();
}

function draw() {
  background("white");
  if(gameState===PLAY){
    camera.position.x=monkey.x+350;
     monkey.velocityX=6;
     spawnBanana();
     spawnObstacle();
    if(keyDown("space")&& monkey.y >= windowHeight-110) {
        monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(monkey.isTouching(foodGroup)){
       foodGroup.destroyEach();
       score=score+2;
       }
      switch(score){
      case 10: player.scale=0.12;
           break;
         case 20: player.scale=0.14;
           break;
         case 30: player.scale=0.16;
           break;
         case 40: player.scale=0.18;
           break;
         default: break;
    }
    if(monkey.isTouching(obstacleGroup)){
       gameState=END;
    }
  }
  if(camera.position.x + width / 2 > jungle.x + jungle.width / 2){
     jungle.x = camera.position.x;
     }
  if (camera.position.x + width / 2 > ground.x + ground.width / 2){
    ground.x = camera.position.x;
    
}
  monkey.collide(ground);
  drawSprites();
  text("FoodEaten =",camera.position.x-70,50);
  text(score,camera.position.x,50);
  if(gameState===END){
    score=0;
    jungle.velocityX=0;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.visible=false;
    textSize(30);
    fill("red");
    text("GAME OVER",camera.position.x,200);
  }
  
}
function spawnBanana(){         
  if(frameCount%100===0){
    var banana= createSprite(camera.position.x+displayWidth/2,displayHeight-60,10,10);
    banana.y=Math.round(random(300,displayHeight/2));
    banana.addImage(bananaImage);
    banana.scale=0.09;
    //banana.velocityX=-4;
    foodGroup.add(banana);
  }
}

function spawnObstacle(){ 
  if(frameCount%150===0){
    var obstacle= createSprite(camera.position.x+displayWidth/2,windowHeight-100,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.13;
    //obstacle.y=monkey.y;
    //obstacle.velocityX=-5;
    obstacleGroup.add(obstacle);
  }
}
function restart(){
  gameState=PLAY;
  monkey.visible=true;
}