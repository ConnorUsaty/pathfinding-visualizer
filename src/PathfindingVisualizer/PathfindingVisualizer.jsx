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
            algorithmInfo: "Depth-first search (DFS) is an unweighted algorithm and does NOT guarentee the shortest path.",
            delay: 2,
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
        if (!this.clearPath()) return; // If clearPath failed, then an algorithm is already in progress
        const newGrid = clearWalls(this.state.grid);
        this.setState({grid: newGrid});
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

    async visualDFS(grid, curr, finish, delay) {
        // Delay each step of the algorithm by chosen delay
        await new Promise(resolve => setTimeout(resolve, delay));

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
                if (await this.visualDFS(grid, neighbor, finish, delay)) { // Finish node found from this path
                    // Every 20ms, show the next node in the correct path
                    await new Promise(resolve => setTimeout(resolve, 20));
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
    
    async visualBFS(grid, start, finish, delay) {
        const queue = [];
        queue.push(start);
        start.isVisited = true;
        console.log(delay);
        console.log(this.state.delay);

        while (queue.length) {
            await new Promise(resolve => setTimeout(resolve, delay));
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

    visualizeAlgorithm() {
        if (!this.clearPath()) return; // If clearPath failed, then an algorithm is already in progress

        const { algorithm } = this.state;
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const { delay } = this.state;

        if (algorithm === "DFS") {
            this.visualDFS(grid, startNode, finishNode, delay);
        } else if (algorithm === "BFS") {
            this.visualBFS(grid, startNode, finishNode, delay);
        } else if (algorithm === "Djikstra") {
            this.visualBFS(grid, startNode, finishNode, delay);
        }
    }

    handleAlgorithmChange() {
        const newAlgorithm = document.getElementById("algorithm").value;
        this.setState({algorithm: newAlgorithm});
        this.setState({algorithmInfo: this.configAlgorithmInfo(newAlgorithm)});
    }

    configAlgorithmInfo(algorithm) {
        let algorithmInfo = "";

        if (algorithm === "DFS") {
            algorithmInfo = "Depth-first search (DFS) is an unweighted algorithm and does NOT guarentee the shortest path.";
        } else if (algorithm === "BFS") {
            algorithmInfo = "Breadth-first search (BFS) is an unweighted algorithm and DOES guarentee the shortest path.";
        } else if (algorithm === "Djikstra") {
            algorithmInfo = "Djikstra's algorithm is a weighted algorithm and DOES guarentee the shortest path.";
        }
        return algorithmInfo;
    }

    handleSpeedChange() {
        const newSpeed = document.getElementById("speed").value;
        this.setState({delay: this.configDelay(newSpeed)});
    }

    configDelay(speed) {
        let delay = 0;

        if (speed === "VerySlow") {
            delay = 28;
        } else if (speed === "Slow") {
            delay = 21;
        } else if (speed === "Medium") {
            delay = 15;
        } else if (speed === "Fast") {
            delay = 9;
        } else if (speed === "VeryFast") {
            delay = 2;
        }
        return delay;
    }

    render() {
        const { grid } = this.state;
        const { algorithm } = this.state;
        const { algorithmInfo } = this.state;

        return (
            <>
                <h1>Interactive Pathfinding Visualizer</h1>

                <select id="algorithm" onChange={() => this.handleAlgorithmChange()}>
                    <option value="DFS">Depth-First Search</option>
                    <option value="BFS">Breadth-First Search</option>
                    <option value="Djikstra">Djikstra's Algorithm</option>
                </select>

                <button onClick={() => this.visualizeAlgorithm()}>
                    Visualize {algorithm}
                </button>

                <select id="speed" onChange={() => this.handleSpeedChange()}>
                    <option value="VeryFast">Very Fast</option>
                    <option value="Fast">Fast</option>
                    <option value="Medium">Medium</option>
                    <option value="Slow">Slow</option>
                    <option value="VerySlow">Very Slow</option>
                </select>

                <button onClick={() => this.clearPath()}>
                    Clear Path
                </button>

                <button onClick={() => this.clearAll()}>
                    Clear All
                </button>

                <div id="algorithm-info">{algorithmInfo}</div>

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
        distance: Infinity,
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
