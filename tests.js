const trees = require("./binary-search-tree");
const Tree = trees.Tree;

//
// Balanced Binary Search Tree Tests
//

printTitle("creating a balanced binary tree");
const bst = new Tree([10, 1, 3, 9, 4, 7, 14, 2, 4, 5, 13, 12]);

printTest("balanced", bst.isBalanced());

printTitle("print tree in level, pre, post & in order");
printAllTraversalMethods();

printTitle("unbalancing tree: adding nodes from 100 to 105");
bst.insert(100);
bst.insert(101);
bst.insert(102);
bst.insert(103);
bst.insert(104);
bst.insert(105);
printTest("balanced", bst.isBalanced());
printTest("height total", bst.height());

printTitle("rebalancing tree");
bst.reBalance();

printTest("balanced", bst.isBalanced());

printTitle("print tree in level, pre, post & in order");
printAllTraversalMethods();

printTitle("final results");
bst.print();

// utility functions

function printAllTraversalMethods() {
  printTest("level order", bst.levelOrder());
  printTest("dfs preorder", bst.preorder());
  printTest("dfs postorder", bst.postorder());
  printTest("dfs inorder", bst.inorder());
}

function printTest(description, method) {
  console.log(`${description}:\t${method}`);
}

function printTitle(misc) {
  console.log("\n");
  console.log(`* ${misc}`);
  printSpacer();
}

function printSpacer() {
  console.log("--------------------------------------------------------");
}
