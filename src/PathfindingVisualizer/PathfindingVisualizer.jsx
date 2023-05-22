import React, {Component} from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 14;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    clearBoard() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        // Prevents the user from clearing the board while an algorithm is in progress
        if (document.getElementById(`node-${startNode.row}-${startNode.col}`).className !== 'node node-visited') {
            this.clearBoardHelper(grid, startNode);
            return true;
        }
        return false;
    }

    clearBoardHelper(grid, curr) {
        curr.isVisited = false;
        curr.prev = null;
        const extraClassName = curr.isFinish
            ? 'node-finish'
            : curr.isStart
            ? 'node-start'
            : '';

        document.getElementById(`node-${curr.row}-${curr.col}`).className =
            `node ${extraClassName}`;
        
        const neighbors = this.getValidNeighbors(grid, curr);
        for (const neighbor of neighbors) {
            if (neighbor.isVisited) {
                this.clearBoardHelper(grid, neighbor);
            }
        }
    }

    async visualDFS(grid, curr, finish) {
        // Delay each step of the algorithm by 7ms
        await new Promise(resolve => setTimeout(resolve, 7));

        // Document the current node as visited & show it visually
        curr.isVisited = true;
        document.getElementById(`node-${curr.row}-${curr.col}`).className =
            'node node-visited';

        // If the current node is the finish node, then we can stop the algorithm
        if (curr === finish) {
            document.getElementById(`node-${curr.row}-${curr.col}`).className =
                'node node-correct-path';
            return true;
        }

        // Get the valid neighbors of the current node
        const neighbors = this.getValidNeighbors(grid, curr);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                if (await this.visualDFS(grid, neighbor, finish)) { // Finish node found from this path
                    // Every 10ms, show the next node in the correct path
                    await new Promise(resolve => setTimeout(resolve, 10));
                    document.getElementById(`node-${curr.row}-${curr.col}`).className =
                        'node node-correct-path';
                    return true;
                }
            }
        }
        // If we reach this point, then we've traversed all the nodes in the grid without finding the finish node
        return false;
    }
    
    getValidNeighbors(grid, node) {
        const neighbors = [];
        const { row, col } = node;

        // Check the node above the current node
        if (row > 0) {neighbors.push(grid[row - 1][col]);}
        // Check the node to the right of the current node
        if (col < grid[0].length - 1) {neighbors.push(grid[row][col + 1]);}
        // Check the node below the current node
        if (row < grid.length - 1) {neighbors.push(grid[row + 1][col]);}
        // Check the node to the left of the current node
        if (col > 0) {neighbors.push(grid[row][col - 1]);}

        // Return all valid neighbors -> neighbors that are within the grid boundries
        return neighbors;
    }

    visualizeDFS() {
        if (!this.clearBoard()) return; // If clear board failed, then an algorithm is already in progress

        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        this.visualDFS(grid, startNode, finishNode);
    }

    async visualBFS(grid, start, finish) {
        const queue = [];
        queue.push(start);
        start.isVisited = true;

        while (!!queue.length) {
            await new Promise(resolve => setTimeout(resolve, 2));
            var curr = queue.shift();
            document.getElementById(`node-${curr.row}-${curr.col}`).className =
                'node node-visited'; // Visually document visit here so it matches when the node is popped off the queue
            
            if (curr === finish) {
                while (curr !== null) {
                    await new Promise(resolve => setTimeout(resolve, 20));
                    document.getElementById(`node-${curr.row}-${curr.col}`).className =
                        'node node-correct-path';
                    curr = curr.prev;
                }
                return;
            }

            const neighbors = this.getValidNeighbors(grid, curr);
            for (const neighbor of neighbors) {
                if (!neighbor.isVisited) {
                    neighbor.prev = curr;
                    neighbor.isVisited = true; // Set property here to avoid double pushing
                    queue.push(neighbor);
                }
            }
        }
    }

    visualizeBFS() {
        if (!this.clearBoard()) return; // If clear board failed, then an algorithm is already in progress

        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        this.visualBFS(grid, startNode, finishNode);
    }

    render() {
        const {grid} = this.state;

        return (
            <>
                <button onClick={() => this.visualizeDFS()}>
                    Visualize DFS Algorithm
                </button>
                
                <button onClick={() => this.visualizeBFS()}>
                    Visualize BFS Algorithm
                </button>

                <button onClick={() => this.clearBoard()}>
                    Reset Grid
                </button>

                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isFinish, isStart} = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}>
                                        </Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isVisited: false,
        prev: null,
    };
};
