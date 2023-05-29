import "./Legend.css"

export const Legend = () => {
    return (
      <div className="legend">
        <div className="legend-row">
            <div className="legend-item">
                <div className="node"><div className="node-start"></div></div>
                <span>Start Node</span>
            </div>
            <div className="legend-item">
                <div className="node"><div className="node-finish"></div></div>
                <span>End Node</span>
            </div>
            <div className="legend-item">
                <div className="node"><div className="node-wall"></div></div>
                <span>Wall Node</span>
            </div>
        </div>
        <div className="legend-row">
            <div className="legend-item">
                <div className="node node-visited-na"></div>
                <span>Visited Node</span>
            </div>
            <div className="legend-item">
                <div className="node node-correct-path-na"></div>
                <span>Correct Path Node</span>
            </div>
        </div>
      </div>
    );
  };