import "./Instructions.css";

export const InstructionsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
        <div className="InstructionsModal modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">How to Use</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <ul className="modal-content">
                    <li><select name="" id=""><option>Select an Algorithm...</option></select> then <select name="" id=""><option>Select a speed...</option></select> then <button>Visualize</button></li>
                    <li>Generate a unique maze in real time by <select name="" id=""><option>Selecting a maze...</option></select> and clicking the <button>Generate Maze</button> button.</li>
                    <li>Create your own maze by clicking on empty nodes to turn them into walls.</li>
                    <li>Click and drag the start and finish nodes to move them.</li>
                    <li>Click the <button>Clear Path</button> button to clear the algorithm path.</li>
                    <li>Click the <button>Clear All</button> button to clear everything.</li>
                    <li>After visualizing an algorithm drag the start and finish nodes to new places to instantly revisualize.</li>
                </ul>
            </div>
        </div>
    );
};
