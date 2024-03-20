import { useState, useEffect, useCallback } from 'react';
import Grid from '../../components/Grid/Grid';
import Controls from '../../components/Controls/Controls';
import { generateNextGeneration, generateRandomGrid } from '../../components/helper';

const GamePage = () => {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [tempRows, setTempRows] = useState("20");
  const [tempCols, setTempCols] = useState("20");
  const [livingCells, setLivingCells] = useState(0);
  const [grid, setGrid] = useState(() => generateRandomGrid(rows, cols, 0.2));
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [error, setError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [timeSinceDeath, setTimeSinceDeath] = useState(() => 
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))
  );
  const [isRunning, setIsRunning] = useState(false);

  const validateAndSetDimension = (value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 3 && parsedValue <= 40) {
      return parsedValue;
    }
    setError("Please enter numeric values between 3 and 40 for width and height.");
    return false;
  };

  const handleDimensionSubmit = (e) => {
    e.preventDefault();
    const newRows = validateAndSetDimension(tempRows);
    const newCols = validateAndSetDimension(tempCols);

    if (newRows && newCols) {
      setRows(newRows);
      setCols(newCols);
      setError('');
      setGrid(generateRandomGrid(newRows, newCols, 0.2)); 
      setTimeSinceDeath(Array.from({ length: newRows }, () => Array.from({ length: newCols }, () => 0)));
    }
  };

  useEffect(() => {
    setGrid(generateRandomGrid(rows, cols, 0.2));
  }, [rows, cols]);

  useEffect(() => {
    const newTimeSinceDeath = timeSinceDeath.map((row, rowIndex) =>
      row.map((cellTime, colIndex) => grid[rowIndex][colIndex] ? 0 : cellTime + 1)
    );
    setTimeSinceDeath(newTimeSinceDeath);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError('');
    if (name === 'rows') {
      setTempRows(value);
    } else if (name === 'cols') {
      setTempCols(value);
    }
  };

  const resetGrid = useCallback(() => {
    setGrid(generateRandomGrid(rows, cols, 0.2));
    setTimeSinceDeath(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
      )
    );
    setIsRunning(false);
  }, [rows, cols]);

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
    },[setLivingCells]
  );

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setGrid((prevGrid) => generateNextGeneration(prevGrid));
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);


  return (
    <div className='container'>
     <form onSubmit={handleDimensionSubmit}>
        <label>
          Height:
          <input
            type="text"
            name="rows"
            value={tempRows}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Width:
          <input
            type="text"
            name="cols"
            value={tempCols}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <Grid
        rows={rows}
        cols={cols}
        updateLivingCells={updateLivingCells}
        showHeatmap={showHeatmap}
        grid={grid}
        setGrid={setGrid}
        timeSinceDeath={timeSinceDeath}
      />

      <Controls
        resetGrid={resetGrid}
        nextGeneration={nextGeneration}
        toggleHeatmap={toggleHeatmap}
        toggleAutoplay={toggleAutoplay}
        isRunning={isRunning}
      />

      <p>Currently living cells: {livingCells}</p>

    </div>
  );
};

export default GamePage;