//Create variables here
var dog, happyDog, database, foodS, foodStock;
var database
var fedTime,lastFed;
var foodObj

function preload()
{
  //load images here
  dog1 = loadImage("images/dogImg.png");
  dog2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dog1);
  dog.scale=0.5
  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
   foodObj=new Food()

}


function draw() {  
background(46, 139, 87);

fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
foodObj.display()

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM",350,30)
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + "AM", 250,30);
}


drawSprites();
  //add styles here

}
 function readStock(data){
   foodS=data.val();
   foodObj.updateFoodStock(foodS);
 }

 function feedDog(){
  dog.addImage(dog2);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
