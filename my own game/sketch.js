gameState="serve";
score1=0;
lives=5;
var bgServe,bgServeImg;
var mouthRules,mouthRulesImg;
var mouthbg,toothpasteGroup;
var next ,nextArrow;
var mgerm1Img,mgerm2Img,mgerm3Img,mgerm4Img;
var germGroup,boom1,boomImg;
var toothbrush,pasteImg,toothbrushImg;
var monstergerm,monstergermImg;
var win1,win1Img;
var foodGroup,block1;
var next1,nextArrow1;
var apple;
var banana;
var carrot;
var broc;
var pear;
var life,lifeImg,lifeGroup;
var end1, endImg,reset,resetImg;

function preload(){
  //loading images
bgServeImg=loadImage("images/bg.jpg");
mouthRulesImg=loadImage("images/mouthStartBg.jpg")
nextArrow=loadImage("images/nextArrow1.png")
nextArrow1=loadImage("images/restart.png")
mouthbg=loadImage("images/mouthbg.jpg")
toothbrushImg=loadImage("images/toothbrush.png")
pasteImg=loadImage("images/toothpaste.png")
monstergermImg=loadImage("images/monstergerm.png")
boomImg=loadImage("images/boom1.png");
win1Img=loadImage("images/win1.png")
lifeImg=loadImage("images/life.png")
apple=loadImage("images/apple.png")
carrot=loadImage("images/carrot.png")
pear=loadImage("images/pear.png")
banana=loadImage("images/banana.png")
broc=loadImage("images/broccoli.png")
endImg=loadImage("images/end.png")
resetImg=loadImage("images/restart.png")
  //loading animations
  mgerm1Img=loadAnimation('images/mg1a.png','images/mg1b.png','images/mg1a.png')
  mgerm2Img=loadAnimation('images/mg2a.png','images/mg2b.png','images/mg2a.png')
  mgerm3Img=loadAnimation('images/mg3a.png','images/mg3b.png','images/mg3a.png')
  mgerm4Img=loadAnimation('images/mg4b.png','images/mg4a.png','images/mg4c.png')

}

function setup() {
  createCanvas(1200, 800);
  // background of starting displaying game's name 
  bgServe=createSprite(600,400)
  bgServe.addImage(bgServeImg)
  bgServe.visible=false

  // mouthrules sprites
  mouthRules=createSprite(600,400)
  mouthRules.addImage(mouthRulesImg)
  mouthRules.scale=1.5
  mouthRules.visible=false

  next =createSprite(850,727) 
  next.addImage(nextArrow)
  next.scale=0.35
  next.visible=false

  next1 =createSprite(950,590) 
  next1.addImage(nextArrow1)
  next1.scale=0.35
  next1.visible=false

  // mouth bacteria fight game Stage 1 sprites and characters 
  germGroup = new Group();
  toothpasteGroup= new Group();
  lifeGroup= new Group();
  foodGroup=new Group();

  toothbrush =createSprite(1100,427) 
  toothbrush.addImage(toothbrushImg)
  toothbrush.scale=2.55
  toothbrush.visible=false
          // toothbrush.debug=true
  toothbrush.setCollider("rectangle",0,0,15,toothbrush.height)

  monstergerm=createSprite(0,400,10,10)
  monstergerm.addImage(monstergermImg)
  monstergerm.visible=false
  
  boom1=createSprite(100,300,10,20)
  boom1.addImage(boomImg)
  boom1.scale=1.25
  boom1.visible=false    

// mouth win sprites 
win1=createSprite(130,480)
win1.addImage(win1Img)
win1.visible=false

block1= createSprite(1200,400,5,1200)
block1.visible=false

end1=createSprite(600,400)
end1.addImage(endImg)
end1.visible=false

reset=createSprite(880,620)
reset.addImage(resetImg)
reset.scale=0.25;
reset.visible=false
}

function draw() {
   background(0);
   serve();
   stage1mouth();
   stage1();
   end();
   mouthWin()

   if (gameState==="stage1" && lives <= 0 ){
    gameState="end"
  }
 
  drawSprites();
  textSize(40);
  fill("lightBlue")
text("Lives :  " + lives, 40, 80);
if(gameState==="stage2"){
  text("food :  " + food, 40, 180);

}
if (gameState==="play"){
  fill("red")
  textSize(48)
  text ("YAY!!! you killed all the bacteria in the mouth. ",20,140)
  text ("SO from now always remember to brush twice a day ",10,700)
}
if (gameState==="end"){
  fill("lightBlue")
  text("OH NOOO!!! GERM ATTACK",360,120)
  fill("yellow")
  text("Better luck next time , just remember to brush well",180,720)
}
}

function serve(){
if (gameState==="serve"){
  bgServe.visible=true
  reset.visible=false
  end1.visible=false
  lives=5
  score1=0
  if (keyDown("space") && gameState==="serve"){
    gameState="start"
    console.log("start")
  } 
  win1.visible=false;
  monstergerm.visible=false;
  next.visible=false
  boom1.visible=false
  next1.visible=false
 }

}
function stage1mouth(){
  if (gameState==="start"){
      bgServe.visible=false
      mouthRules.visible=true
      next.visible=true
    if (mousePressedOver(next)&& gameState==="start"){
      gameState="stage1"
      console.log("stage1")
    }
   }
}
function stage1(){
if (gameState==="stage1"){
  background(mouthbg)
   next.visible=false
   mouthRules.visible=false
   toothbrush.y = World.mouseY
   toothbrush.visible=true

   if (keyDown("space")) {
    toothpaste();
  }

  if (toothpasteGroup.isTouching(germGroup)) {
    score1= score1 + 1;
    console.log(score1)
    toothpasteGroup.destroyEach();
    germGroup.destroyEach();
   // blastSound.play();

  }
  if (lifeGroup.isTouching(toothbrush)){
    lives=lives+1
    lifeGroup.destroyEach();
 }

  if (germGroup.isTouching(toothbrush)||germGroup.isTouching(block1)){
    lives=lives-1
    toothpasteGroup.destroyEach();
    germGroup.destroyEach();
  }

  if (monstergerm.isTouching(toothbrush)){
    lives=0
    toothpasteGroup.destroyEach();
    germGroup.destroyEach();
  }

  if (toothpasteGroup.isTouching(monstergerm)) {
    score1= score1 + 1;
    boom1.x=monstergerm.x
    boom1.y=monstergerm.y
      
    console.log(score1)
    toothpasteGroup.destroyEach();
    germGroup.destroyEach();
    monstergerm.velocityX=0
     }

     if (toothpasteGroup.isTouching(foodGroup)) {
lives=lives-1;
toothpasteGroup.destroyEach();
    foodGroup.destroyEach();
     }

  if (score1===29){
    console.log("monster's here")
    monstergerm.visible=true
    monstergerm.velocityX=15
  }

  if (World.frameCount % 100 == 0) {  
    var germ = createSprite(0, Math.round(random(30, 770)), 10, 10);
    //germ.debug=true
    germ.velocityX = (6 + score1/2);
    germ.lifetime = 1250;
  
    germGroup.add( germ);
    var randStone = Math.round(random(1, 4))
    switch (randStone) {
      case 1:germ.addAnimation("kill",mgerm1Img)
      germ.scale=0.3;
        break;
        case 2:germ.addAnimation("run",mgerm2Img)
        germ.scale=0.25;
        break;
      case 3: germ.addAnimation("hit",mgerm3Img)
      germ.scale=0.27;
        break;
        case 4: germ.addAnimation("play",mgerm4Img)
      germ.scale=0.32;
        break;
        default:
        break;
    }}
    
    
    if (World.frameCount % 180 == 0) {  
      var food = createSprite(0, Math.round(random(30, 770)), 10, 10);
      //germ.debug=true
      food.velocityX = (9 + score1/2);
      food.lifetime = 1250;
      foodGroup.add(food);
      var randStone = Math.round(random(1, 4))
      switch (randStone) {
        case 1:food.addImage(apple)
        food.scale=0.83;
          break;
          case 2:food.addImage(banana)
          food.scale=0.3;
          break;
        case 3: food.addImage(pear)
        food.scale=0.3;
          break;
          case 4: food.addImage(broc)
          food.scale=0.3;
          break;
          case 5: food.addImage(carrot)
          food.scale=0.3;
          break;
          default:
          break;
      }}
   if (score1===30 ){
  gameState="play"
  
}
if (World.frameCount % 1500 == 0) {  
  var life= createSprite(0, Math.round(random(130, 670)), 10, 10);
  //life.debug=true
  life.addImage(lifeImg)
  life.velocityX = (14 + score1/2);
  life.lifetime = 1250;
  life.scale=0.35
 lifeGroup.add(life)

}
    
}
}
function toothpaste() {
  var toothpaste= createSprite(1100, 1100, 60, 10);
  toothpaste.addImage(pasteImg);
  toothpaste.y = toothbrush.y-100;
  toothpaste.velocityX = -(9+score1/3);
  toothpaste.lifetime = 550;
  toothpaste.scale =0.21;
  toothpasteGroup.add(toothpaste);

}
 function mouthWin(){
  if (gameState==="play"){
     toothbrush.visible=false
     boom1.visible=true  
     foodGroup.destroyEach();
     //life.visible=false
     console.log("mouth win ")
     win1.visible=true
   background(255)
   next1.visible=true
   if (mousePressedOver(next1)&& gameState==="play"){
    gameState="serve"
    console.log("serve")
  }
  }
 }
function end(){
  if (gameState==="end"){
    end1.visible=true
    reset.visible=true
    germGroup.destroyEach()
    foodGroup.destroyEach();
    toothbrush.visible=false
    //life.visible=false
console.log("end")
  }
  if (mousePressedOver(reset)&& gameState==="end"){
    gameState="serve"
    console.log("serve")
  }
}



