export async function recursiveDivisionMaze(grid) {
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
    // Create walls in grid
    await recursiveDivision(grid, 2, grid.length-3, 2, grid[0].length-3, true);
    return grid;
}

async function recursiveDivision(grid, rowStart, rowEnd, colStart, colEnd, isHorizontal) {
    await new Promise(resolve => setTimeout(resolve, 15));

    if (rowEnd < rowStart || colEnd < colStart) return;
    if (isHorizontal) {
        let possibleRows = [];
        for (let i = rowStart; i <= rowEnd; i += 2) {
            possibleRows.push(i);
        }
        let possibleCols = [];
        for (let i = colStart - 1; i <= colEnd + 1; i += 2) {
            possibleCols.push(i);
        }
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];
        for (let i = colStart - 1; i <= colEnd + 1; i++) {
            if (i !== colRandom && !grid[currentRow][i].isStart && !grid[currentRow][i].isFinish) {
                grid[currentRow][i].isWall = true;
                document.getElementById(`node-${currentRow}-${i}`).className =
                    "node node-wall";
                    await new Promise(resolve => setTimeout(resolve, 15));
                }
        }
        await recursiveDivision(grid, rowStart, currentRow - 2, colStart, colEnd, !isHorizontal);
        await recursiveDivision(grid, currentRow + 2, rowEnd, colStart, colEnd, !isHorizontal);
    } else {
        let possibleCols = [];
        for (let i = colStart; i <= colEnd; i += 2) {
            possibleCols.push(i);
        }
        let possibleRows = [];
        for (let i = rowStart - 1; i <= rowEnd + 1; i += 2) {
            possibleRows.push(i);
        }
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let currentCol = possibleCols[randomColIndex];
        let rowRandom = possibleRows[randomRowIndex];
        for (let i = rowStart - 1; i <= rowEnd + 1; i++) {
            if (i !== rowRandom && !grid[i][currentCol].isStart && !grid[i][currentCol].isFinish) {
                grid[i][currentCol].isWall = true;
                document.getElementById(`node-${i}-${currentCol}`).className =
                    "node node-wall";
                    await new Promise(resolve => setTimeout(resolve, 15));
            }
        }
        await recursiveDivision(grid, rowStart, rowEnd, colStart, currentCol - 2, !isHorizontal);
        await recursiveDivision(grid, rowStart, rowEnd, currentCol + 2, colEnd, !isHorizontal);
    }
}
