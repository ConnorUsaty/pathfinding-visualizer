function dfs(grid, start, finish) {
    if (!start || !finish) return false;

    start.isVisited = true;
    if (start === finish) {
        // correctPath.push(start);
        return true;
    }

    const neighbors = getValidNeighbors(grid, start);
    for (const neighbor of neighbors) {
        if (dfs(grid, neighbor, finish)) {
            // correctPath.push(neighbor);
            return true;
        }
    }
}

function getValidNeighbors(grid, node) {
    const neighbors = [];
    const { row, col } = node;

    if (row > 0 && !grid[row - 1][col].isVisited) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && !grid[row + 1][col].isVisited) neighbors.push(grid[row + 1][col]);
    if (col > 0 && !grid[row][col - 1].isVisited) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited) neighbors.push(grid[row][col + 1]);

    return neighbors;
}
