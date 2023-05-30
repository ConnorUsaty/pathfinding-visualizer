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
            <select id="algorithm" onChange={() => onAlgorithmChange()} disabled={algorithmInProgress}>
                {algorithm === "" && 
                <option value="" disabled selected>
                    Select an algorithm...
                </option>}

                <option value="DFS">Depth-First Search</option>
                <option value="BFS">Breadth-First Search</option>
                <option value="Djikstra">Djikstra's Algorithm</option>
            </select>

            <select id="speed" onChange={() => onSpeedChange()} disabled={algorithmInProgress}>
                {delay === -1 && 
                <option value="" disabled selected>
                    Select a speed...
                </option>}

                <option value="VeryFast">Very Fast</option>
                <option value="Fast">Fast</option>
                <option value="Medium">Medium</option>
                <option value="Slow">Slow</option>
                <option value="VerySlow">Very Slow</option>
            </select>

            <button onClick={() => visualizeAlgorithm(algorithm)} 
              disabled={algorithmInProgress || algorithm === "" || delay === -1}>
                Visualize {algorithm}
            </button>

            <select id="maze" onChange={() => onMazeChange()} disabled={algorithmInProgress}>
                {maze === "" &&
                <option value="" disabled selected>
                    Select a maze...
                </option>}

                <option value="Random">Random</option>
                <option value="RecursiveDivision">Recursive Division</option>
            </select>

            <button onClick={() => generateMaze(maze)} disabled={algorithmInProgress || maze === ""}>
                Generate Maze
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
