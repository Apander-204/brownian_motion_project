import { useState } from "react";
import CanvasSimulation from "./CanvasSimulation";
import SpeedChart from "./SpeedChart";

function App() {

  const [temperature, setTemperature] = useState(0.5);
  const [particleCount, setParticleCount] = useState(100);
  const [isRunning, setIsRunning] = useState(true);
  const [averageSpeed, setAverageSpeed] = useState(0);

  const [chartData, setChartData] = useState([]);
  const [time, setTime] = useState(0);

  function addDataPoint(value) {
    const now = new Date().getSeconds();
    setChartData((prev) => [
      ...prev,
      { 
        time: now,
        value
      },
    ]);
    setTime((t) => t + 1);
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Визуализация броуновского движения</h1>
        <p>Продукт проекта, позволяющий увидеть визуальное представление движения броуновских частиц.</p>
      </div>
      
      <div className="inputs">
        <div className="temperature-input">
          <p>Температура: {temperature}</p>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
          />
        </div>

        <div className="particles-input">
            <p>Количество частиц: {particleCount}</p>
            <input
              type="range"
              min="1"
              max="10000"
              step="1"
              value={particleCount}
              onChange={(e) => setParticleCount(Number(e.target.value))}
            />
        </div>
      </div>

      <div className="simulation">
        <p>Визуализация</p>
        <div className="simulation-container">
          <CanvasSimulation
            temperature={temperature}
            particleCount={particleCount}
            isRunning={isRunning}
            setAverageSpeed={setAverageSpeed}
            addDataPoint={addDataPoint}
          />
        </div>
        <button onClick={() => setIsRunning(!isRunning)}>Пауза</button>
      </div>
      
      
      
      <div className="graph-info">
        <div className="info-container">
          <div className="info-item">
            <p>Температура</p>
            <b>{temperature}</b>
          </div>
          <div className="info-item">
            <p>Средняя скорость</p>
            <b>{averageSpeed.toFixed(2)}</b>
          </div>
          <div className="info-item">
            <p>Количество частиц</p>
            <b>{particleCount}</b>
          </div>
        </div>
        
        <div className="graph">
          <SpeedChart data={chartData} />
        </div>
      </div>
      
    </div>
  );
}

export default App;