import { useState } from "react";
import axiosInstance from "../../services/axiosInstance"; // Adjust path as needed
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddClass() {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [note, setNotes] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title || !day || !time) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/trainerProfile/addclass", {
        title,
        day,
        time,
        note,
      });

      Swal.fire({
        title: "Added!",
        text: "Class added successfully!",
        icon: "success",
        color: "#fff",
        customClass: {
          popup: "swal-small",
          title: "swal-small-title",
          htmlContainer: "swal-small-text",
          confirmButton: "swal-small-btn",
          cancelButton: "swal-small-btn",
        },
      });
      navigate("/trainerpanel/classschedule");
      // change path if needed
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Add Class
          </p>
        </div>

        {/* Title Field */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Title
            </p>
            <input
              placeholder="Enter class title"
              className="form-input w-full rounded-xl bg-[#303030] h-14 p-4 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>

        {/* Day Dropdown */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Day
            </p>
            <select
              className="form-input w-full rounded-xl bg-[#303030] h-14 p-4 text-white"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>
        </div>

        {/* Time Field */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Time
            </p>
            <input
              placeholder="e.g. 6:00 AM - 7:00 AM"
              className="form-input w-full rounded-xl bg-[#303030] h-14 p-4 text-white"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>

        {/* Notes Field */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Notes
            </p>
            <textarea
              placeholder="Optional notes"
              className="form-input w-full rounded-xl bg-[#303030] min-h-36 p-4 text-white"
              value={note}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex px-4 py-3 justify-start">
          <button
            onClick={handleSubmit}
            className="rounded-full h-10 px-6 border-2 border-[#474747] transition active:scale-95 bg-black text-white text-sm font-bold"
          >
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
