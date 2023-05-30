export async function randomMaze(grid) {
    for (let row = 0; row < 18; row++) {
        for (let col = 0; col < 50; col++) {
            await new Promise(resolve => setTimeout(resolve, 6));
            const node = grid[row][col];
            if (node.isStart || node.isFinish) continue;
            if (Math.random() < 0.25) {
                node.isWall = true;
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-wall';
            }
        }
    }
}
