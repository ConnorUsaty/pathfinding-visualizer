import React, {Component} from "react";

import "./Menu.css";

export default class Menu extends Component {
  render() {
    const {
        algorithm,
        onAlgorithmChange,
        algorithmInProgress,
        delay,
        onSpeedChange,
        onHeuristicChange,
        visualizeAlgorithm,
        maze,
        onMazeChange,
        generateMaze,
        clearPath,
        clearAll,
        toggleInstructionsModal,
    } = this.props;

    return (
        <div className="menu">

            <select id="maze" onChange={() => onMazeChange()} disabled={algorithmInProgress} defaultValue={""}>
                {maze === "" &&
                <option value="" disabled>
                    Select a maze...
                </option>}

                <option value="RecursiveDivision">Recursive Division</option>
                <option value="Random">Random</option>
            </select>

            <button onClick={() => generateMaze(maze)} disabled={algorithmInProgress || maze === ""}>
                Generate Maze
            </button>

            <select id="algorithm" onChange={() => onAlgorithmChange()} disabled={algorithmInProgress} defaultValue={""}>
                {algorithm === "" && 
                <option value="" disabled>
                    Select an algorithm...
                </option>}

                <option value="A*">A* Search</option>
                <option value="Djikstra's">Djikstra's Algorithm</option>
                <option value="BFS">Breadth-First Search</option>
                <option value="DFS">Depth-First Search</option>
            </select>

            <select id="speed" onChange={() => onSpeedChange()} disabled={algorithmInProgress} defaultValue={""}>
                {delay === -1 && 
                <option value="" disabled>
                    Select a speed...
                </option>}

                <option value="VeryFast">Very Fast</option>
                <option value="Fast">Fast</option>
                <option value="Medium">Medium</option>
                <option value="Slow">Slow</option>
                <option value="VerySlow">Very Slow</option>
            </select>

            <select id="heuristic" onChange={() => onHeuristicChange()} disabled={algorithmInProgress || algorithm !== "A*"} defaultValue={""}>
                {algorithm !== "A*" && 
                <option value="">
                    A* Only
                </option>}

                {algorithm === "A*" && <option value="Manhattan">Manhattan Distance</option>}
                {algorithm === "A*" && <option value="Euclidean">Euclidean Distance</option>}
                {algorithm === "A*" && <option value="Diagonal">Diagonal Distance</option>}
            </select>

            <button onClick={() => visualizeAlgorithm(algorithm)} 
              disabled={algorithmInProgress || algorithm === "" || delay === -1}>
                Visualize {algorithm}
            </button>


            <button onClick={() => clearPath()} disabled={algorithmInProgress}>
                Clear Path
            </button>

            <button onClick={() => clearAll()} disabled={algorithmInProgress}>
                Clear All
            </button>

            <button onClick={() => toggleInstructionsModal()}>
                How to use
            </button>
        </div>
    );
  }
}
