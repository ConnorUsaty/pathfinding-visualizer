import { getValidNeighbors } from './dfs.jsx';

export async function visualBFS(grid, start, finish, delay) {
    const queue = [];
    queue.push(start);
    start.isVisited = true;

    while (queue.length) {
        await new Promise(resolve => setTimeout(resolve, delay));
        let curr = queue.shift();
        document.getElementById(`node-${curr.row}-${curr.col}`).className =
            'node node-visited'; // Visually document visit here so it matches when the node is popped off the queue
        
        if (curr === finish) {
            while (curr !== null) {
                await new Promise(resolve => setTimeout(resolve, delay*2));
                document.getElementById(`node-${curr.row}-${curr.col}`).className =
                    'node node-correct-path';
                curr = curr.prev;
            }
            return; // Algorithm visualization complete
        }

        const neighbors = getValidNeighbors(grid, curr);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.prev = curr;
                neighbor.isVisited = true; // Set property here to avoid double pushing
                queue.push(neighbor);
            }
        }
    }
}

export function visualBFS_NA(grid, start, finish) {
    const queue = [];
    queue.push(start);
    start.isVisited = true;

    while (queue.length) {
        let curr = queue.shift();
        document.getElementById(`node-${curr.row}-${curr.col}`).className =
            'node node-visited-na'; // Visually document visit here so it matches when the node is popped off the queue
        
        if (curr === finish) {
            while (curr !== null) {
                document.getElementById(`node-${curr.row}-${curr.col}`).className =
                    'node node-correct-path-na';
                curr = curr.prev;
            }
            return; // Algorithm visualization complete
        }

        const neighbors = getValidNeighbors(grid, curr);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.prev = curr;
                neighbor.isVisited = true; // Set property here to avoid double pushing
                queue.push(neighbor);
            }
        }
    }
}
