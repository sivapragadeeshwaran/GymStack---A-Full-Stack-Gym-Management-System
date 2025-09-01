import MonthlyRevenueChart from "./dashboard-components/MonthlyRevenueChart"; // adjust the path
import MembershipPieChart from "./dashboard-components/MembershipPieChart";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import TrainerLoadChart from "./dashboard-components/TrainerLoadChart";
import { Fragment } from "react";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trainerData, setTrainerData] = useState([]);
  const maxCount = Math.max(...trainerData.map((t) => t.memberCount), 1);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axiosInstance.get("/api/analytics/dashboard-stats"); // Change to your actual API route
        setDashboardData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  const {
    totalMembers,
    expiringSoon,
    totalTrainers,
    currentMonthRevenue,
    joinedThisMonth,
    mostPopularPlan,
    totalRevenueLast6Months,
  } = dashboardData || {};

  return (
    <div className="px-40 flex flex-1 justify-center bg-[#141414] py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-wide text-[32px] font-bold leading-tight min-w-72">
            Dashboard
          </p>
        </div>
        <div className="flex flex-wrap gap-4 p-4">
          {[
            {
              label: "Total Members",
              value: totalMembers,
              change: "+5%",
              color: "text-[#0bda0b]",
            },
            {
              label: "Upcoming Expiries",
              value: expiringSoon,
              change: "-2%",
              color: "text-[#fa3838]",
            },
            {
              label: "Total Trainers",
              value: totalTrainers,
              change: "+10%",
              color: "text-[#0bda0b]",
            },
            {
              label: "Monthly Revenue",
              value: `₹${currentMonthRevenue?.toLocaleString?.() || 0}`,
              change: "+8%",
              color: "text-[#0bda0b]",
            },
            {
              label: "New Members This Month",
              value: joinedThisMonth,
              change: "+15%",
              color: "text-[#0bda0b]",
            },
            {
              label: "Most Popular Plan",
              value: mostPopularPlan?.name || "No Data",
              change: null,
              color: "", // To avoid undefined class error
            },
          ].map(({ label, value, change, color }) => (
            <div
              key={label}
              className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#303030]"
            >
              <p className="text-white text-base font-medium leading-normal">
                {label}
              </p>
              <p className="text-white tracking-wide text-2xl font-bold leading-tight">
                {value}
              </p>
              {change && (
                <p className={`${color} text-base font-medium leading-normal`}>
                  {change}
                </p>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Overview
        </h2>

        <div className="flex flex-wrap gap-4 px-4 py-6">
          {/* Monthly Revenue Card */}
          <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#474747] p-6">
            <p className="text-white text-base font-medium leading-normal">
              Half-Yearly Revenue
            </p>
            <p className="text-white tracking-wide text-[32px] font-bold leading-tight truncate">
              ₹{totalRevenueLast6Months?.toLocaleString?.() || 0}
            </p>
            <div className="flex gap-1">
              <p className="text-[#ababab] text-base font-normal leading-normal">
                6 Months
              </p>
              <p className="text-[#0bda0b] text-base font-medium leading-normal">
                +8%
              </p>
            </div>
            <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
              {/* SVG Chart */}
              <div className="flex min-h-[160px] flex-1 flex-col gap-8 py-4">
                <MonthlyRevenueChart />
              </div>
            </div>
          </div>

          {/* Membership Distribution */}
          <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#474747] p-6">
            <p className="text-white text-base font-medium leading-normal">
              Membership Distribution
            </p>
            <p className="text-white tracking-wide text-[32px] font-bold leading-tight truncate">
              {totalMembers}
            </p>
            <p className="text-[#ababab] text-base font-normal leading-normal">
              Total
            </p>
            <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
              <MembershipPieChart />
            </div>
          </div>

          {/* Trainer Load */}
          <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#474747]  pt-6">
            <div className="px-6">
              <p className="text-white text-base font-medium leading-normal">
                Trainer Load
              </p>
              <p className="text-white tracking-wide text-[32px] font-bold leading-tight truncate">
                {trainerData.length}
              </p>
              <p className="text-[#ababab] text-base font-normal leading-normal">
                Total
              </p>
            </div>
            <TrainerLoadChart />
          </div>
        </div>
      </div>
    </div>
  );
}
