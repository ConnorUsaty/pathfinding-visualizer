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

function getValidNeighbors(grid, curr) {
    const neighbors = [];
    const { row, col } = curr;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    return neighbors.filter(neighbor => !neighbor.isWall);
}
