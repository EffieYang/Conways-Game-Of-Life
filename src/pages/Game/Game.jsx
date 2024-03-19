import { useState, useEffect, useCallback } from 'react';
import Grid from '../../components/Grid/Grid';
import Controls from '../../components/Controls/Controls';
import { generateNextGeneration, generateRandomGrid } from '../../components/helper';

const GamePage = () => {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [livingCells, setLivingCells] = useState(0);
  const [grid, setGrid] = useState(() => generateRandomGrid(rows, cols, 0.2));
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500); 

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    if (value < 3 || value > 40) {
      setError(`${name} Please enter values between 3 and 40 for width and height.`);
    } else {
      setError('');
      if (name == 'rows') {
       
        setRows(parseInt(value));
       
      } else {
        setCols(parseInt(value));
      }
    
      
       
    }
  };
  useEffect(() => {
    setGrid(generateRandomGrid(rows, cols, 0.2));
    console.log(rows,cols);
  }, [rows,cols])
  const resetGrid = () => {
    setGrid(generateRandomGrid(rows, cols, 0.2));
    setIsRunning(false);
  };

  const nextGeneration = () => {
    setGrid((prevGrid) => generateNextGeneration(prevGrid));
  };

  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
  };

  const toggleAutoplay = () => {
    setIsRunning(!isRunning);
  };

  const updateLivingCells = useCallback(
    (count) => {
      setLivingCells(count);
    },
    [setLivingCells]
  );

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setGrid((prevGrid) => generateNextGeneration(prevGrid));
      }, speed);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, speed]);


  return (
    <div className='container'>
      <div>
        <label>
          Height:
          <input
            type="number"
            name="rows"
            value={rows}
            onChange={handleDimensionChange}
          />
        </label>
        <label>
          Width:
          <input
            type="number"
            name="cols"
            value={cols}
            onChange={handleDimensionChange}
          />
        </label>
        {error && <p>{error}</p>}
      </div>

      <Grid
        rows={rows}
        cols={cols}
        updateLivingCells={updateLivingCells}
        showHeatmap={showHeatmap}
        grid={grid}
      />

      <Controls
        resetGrid={resetGrid}
        nextGeneration={nextGeneration}
        toggleHeatmap={toggleHeatmap}
        toggleAutoplay={toggleAutoplay}
        isRunning={isRunning}
        setSpeed={setSpeed}
        speed={speed}
      />

      <p>Currently living cells: {livingCells}</p>

    </div>
  );
};

export default GamePage;