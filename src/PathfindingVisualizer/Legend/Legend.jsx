import "./Legend.css"

export const Legend = () => {
    return (
      <div className="legend">
        <div className="legend-row">
            <div className="legend-item">
                <div className="node"><div className="node-start"></div></div>
                <span>Start</span>
            </div>
            <div className="legend-item">
                <div className="node"><div className="node-finish"></div></div>
                <span>Finish</span>
            </div>
        </div>
        <div className="legend-row">
            <div className="legend-item">
                <div className="node node-wall"></div>
                <span>Wall</span>
            </div>
            <div className="legend-item">
                <div className="node node-visited-na"></div>
                <span>Visited</span>
            </div>
            <div className="legend-item">
                <div className="node node-correct-path-na"></div>
                <span>Correct Path</span>
            </div>
        </div>
      </div>
    );
  };