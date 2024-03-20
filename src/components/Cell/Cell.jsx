
import { memo } from 'react';
import PropTypes from 'prop-types';

const Cell = memo(({ isAlive, timeSinceDeath, toggleCellState, showHeatmap }) => {
  const cellStyle = {
    width: '20px',
    height: '20px',
    border: '1px solid gray',
    display: 'inline-block',
    backgroundColor: showHeatmap ? getHeatmapColor(timeSinceDeath) : (isAlive ? 'black' : 'white'),
  };

  function getHeatmapColor(timeSinceDeath) {
    const maxTimeSinceDeath = 10;
    if (isAlive) return 'darkgreen';
    const value = Math.min(timeSinceDeath / maxTimeSinceDeath, 1);
    const r = Math.floor(255 * value);
    const g = Math.floor(100 + 155 * value); 
    const b = Math.floor(255 * value);
    return `rgb(${r},${g},${b})`;
  }

  return (
    <div
      onClick={toggleCellState}
      style={cellStyle}
    />
  );
});

Cell.propTypes = {
  isAlive: PropTypes.bool.isRequired,
  timeSinceDeath: PropTypes.number.isRequired,
  toggleCellState: PropTypes.func.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number,
  showHeatmap:PropTypes.bool
};

Cell.displayName = 'Cell';

export default Cell;