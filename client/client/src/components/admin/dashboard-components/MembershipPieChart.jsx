import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance"; // adjust path if needed
import { toast } from "react-toastify";
const COLORS = ["#00BFFF", "#00FA9A", "#FFD700", "#FF6347", "#DA70D6", "#FF1493"];


export default function MembershipPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        const res = await axiosInstance.get("/api/analytics/membership-distribution");
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching pie chart data", error);
        toast.error("Failed to load membership distribution.");
      }
    };

    fetchDistribution();
  }, []);

  return (
   
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="plan"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  stroke="#0a0a0aff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

  );
}
