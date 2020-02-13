function generateMap(side) {
  
  var allText = "";
  var maze = [];
  for(var x = 0; x < side; x++){
      maze[x] = [];    
      for(var y = 0; y < side; y++){ 
        maze[x][y] = 1;    
      }    
    }
    
  let startingX = Math.floor(Math.random() * Math.floor(side));
  let startingY = Math.floor(Math.random() * Math.floor(side));
  maze[startingX][startingY] = 0;
  recursion(startingX, startingY, maze, side);

  x = 0;
  y = 0;
  while(maze[x][y] == WALL) {
    x = Math.floor(Math.random() * Math.floor(side));
    y = Math.floor(Math.random() * Math.floor(side));
  }
  maze[x][y] = 2;

  
  for(var x = 0; x < side; x++) 
    for(var y = 0; y < side; y++)
      allText += maze[x][y].toString();
  
      
  return allText;

}

function recursion(r, c, maze, side) {

  mazeLoc.push([r,c]);

  var ranDirs = [];
  for(let i = 0; i < 4; i++)
    ranDirs.push(i+1);
   
  shuffled = false; 
  start:
  for(i = 0; i < ranDirs.length; i++) {
    if(!shuffled) {
      ranDirs = shuffle(ranDirs); 
      shuffled = true;
    }
    
    deadEnd = 0;
    if(!(r-2 <= 0)) {
      if(maze[r-2][c] != 1)
        deadEnd += 1; 
    } else deadEnd += 1;
    if(!(c+2 >= side-1)) {
      if(maze[r][c+2] != 1)
        deadEnd += 1;
    } else deadEnd += 1;
    if(!(r+2 >= side-1)) {
      if(maze[r+2][c] != 1)
        deadEnd += 1; 
    } else deadEnd += 1;
    if(!(c-2 <= 0)) {
      if(maze[r][c-2] != 1)
        deadEnd += 1;
    } else deadEnd += 1;
    
    while(deadEnd === 4) {
      mazeLoc.pop();
      if(typeof mazeLoc[mazeLoc.length-1] !== 'undefined') {
        r = mazeLoc[mazeLoc.length-1][0];
        c = mazeLoc[mazeLoc.length-1][1]; 
      } else break;
      deadEnd = 0;
      if(!(r-2 <= 0)) {
        if(maze[r-2][c] != 1)
          deadEnd += 1; 
      } else deadEnd += 1;
      if(!(c+2 >= side-1)) {
        if(maze[r][c+2] != 1)
          deadEnd += 1;
      } else deadEnd += 1;
      if(!(r+2 >= side-1)) {
        if(maze[r+2][c] != 1)
          deadEnd += 1; 
      } else deadEnd += 1;
      if(!(c-2 <= 0)) {
        if(maze[r][c-2] != 1)
          deadEnd += 1;
      } else deadEnd += 1;
    }
    
        
    switch(ranDirs[i]) {
      case 1: // Up
        if(r-2 <= 0) continue;
        if(maze[r-2][c] != 0) {
          maze[r-2][c] = 0;
          maze[r-1][c] = 0;
          recursion(r-2 ,c ,maze, side);
        }
        else continue start;
        break;
      case 2: // Right
        if(c+2 >= side-1) continue;
        if(maze[r][c+2] != 0) {
          maze[r][c+2] = 0;
          maze[r][c+1] = 0;
          recursion(r ,c+2 ,maze, side);
        }
        else continue start;
        break;
      case 3: // Down
        if(r+2 >= side-1) continue;
        if(maze[r+2][c] != 0) {
          maze[r+2][c] = 0;
          maze[r+1][c] = 0;
          recursion(r+2 ,c ,maze, side);
        }
        else continue start;
        break;
      case 4: // Left
        if(c-2 <= 0) continue;
        if(maze[r][c-2] != 0) {
          maze[r][c-2] = 0;
          maze[r][c-1] = 0;
          recursion(r ,c-2 ,maze, side);
        }
        else continue start;
        break;
    
    }  
  }
}
