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
  let matrix = makeMatrix(n, 0);
  
  const recFindOneSolution = function(col, matrix, numRooks) {
    if (numRooks === 0) {
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(new Board(matrix)));
      return matrix.slice();
    }
    if (col >= matrix.length) {
      return null;
    }
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][col] = 1;
      var board = new Board(matrix);
      if (!board.hasAnyRooksConflicts()) {
        return recFindOneSolution(col + 1, matrix, numRooks - 1);
      }
      matrix[i][col] = 0;
    }
  };

  return recFindOneSolution(0, matrix, n);

/*
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
*/
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  
  var recFindAllSolutions = function(col, matrix, numRooks) {
    if (numRooks === 0) {
      solutionCount++;
      return;
    }
    if (col > matrix.length) {
      return;
    }
    for (var i = 0; i < matrix.length; i++) {
      if (isRookSafe(i, col, matrix)) {       
        matrix[i][col] = 1;
        recFindAllSolutions(col + 1, matrix, numRooks - 1);
        matrix[i][col] = 0;
      }
    }
    return;
  };

  recFindAllSolutions(0, makeMatrix(n), n);
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
  var solutionCount = 0;

  const recFindAllSolutions = function(col, matrix, numQueens) {
    if (numQueens === 0) { //no queens to place, current matrix state is valid queen placement
      return solutionCount++; //return value not used
    }
    if (col > matrix.length) { //unplaced queens remaining at end of board, invalid solution
      return;
    }
    for (let i = 0; i < matrix.length; i++) { //try to place queen in each row of this column
      if (isQueenSafe(i, col, matrix)) { //check if this (row,col) position is safe to place queen
        matrix[i][col] = 1; //safe, so place queen here
        recFindAllSolutions(col + 1, matrix, numQueens - 1); //see if queen placed here leads to a solution
        matrix[i][col] = 0; //undo queen placement and loop to next row
      }
    }
    return; //all rows in this column tried
  };

  recFindAllSolutions(0, makeMatrix(n), n);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var makeMatrix = function(n, v = 0) { //creates n x n matrix, used for initializing
  var matrix = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(v);
    }
    matrix.push(row);
  }
  return matrix;
}; 

var isQueenSafe = function(row, col, matrix) { //checks row, column, and min/maj diagonals left of current location
  var numConflicts = 0;
  for (var i = 0; i < matrix.length; i++) {
    numConflicts += matrix[i][col] + matrix[row][i]; 
  }
  for (var i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    numConflicts += matrix[i][j];
  }
  for (var i = row, j = col; i < matrix.length && j >= 0; i++, j--) {
    numConflicts += matrix[i][j];  
  }
  return numConflicts === 0;
};

var isRookSafe = function(row, col, matrix) {
  var numConflicts = 0;
  for (var i = 0; i < matrix.length; i++) {
    numConflicts += matrix[i][col] + matrix[row][i];
  }
  return numConflicts === 0;
};
