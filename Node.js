class Node {
  constructor(puzzle, columnCount) {
    // -children save nodes which contains the next possible puzzles from this node
    this.children = [];

    // -parent save where this node come from
    this.parent = null;

    // -puzzle array save each puzzle value
    this.puzzle = [...puzzle];

    // -columnCount refer to the number of columns
    this.columnCount = columnCount;

    // -blankPosition refer to index of blank (0) position
    this.blankPosition = null;

    // -direction save how this puzzle is formed from parent
    this.direction = null;

    // -set the blank blankPosition
    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[i] == 0) this.blankPosition = i;
    }
  }

  // -function to swap two values in the array
  swap(index, blankIndex) {
    let temp = this.puzzle[index];
    this.puzzle[index] = this.puzzle[blankIndex];
    this.puzzle[blankIndex] = temp;

    // -set the blank blankPosition again
    this.blankPosition = blankIndex;
  }

  // -function to get each cell value of the puzzle
  getPuzzleArray() {
    return [...this.puzzle];
  }

  // -add the next new possible node from this current puzzle position
  // -you can move at most 4 moves
  expandChildNodes() {
    // -moving left
    // -blank position : 2, 5, 8 cannot go right
    if (this.blankPosition % this.columnCount < this.columnCount - 1) {
      // -initialize new puzzle
      let newpuzzArray = this.getPuzzleArray();

      // -create new child node with new puzzle
      let child = new Node(newpuzzArray, this.columnCount);

      // -swap the blank space and right value
      child.swap(this.blankPosition, this.blankPosition + 1);

      // -set the direction
      child.direction = "LEFT";

      // -set this node as the parent of the new child node
      child.parent = this;

      // -add new child to the children list of this node
      this.children.push(child);
    }

    // -moving right
    // -blank position : 0, 3, 6 cannot go left

    if (this.blankPosition % this.columnCount != 0) {
      // -initialize new puzzle
      let newpuzzArray = this.getPuzzleArray();

      // -create new child node with new puzzle
      let child = new Node(newpuzzArray, this.columnCount);

      // -swap the blank space and left value
      child.swap(this.blankPosition, this.blankPosition - 1);

      // -set the direction
      child.direction = "RIGHT";

      // -set this node as the parent of the new child node
      child.parent = this;

      // -add new child to the children list of this node
      this.children.push(child);
    }

    // -moving down
    // -position : 0, 1, 2 cannot go up
    if (this.blankPosition - this.columnCount >= 0) {
      // -initialize new puzzle
      let newpuzzArray = this.getPuzzleArray();

      // -create new child node with new puzzle
      let child = new Node(newpuzzArray, this.columnCount);

      // -swap the blank space and down value
      child.swap(this.blankPosition, this.blankPosition - 3);

      // -set the direction
      child.direction = "DOWN";

      // -set this node as the parent of the new child node
      child.parent = this;

      // -add new child to the children list of this node
      this.children.push(child);
    }

    // -moving up
    // -position : 6, 7, 8 cannot go down
    if (this.blankPosition + this.columnCount < this.puzzle.length) {
      // -initialize new puzzle
      let newpuzzArray = this.getPuzzleArray();

      // -create new child node with new puzzle
      let child = new Node(newpuzzArray, this.columnCount);

      // -swap the blank space and up value
      child.swap(this.blankPosition, this.blankPosition + 3);

      // -set the direction
      child.direction = "UP";

      // -set this node as the parent of the new child node
      child.parent = this;

      // -add new child to the children list of this node
      this.children.push(child);
    }
  }

  // -function to check if a puzzle is already appeared in the list
  isContain(list) {
    for (let i = 0; i < list.length; i++) {
      // -if one of the puzzles in the list matches with this puzzle, then true
      if (this.isSame(list[i])) {
        return true;
      }
    }
    return false;
  }

  // -function to check if the two puzzles are the same
  isSame(node) {
    for (let i = 0; i < node.puzzle.length; i++) {
      if (this.puzzle[i] != node.puzzle[i]) {
        return false;
      }
    }
    return true;
  }
}
