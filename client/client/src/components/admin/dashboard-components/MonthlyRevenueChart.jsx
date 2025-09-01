import { Bar } from "react-chartjs-2";
import axiosInstance from "../../../services/axiosInstance";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MonthlyRevenueChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axiosInstance.get("api/analytics/monthly-revenue");
        const data = res.data.data;

        const labels = data.map(item => item.month);
        const revenue = data.map(item => item.revenue);

        setChartData({
          labels,
          datasets: [
            {
              label: "Revenue (₹)",
              data: revenue,
              backgroundColor: "#0bda0b",
              borderRadius: 6,
              barThickness: 30,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch revenue data", error);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { color: "#ababab" },
            grid: { display: false },
          },
          y: {
            ticks: { display: false },
            grid: { display: false },
          },
        },
      }}
    />
  );
}
