import { Loader } from "@/website/components/Loader/Loader";
import { getMonthlyChartData } from "@/website/lib/networkCalls/dashboard/dashboardAnalytics";
import { labels } from "@/website/lib/types/common";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import FilterBox from "../FilterBox/FilterBox";
import styles from "./GraphCard.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  borderRadius: 20,
  barPercentage: 0.5,
  categoryPercentage: 1.2,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        boxWidth: 20,
        color: "white",
      },
    },
  },
};

const GraphCard = () => {
  const [filter, setFilter] = useState<string>("");
  const handleFilterChange = (value: string) => {
    setFilter(value.split(" ")[0]);
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const response = getMonthlyChartData(filter);
    response.then((res) => {
      const data = res.data.result;

      const newChartData = generateChartData(data);
      setChartData({ ...newChartData });
      setIsLoading(false);
    });
  }, [filter]);

  function generateChartData(data) {
    const previousMonths = data.map((item) => {
      return labels[item.month - 1];
    });
    return {
      labels: previousMonths,
      datasets: [
        {
          label: "State Ambassador",
          data: data.map((item) => item.minionTotal),
          backgroundColor: "#00ff00",
          borderWidth: 6,
        },
        {
          label: "Influencer",
          data: data.map((item) => item.influencerTotal),
          backgroundColor: "#e03a45",
          borderWidth: 6,
        },
        {
          label: "Current Recipient",
          data: data.map((item) => item.total),
          backgroundColor: "#00ffcc",
          borderWidth: 6,
        },
      ],
    };
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.card}>
          <div className={styles.card_header}>
            <h6 className="h8 font-fugaz uppercase">
              Donated Money Distribution
            </h6>
            <FilterBox
              values={["1 month", "6 months", "12 months"]}
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.card_body}>
            {chartData && (
              <Bar options={options} data={chartData} height={400} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GraphCard;
