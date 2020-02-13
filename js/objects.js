// Map object

function Map(zmap, w) {
  this.textMap = zmap;
  this.tiles = this.textMap.length;
  this.cols = Math.sqrt(this.tiles);
  this.rows = Math.sqrt(this.tiles);
  this.w = w;

  this.create = function () {
    var amap = [];
    var fmap = zmap.split('');
  
    for(var x = 0; x < this.cols; x++){
      amap[x] = [];    
      for(var y = 0; y < this.rows; y++){ 
        amap[x][y] = fmap[y + x * this.cols];    
      }    
    }
    return amap;
  }
  
  this.field = this.create();
  
  this.disp = function() {
    for(var i = 0; i < this.cols; i++) {
      for(var j = 0; j < this.rows; j++) {
        if(ultra) {
          if(this.field[i][j] === GROUND)
            image(gImg, i*this.w,j*this.w,this.w,this.w)
          else if(this.field[i][j] === WALL)
            image(wImg, i*this.w,j*this.w,this.w,this.w)
          else if(this.field[i][j] === GOAL) {
            image(gImg, i*this.w,j*this.w,this.w,this.w);
            image(goImg, i*this.w,j*this.w,this.w,this.w);
          }
        }
        else {
          if(this.field[i][j] === GROUND)
            fill(51)
          else if(this.field[i][j] === WALL)
            fill(000)
          else if(this.field[i][j] === GOAL)
            fill('yellow')
          noStroke();
          rect(i*this.w,j*this.w,this.w,this.w) 
        }
      }
    }
  }
  
  this.save = function() {
    var textMap = "";
    for(var x = 0; x < this.cols; x++) 
      for(var y = 0; y < this.rows; y++) 
        textMap += this.field[x][y];
    
    this.textMap = textMap;
    this.field = this.create();
    
    alert(this.textMap);
  
  
  }
  
}

// Player object

function Player(map, w) {
  this.x = 0;
  this.y = 0;
  while(map.field[this.x][this.y] === WALL || map.field[this.x][this.y] === GOAL) {
    this.x = Math.floor(Math.random() * Math.floor(map.cols));
    this.y = Math.floor(Math.random() * Math.floor(map.rows));
  }
  this.w = w;

  this.disp = function(color) {
      fill(color);
      stroke(10);
      rect(this.x*this.w,this.y*this.w,this.w,this.w);
  
  }
  
  this.win = function(map) {
    if(map.field[this.x][this.y] === GOAL && godMod != GOAL && godMod != WALL && godMod != GROUND)
     return true;
    else return false;
  }

}
