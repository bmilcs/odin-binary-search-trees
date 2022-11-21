# Odin Project #15: Binary Search Trees

Welcome to Bryan Miller's Recursion Project, the [fifteenth assignment](https://www.theodinproject.com/lessons/javascript-binary-search-trees) within the Odin Project curriculum. The goal of this repo is to practice the following skill sets:

- Vanilla JavaScript
  - Recursion & Iteration
- Computer Science Data Structures
  - Balanced Binary Search Treestests

## Summary

A Binary Search Tree is a data structure that organizes data in a tree-like way. All Binary Search Trees are comprised of a simpler data structure called nodes and each node contains 3 properties:

- `data` stores a value
- `left` points to a node who's value is less than `data`
- `right` points to a node who's value is greater than its `data`

Binary Search Trees begin with a single `root` node and all values added to the tree after the root node are inserted below it. If a node is less than the root node, it is inserted in the `left` property of the root node. If a node is greater, it's inserted in the root node's `right` property.

There are two primary means of traversing a BST:

**Breadth-first** (Level-first)

- Visits all nodes on each "level" of the tree before moving on
- Utilizes a `queue`: first in, first out (FIFO)

**Depth-first**:

- Visits all nodes on a single side of the tree (left or right) before moving on
- Utilizes a `stack`: last in, first out
- Broken down into 3 types:
  - Preorder: Root, Left, Right
  - Inorder: Left, Root, Right
  - Postorder: Left, Right, Root

## Screenshots

![screenshot #1](./img/screenshot-1.png)

![screenshot #2](./img/screenshot-2.png)

## Links

- [My Odin Project Progress](https://github.com/bmilcs/odin-project)

## Deployment

```sh
# clone repo
git clone https://github.com/bmilcs/odin-binary-search-trees

# run script (*requires node)
node tests.js
```
