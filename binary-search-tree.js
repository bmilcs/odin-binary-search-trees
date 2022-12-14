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

  insert(value, root = this.root) {
    if (root === null) return new Node(value);
    if (value > root.data) root.right = this.insert(value, root.right);
    if (value < root.data) root.left = this.insert(value, root.left);
    return root;
  }

  delete(value, root = this.root) {
    if (root === null) return root;

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

  minValue(root = this.root) {
    let minVal = root.data;
    while (root !== null) {
      minVal = root.data;
      root = root.left;
    }
    return minVal;
  }

  find(value) {
    return this.findBFS(value);
  }

  findBFS(targetValue) {
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.data === targetValue) return current;
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return null;
  }

  treeIncludesDFS(target, root = this.root) {
    if (root === null) return false;
    if (root.data === target) return true;
    return (
      this.treeIncludesDFS(target, root.left) ||
      this.treeIncludesDFS(target, root.right)
    );
  }

  // traverse tree in breadth-first (level-order)
  levelOrder(callback) {
    const queue = [this.root];
    const arrayOfValues = [];
    while (queue.length > 0) {
      const root = queue.shift();
      !callback ? arrayOfValues.push(root.data) : callback(root);
      if (root.left !== null) queue.push(root.left);
      if (root.right !== null) queue.push(root.right);
    }
    if (!callback) return arrayOfValues;
  }

  //
  // depth-first traversal
  //

  dfsRecursive(callback, root = this.root) {
    if (root === null) return [];
    const leftValues = this.dfsRecursive(callback, root.left);
    const rightValues = this.dfsRecursive(callback, root.right);
    if (!callback) return [root.data, ...leftValues, ...rightValues];
    callback(root);
  }

  // LDR: left, data, right (iterative)
  inorder(callback) {
    const stack = [this.root];
    let inorderArray = [];

    while (stack.length) {
      const current = stack.pop();
      if (current.right) stack.push(current.right);
      !callback ? inorderArray.push(current.data) : callback(current);
      if (current.left) stack.push(current.left);
    }

    if (!callback) return inorderArray;
  }

  // DLR: data, left, right
  preorder(callback) {
    const stack = [this.root];
    let inorderArray = [];

    while (stack.length) {
      const current = stack.pop();
      !callback ? inorderArray.push(current.data) : callback(current);
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }

    if (!callback) return inorderArray;
  }

  // LRD: left, right, data
  postorder(callback) {
    const stack = [this.root];
    let inorderArray = [];

    while (stack.length) {
      const current = stack.pop();
      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
      !callback ? inorderArray.push(current.data) : callback(current);
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

  // balanced: difference between heights of left & right subtree of every node is NOT more than 1
  isBalanced() {
    // traverse bst and push depth of all leaf nodes to an array
    const allLeafDepths = [];
    this.levelOrder((node) => {
      if (this.isLeaf(node)) allLeafDepths.push(this.depth(node));
    });

    // sort depths & compare highest/lowest values
    const allDepthsSorted = allLeafDepths.sort((a, b) => (a > b ? +1 : -1));
    return Math.abs(
      allDepthsSorted[0] - allDepthsSorted[allDepthsSorted.length - 1]
    ) > 1
      ? false
      : true;
  }

  reBalance() {
    // traverse array & fill array w/ all node data
    const arrayOfNodeValues = [];
    this.preorder((node) => {
      arrayOfNodeValues.push(node.data);
    });

    const sortedDedupedNodeValues = this.sortDedupedArray(arrayOfNodeValues);
    this.root = this.buildTree(sortedDedupedNodeValues);
  }

  print(node = this.root, prefix = " ", isLeft = true) {
    if (node.right !== null)
      this.print(node.right, `${prefix}${isLeft ? "???     " : "      "}`, false);
    console.log(`${prefix}${isLeft ? "????????????> " : "????????????> "}${node.data}`);
    if (node.left !== null)
      this.print(node.left, `${prefix}${isLeft ? "      " : "???     "}`, true);
  }
}

module.exports = {
  Tree: Tree,
};
