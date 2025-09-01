import { useEffect, useState } from "react";
import Slider from "react-slick";
import axiosInstance from "../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/authService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Membership() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get("/api/plans/");
        if (res.data.success) {
          setPlans(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);


  const handleSelectPlan = () => {
    if (authUser) {
      navigate("/userpanel/add-membership");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="text-white px-6 py-10">Loading membership plans...</div>
    );
  }

  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="layout-content-container flex flex-col w-full flex-1 px-4 lg:px-44 py-6">
    <div className="flex flex-col text-white  items-center text-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h1>
            <div className="w-16 h-1 bg-[#363636] mb-6"></div>
          </div>
      <Slider {...settings}>
        {plans.map((plan, index) => {
          const isActive = index === currentSlide;
          return (
            <div key={plan._id} className="px-2 hover:-translate-y-1">
              <div
                className={`transition-all duration-300 transform ${
                  isActive
                    ? "scale-105 shadow-xl border-[#5CFF5C]"
                    : "scale-90 opacity-70"
                } rounded-xl border border-solid border-[#474747] bg-[#212121] p-6 min-h-[325px] flex flex-col gap-4`}
              >
                <div className="flex flex-col gap-1">
                  <h1 className="text-white text-base font-bold leading-tight capitalize">
                    {plan.name} Membership
                  </h1>
                  <p className="flex items-baseline gap-1 text-white">
                    <span className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                      ₹{plan.price}
                    </span>
                    <span className="text-white text-base font-bold leading-tight">
                      / {plan.period}
                    </span>
                  </p>
                </div>

                <button onClick={handleSelectPlan}
                 className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#303030] text-white text-sm font-bold leading-normal tracking-[0.015em] transition active:scale-95">
                  <span className="truncate">Select Plan</span>
                </button>

                <div className="flex flex-col gap-2 mt-2">
                  <BenefitItem text="Unlimited gym access" />
                  <BenefitItem text="Locker Rooms & Changing Areas" />
                  <BenefitItem text="Free Wi-Fi Access" />
                  {plan.includesPersonalTraining && (
                    <BenefitItem text="Includes Personal Training" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

function BenefitItem({ text }) {
  return (
    <div className="text-[13px] font-normal leading-normal flex gap-3 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="20px"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
      </svg>
      {text}
    </div>
  );
}
