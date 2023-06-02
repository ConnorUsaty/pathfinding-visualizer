import './Header.css';
import { Legend } from '../Legend/Legend';

export const Header = () => {

    return (
        <header className="header">
            <h1>Pathfinding Algorithm Visualizer</h1>
            <Legend />
        </header>
    );
};
