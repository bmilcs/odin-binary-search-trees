class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    // parse input
    console.log("\nBalanced Binary Search Tree from an Array");
    console.log(`- raw input:      ${array}`);
    array = this.sortDedupeArray(array);
    console.log(`- sorted/deduped: ${array}\n`);

    // create balanced bst from array
    this.root = this.buildTree(array, 0, array.length - 1);
    this.print();
  }

  sortDedupeArray(array) {
    return [...new Set(array)].sort((a, b) => (a > b ? +1 : -1));
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.ceil((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  print(node = this.root, prefix = " ", isLeft = true) {
    if (node.right !== null)
      this.print(node.right, `${prefix}${isLeft ? "│     " : "      "}`, false);
    console.log(`${prefix}${isLeft ? "└───> " : "┌───> "}${node.data}`);
    if (node.left !== null)
      this.print(node.left, `${prefix}${isLeft ? "      " : "│     "}`, true);
  }

  isLeaf(node) {
    if (node.left === null && node.right === null) return true;
    return false;
  }

  // insert value into bst
  insert(value, node = this.root) {
    if (!this.isLeaf(node)) {
      node.left === null
        ? this.insert(value, node.right)
        : this.insert(value, node.left);
      return;
    }

    value < node.value
      ? (node.left = new Node(value))
      : (node.right = new Node(value));
  }

  delete(value) {
    // delete value from bst
  }

  find(value) {
    // finds node from a given value & returns node
  }

  levelOrder(aFunction) {
    // accepts another function as parameter
    // - traverse tree in breadth-first (level-order)
    // - provide each node as argument to provided function
    // - create iterative and recursive versions
    // return array of values if NO function is provided
    // * use array acting as a QUEUE to keep track of child nodes
    //   that you have yet to traverse & add new ones to list
  }

  inorder(aFunction) {
    // accepts function as parameter
    // - traverse tree in depth-first order
    // - yield each node to provided function given as argument
    // return array of values if no function given
  }

  preorder(aFunction) {
    // accepts function as parameter
    // - traverse tree in depth-first order
    // - yield each node to provided function given as argument
    // return array of values if no function given
  }

  postorder(aFunction) {
    // accepts function as parameter
    // - traverse tree in depth-first order
    // - yield each node to provided function given as argument
    // return array of values if no function given
  }

  height(node) {
    // accept node as parameter
    // return its height
    //        # of edges in the longest path FROM a node TO a leaf node
  }

  depth(node) {
    // accept node as parameter
    // return its depth
    //            # of edges in path FROM a node TO root node
  }

  isBalanced() {
    // check if tree is balanced
    //  - balanced = difference between heights of left & right subtree of every node is NOT more than 1
  }

  reBalance() {
    // rebalance an unbalanced tree
    // - traversal method to provide a new array to the buildTree function
  }
}

//
// tests
//

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
bst.insert(50);
bst.insert(5);
bst.print();
