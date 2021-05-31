var balloon;
var backgroundImg,balloonImg;
var database;
var height;

function setup() {
  createCanvas(windowWidth,windowHeight);
  database = firebase.database();
  console.log(database)
  balloon = createSprite(400, 200, 50, 50);
  var balloonHeight=database.ref('balloon/height');
  console.log(balloonHeight)
  balloonHeight.on("value",readHeight, showError);
}

function preload() {
  backgroundImg=loadImage("pro-C35 images/Hot Air Ballon-01.png")
  balloonImg1=loadImage("pro-C35 images/Hot Air Ballon-02.png")
  balloonImg2=loadImage("pro-C35 images/Hot Air Ballon-03.png")
  balloonImg3=loadImage("pro-C35 images/Hot Air Ballon-04.png")
}

function draw() {
  background(backgroundImg);
  balloon.addImage(balloonImg1);

  if(keyDown(LEFT_ARROW)){
   updateHeight(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
   updateHeight(10,0)
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("balloonImage1",balloonImg2);
    balloon.scale=balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("balloonImage2",balloonImg3);
    balloon.scale=balloon.scale +0.01;
  }
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x' : height.x+x,
    'y' : height.y+y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}