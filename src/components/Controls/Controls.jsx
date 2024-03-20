import PropTypes from 'prop-types';

const Controls = ({
  resetGrid,
  nextGeneration,
  toggleHeatmap,
  toggleAutoplay,
  isRunning,
}) => {

  return (
    <div>
      <button onClick={resetGrid}>Reset</button>
      <button onClick={nextGeneration} disabled={isRunning}>
        Next frame
      </button>
      <button onClick={toggleHeatmap}>HeatMap</button>
      <button onClick={toggleAutoplay}>{isRunning ? 'Stop' : 'Autoplay'}</button>
    </div>
  );
};

Controls.propTypes = {
  resetGrid: PropTypes.func.isRequired,
  nextGeneration: PropTypes.func.isRequired,
  toggleHeatmap: PropTypes.func.isRequired,
  toggleAutoplay: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
};


export default Controls;