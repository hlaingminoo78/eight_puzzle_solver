class AStar {
  static search(root, target) {
    // -save the path to the solution
    let pathSolution = new Array();

    // -to-search list
    let openList = new Array();

    // -already searched list
    let closedList = new Array();

    // -update toGoal steps
    root.setStepToGoal(target);

    // -put the root node to the to-search list
    openList.push(root);

    // -save number of iterations
    let looping = 0;

    // -variable to limit the number of loop
    let limit = 5000;

    // -keep find until there are elements in to-search list
    while (openList.length > 0 && looping < limit) {
      // -find and get the node with lowest cost and its index in the to-search list
      let currentNode = openList[0];
      let currentNodeIndex = 0;
      for (let i = 1; i < openList.length; i++) {
        if (openList[i].cost < currentNode.cost) {
          currentNode = openList[i];
          currentNodeIndex = i;
        }
      }

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
      // -remove the currentNode from the to-search list
      openList.splice(currentNodeIndex, 1);

      // -mark the currentNode as already-searched node
      closedList.push(currentNode);

      // -add the next possible nodes from the current puzzle position
      currentNode.expandChildNodes();

      for (let i = 0; i < currentNode.children.length; i++) {
        // -if the new child node is neithor in the already-searched list nor to-search list,
        // -then add the new child to to-search list
        if (
          !currentNode.children[i].isContain(closedList) &&
          !currentNode.children[i].isContain(openList)
        ) {
          // -update toGoal steps
          currentNode.children[i].setStepToGoal(target);

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
