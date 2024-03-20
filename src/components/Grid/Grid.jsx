import { useState, useEffect, memo } from 'react';
import Cell from '../Cell/Cell';
import PropTypes from 'prop-types';

const Grid = memo(
  ({ rows, cols, updateLivingCells, showHeatmap, grid, setGrid }) => {
    const [timeSinceDeath, setTimeSinceDeath] = useState(() =>
      Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
    );

    useEffect(() => {
      const livingCells = grid.flat().filter((cell) => cell).length;
      updateLivingCells(livingCells);
    }, [grid, updateLivingCells]);

    useEffect(() => {
      const newTimeSinceDeath = timeSinceDeath.map((row, rowIndex) =>
        row.map((cellTime, colIndex) => grid[rowIndex][colIndex] ? 0 : cellTime + 1)
      );
      setTimeSinceDeath(newTimeSinceDeath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grid]);

    const toggleCellState = (rowIndex, colIndex) => {
      setGrid(currentGrid => {
        return currentGrid.map((row, rIndex) => {
          if (rIndex === rowIndex) {
            return row.map((cell, cIndex) => {
              if (cIndex === colIndex) {
                return !cell;
              }
              return cell;
            });
          }
          return row;
        });
      });
    };


    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((isAlive, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isAlive={isAlive}
              timeSinceDeath={timeSinceDeath[rowIndex][colIndex]}
              toggleCellState={() => toggleCellState(rowIndex, colIndex)}
              showHeatmap={showHeatmap}
            />
          ))}
          </div>
        ))}
      </div>
    );
  }
);

Grid.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  updateLivingCells: PropTypes.func.isRequired,
  showHeatmap: PropTypes.bool.isRequired,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
  setGrid: PropTypes.func.isRequired,
  setTimeSinceDeath: PropTypes.func.isRequired,
};

Grid.displayName = 'Grid';

export default Grid;