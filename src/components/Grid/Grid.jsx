import { useState, useEffect, memo } from 'react';
import Cell from '../Cell/Cell';
import PropTypes from 'prop-types';

const Grid = memo(
  ({ rows, cols, updateLivingCells, showHeatmap, grid }) => {
    const [timeSinceDeath, setTimeSinceDeath] = useState(() =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
      )
    );
    useEffect(() => {
      let arr = () =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
        )
      console.log(timeSinceDeath);
     setTimeSinceDeath(arr)
    }, [rows,cols])
    useEffect(() => {
      const livingCells = grid.flat().filter((cell) => cell).length;
      updateLivingCells(livingCells);
    }, [grid, updateLivingCells]);

    useEffect(() => {
      const updatedTimeSinceDeath = [...timeSinceDeath];
         console.log(updatedTimeSinceDeath);
      grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (!cell) {
            updatedTimeSinceDeath[rowIndex][colIndex]++;
          } else {
            updatedTimeSinceDeath[rowIndex][colIndex] = 0;
          }
        });
      });
      setTimeSinceDeath(updatedTimeSinceDeath);
    }, []);


    return (
      <div>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => {
            // console.log(timeSinceDeath);
              return(
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isAlive={cell}
                timeSinceDeath={
                  // showHeatmap ? timeSinceDeath[rowIndex][colIndex] : 0
                  showHeatmap ? rowIndex*colIndex : 0
                }
                  rows={rows}
                  cols={cols}
                  showHeatmap={showHeatmap}
              />
            )
            })}
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
};

Grid.displayName = 'Grid';

export default Grid;