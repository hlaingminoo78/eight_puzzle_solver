class BFS {
  static search(root, target) {
    // -save the path to the solution
    let pathSolution = new Array();

    // -to-search list
    let openList = new Array();

    // -already searched list
    let closedList = new Array();

    // -put the root node to the to-search list
    openList.push(root);

    // -save number of iterations
    let looping = 0;

    // -variable to limit the number of loop
    let limit = 5000;

    // -keep find until there are elements in to-search list
    while (openList.length > 0 && looping < limit) {
      // -get the top node in the to-search list
      let currentNode = openList[0];

      // -remove the first node from the to-search list
      openList.splice(0, 1);

      // -mark the first node as already-searched node
      closedList.push(currentNode);

      // -if this puzzle is the goal, then trace the path to the root
      if (currentNode.isSame(target)) {
        pathSolution.push(currentNode);

        while (currentNode.parent != null) {
          pathSolution.push(currentNode.parent);
          currentNode = currentNode.parent;
        }

        console.log(`Goal Found! Total Looping = ${looping}`);
        return pathSolution;
      }

      // -add the next possible nodes from the current puzzle position
      currentNode.expandChildNodes();

      for (let i = 0; i < currentNode.children.length; i++) {
        // -if the new child node is neithor in the already-searched list nor to-search list,
        // -then add the new child to to-search list
        if (
          !currentNode.children[i].isContain(closedList) &&
          !currentNode.children[i].isContain(openList)
        ) {
          openList.push(currentNode.children[i]);
        }
      }

      // -increse the loop count
      looping++;
    }
    console.log(`Goal Not Found! Total Looping = ${looping}`);
    return pathSolution;
  }
}
