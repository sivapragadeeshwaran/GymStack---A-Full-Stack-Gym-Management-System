import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import Swal from "sweetalert2";

export default function UpdateClass() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    day: "",
    time: "",
    note: "",
  });

  useEffect(() => {
    if (state) {
      setFormData({
        title: state.title || "",
        day: state.day || "",
        time: state.time || "",
        note: state.note || "",
      });
    }
  }, [state]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(
        `/api/trainerProfile/classschedule/${state._id}`,
        formData
      );
      Swal.fire({
        title: "Updated!",
        text: "Class updated successfully!",
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
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update class", "error");
    }
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Update Class
          </p>
        </div>

        {/* Title */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Title
            </p>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter class title"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#303030] h-14 placeholder:text-[#ababab] p-4 text-base font-normal leading-normal"
            />
          </label>
        </div>

        {/* Day */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Day
            </p>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#303030] h-14 placeholder:text-[#ababab] p-4 text-base font-normal leading-normal"
            >
              <option value="">Select a day</option>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Time */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Time
            </p>
            <input
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Enter class time"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#303030] h-14 placeholder:text-[#ababab] p-4 text-base font-normal leading-normal"
            />
          </label>
        </div>

        {/* Notes */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Notes
            </p>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Enter class notes"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#303030] min-h-36 placeholder:text-[#ababab] p-4 text-base font-normal leading-normal"
            ></textarea>
          </label>
        </div>

        {/* Submit */}
        <div className="flex px-4 py-3 justify-start">
          <button
            onClick={handleUpdate}
            className="border-2 border-[#474747] transition active:scale-95 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-black text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Update</span>
          </button>
        </div>
      </div>
    </div>
  );
}
