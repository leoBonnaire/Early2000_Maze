var map, player;
var w = 30;
var WALL = '1', GROUND = '0', GOAL = '2';
var godMod;
var mazeLoc = [];
var side = 15;
var lvl = 1;
var ultra = false;
var canvas;
var twoPlayers = false;
var ps1 = 0, ps2 = 0;

var gImg, wImg, goImg;

function preload() {
  gImg = loadImage('img/ground.png');
  wImg = loadImage('img/wall.png');
  goImg = loadImage('img/goal.png');
}

function setup(ask = false) {

  godMod = null;

  w = 30;
  side = 15;
  for(let i = 0; i < lvl; i++) {
    if(w > 13)
      w -= 1.5;
    side += 4; 
  }
  
  document.getElementById("lvl").innerHTML = "Level : " + lvl;
  if(twoPlayers)
    document.getElementById("score").innerHTML = ps1 + "   |   " + ps2;
  else document.getElementById("score").innerHTML = "";
  
  var smap;
  
  if(ask)
    smap = prompt('Map :');
  else
    smap = generateMap(side);
  
  map = new Map(smap, w);
  player = new Player(map, w);
  player2 = new Player(map, w);
  
  canvas = createCanvas(map.rows*map.w, map.cols*map.w);
  centerCanvas();

  frameRate(10);
}

function windowResized() {
  centerCanvas();
}

function draw() {

   if(godMod != null && godMod != 'defined') {
  
    if(keyIsDown(81) && player.x > 0)
      map.field[player.x-1][player.y] = godMod;
    else if(keyIsDown(68) && player.x < map.cols - 1)
      map.field[player.x+1][player.y] = godMod;
    else if(keyIsDown(90) && player.y > 0)
      map.field[player.x][player.y-1] = godMod;
    else if(keyIsDown(83) && player.y < map.rows - 1)
      map.field[player.x][player.y+1] = godMod;
      
  }
  
  if(keyIsDown(65) || keyIsDown(105))
    godMod = 'defined';
  if(keyIsDown(69))
    godMod = WALL;
  if(keyIsDown(82))
    godMod = GROUND;
  if(keyIsDown(84))
    godMod = GOAL;
  if(keyIsDown(89))
    godMod = null;

  if (keyIsDown(81) && player.x > 0                                                             // left
    && (map.field[player.x-1][player.y] != WALL && (!(player.x-1 === player2.x && player.y === player2.y) || !twoPlayers) || godMod != null ))
    player.x -= 1;
  else if (keyIsDown(68) && player.x < map.cols - 1                                             // right
    && (map.field[player.x+1][player.y] != WALL && (!(player.x+1 === player2.x && player.y === player2.y ) || !twoPlayers) || godMod != null ))
    player.x += 1;
  else if (keyIsDown(90) && player.y > 0                                                        // up
    && (map.field[player.x][player.y-1] != WALL && (!(player.y-1 === player2.y && player.x === player2.x ) || !twoPlayers) || godMod != null ))
    player.y -= 1;
  else if (keyIsDown(83) && player.y < map.rows - 1                                             // down
    && (map.field[player.x][player.y+1] != WALL && (!(player.y+1 === player2.y && player.x === player2.x ) || !twoPlayers) || godMod != null ))
    player.y += 1;
    
  if (keyIsDown(100) && player2.x > 0
    && (map.field[player2.x-1][player2.y] != WALL && !(player2.x-1 === player.x && player2.y === player.y ) || godMod != null ))
    player2.x -= 1;
  else if (keyIsDown(102) && player2.x < map.cols - 1
    && (map.field[player2.x+1][player2.y] != WALL && !(player2.x+1 === player.x && player2.y === player.y ) || godMod != null ))
    player2.x += 1;
  else if (keyIsDown(104) && player2.y > 0
    && (map.field[player2.x][player2.y-1] != WALL && !(player2.y-1 === player.y && player2.x === player.x ) || godMod != null ))
    player2.y -= 1;
  else if (keyIsDown(101) && player2.y < map.rows - 1
    && (map.field[player2.x][player2.y+1] != WALL && !(player2.y+1 === player.y && player2.x === player.x ) || godMod != null ))
    player2.y += 1;
  
  map.disp();
  player.disp('#8A2BE2');
  if(twoPlayers)
    player2.disp('#000080');
  
  if(player.win(map)) {
    lvl += 1;
    ps1 += 1;
    setup();
  }
  if(player2.win(map) && twoPlayers) {
    lvl += 1;
    ps2 += 1;
    setup();
  }
  


}

// Usefull functions //

function centerCanvas() {
  canvas.position((windowWidth - width) / 2, 400);
}

// shuffle an array

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// test if a string is an int

function isNormalInteger(str) {
  var n = Math.floor(Number(str));
  return String(n) === str && n >= 0 
}



function changeLevel() {
  lvl = prompt('Choose your level');
  if(!isNormalInteger(lvl))
    lvl = 1;
  else
    lvl = parseInt(lvl, 10);
  return setup();
}

function activeTwoPlayers() {
  twoPlayers = true;
  ps1 = 0;
  return setup();
}

function unactiveTwoPlayers() {
  twoPlayers = false;
  ps1 = 0;
  return setup();
}
