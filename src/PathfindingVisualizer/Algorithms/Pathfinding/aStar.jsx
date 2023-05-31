export async function visualAStar(grid, start, finish, delay) {
    // Initialize the open set with the start node
    const openSet = new Set();
    openSet.add(start);

    // Store the cost from the start node to each node
    const gScore = new Map();
    gScore.set(start, 0);

    // Store the total estimated cost from the start node to the goal node through each node
    const fScore = new Map();
    fScore.set(start, heuristic(start, finish));

    // Store the parent node for each node
    const cameFrom = new Map();

    while (openSet.size > 0) {
        // Get the node in the open set with the lowest fScore
        let currentNode = null;
        let currentFScore = Infinity;

        for (const node of openSet) {
            const nodeFScore = fScore.get(node);
            if (nodeFScore < currentFScore) {
                currentNode = node;
                currentFScore = nodeFScore;
            }
        }

        // Remove the current node from the open set
        openSet.delete(currentNode);

        // Document the current node as visited and show it visually
        await new Promise(resolve => setTimeout(resolve, delay));
        currentNode.isVisited = true;
        document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className =
        'node node-visited';

        // If the current node is the finish node, then we can stop the algorithm
        if (currentNode === finish) {
            // Reconstruct the path
            let curr = currentNode;
            while (curr !== start) {
                document.getElementById(`node-${curr.row}-${curr.col}`).className =
                    'node node-correct-path';
                // Delay showing the next node in the path
                await new Promise((resolve) => setTimeout(resolve, delay * 1.2));
                curr = cameFrom.get(curr);
            }
            document.getElementById(`node-${start.row}-${start.col}`).className =
                'node node-correct-path';
            return true;
        }

        // Get the valid neighbors of the current node
        const neighbors = getValidNeighbors(grid, currentNode);
        for (const neighbor of neighbors) {
            // Calculate the tentative gScore from the start node to the neighbor node
            const tentativeGScore = gScore.get(currentNode) + 1;

            if (tentativeGScore < gScore.get(neighbor) || !gScore.has(neighbor)) {
                // Update the parent node and gScore of the neighbor
                cameFrom.set(neighbor, currentNode);
                gScore.set(neighbor, tentativeGScore);

                // Calculate the total estimated cost from the start node to the goal node through the neighbor node
                const neighborFScore = tentativeGScore + heuristic(neighbor, finish);
                fScore.set(neighbor, neighborFScore);

                if (!openSet.has(neighbor)) {
                    // Add the neighbor node to the open set
                    openSet.add(neighbor);
                }
            }
        }
    }
    // If the open set is empty and the goal has not been found, return false
    return false;
}

export function visualAStar_NA(grid, start, finish) {
    // Initialize the open set with the start node
    const openSet = new Set();
    openSet.add(start);

    // Store the cost from the start node to each node
    const gScore = new Map();
    gScore.set(start, 0);

    // Store the total estimated cost from the start node to the goal node through each node
    const fScore = new Map();
    fScore.set(start, heuristic(start, finish));

    // Store the parent node for each node
    const cameFrom = new Map();

    while (openSet.size > 0) {
        // Get the node in the open set with the lowest fScore
        let currentNode = null;
        let currentFScore = Infinity;

        for (const node of openSet) {
            const nodeFScore = fScore.get(node);
            if (nodeFScore < currentFScore) {
                currentNode = node;
                currentFScore = nodeFScore;
            }
        }

        // Remove the current node from the open set
        openSet.delete(currentNode);

        // Document the current node as visited and show it visually
        currentNode.isVisited = true;
        document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className =
        'node node-visited-na';

        // If the current node is the finish node, then we can stop the algorithm
        if (currentNode === finish) {
            // Reconstruct the path
            let curr = currentNode;
            while (curr !== start) {
                document.getElementById(`node-${curr.row}-${curr.col}`).className =
                    'node node-correct-path-na';
                // Delay showing the next node in the path
                curr = cameFrom.get(curr);
            }
            document.getElementById(`node-${start.row}-${start.col}`).className =
                'node node-correct-path-na';
            return true;
        }

        // Get the valid neighbors of the current node
        const neighbors = getValidNeighbors(grid, currentNode);
        for (const neighbor of neighbors) {
            // Calculate the tentative gScore from the start node to the neighbor node
            const tentativeGScore = gScore.get(currentNode) + 1;

            if (tentativeGScore < gScore.get(neighbor) || !gScore.has(neighbor)) {
                // Update the parent node and gScore of the neighbor
                cameFrom.set(neighbor, currentNode);
                gScore.set(neighbor, tentativeGScore);

                // Calculate the total estimated cost from the start node to the goal node through the neighbor node
                const neighborFScore = tentativeGScore + heuristic(neighbor, finish);
                fScore.set(neighbor, neighborFScore);

                if (!openSet.has(neighbor)) {
                    // Add the neighbor node to the open set
                    openSet.add(neighbor);
                }
            }
        }
    }
    // If the open set is empty and the goal has not been found, return false
    return false;
}

function getValidNeighbors(grid, node) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    return neighbors.filter(neighbor => !neighbor.isWall);
}

function heuristic(node, goal) {
    // Calculate the Manhattan distance between two nodes on a grid
    const dx = Math.abs(node.row - goal.row);
    const dy = Math.abs(node.col - goal.col);
    return dx + dy;
}
