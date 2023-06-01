import './Header.css';
import { Legend } from '../Legend/Legend';

export const Header = () => {

    return (
        <header className="header">
            <h1>Interactive Pathfinding Visualizer</h1>
            <Legend />
        </header>
    );
};
