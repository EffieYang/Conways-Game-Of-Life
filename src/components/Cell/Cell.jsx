
import { memo } from 'react';
import PropTypes from 'prop-types';

const Cell = memo(({ isAlive, timeSinceDeath }) => {
  const cellStyle = {
    width: '20px',
    height: '20px',
    border: '1px solid gray',
    display: 'inline-block',
  };

  const getHeatmapColor = () => {
    if (isAlive) {
      return 'red';
    }
    const maxTimeSinceDeath = 200;
    const opacity = 1 - timeSinceDeath / maxTimeSinceDeath;
    return `rgba(0, 0, 0, ${opacity})`;
  };


  return (
    <div
      style={{
        ...cellStyle,
        backgroundColor: isAlive ? 'black' : getHeatmapColor(),
      }}
    />
  );
});

Cell.propTypes = {
  isAlive: PropTypes.bool.isRequired,
  timeSinceDeath: PropTypes.number.isRequired,
};

Cell.displayName = 'Cell';

export default Cell;