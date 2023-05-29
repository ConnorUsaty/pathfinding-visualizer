export async function visualDFS(grid, curr, finish, delay) {
    // Delay each step of the algorithm by chosen delay
    await new Promise(resolve => setTimeout(resolve, delay));

    // Document the current node as visited & show it visually
    curr.isVisited = true;
    document.getElementById(`node-${curr.row}-${curr.col}`).className =
        'node node-visited';

    // If the current node is the finish node, then we can stop the algorithm
    if (curr === finish) {
        document.getElementById(`node-${curr.row}-${curr.col}`).className =
            'node node-correct-path';
        return true;
    }

    // Get the valid neighbors of the current node
    const neighbors = getValidNeighbors(grid, curr);
    for (const neighbor of neighbors) {
        if (!neighbor.isVisited) {
            if (await visualDFS(grid, neighbor, finish, delay)) { // Finish node found from this path
                // Every 20ms, show the next node in the correct path
                await new Promise(resolve => setTimeout(resolve, delay*1.2));
                document.getElementById(`node-${curr.row}-${curr.col}`).className =
                    'node node-correct-path';
                return true;
            }
        }
    }
    return false;
}

export function visualDFS_NA(grid, curr, finish) {
    // Document the current node as visited & show it visually
    curr.isVisited = true;
    document.getElementById(`node-${curr.row}-${curr.col}`).className =
        'node node-visited-na';

    // If the current node is the finish node, then we can stop the algorithm
    if (curr === finish) {
        document.getElementById(`node-${curr.row}-${curr.col}`).className =
            'node node-correct-path-na';
        return true;
    }

    // Get the valid neighbors of the current node
    const neighbors = getValidNeighbors(grid, curr);
    for (const neighbor of neighbors) {
        if (!neighbor.isVisited) {
            if (visualDFS_NA(grid, neighbor, finish)) { // Finish node found from this path
                document.getElementById(`node-${curr.row}-${curr.col}`).className =
                    'node node-correct-path-na';
                return true;
            }
        }
    }
    return false;
}

export function getValidNeighbors(grid, node) {
    const neighbors = [];
    const { row, col } = node;

    // Check the node above the current node
    if (row > 0) {neighbors.push(grid[row - 1][col]);}
    // Check the node to the right of the current node
    if (col < grid[0].length - 1) {neighbors.push(grid[row][col + 1]);}
    // Check the node below the current node
    if (row < grid.length - 1) {neighbors.push(grid[row + 1][col]);}
    // Check the node to the left of the current node
    if (col > 0) {neighbors.push(grid[row][col - 1]);}
    // Return all valid neighbors -> neighbors that are within the grid boundries and are not walls
    return neighbors.filter(neighbor => !neighbor.isWall);
}
