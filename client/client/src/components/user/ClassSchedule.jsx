import { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";

export default function ClassSchedule() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [weeklySchedule, setWeeklySchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [hasTrainer, setHasTrainer] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axiosInstance.get("/api/user/getClasses");

        if (res.data && res.data.length > 0) {
          const grouped = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
          };

          res.data.forEach((item) => {
            if (grouped[item.day]) {
              grouped[item.day].push(item);
            }
          });

          setWeeklySchedule(grouped);
          setHasTrainer(true);
        } else {
          setHasTrainer(false);
        }
      } catch (error) {
        console.error("Failed to load class schedule", error);
        setHasTrainer(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight">Weekly Schedule</p>
            <p className="text-[#ababab] text-sm font-normal leading-normal">
              View your assigned trainer's weekly class schedule.
            </p>
          </div>
        </div>

        {/* Day Tabs */}
        <div className="pb-3">
          <div className="flex border-b border-[#474747] px-4 gap-8">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all ${
                  selectedDay === day ? "border-b-white text-white" : "border-b-transparent text-[#ababab]"
                }`}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">{day}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Class Cards */}
        {hasTrainer ? (
          weeklySchedule[selectedDay] && weeklySchedule[selectedDay].length > 0 ? (
            weeklySchedule[selectedDay].map((session, idx) => (
              <div key={idx} className="flex gap-4 bg-[#141414] px-4 py-3 justify-between items-center">
                <div className="flex items-start gap-4">
                  <div className="text-white flex items-center justify-center rounded-lg bg-[#303030] shrink-0 size-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.82c0,.06,0,.12,0,.18s0,.12,0,.18V192Zm32-24H208V88h16Z" />
                    </svg>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-white text-base font-medium leading-normal">{session.title}</p>
                    <p className="text-[#ababab] text-sm font-normal leading-normal">{session.time}</p>
                    <p className="text-[#ababab] text-sm font-normal leading-normal">Notes: {session.note}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#ababab] text-center mt-6">No classes scheduled for {selectedDay}.</p>
          )
        ) : (
          <p className="text-[#ababab] text-center mt-6">You have not been assigned a trainer. Please select one to view classes.</p>
        )}
      </div>
    </div>
  );
}
