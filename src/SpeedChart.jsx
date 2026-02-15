import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

function SpeedChart({ data }) {
  const chartData = {
    labels: data.map((point) => point.time),
    datasets: [
      {
        label: "Средняя скорость",
        data: data.map((point) => point.value),
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return <Line data={chartData} />;
}

export default SpeedChart;
