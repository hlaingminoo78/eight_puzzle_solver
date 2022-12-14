class DFS {
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
      // -get the top node in to-search list
      let currentNode = openList[openList.length - 1];

      // -remove the top node from the searched list
      openList.splice(openList.length - 1, 1);

      // -mark the top node as already-searched node
      closedList.push(currentNode);

      // -if this puzzle is the goal, then trace the path to the root
      if (currentNode.isSame(target)) {
        // -trace back to the root
        pathSolution.push(currentNode);
        while (currentNode.parent != null) {
          pathSolution.push(currentNode.parent);
          currentNode = currentNode.parent;
        }

        console.log(`Goal Found! Total Looping = ${looping}`);
        return pathSolution;
      }

      // -add the next possible nodes from this current puzzle position
      currentNode.expandChildNodes();

      for (let i = currentNode.children.length - 1; i >= 0; i--) {
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
    console.log(`Total Looping = ${looping}`);
    return pathSolution;
  }
}
