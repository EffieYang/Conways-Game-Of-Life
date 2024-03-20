import { useEffect, memo } from 'react';
import Cell from '../Cell/Cell';
import PropTypes from 'prop-types';

const Grid = memo(
  ({ updateLivingCells, showHeatmap, grid, setGrid, timeSinceDeath }) => {

    useEffect(() => {
      const livingCells = grid.flat().filter((cell) => cell).length;
      updateLivingCells(livingCells);
    }, [grid, updateLivingCells]);

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
  timeSinceDeath: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

Grid.displayName = 'Grid';

export default Grid;