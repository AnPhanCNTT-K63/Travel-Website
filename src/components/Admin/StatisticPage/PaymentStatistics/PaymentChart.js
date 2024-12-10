import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
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
} from "chart.js";
import styles from "../../../../styles/BookingChart.module.css";
import { getPaymentStatistics } from "../../../../api/Services/PaymentServices";
import { useParams } from "react-router-dom";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const PaymentChart = () => {
  const [data, setData] = useState(null);
  const [selectedChart, setSelectedChart] = useState("total");
  const [chartType, setChartType] = useState("bar");
  const { year } = useParams();

  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await getPaymentStatistics(year);
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

  const totalPaymentData = Array(12).fill(0);
  const successfulPaymentData = Array(12).fill(0);
  const failedPaymentData = Array(12).fill(0);

  data.totalPaymentPerMonth.forEach((item) => {
    totalPaymentData[item.PaymentMonth - 1] = item.PaymentCount;
  });

  data.PaymentSuccessPerMonth.forEach((item) => {
    successfulPaymentData[item.PaymentMonth - 1] = item.PaymentCount;
  });

  data.PaymentFailPerMonth.forEach((item) => {
    failedPaymentData[item.PaymentMonth - 1] = item.PaymentCount;
  });

  // Chart data for each type
  const chartData = {
    total: {
      labels: months,
      datasets: [
        {
          label: "Total Bookings",
          data: totalPaymentData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(75, 192, 192, 0.6)"
              : "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    },
    successful: {
      labels: months,
      datasets: [
        {
          label: "Successful Bookings",
          data: successfulPaymentData,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(54, 162, 235, 0.6)"
              : "rgba(54, 162, 235, 0.2)",
          tension: 0.4,
        },
      ],
    },
    failed: {
      labels: months,
      datasets: [
        {
          label: "Failed Bookings",
          data: failedPaymentData,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(255, 99, 132, 0.6)"
              : "rgba(255, 99, 132, 0.2)",
          tension: 0.4,
        },
      ],
    },
    combined: {
      labels: months,
      datasets: [
        {
          label: "Total Bookings",
          data: totalPaymentData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(75, 192, 192, 0.6)"
              : "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
        {
          label: "Successful Bookings",
          data: successfulPaymentData,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(54, 162, 235, 0.6)"
              : "rgba(54, 162, 235, 0.2)",
          tension: 0.4,
        },
        {
          label: "Failed Bookings",
          data: failedPaymentData,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor:
            chartType === "bar"
              ? "rgba(255, 99, 132, 0.6)"
              : "rgba(255, 99, 132, 0.2)",
          tension: 0.4,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
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
      </div>

      <div className={styles.chartContent}>
        <div className={styles.chartButtons}>
          <button
            onClick={() => setSelectedChart("total")}
            className={`${styles.chartBtn} ${
              selectedChart === "total" ? styles.activeBtn : ""
            }`}
          >
            Total Bookings
          </button>
          <button
            onClick={() => setSelectedChart("successful")}
            className={`${styles.chartBtn} ${
              selectedChart === "successful" ? styles.activeBtn : ""
            }`}
          >
            Successful Bookings
          </button>
          <button
            onClick={() => setSelectedChart("failed")}
            className={`${styles.chartBtn} ${
              selectedChart === "failed" ? styles.activeBtn : ""
            }`}
          >
            Failed Bookings
          </button>
          <button
            onClick={() => setSelectedChart("combined")}
            className={`${styles.chartBtn} ${
              selectedChart === "combined" ? styles.activeBtn : ""
            }`}
          >
            All Data
          </button>
        </div>

        <div className={styles.chartDisplay}>
          {chartType === "bar" ? (
            <Bar data={chartData[selectedChart]} options={options} />
          ) : (
            <Line data={chartData[selectedChart]} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentChart;
