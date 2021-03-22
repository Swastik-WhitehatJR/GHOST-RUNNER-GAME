var ghost, ghostimg, ghostimg2;

var gameoverwall, gameoverwallimg;

var invisiblefence, invisiblefencegroup;

var gameState = "PLAY";

var back, backimg;

var invisibleground, invisiblesky, invisibleright, invisibleleft;

var door, doorimg;

var doorGroup, climberGroup;

var climber, climberimg, defaultclimber;

var score = 0;

var highScore = 0;

var gameover, restartbtn, gameoverimg, restartimg;

var instructionimg, instruction, info, infoimg, infobackimg ,infoback;

var fire1, fireimg, fire2, fire3, fire4, fire5, fire6, fire7, fire8, fire9, fire10;

var spacebtn, spacebtnimg;

function preload() {
  ghostimg2 = loadAnimation("ghost-jumping.png");
  ghostimg = loadAnimation("ghost-standing.png");

  backimg = loadImage("tower.png");

  gameoverwallimg = loadImage("gameoverwall.jpg");

  doorimg = loadImage("door.png");

  climberimg = loadImage("climber.png");

  gameoverimg = loadImage("GameOver.png");

  restartimg = loadImage("restart.png");

  jumpSound = loadSound("jump.mp3");

  dieSound = loadSound("die.mp3");

  checkPointSound = loadSound("checkPoint.mp3");

  instructionimg = loadImage("instructions.jpg");

  infoimg = loadImage("info.png");
  
  infobackimg = loadImage("infobackimg.jpg");
  
  fireimg = loadImage("fire.png");
    
  spacebtnimg = loadImage("spacebtn.png");

}

function setup() {
  createCanvas(800, 800);


  back = createSprite(400, 400, 1500, 1500)
  back.addImage("background_image", backimg);
  back.velocityY = 2;
  back.scale = 1.4;

  gameoverwall = createSprite(400, 400, 1500, 1500)
  gameoverwall.addImage("lostwall", gameoverwallimg);
  gameoverwall.visible = false;
  gameoverwall.scale = 1.4;

  ghost = createSprite(400, 400, 20, 20);
  ghost.addAnimation("ghost-standing", ghostimg)
  ghost.addAnimation("ghost-jumping", ghostimg2)
  ghost.scale = 0.2;


  invisibleground = createSprite(0, 800, 10000, 1);
  invisibleground.visible = false;

  invisiblesky = createSprite(0, 0, 10000, 10);
  invisiblesky.visible = false;

  invisibleleft = createSprite(43, 0, 10, 10000);
  invisibleleft.visible = false;

  invisibleright = createSprite(757, 0, 10, 10000);
  invisibleright.visible = false;

  gameover = createSprite(400, 360, 20, 20)
  gameover.addAnimation("GameOver", gameoverimg)
  gameover.scale = 0.2;
  gameover.visible = false;

  restartbtn = createSprite(400, 700, 20, 20)
  restartbtn.addAnimation("restart", restartimg)
  restartbtn.scale = 0.05;
  restartbtn.visible = false;

  doorGroup = createGroup();

  climberGroup = createGroup();

  invisiblefencegroup = createGroup();

  instruction = createSprite(400, 300, 800, 800)
  instruction.addImage("instruction", instructionimg);
  instruction.scale = 1.1;
  instruction.visible = false;

  info = createSprite(20, 20, 20, 20);
  info.addImage("info", infoimg)
  info.scale = 0.09;
  
  infoback = createSprite(400,400, 8000,800);
  infoback.addImage("infoback", infobackimg);
  infoback.scale = 1.2;
  infoback.visible = false;         
  
  fire1 = createSprite(120,750,10,50)
  fire1.addImage("fire", fireimg)
  fire1.scale = 0.3;
  
  fire2 = createSprite(380,750,10,50)
  fire2.addImage("fire", fireimg)
  fire2.scale = 0.3;
  
  fire3 = createSprite(640,750,10,50)
  fire3.addImage("fire", fireimg)
  fire3.scale = 0.3;
  
  fire4 = createSprite(840,750,10,50)
  fire4.addImage("fire", fireimg)
  fire4.scale = 0.3;
  
  spacebtn = createSprite(400,700,50,50)
  spacebtn.addImage("spacebtn", spacebtnimg);
  spacebtn.scale = 0.3;
  spacebtn.visible = false;
}

function draw() {
  background("black");
  
infoback.depth=spacebtn.depth=instruction.depth = restartbtn.depth;
  spacebtn.depth = spacebtn.depth+1;
    instruction.depth = instruction.depth+1;
    restartbtn.depth = restartbtn.depth+1;
  
if (gameState === "INS") {
    

  
    //spacebtn.visible = true;
    fire1.visible=false;
    fire2.visible=false;
    fire3.visible=false;
    fire4.visible=false;
    
    infoback.visible = true;
    
    infoback.depth = instruction.depth;
    instruction.depth = instruction.depth+1;
    
    ghost.visible = false;
    back.visible = false;

    doorGroup.destroyEach();
    invisiblefencegroup.destroyEach();
    invisiblefencegroup.destroyEach();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    gameover.visible = true;
    restartbtn.visible = true;

    instruction.visible = true;

    info.visible = false;
    
    gameover.visible = false;
    restartbtn.visible = true;
  restartbtn.y = 700;

        if (mousePressedOver(restartbtn)) {
      reset();
      }
  

    if(keyDown("space") || touches.length>0)
      {
        gameState = "PLAY";  
        touches = [];
      }
  


  }
       

  if (gameState === "PLAY") {

    spawndoor();

    ghost.velocityY = 10;

    info.visible = true;
    
    infoback.visible=false;

    gameoverwall.visible = false;
    
    spacebtn.visible=false;
    instruction.visible = false;

    ghost.collide(invisiblesky);
    ghost.collide(invisibleleft);
    ghost.collide(invisibleright);
    ghost.collide(climberGroup);
    climberGroup.collide(doorGroup)

    ghost.changeAnimation("ghost-standing", ghostimg2);

    if (keyDown("space")) {
      ghost.velocityY = -10;
      ghost.changeAnimation("ghost-jumping", ghostimg2);
    }

    if (keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x + 5;
    }

    if (keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x - 5;
    }

    if (back.y > 400) {
      back.y = 300;
    }

    ghost.visible = true;
    back.visible = true;
    fire1.visible=true;
    fire2.visible=true;
    fire3.visible=true;
    fire4.visible=true;

    if (ghost.isTouching(doorGroup)) {
      if (frameCount % 40 == 0) {
        score = score + 1;
        checkPointSound.play();
      }

    }



    if (highScore < score) {
      highScore = score;

    }

  }

  if (ghost.isTouching(invisibleground)) {
    dieSound.play();
    gameState = "END";


  }


  if (ghost.isTouching(invisiblefencegroup)) {
    dieSound.play();
    gameState = "END";
  }



  if (gameState === "END") {
    ghost.visible = false;
    back.visible = false;

    info.visible = true;
    
    //restartbtn.y = 450;
    
    fire1.visible=false;
    fire2.visible=false;
    fire3.visible=false;
    fire4.visible=false;

    doorGroup.destroyEach();
    invisiblefencegroup.destroyEach();
    invisiblefencegroup.destroyEach();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    gameover.visible = true;
    restartbtn.visible = true;
    /*if (keyDown("space")) {
      reset();
    }*/

    gameoverwall.visible = true;

    if (mousePressedOver(restartbtn)) {
      reset();
    }



  }

  
  if (mousePressedOver(info)) {
    infofunc();
  }


  
  drawSprites();

  fill("Yellow");
  textSize(17);
  text("Score: " + score, 700, 17);
  text("Best: " + highScore, 580, 17);

}

function infofunc() {
  gameState = "INS";
}

function reset() {
  gameState = "PLAY";
  ghost.y = 400;
  back.velocityY = 2;
  climberGroup.destroyEach();
  doorGroup.destroyEach();
  invisiblefencegroup.destroyEach();
  score = 0;
  gameover.visible = false;
  restartbtn.visible = false;
}


function spawndoor() {
  if (frameCount % 100 === 0) {
    var rand = Math.round(random(100, 700));
    door = createSprite(rand, -70, 60, 40);
    door.velocityY = 2;
    door.addImage("door", doorimg);
    console.log(rand);

    door.scale = 1;
    door.lifetime = 1000;

    /*ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;*/
   
    
    doorGroup.add(door);

    climber = createSprite(rand, -50, 70, 20);
    climber.velocityY = 2;
    climber.addImage("climber", climberimg);


    climber.scale = 1;
    climber.lifetime = 1000;


    
    climberGroup.add(climber);

    invisiblefence = createSprite(rand, 0);
    invisiblefence.velocityY = 2;


    invisiblefence.scale = 1;

    invisiblefence.width = climber.width;
    invisiblefence.height = 2;

    invisiblefence.debug = true;

    invisiblefence.lifetime = 1000;

    invisiblefencegroup.add(invisiblefence)

    gameover.depth = door.depth;

    gameover.depth = gameover.depth + 1;

    restartbtn.depth = door.depth;
    restartbtn.depth = restartbtn.depth + 1;
    
    fire1.depth =  fire2.depth = fire3.depth = fire4.depth = door.depth = climber.depth = invisiblefence.depth = ghost.depth;
  
  fire1.depth = fire1.depth +1;
  fire2.depth = fire2.depth +1;
  fire3.depth = fire3.depth +1;
  fire4.depth = fire4.depth +1;
  ghost.depth = ghost.depth + 1;
    

  }
  

}