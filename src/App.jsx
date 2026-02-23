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
        <img src="./logo.png"/>
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

      <div className="footer">
        <a href="https://t.me/Apandeer">
          <svg width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-telegram">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
          </svg>
        </a>
        <p>Сайт создан в качестве продукта для проекта студента 1 курса НКПиИТ, группы ИСиП 1-9-25, Панина Андрея Алексеевича</p>
      </div>
      
    </div>
  );
}

export default App;