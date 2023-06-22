import React, {Component} from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      movingStart,
      movingFinish,
      algorithmVisualized,
      row,
      col,
      isStart,
      isFinish,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;

    return (
      <div id={`node-${row}-${col}`}
        className={`node`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}>
          {isStart && (!movingStart || algorithmVisualized) && <div className="node-start"></div>}
          {isFinish && (!movingFinish || algorithmVisualized) && <div className="node-finish"></div>}
          {isWall && <div className="node-wall"></div>}
      </div>
    );
  }
}
