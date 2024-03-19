export const generateRandomGrid = (rows, cols, density) => {
  const grid = [];
  console.log(rows,'rows');
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.random() < density);
    }
    grid.push(row);
  }
  console.log(grid);
  return grid;
};

export const generateNextGeneration = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = [];

  const getNeighbors = (row, col) => {
    let count = 0;
    for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
      for (let j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); j++) {
        if (i !== row || j !== col) {
          count += grid[i][j] ? 1 : 0;
        }
      }
    }
    return count;
  };

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const neighbors = getNeighbors(i, j);
      const isAlive = grid[i][j];
      if (isAlive && (neighbors === 2 || neighbors === 3)) {
        row.push(true);
      } else if (!isAlive && neighbors === 3) {
        row.push(true);
      } else {
        row.push(false);
      }
    }
    newGrid.push(row);
  }
  return newGrid;
};
