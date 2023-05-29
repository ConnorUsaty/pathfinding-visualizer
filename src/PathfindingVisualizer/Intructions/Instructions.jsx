import "./Instructions.css";

export const InstructionsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">How to Use</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-content">
                    <p>Select an algorithm, select a speed, then visualize.</p>
                    <p>Click and drag the start <div className="node"><div className="node-start"></div></div> and finish <div className="node"><div className="node-finish"></div></div> nodes to move them.</p>
                    <p>Click on empty nodes to create walls <div className="node node-wall"></div>.</p>
                    <p>Click the <button>Clear Path</button> button to clear the algorithm visualization.</p>
                    <p>Click the <button>Clear All</button> button to clear everything.</p>
                    <p>After visualizing an algorithm drag the start and finish nodes to new places to instantly revisualize.</p>
                </div>
            </div>
        </div>
    );
};
