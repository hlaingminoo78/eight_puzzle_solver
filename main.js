// -initialize puzzle
// -0 refers to the blank space in the actual game board
// let initPuzzleArray = [1, 2, 3, 4, 0, 5, 6, 7, 8];
let initPuzzleArray = [1, 2, 3, 4, 5, 8, 6, 0, 7];
// let initPuzzleArray = [1, 2, 0, 3, 4, 5, 6, 7, 8];
// let initPuzzleArray = [1, 2, 5, 3, 4, 0, 6, 7, 8];
let descPuzzleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let initNode = new Node(initPuzzleArray, 3);
let descNode = new Node(descPuzzleArray, 3);

// -search the solution
// let solution = BFS.search(initNode, descNode);
// let solution = DFS.search(initNode, descNode);
let solution = AStar.search(initNode, descNode);

// -if there is solution, then print the puzzle
console.log("Solution Length = " + solution.length);
console.log(solution);

if (solution.length > 0) {
  for (let k = solution.length - 1; k >= 0; k--) {
    for (let i = 0; i < 7; i += 3) {
      console.log(
        solution[k].puzzle[i],
        solution[k].puzzle[i + 1],
        solution[k].puzzle[i + 2]
      );
    }
    console.log(solution[k].direction);
    console.log("_______________");
  }
} else {
  console.log("No solution.");
}
