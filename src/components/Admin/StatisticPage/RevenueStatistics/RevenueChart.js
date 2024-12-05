import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement, // For Pie Chart
} from "chart.js";
import styles from "../../../../styles/BookingChart.module.css";
import { getRevenueStatistics } from "../../../../api/Services/PaymentServices";
import { useParams } from "react-router-dom";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement // Register ArcElement for Pie chart
);

const RevenueChart = () => {
  const [data, setData] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const { year } = useParams();

  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await getRevenueStatistics(year);
      setData(res);
    };
    fetchStatistics();
  }, []);

  if (!data) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const RevenuePerMonth = Array(12).fill(0);

  data.revenuePerMonth.forEach((item) => {
    RevenuePerMonth[item.Month - 1] = item.Revenue;
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Revenue",
        data: RevenuePerMonth,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(20, 20, 207, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(99, 255, 132, 0.6)",
          "rgba(205, 255, 86, 0.6)",
          "rgba(162, 54, 235, 0.6)",
          "rgba(102, 153, 255, 0.6)",
          "rgba(203, 201, 207, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales:
      chartType === "pie"
        ? {}
        : {
            // Disable scales for Pie chart
            y: {
              beginAtZero: true,
            },
          },
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartSidebar}>
        <button
          onClick={() => setChartType("bar")}
          className={`${styles.chartSidebarBtn} ${
            chartType === "bar" ? styles.activeSidebarBtn : ""
          }`}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setChartType("line")}
          className={`${styles.chartSidebarBtn} ${
            chartType === "line" ? styles.activeSidebarBtn : ""
          }`}
        >
          Line Chart
        </button>
        <button
          onClick={() => setChartType("pie")}
          className={`${styles.chartSidebarBtn} ${
            chartType === "pie" ? styles.activeSidebarBtn : ""
          }`}
        >
          Pie Chart
        </button>
      </div>
      <div className={styles.chartContent}>
        <div className={styles.chartDisplay}>
          {chartType === "bar" && <Bar data={chartData} options={options} />}
          {chartType === "line" && <Line data={chartData} options={options} />}
          {chartType === "pie" && <Pie data={chartData} options={options} />}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
