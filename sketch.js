var database ,dog,dog1,dog2
var position
var feed,add
var foodobject
var Feedtime
var Lastfeed
var lastFed


function preload()

{
  dogimg1 = loadImage("Dog.png")
  dogimg2 = loadImage("HappyDog.png")
}

function setup() {
	createCanvas(800, 400);
  database = firebase.database();
  console.log(database);
 
  foodobject = new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var Dog = database.ref('Food');
  Dog.on("value", readPosition, showError);
  feed = createButton("FEED THE DOG")
  feed.position(500,115)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,115)
  add.mousePressed(AddFood)
 
} 

function draw(){
 background("green");

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);
 Feedtime = database.ref('FeedTime');
Feedtime.on("value", function(data){
  lastFed = data.val();
});

 if(lastFed>12){
   text("Last Feed :"+lastFed%12 + "PM", 350, 350);

 }else if(lastFed==0){
   text("Last Feed: 12 AM",350 ,350);
 }else{
text ("Last Feed:" + lastFed + "AM",350,350);
 }
 
drawSprites();
}

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(bottle){
  if(bottle>0){
    bottle=bottle-1
  }
  else{
    bottle=0
  }
  database.ref('/').set({
    'Food': bottle
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}
)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}



