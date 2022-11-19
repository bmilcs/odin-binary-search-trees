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
    let mid = Math.ceil((start + end) / 2);
    let root = new Node(array[mid]);
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
}

//
// tests
//

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
