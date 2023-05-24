import React, {Component} from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";

let START_NODE_ROW = 10;
let START_NODE_COL = 5;
let FINISH_NODE_ROW = 14;
let FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            algorithm: "DFS",
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});  
    }

    handleMouseDown(row, col) {
        const {grid} = this.state;
        this.setState({mouseIsPressed: true});
        this.toggleWall(grid, row, col);
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const {grid} = this.state;
        this.toggleWall(grid, row, col);
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    toggleWall(grid, row, col) {
        if (document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className === 'node node-visited') return;

        const node = grid[row][col];
        if (!node.isStart && !node.isFinish && !node.isVisited) {
            node.isWall = !node.isWall;
            document.getElementById(`node-${row}-${col}`).className =
                `node ${node.isWall ? 'node-wall' : ''}`;
        }
    }

    clearPath() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];

        // Prevents the user from clearing path while an algorithm is in progress
        if (document.getElementById(`node-${startNode.row}-${startNode.col}`).className !== 'node node-visited') {
            this.clearPathHelper(grid);
            return true;
        }
        return false;
    }

    clearPathHelper(grid) {
        for (const row of grid) {
            for (const node of row) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node ${node.isStart ? 'node-start' : node.isFinish ? 'node-finish' : node.isWall ? 'node-wall' : ''}`;
                node.isVisited = false;
                node.prev = null;
            }
        }
    }

    clearAll() {
        if (!this.clearPath()) {return;} // If clearPath failed, then an algorithm is already in progress
        const newGrid = clearWalls(this.state.grid);
        this.setState({grid: newGrid});
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
        if (curr === grid[START_NODE_ROW][START_NODE_COL]) { // Algorithm finished without finding the finish node
            document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className =
                'node node-start';
        }
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

        // Return all valid neighbors -> neighbors that are within the grid boundries and are not walls
        return neighbors.filter(neighbor => !neighbor.isWall);
    }

    visualizeDFS() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        this.visualDFS(grid, startNode, finishNode)
    }

    async visualBFS(grid, start, finish) {
        const queue = [];
        queue.push(start);
        start.isVisited = true;

        while (queue.length) {
            await new Promise(resolve => setTimeout(resolve, 2));
            let curr = queue.shift();
            document.getElementById(`node-${curr.row}-${curr.col}`).className =
                'node node-visited'; // Visually document visit here so it matches when the node is popped off the queue
            
            if (curr === finish) {
                while (curr !== null) {
                    await new Promise(resolve => setTimeout(resolve, 20));
                    document.getElementById(`node-${curr.row}-${curr.col}`).className =
                        'node node-correct-path';
                    curr = curr.prev;
                }
                return; // Algorithm visualization complete
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
        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className =
            'node node-start';
    }

    visualizeBFS() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        this.visualBFS(grid, startNode, finishNode);
    }

    visualizeAlgorithm() {
        if (!this.clearPath()) {return;} // If clearPath failed, then an algorithm is already in progress

        const {algorithm} = this.state;
        if (algorithm === "DFS") {
            this.visualizeDFS();
        } else if (algorithm === "BFS") {
            this.visualizeBFS();
        }
    }

    handleAlgorithmChange() {
        this.setState({algorithm: document.getElementById("algorithm").value});
    }

    render() {
        const { grid } = this.state;
        const { algorithm } = this.state;

        return (
            <>
                <h1>Pathfinding Visualizer</h1>

                <select id="algorithm" onChange={() => this.handleAlgorithmChange()}>
                    <option value="DFS">Depth-First Search</option>
                    <option value="BFS">Breadth-First Search</option>
                </select>

                <button onClick={() => this.visualizeAlgorithm()}>
                    Visualize {algorithm}
                </button>

                <button onClick={() => this.clearPath()}>
                    Clear Path
                </button>

                <button onClick={() => this.clearAll()}>
                    Clear All
                </button>

                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isFinish, isStart, isWall} = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()} >
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
        isWall: false,
        prev: null,
    };
};

const clearWalls = (grid) => {
    const newGrid = grid.slice();
    for (const row of newGrid) {
        for (const node of row) {
            const newNode = {
                ...node,
                isWall: false,
            };
            grid[node.row][node.col] = newNode;
        }
    }
    return newGrid;
};
