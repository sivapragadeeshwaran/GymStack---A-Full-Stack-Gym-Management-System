import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import Swal from "sweetalert2";

export default function ClassSchedule() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [selectedDay, setSelectedDay] = useState("Monday");
  const navigate = useNavigate();

  // Mock weekly schedule (replace this later with real data from backend)
  const [weeklySchedule, setWeeklySchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/trainerProfile/getallclasses"
        );
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
      } catch (error) {
        console.error("Failed to load class schedule", error);
      }
    };
    fetchSchedule();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0bda0b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      color: "#fff",
      customClass: {
        popup: "swal-small",
        title: "swal-small-title",
        htmlContainer: "swal-small-text",
        confirmButton: "swal-small-btn",
        cancelButton: "swal-small-btn",
      },
    });
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/trainerProfile/classschedule/${id}`);
        setWeeklySchedule((prev) => {
          const updated = { ...prev };
          updated[selectedDay] = updated[selectedDay].filter(
            (item) => item._id !== id
          );
          return updated;
        });
        await Swal.fire({
          title: "Deleted!",
          text: "Member has been deleted.",
          icon: "success",
          background: "#1e1e1e",
          color: "#fff",
          customClass: {
            popup: "swal-small",
            title: "swal-small-title",
            htmlContainer: "swal-small-text",
            confirmButton: "swal-small-btn",
            cancelButton: "swal-small-btn",
          },
        });
      } catch (error) {
        console.error("Failed to delete class", error);
        Swal.fire("Error", "Failed to delete class", "error");
      }
    }
  };

  return (
    <div className="flex flex-1 justify-center py-3 md:py-5 px-4 md:px-40 bg-[#141414] min-h-screen">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between gap-3 p-4">
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <p className="text-white tracking-light text-2xl md:text-[32px] font-bold leading-tight">
              Weekly Schedule
            </p>
            <p className="text-[#ababab] text-sm font-normal leading-normal">
              View and manage your fitness classes for the week.
            </p>
          </div>
          <button
            onClick={() => navigate("/trainerpanel/addclass")}
            className="flex border-2 border-[#474747] transition active:scale-95 cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 md:h-8 px-4 bg-[#303030] text-white text-sm font-medium leading-normal w-full md:w-auto md:min-w-[84px]"
          >
            <span className="truncate">Add New Class</span>
          </button>
        </div>

        {/* Day Tabs */}
        <div className="pb-3">
          <div className="flex overflow-x-auto pb-2 px-4 hide-scrollbar">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all min-w-fit px-2 ${
                  selectedDay === day
                    ? "border-b-white text-white"
                    : "border-b-transparent text-[#ababab]"
                }`}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                  {day}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Class Cards */}
        <div className="px-4 pb-4">
          {weeklySchedule[selectedDay] &&
          weeklySchedule[selectedDay].length > 0 ? (
            <div className="space-y-4">
              {weeklySchedule[selectedDay].map((session, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row gap-4 bg-[#141414] border border-[#474747] px-4 py-3 justify-between items-start md:items-center rounded-lg"
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="text-white flex items-center justify-center rounded-lg bg-[#303030] shrink-0 size-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M248,120h-8V88a16,16,0,0,0-16-16H208V64a16,16,0,0,0-16-16H168a16,16,0,0,0-16,16v56H104V64A16,16,0,0,0,88,48H64A16,16,0,0,0,48,64v8H32A16,16,0,0,0,16,88v32H8a8,8,0,0,0,0,16h8v32a16,16,0,0,0,16,16H48v8a16,16,0,0,0,16,16H88a16,16,0,0,0,16-16V136h48v56a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16v-8h16a16,16,0,0,0,16-16V136h8a8,8,0,0,0,0-16ZM32,168V88H48v80Zm56,24H64V64H88V192Zm104,0H168V64h24V175.82c0,.06,0,.12,0,.18s0,.12,0,.18V192Zm32-24H208V88h16Z" />
                      </svg>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-white text-base font-medium leading-normal">
                        {session.title}
                      </p>
                      <p className="text-[#ababab] text-sm font-normal leading-normal">
                        {session.time}
                      </p>
                      <p className="text-[#ababab] text-sm font-normal leading-normal">
                        Notes: {session.note}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0 items-center mt-2 md:mt-0">
                    <button
                      onClick={() =>
                        navigate(`/trainerpanel/updateclass/${session._id}`, {
                          state: session,
                        })
                      }
                      className="text-white hover:text-yellow-400 p-2 rounded-full hover:bg-[#474747] transition"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(session._id)}
                      className="text-[#ababab] hover:text-red-500 transition p-2 rounded-full hover:bg-[#474747]"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#ababab]">
                No classes scheduled for {selectedDay}.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
