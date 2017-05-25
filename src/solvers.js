/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
//  var solution = undefined; //fixme
  var rows = board.rows();
  
  var recRookSolution = function(colNum) {
    if (colNum >= n) {
      return true; // made it to end of board without failing, board is solution
    } else {
      for (let i = 0; i < n; i++) {
        
        rows[i][colNum] = 1; // add rook to board
        
        if (board.hasRowConflictAt(i)) {
          rows[i][colNum] = 0; // this board is not a solution
          return false;     
        }  
        if (recRookSolution(colNum + 1)) { 
          rows[i][colNum] = 0; // placement leads to solution, but need to reset board 
          return true; 
        }   
//        rows[i][colNum] = 0; // no solutions possible if rook placed here, so try next row
      }
      return false; //rook cannot be placed in any row of this column 
    }   
  };
  
  if (recRookSolution(0)) {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  } else {
    console.log('no solution?');
  }
  return board;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  for (let i = 0; i < n; i++) {
    if (findNRooksSolution(i)) {
      solutionCount++;
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
