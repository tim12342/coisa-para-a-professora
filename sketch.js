const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;
var mute
var balluuuun

var comendo, bk_sound, cortei, balao, tristin
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  comendo = loadSound("eating_sound.mp3");
  bk_sound = loadSound("sound1.mp3");
  cortei = loadSound("rope_cut.mp3");
  balao = loadSound("air.wav");
  tristin = loadSound("sad.wav");
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  
  mute = createImg("mute.png");
  mute.position(450,20);
  mute.size(50,50);
  mute.mouseClicked(mute);

  balluuuun = createImg("balloon.png");
  balluuuun.position(10,250);
  balluuuun.size(150,100);
  balluuuun.mouseClicked(vento);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);
  
  fruit = Bodies.circle(50,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  
}

function draw() 
{
  background(51);
  bk_sound.play();
  bk_sound.setVolume(0.01);
  image(bg_img,width/2,height/2,490,690);
  if (fruit!=null)
  {
    image(food,fruit.position.x,fruit.position.y,70,70);
  }


  rope.show();
  Engine.update(engine);
  ground.show();
  
  if (collide(fruit,bunny)==true)
  {
    bunny.changeAnimation("eating");
    comendo.play();
    comendo.setVolume(1.5)

  }
if (fruit!=null&& fruit.position.y>=650)
{
bunny.changeAnimation("crying");
tristin.play();
fruit = null;
}
   drawSprites();

}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cortei.play();
  cortei.setVolume(2.5);
}

function collide(body,sprite)
{
  if(body!=null)
  {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80)
    {
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
      

    }else
    {
      return false;
    }
  }
}


function vento()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  balao.play();






}

function mute()
{
  if (bk_sound.isPlaying())
  {
bk_sound.stop();




  }else
  {
bk_sound.play();



  }



}

