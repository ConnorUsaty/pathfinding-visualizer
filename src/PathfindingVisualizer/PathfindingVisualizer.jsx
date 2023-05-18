import React, {Component} from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Pathfinding Visualizer</h1>
                <Node></Node>
            </div>
        );
    }
}
