import "./TrendsPage.scss";
import Nav from "../Components/Nav/Nav";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // X axis
  LinearScale, // Y axis
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrendsPage({ active, setActive, dates, percentages }) {
  const data = {
    labels: dates.map((date) => date.slice(5, 10)),
    datasets: [
      {
        labels: "Habits",
        data: percentages.map((percentage) => percentage.percentage),
        backgroundColor: "black",
        borderColor: "rgb(156, 222, 156)",
        pointBorderColor: "black",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    clip: false,

    plugins: {
      legend: { display: false },
      title: { display: true, text: "Habit Completion Over Time" },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: { display: true, text: "Percentage of habits accomplished" },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <main className="habits">
      <Nav active={active} setActive={setActive} />
      <div className="habits__chart-container">
        <Line data={data} options={options} className="trends__chart"></Line>
      </div>
    </main>
  );
}
