import React, {Component} from "react";

import { InstructionsModal } from "./Instructions/Instructions";
import { Header } from "./Header/Header";
import Menu from "./Menu/Menu";
import Node from "./Node/Node";

import { visualDFS, visualDFS_NA } from "./Algorithms/Pathfinding/dfs";
import { visualBFS, visualBFS_NA } from "./Algorithms/Pathfinding/bfs";
import { visualDjikstra, visualDjikstra_NA } from "./Algorithms/Pathfinding/djikstra";
import { visualAStar, visualAStar_NA } from "./Algorithms/Pathfinding/aStar";

import { randomMaze } from "./Algorithms/MazeGeneration/random";
import { recursiveDivisionMaze } from "./Algorithms/MazeGeneration/recursiveDivision";

import "./PathfindingVisualizer.css";

let START_NODE_ROW = 1;
let START_NODE_COL = 1;
let FINISH_NODE_ROW = 2;
let FINISH_NODE_COL = 2;

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
            maze: "",
            heuristic: "",
        };
    }

    componentDidMount() {
        // Initializes the grid and algorithmInfo
        this.setState({grid: getInitialGrid(), algorithmInfo: this.configAlgorithmInfo(this.state.algorithm)});
    }

    toggleInstructionsModal() {
        // Toggles the instructions modal
        this.setState({showInstructions: !this.state.showInstructions});
    }

    handleMouseDown(row, col) {
        // Prevents the user from interacting with the grid while an algorithm is in progress
        if (this.state.algorithmInProgress) return this.handleMouseUp();

        // Handles the mouse down event on a node
        const { grid } = this.state;
        this.setState({mouseIsPressed: true});

        if (grid[row][col].isStart) {
            this.setState({movingStart: true});
        } else if (grid[row][col].isFinish) {
            this.setState({movingFinish: true});
        } else {
            this.toggleWall(grid, row, col);
            if (this.state.algorithmVisualized) this.visualizeAlgorithmNoAnimation(this.state.algorithm, this.state.heuristic);
        }
    }

    handleMouseEnter(row, col) {
        // Prevents the user from interacting with the grid while an algorithm is in progress
        if (!this.state.mouseIsPressed || this.state.algorithmInProgress) return this.handleMouseUp();
        
        // Handles the movement of the mouse into a new node
        const { grid } = this.state;
        const node = grid[row][col];

        if (this.state.movingStart && !node.isFinish && !node.isWall) {
            this.moveStart(grid, row, col);
            if (this.state.algorithmVisualized) this.visualizeAlgorithmNoAnimation(this.state.algorithm, this.state.heuristic);
        } else if (this.state.movingFinish && !node.isStart && !node.isWall) {
            this.moveFinish(grid, row, col);
            if (this.state.algorithmVisualized) this.visualizeAlgorithmNoAnimation(this.state.algorithm, this.state.heuristic);
        } else if (!node.isStart && !node.isFinish && !this.state.movingStart && !this.state.movingFinish) {
            this.toggleWall(grid, row, col);
            if (this.state.algorithmVisualized) this.visualizeAlgorithmNoAnimation(this.state.algorithm, this.state.heuristic);
        }
    }

    handleMouseUp() {
        // Resets the mouseIsPressed and movingStart/Finish attributes when mouse is released
        this.setState({mouseIsPressed: false, movingStart: false, movingFinish: false});
    }

    moveStart(grid, row, col) {
        // Moves the start node to a new location
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
        // Moves the finish node to a new location
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
        // Toggles the wall attribute of a node
        const node = grid[row][col];
        node.isWall = !node.isWall;
        document.getElementById(`node-${row}-${col}`).className =
            `node ${node.isWall ? 'node-wall' : ''}`;
    }

    clearPath() {
        if (this.state.algorithmInProgress) return false; // Prevents the user from clearing path while an algorithm is in progress
        
        // Clears the grid of all path nodes
        const { grid } = this.state;
        this.clearPathHelper(grid);
        this.setState({algorithmVisualized: false});
        return true;
    }

    clearPathHelper(grid) {
        // Clears the grid of all path nodes
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
        if (this.state.algorithmInProgress) return false; // Prevents the user from clearing path while an algorithm is in progress
        
        // Clears the grid completely
        const { grid } = this.state;
        this.clearAllHelper(grid);
        this.setState({algorithmVisualized: false});
        return true;
    }

    clearAllHelper(grid) {
        // Clears the grid completely
        for (const row of grid) {
            for (const node of row) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    `node ${node.isStart ? 'node-start' : node.isFinish ? 'node-finish' : ''}`;
                node.isVisited = false;
                node.isWall = false;
                node.distance = Infinity;
                node.prev = null;
            }
        }
    }

    async visualizeAlgorithm(algorithm) {
        if (!this.clearPath()) return; // If clearPath failed, then an algorithm is already in progress

        // Visualizes the selected algorithm (with animation)
        this.setState({algorithmInProgress: true});
        const { grid, delay, heuristic } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

        if (algorithm === "DFS") {
            await visualDFS(grid, startNode, finishNode, delay);
        } else if (algorithm === "BFS") {
            await visualBFS(grid, startNode, finishNode, delay);
        } else if (algorithm === "Djikstra's") {
            await visualDjikstra(grid, startNode, finishNode, delay);
        } else if (algorithm === "A*") {
            await visualAStar(heuristic, grid, startNode, finishNode, delay);
        }
        this.setState({algorithmInProgress: false, algorithmVisualized: true});
    }

    visualizeAlgorithmNoAnimation(algorithm, heuristic) {
        if (!this.clearPath()) return; // If clearPath failed, then an algorithm is already in progress
        
        // Visualizes the selected algorithm (without animation)
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

        if (algorithm === "DFS") {
            visualDFS_NA(grid, startNode, finishNode);
        } else if (algorithm === "BFS") {
            visualBFS_NA(grid, startNode, finishNode);
        } else if (algorithm === "Djikstra's") {
            visualDjikstra_NA(grid, startNode, finishNode);
        } else if (algorithm === "A*") {
            visualAStar_NA(heuristic, grid, startNode, finishNode);
        }
        this.setState({algorithmVisualized: true});
    }

    async generateMaze(maze) {
        if (!this.clearAll()) return; // If clearAll failed, then an algorithm is already in progress

        // Generates the selected maze type onto the grid
        this.setState({algorithmInProgress: true});
        const { grid } = this.state;

        if (maze === "Random") {
            await randomMaze(grid);
        } else if (maze === "RecursiveDivision") {
            await recursiveDivisionMaze(grid);
        }
        this.setState({algorithmInProgress: false});
    }


    handleAlgorithmChange() {
        // Handles the change of the algorithm dropdown menu
        const newAlgorithm = document.getElementById("algorithm").value;
        this.setState({algorithm: newAlgorithm, algorithmInfo: this.configAlgorithmInfo(newAlgorithm), heuristic: "Manhattan"});
        if (this.state.algorithmVisualized) this.visualizeAlgorithmNoAnimation(newAlgorithm, this.state.heuristic);
    }

    configAlgorithmInfo(algorithm) {
        // Configures the algorithm info text based on the selected algorithm
        let algorithmInfo = "";

        if (algorithm === "") {
            algorithmInfo="Select an algorithm and a speed to get started!";
        } else if (algorithm === "DFS") {
            algorithmInfo = "Depth-First Search (DFS) is an unweighted algorithm and does NOT guarentee the shortest path.";
        } else if (algorithm === "BFS") {
            algorithmInfo="Breadth-First Search (BFS) is an unweighted algorithm and guarentees the shortest path.";
        } else if (algorithm === "Djikstra's") {
            algorithmInfo="Djikstra's Algorithm is a weighted algorithm and guarentees the shortest path.";
        } else if (algorithm === "A*") {
            algorithmInfo="A* Search is a weighted algorithm and guarentees the shortest path.";
        }
        return algorithmInfo;
    }

    handleSpeedChange() {
        // Handles a change in selected speed
        const newSpeed = document.getElementById("speed").value;
        this.setState({delay: this.configDelay(newSpeed)});
    }

    configDelay(speed) {
        // Configures the delay based on the selected speed
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

    handleMazeChange() {
        // Handles a change in selected maze
        const newMaze = document.getElementById("maze").value;
        this.setState({maze: newMaze});
    }

    handleHeuristicChange() {
        // Handles a change in selected heuristic for A* Search
        const newHeuristic = document.getElementById("heuristic").value;
        this.setState({heuristic: newHeuristic});
        if (this.state.algorithmVisualized) this.visualizeAlgorithmNoAnimation(this.state.algorithm, newHeuristic);
    }

    render() {
        const { grid } = this.state;
        const { algorithm } = this.state;
        const { algorithmInfo } = this.state;
        const { algorithmInProgress } = this.state;
        const { maze } = this.state;

        return (
            <><div className="container">
                
                <InstructionsModal
                    isOpen={this.state.showInstructions}
                    onClose={() => this.toggleInstructionsModal()}>
                </InstructionsModal>
                
                <Header /> {/* Header includes Legend Component */}
                
                <Menu
                    algorithm={algorithm}
                    onAlgorithmChange={() => this.handleAlgorithmChange()}
                    algorithmInProgress={algorithmInProgress}
                    delay={this.state.delay}
                    onSpeedChange={() => this.handleSpeedChange()}
                    onHeuristicChange={() => this.handleHeuristicChange()}
                    visualizeAlgorithm={(algorithm) => this.visualizeAlgorithm(algorithm)}
                    maze={maze}
                    onMazeChange={() => this.handleMazeChange()}
                    generateMaze={(maze) => this.generateMaze(maze)}
                    clearPath={() => this.clearPath()}
                    clearAll={() => this.clearAll()}
                    toggleInstructionsModal={() => this.toggleInstructionsModal()}>
                </Menu>

                <div className="algorithm-info">
                    {algorithmInfo}
                </div>

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
            </div></>
        );
    }
}


const getInitialGrid = () => {
    // Get the users screen size
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Calculate the number of rows and columns based on the screen size
    let numCols = Math.floor(width / 29) - 8;
    numCols = numCols > 49 ? 49 : numCols;
    numCols = numCols < 9 ? 9 : numCols;

    let numRows = Math.floor(height / 29) - 8;
    numRows = numRows > 29 ? 29 : numRows;

    // Ensure that the grid is odd sized -> this is important for maze generation
    numRows = numRows % 2 === 0 ? numRows - 1 : numRows;
    numCols = numCols % 2 === 0 ? numCols - 1 : numCols;

    // Set the start and finish nodes
    START_NODE_ROW = Math.floor(numRows / 2);
    START_NODE_COL = Math.floor(numCols / 4);
    FINISH_NODE_ROW = Math.floor(numRows / 2);
    FINISH_NODE_COL = Math.floor((numCols * 3) / 4);

    // Create the grid
    const grid = [];
    for (let row = 0; row < numRows; row++) {
        const currentRow = [];
        for (let col = 0; col < numCols; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    // Create a node object
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
