import React from "react";
import "./Instructions.css";

import page1 from '../assets/page1.gif';
import page2 from '../assets/page2.gif';
import page3 from '../assets/page3.gif';
import page4 from '../assets/page4.gif';

import { useState } from "react";


export const InstructionsModal = ({ isOpen, onClose }) => {
    const [page, setPage] = useState(0);

    const pages = [
        { header: "Algorithm Visualization", 
          content: <> <ul><li>Drag and drop the Start and Finish nodes to move them</li><li><select name="" id=""><option>Select an Algorithm...</option></select> then <select name="" id=""><option>Select a Speed...</option></select> then <button>Visualize</button></li></ul><div className="img-container"><div className="img-wrapper"><img src={page1} alt="Algorithm Visualization" /></div></div> </> },

        { header: "Maze Generation / Creation", 
          content: <><ul>
            <li>Create your own maze by clicking on empty nodes to turn them into walls.</li>
            <li>To generate a maze <select name="" id=""><option>Select a Maze...</option></select> then click <button>Generate Maze</button></li>
            </ul><div className="img-container"><div className="img-wrapper"><img src={page2} alt="Maze Generation / Creation" /></div></div> </>},

        { header: "Clearing the Board", 
          content: <> <ul><li>Click <button>Clear Path</button> to clear the algorithm path.</li>
        <li>Click <button>Clear All</button> to clear everything.</li></ul><div className="img-container"><div className="img-wrapper"><img src={page3} alt="Clearing the Board" /></div></div> </> },

        { header: "Instant Revisualization", 
          content: <p><h4>To instantly revisualize:</h4><ul><li>Toggle a wall in the algorithm's path</li><li>Move the Start or Finish nodes to new locations</li><li>Change the algorithm</li><li>Change the heuristic (A* Only)</li></ul><div className="img-container"><div className="img-wrapper"><img src={page4} alt="Instant Revisulization" /></div></div></p>},

        { header: "Learn More", 
          content: <p><h4>To Learn More:</h4><ul><li>Visit the <a href="https://github.com/ConnorUsaty/pathfinding-visualizer" target="_blank" rel="noreferrer">GitHub</a></li><li>Watch the <a href="https://youtu.be/V61U_hktB9I" target="_blank" rel="noreferrer">Full Video Demo</a></li></ul></p>},
    ];


    if (!isOpen) return null;


    return (
        <div className="InstructionsModal modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h1 className="modal-title">How to Use</h1>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>

                <h2>{pages[page].header}</h2>
                <div className="modal-content">
                    {pages[page].content}
                    <div className="modal-footer">
                        <button className="modal-button" onClick={() => setPage(page - 1)} disabled={page === 0}> &lt; </button>
                        <p>{page+1} / {pages.length}</p>
                        <button className="modal-button" onClick={() => setPage(page + 1)} disabled={page === pages.length - 1}> &gt; </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
