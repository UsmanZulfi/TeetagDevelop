import { labels } from "@/website/lib/types/common";
import { faker } from "@faker-js/faker";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { ReactComponentElement } from "react";
import { Line } from "react-chartjs-2";
import styles from "./GraphCard.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  borderRadius: 20,
  barPercentage: 0.5,
  categoryPercentage: 1.2,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        display: true,
      },
      gridLines: {
        display: true,
      },
    },
    x: {
      beginAtZero: true,
    },
  },
  elements: {
    line: {
      tension: 0.4, // Adjust the tension value as needed (0.1 to 1)
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "State Ambassador",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 4000 })),
      backgroundColor: "#00ff00",
      borderWidth: 6,
      fill: true,
      tension: 0.5,
    },
    {
      label: "Influencer",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 4000 })),
      backgroundColor: "#e03a45",
      borderWidth: 6,
      fill: true,
      tension: 0.5,
    },
    {
      label: "Current Recipient",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 4000 })),
      backgroundColor: "#00ffcc",
      borderWidth: 6,
      fill: true,
      tension: 0.5,
    },
  ],
};
interface GraphCardProps {
  chartdata: any;
  filterBox?: ReactComponentElement<any>;
}

const LineGraph = ({ chartdata, filterBox }: GraphCardProps) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <h6 className="h8 font-fugaz uppercase">
            {chartdata?.datasets?.length > 0 && chartdata?.datasets[0]?.label}
          </h6>
          <>{filterBox}</>
        </div>
        <div className={styles.card_body}>
          {chartdata?.datasets?.length > 0 && (
            <Line options={options} data={chartdata} height={400} />
          )}
        </div>
      </div>
    </>
  );
};

export default LineGraph;
