const trees = require("./binary-search-tree");
const Tree = trees.Tree;

//
// Balanced Binary Search Tree Tests
//

// create binary search tree
printMisc("new balanced binary tree created");
const bst = new Tree([10, 1, 3, 9, 4, 7, 14, 2, 4, 5, 13, 12]);

// confirm that it'se balanced
printTest("balanced", bst.isBalanced());

printMisc("print tree in level, pre, post & in order");
printAllTraversalMethods();

// unbalance tree: add several numbers > 100
printMisc("adding nodes from 100 to 105");
bst.insert(100);
bst.insert(101);
bst.insert(102);
bst.insert(103);
bst.insert(104);
bst.insert(105);

// confirm that tree is unbalanced
printTest("balanced", bst.isBalanced());

printMisc("rebalancing tree");
bst.reBalance();
printTest("balanced", bst.isBalanced());

printMisc("print all trees in level, pre, post & in order");
printAllTraversalMethods();

printMisc("pretty print the binary search tree");
bst.print();

function printAllTraversalMethods() {
  printTest("level order", bst.levelOrder());
  printTest("dfs preorder", bst.preorder());
  printTest("dfs postorder", bst.postorder());
  printTest("dfs inorder", bst.inorder());
}

function printSpacer() {
  console.log("--------------------------------------------------------");
}

function printTest(description, method) {
  console.log(`${description}:\t${method}`);
}

function printMisc(misc) {
  console.log("\n");
  console.log(`* ${misc}`);
  printSpacer();
}
