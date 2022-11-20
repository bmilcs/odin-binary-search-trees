class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    const parsedArray = this.sortDedupedArray(array);
    this.root = this.buildTree(parsedArray);
  }

  sortDedupedArray(array) {
    return [...new Set(array)].sort((a, b) => (a > b ? +1 : -1));
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.ceil((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  isLeaf(node) {
    if (node.left === null && node.right === null) return true;
    return false;
  }

  // insert value into bst
  // insert(value, node = this.root) {
  //   // if node is NOT a leaf
  //   if (!this.isLeaf(node)) {
  //     // and node.left doesn't exist
  //     node.left === null
  //       ? this.insert(value, node.right) // right must contain a value, so traverse to it.
  //       : this.insert(value, node.left); // else traverse to the left node
  //     return;
  //   }

  //   // arrived a leaf: safe to add new node
  //   value < node.value
  //     ? (node.left = new Node(value))
  //     : (node.right = new Node(value));
  // }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);
    if (value > root.data) root.right = this.insert(value, root.right);
    if (value < root.data) root.left = this.insert(value, root.left);
    return root;
  }

  // delete value from bst
  delete(value, root = this.root) {
    if (root === null) return root;
    // recurse through bst, comparing values
    if (value < root.data) root.left = this.delete(value, root.left);
    else if (value > root.data) root.right = this.delete(value, root.right);
    else {
      // value is NOT greater/less than current node (found it!)
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;

      root.data = this.minValue(root.right);
      root.right = this.delete(root.data, root.right);
    }
    return root;
  }

  // return smallest value in bst
  minValue(root = this.root) {
    let minVal = root.data;
    while (root !== null) {
      minVal = root.data;
      root = root.left;
    }
    return minVal;
  }

  // finds node from a given value & returns node
  find(value) {
    let foundNode = null;
    this.levelOrder((node) => {
      if (node.data === value) foundNode = node;
    });
    return foundNode ? foundNode : null;
  }

  // traverse tree in breadth-first (level-order)
  levelOrder(callback) {
    const queue = [this.root];
    const arrayOfValues = [];
    while (queue.length > 0) {
      const root = queue.shift();
      // return array of values if NO function is provided
      if (!callback) arrayOfValues.push(root.data);
      // provide each node as argument to provided function
      else callback(root);
      if (root.left !== null) queue.push(root.left);
      if (root.right !== null) queue.push(root.right);
    }
    if (!callback) return arrayOfValues;
  }

  // depth-first traversal: LDR
  inorder(callback) {
    const stack = [this.root];
    let inorderArray = [];

    while (stack.length) {
      const current = stack.pop();
      if (current.right) stack.push(current.right);
      if (!callback) inorderArray.push(current.data);
      else callback(current);
      if (current.left) stack.push(current.left);
    }

    if (!callback) return inorderArray;
  }

  // depth-first traversal: DLR
  preorder(callback) {
    const stack = [this.root];
    let inorderArray = [];

    while (stack.length) {
      const current = stack.pop();
      if (!callback) inorderArray.push(current.data);
      else callback(current);
      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }

    if (!callback) return inorderArray;
  }

  // depth-first traversal: LRD
  postorder(callback) {
    const stack = [this.root];
    let inorderArray = [];

    while (stack.length) {
      const current = stack.pop();
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
      if (!callback) inorderArray.push(current.data);
      else callback(current);
    }

    if (!callback) return inorderArray;
  }

  height(root = this.root) {
    if (root === null) return 0;
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(targetNode) {
    // accept node as parameter
    // return its depth
    //            # of edges in path FROM a node TO root node
    let totalDepth = 0;
    let current = this.root;

    while (current.data) {
      ++totalDepth;
      if (targetNode.data > current.data) current = current.right;
      else if (targetNode.data < current.data) current = current.left;
      else return totalDepth;
    }
    return "error: unable to locate node!";
  }

  isBalanced() {
    // check if tree is balanced
    //  - balanced = difference between heights of left & right subtree of every node is NOT more than 1
  }

  reBalance() {
    // rebalance an unbalanced tree
    // - traversal method to provide a new array to the buildTree function
  }

  print(node = this.root, prefix = " ", isLeft = true) {
    if (node.right !== null)
      this.print(node.right, `${prefix}${isLeft ? "│     " : "      "}`, false);
    console.log(`${prefix}${isLeft ? "└───> " : "┌───> "}${node.data}`);
    if (node.left !== null)
      this.print(node.left, `${prefix}${isLeft ? "      " : "│     "}`, true);
  }
}

//
// tests
//

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// traversal
console.log(`level order:\t${bst.levelOrder()}`);
console.log(`dfs inorder:\t${bst.inorder()}`);
console.log(`dfs preorder:\t${bst.preorder()}`);
console.log(`dfs postorder:\t${bst.postorder()}`);

console.log(`min value: ${bst.minValue()}`);

bst.insert(5);
bst.insert(51);
bst.print();

bst.delete(4);
bst.print();

console.log(`height: ${bst.height()}`);
console.log(`depth: ${bst.depth(bst.root.right.left)}`);
