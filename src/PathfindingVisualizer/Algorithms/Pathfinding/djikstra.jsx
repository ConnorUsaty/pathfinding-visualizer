export async function visualDjikstra(grid, start, finish, delay) {
    const unvisitedNodes = getAllNodes(grid);
    start.distance = 0;

    while (unvisitedNodes.length) {
        await new Promise(resolve => setTimeout(resolve, delay));
        sortNodesByDistance(unvisitedNodes);
        let curr = unvisitedNodes.shift();
        if (curr.isWall) continue;
        if (curr.distance === Infinity) return; // No possible path
        curr.isVisited = true;
        document.getElementById(`node-${curr.row}-${curr.col}`).className =
            'node node-visited';

        if (curr === finish) {
            while (curr !== null) {
                await new Promise(resolve => setTimeout(resolve, delay*2));
                document.getElementById(`node-${curr.row}-${curr.col}`).className =
                    'node node-correct-path';
                curr = curr.prev;
            }
            return; // Algorithm visualization complete
        }
        updateUnvisitedNeighbors(curr, grid);
    }
}

export function visualDjikstra_NA(grid, start, finish) {
    const unvisitedNodes = getAllNodes(grid);
    start.distance = 0;

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        let curr = unvisitedNodes.shift();
        if (curr.isWall) continue;
        if (curr.distance === Infinity) return; // No possible path
        curr.isVisited = true;
        document.getElementById(`node-${curr.row}-${curr.col}`).className =
            'node node-visited-na';

        if (curr === finish) {
            while (curr !== null) {
                document.getElementById(`node-${curr.row}-${curr.col}`).className =
                    'node node-correct-path-na';
                curr = curr.prev;
            }
            return; // Algorithm visualization complete
        }
        updateUnvisitedNeighbors(curr, grid);
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(curr, grid) {
    const neighbors = getValidNeighbors(grid, curr);
    for (const neighbor of neighbors) {
        neighbor.distance = curr.distance + 1;
        neighbor.prev = curr;
    }
}

function getValidNeighbors(grid, curr) {
    const neighbors = [];
    const { row, col } = curr;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
