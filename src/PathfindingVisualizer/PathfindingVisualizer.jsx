import React, {Component} from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45;

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

    async visualDFS(grid, curr, finish) {
        // Delay each step of the algorithm by 10ms
        await new Promise(resolve => setTimeout(resolve, 10));

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
        if (row > 0) {
            neighbors.push(grid[row - 1][col]);
        }
        // Check the node to the right of the current node
        if (col < grid[0].length - 1) {
            neighbors.push(grid[row][col + 1]);
        }
        // Check the node below the current node
        if (row < grid.length - 1) {
            neighbors.push(grid[row + 1][col]);
        }
        // Check the node to the left of the current node
        if (col > 0) {
            neighbors.push(grid[row][col - 1]);
        }

        // Return all valid neighbors -> neighbors that are within the grid boundries
        return neighbors;
    }

    visualizeDFS() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        this.visualDFS(grid, startNode, finishNode);
    }

    render() {
        const {grid} = this.state;

        return (
            <>
                <button onClick={() => this.visualizeDFS()}>
                    Visualize DFS Algorithm
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
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            row={row}>
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
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isVisited: false,
    };
};
