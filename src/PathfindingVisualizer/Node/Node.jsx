import React, {Component} from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
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
    
    if (!algorithmVisualized) {
      const extraClassName = isFinish
        ? 'node-finish'
        : isStart
        ? 'node-start'
        : isWall
        ? 'node-wall'
        : '';
      return (
        <div
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}>
        </div>
      );
    }
    
    const extraClassName = isWall
      ? 'node-wall'
      : '';

    if (isStart) {
      return (
        <div
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}>
            <div className="node-start"></div>
        </div>
      );
    }

    if (isFinish) {
      return (
        <div
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}>
            <div className="node-finish"></div>
        </div>
      );
    }

    return (
      <div id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}>
      </div>
    );
  }
}
