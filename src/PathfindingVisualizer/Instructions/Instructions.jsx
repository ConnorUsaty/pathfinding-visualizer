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
                    <li><select name="" id=""><option>Select an Algorithm...</option></select> then <select name="" id=""><option>Select a Speed...</option></select> then <button>Visualize</button></li>
                    <li>To generate a unique maze in real time <select name="" id=""><option>Select a Maze...</option></select> then click <button>Generate Maze</button></li>
                    <li>Create your own maze by clicking on empty nodes to turn them into walls.</li>
                    <li>Drag and drop the start and finish nodes to move them.</li>
                    <li>After visualizing an algorithm drag the start and finish nodes to new positions to instantly revisualize.</li>
                    <li>Click <button>Clear Path</button> to clear the algorithm path.</li>
                    <li>Click <button>Clear All</button> to clear everything.</li>
                    <li>Note: The grid is responsive on reload.</li>
                </ul>
                
            </div>
        </div>
    );
};
