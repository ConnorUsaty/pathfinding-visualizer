export async function randomMaze(grid) {
    // Create walls around grid
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (i === 0 || i === grid.length-1 || j === 0 || j === grid[0].length-1) {
                grid[i][j].isWall = true;
                document.getElementById(`node-${i}-${j}`).className =
                    "node node-wall";
            }
        }
    }

    // Create random walls in grid
    for (let row = 1; row < grid.length-1; row++) {
        for (let col = 1; col < grid[0].length-1; col++) {
            await new Promise(resolve => setTimeout(resolve, 10));
            const node = grid[row][col];
            if (node.isStart || node.isFinish) continue;
            if (Math.random() < 0.20) {
                node.isWall = true;
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-wall';
            }
        }
    }
}
