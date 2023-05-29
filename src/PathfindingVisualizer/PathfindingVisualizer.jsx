import React, {Component} from "react";

import Node from "./Node/Node";
import { InstructionsModal } from "./Instructions/Instructions";
import { Legend } from "./Legend/Legend";

import { visualDFS, visualDFS_NA } from "./Algorithms/Pathfinding/dfs";
import { visualBFS, visualBFS_NA } from "./Algorithms/Pathfinding/bfs";

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
            showInstructions: true,
            mouseIsPressed: false,
            movingStart: false,
            movingFinish: false,
            algorithmInProgress: false,
            algorithmVisualized: false,
            algorithm: "",
            algorithmInfo: "",
            delay: -1,
        };
    }

    componentDidMount() {
        this.setState({grid: getInitialGrid(), algorithmInfo: this.configAlgorithmInfo(this.state.algorithm)});
    }

    toggleInstructionsModal() {
        this.setState({showInstructions: !this.state.showInstructions});
    }

    handleMouseDown(row, col) {
        if (this.state.algorithmInProgress) return this.handleMouseUp();

        const { grid } = this.state;
        this.setState({mouseIsPressed: true});

        if (grid[row][col].isStart) {
            this.setState({movingStart: true});
        } else if (grid[row][col].isFinish) {
            this.setState({movingFinish: true});
        } else if (!grid[row][col].isVisited) {
            this.toggleWall(grid, row, col);
        }
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed || this.state.algorithmInProgress) return this.handleMouseUp();
        
        const { grid } = this.state;
        const node = grid[row][col];

        if (this.state.movingStart && !node.isFinish && !node.isWall) {
            this.moveStart(grid, row, col);
            if (this.state.algorithmVisualized) this.visualizeAlgorithmNoAnimation(this.state.algorithm);
        } else if (this.state.movingFinish && !node.isStart && !node.isWall) {
            this.moveFinish(grid, row, col);
            if (this.state.algorithmVisualized) this.visualizeAlgorithmNoAnimation(this.state.algorithm);
        } else if (!node.isStart && !node.isFinish && !node.isVisited && !this.state.movingStart && !this.state.movingFinish) {
            this.toggleWall(grid, row, col);
        }
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false, movingStart: false, movingFinish: false});
    }

    moveStart(grid, row, col) {
        const prevStartNode = grid[START_NODE_ROW][START_NODE_COL];
        START_NODE_ROW = row;
        START_NODE_COL = col;

        prevStartNode.isStart = false;
        grid[START_NODE_ROW][START_NODE_COL].isStart = true;

        document.getElementById(`node-${prevStartNode.row}-${prevStartNode.col}`).className =
            'node';
        document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className =
            'node node-start';
    }

    moveFinish(grid, row, col) {
        const prevFinishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        FINISH_NODE_ROW = row;
        FINISH_NODE_COL = col;

        prevFinishNode.isFinish = false;
        grid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = true;

        document.getElementById(`node-${prevFinishNode.row}-${prevFinishNode.col}`).className =
            'node';
        document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className =
            'node node-finish';
    }

    toggleWall(grid, row, col) {
        const node = grid[row][col];
        node.isWall = !node.isWall;
        document.getElementById(`node-${row}-${col}`).className =
            `node ${node.isWall ? 'node-wall' : ''}`;
    }

    clearPath() {
        // Prevents the user from clearing path while an algorithm is in progress
        if (this.state.algorithmInProgress) return false;
        
        const { grid } = this.state;
        this.clearPathHelper(grid);
        this.setState({algorithmVisualized: false});
        return true;
    }

    clearPathHelper(grid) {
        for (const row of grid) {
            for (const node of row) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node ${node.isStart ? 'node-start' : node.isFinish ? 'node-finish' : node.isWall ? 'node-wall' : ''}`;
                node.isVisited = false;
                node.distance = Infinity;
                node.prev = null;
            }
        }
    }

    clearAll() {
        if (!this.clearPath()) return; // If clearPath failed, then an algorithm is already in progress
        const newGrid = clearWalls(this.state.grid);
        this.setState({grid: newGrid, algorithmVisualized: false});
    }

    async visualizeAlgorithm(algorithm) {
        if (!this.clearPath()) return; // If clearPath failed, then an algorithm is already in progress
        this.setState({algorithmInProgress: true, algorithmVisualized: false});

        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const { delay } = this.state;

        if (algorithm === "DFS") {
            await visualDFS(grid, startNode, finishNode, delay);
        } else if (algorithm === "BFS") {
            await visualBFS(grid, startNode, finishNode, delay);
        } else if (algorithm === "Djikstra") {
            await visualBFS(grid, startNode, finishNode, delay);
        }
        this.setState({algorithmInProgress: false, algorithmVisualized: true});
    }

    visualizeAlgorithmNoAnimation(algorithm) {
        if (!this.clearPath()) return; // If clearPath failed, then an algorithm is already in progress

        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

        if (algorithm === "DFS") {
            visualDFS_NA(grid, startNode, finishNode);
        } else if (algorithm === "BFS") {
            visualBFS_NA(grid, startNode, finishNode);
        } else if (algorithm === "Djikstra") {
            visualBFS_NA(grid, startNode, finishNode);
        }
        this.setState({algorithmVisualized: true});
    }


    handleAlgorithmChange() {
        const newAlgorithm = document.getElementById("algorithm").value;
        this.setState({algorithm: newAlgorithm, algorithmInfo: this.configAlgorithmInfo(newAlgorithm)});
        if (this.state.algorithmVisualized) this.visualizeAlgorithmNoAnimation(newAlgorithm);
    }

    configAlgorithmInfo(algorithm) {
        let algorithmInfo = "";

        if (algorithm === "") {
            algorithmInfo = "Select an algorithm and a speed to get started!";
        } else if (algorithm === "DFS") {
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
            delay = 32;
        } else if (speed === "Slow") {
            delay = 24;
        } else if (speed === "Medium") {
            delay = 17;
        } else if (speed === "Fast") {
            delay = 10;
        } else if (speed === "VeryFast") {
            delay = 2;
        }
        return delay;
    }

    render() {
        const { grid } = this.state;
        const { algorithm } = this.state;
        const { algorithmInfo } = this.state;
        const { algorithmInProgress } = this.state;

        return (
            <>
                <h1>Interactive Pathfinding Visualizer</h1>

                <select id="algorithm" onChange={() => this.handleAlgorithmChange()} disabled={algorithmInProgress}>
                    {algorithm === "" && 
                    <option value="" disabled selected>
                        Select an algorithm...
                    </option>}

                    <option value="DFS">Depth-First Search</option>
                    <option value="BFS">Breadth-First Search</option>
                    <option value="Djikstra">Djikstra's Algorithm</option>
                </select>

                <select id="speed" onChange={() => this.handleSpeedChange()} disabled={algorithmInProgress}>
                    {this.state.delay === -1 && 
                    <option value="" disabled selected>
                        Select a speed...
                    </option>}

                    <option value="VeryFast">Very Fast</option>
                    <option value="Fast">Fast</option>
                    <option value="Medium">Medium</option>
                    <option value="Slow">Slow</option>
                    <option value="VerySlow">Very Slow</option>
                </select>

                <button onClick={() => this.visualizeAlgorithm(algorithm)} 
                  disabled={algorithmInProgress || algorithm === "" || this.state.delay === -1}>
                    Visualize {algorithm}
                </button>

                <button onClick={() => this.clearPath()} disabled={algorithmInProgress}>
                    Clear Path
                </button>

                <button onClick={() => this.clearAll()} disabled={algorithmInProgress}>
                    Clear All
                </button>

                <button onClick={() => this.toggleInstructionsModal()}>How to use</button>
                    <InstructionsModal
                    isOpen={this.state.showInstructions}
                    onClose={() => this.toggleInstructionsModal()}
                    />

                <Legend />

                <div id="algorithm-info">{algorithmInfo}</div>

                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isFinish, isStart, isWall} = node;
                                    return (
                                        <Node
                                            movingStart={this.state.movingStart}
                                            movingFinish={this.state.movingFinish}
                                            algorithmVisualized={this.state.algorithmVisualized}
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}>
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
