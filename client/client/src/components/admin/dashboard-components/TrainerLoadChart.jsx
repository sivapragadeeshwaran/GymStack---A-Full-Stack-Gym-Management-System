import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function TrainerLoadChart() {
  const [trainerData, setTrainerData] = useState([]);

  useEffect(() => {
    const fetchTrainerLoad = async () => {
      try {
        const res = await axiosInstance.get("/api/analytics/load");
        setTrainerData(res.data);
      } catch (err) {
        console.error("Failed to fetch trainer load", err);
      }
    };

    fetchTrainerLoad();
  }, []);

  return (
    <div className="w-full h-[250px]  rounded-xl  shadow">
      <ResponsiveContainer width="100%" height="75%">
        <BarChart
          data={trainerData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
          barCategoryGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis type="number" stroke="#ccc" />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#ccc"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#2a2a2a", border: "none" }}
            labelStyle={{ color: "#ccc" }}
            itemStyle={{ color: "#0bda0b" }}
          />
          <Bar dataKey="memberCount" fill="#0bda0b" barSize={20}  />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
