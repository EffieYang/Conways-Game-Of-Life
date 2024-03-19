
import { memo } from 'react';
import PropTypes from 'prop-types';

const Cell = memo(({ isAlive, timeSinceDeath,cols,rows,showHeatmap }) => {
  const cellStyle = {
    width: '20px',
    height: '20px',
    border: '1px solid gray',
    display: 'inline-block',
  };
 
  const getHeatmapColor = () => {
    
  const maxTimeSinceDeath = 200;
  let opacity = 1 - timeSinceDeath / maxTimeSinceDeath;
  //let opacity = timeSinceDeath*0.003

console.log(showHeatmap,222);
    let flag = (rows / 2).toFixed(0) * (cols / 2).toFixed(0)
    // console.log(flag);
    if (timeSinceDeath < flag) {
      opacity = 1 -timeSinceDeath*0.01
    }
    if (isAlive) {

      return 'black';
    } 
    if (!showHeatmap) {
      return `rgba(90, 90, 90)`
    }
  
    return `rgba(255, 0, 0, ${opacity})`;
    
  };


  return (
    <div
      style={{
        ...cellStyle,
        backgroundColor: getHeatmapColor(),
      }}
    />
  );
});

Cell.propTypes = {
  isAlive: PropTypes.bool.isRequired,
  timeSinceDeath: PropTypes.number.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number,
  showHeatmap:PropTypes.bool
};

Cell.displayName = 'Cell';

export default Cell;