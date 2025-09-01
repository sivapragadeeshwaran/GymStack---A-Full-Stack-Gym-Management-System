import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/authService"; // adjust if your folder structure differs

export default function HeroSection() {
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const handleBeMember = () => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    const role = authUser.role?.toLowerCase();
    if (role === "admin") {
      navigate("/adminpanel");
    } else if (role === "trainer") {
      navigate("/trainerpanel");
    } else if (role === "user") {
      navigate("/userpanel");
    } else {
      navigate("/"); // fallback
    }
  };

  return (
    <div
      className="relative flex flex-col overflow-x-hidden bg-[#1a1a1a] pb-10"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#363636] rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#363636] rounded-full filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="flex flex-col h-full w-full px-4 sm:px-6 lg:px-40 lg:ml-2 relative z-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-8 sm:gap-12 md:flex-row md:items-center">
            {/* Image with premium styling */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl sm:min-h-[280px] md:min-w-[450px] md:w-1/2 group">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transform transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKuraBSUHHkndUCI28YLmQs_0ZEXwseN-IXDTQN8gr7v2P8KVyKeS-qMbVzZ2XSUCP_MhjNFT0dp0G1dxfssSq5p_C1BtYxfFGwa3vXh95hWzvc5kZbqOQK6X1k7UZGKSEkXUcMSLWWAve80DZhKjGANms_Hj4MMicJ8Q4jLvDJFH4snulJg1yp1WL9U7dobqtSOm7ZRT6zLH0Su5f5bCF5-ZHMZikLntMBbIdXCnsDmSFZh_5WkKKK2kb-lc_fKdd7KTRaesPFH4")',
                }}
              ></div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-30"></div>
              {/* Border accent */}
              <div className="absolute inset-0 rounded-2xl border border-[#363636] opacity-50 pointer-events-none"></div>
            </div>

            {/* Text Content with enhanced styling */}
            <div className="flex flex-col gap-6 pt-4 md:pt-0 md:w-1/2">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-white">
                  IMPROVE YOUR <span className="text-[#adadad]">FITNESS</span>{" "}
                  LEVEL FOR THE BETTER
                </h1>

                <p className="text-base sm:text-lg text-[#adadad] leading-relaxed">
                  Our gym offers state-of-the-art equipment, expert trainers,
                  and a supportive community to help you achieve your fitness
                  goals. Join us today and start your journey to a healthier,
                  stronger you.
                </p>
              </div>

              {/* Enhanced Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleBeMember}
                  className="transition active:scale-95 relative overflow-hidden transition-all duration-300 h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-black text-sm sm:text-base font-bold text-white group"
                >
                  <span className="relative z-10">Be a Member</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#363636] to-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>

                <button
                  onClick={() => {
                    const section = document.getElementById("classes");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="transition active:scale-95 relative overflow-hidden transition-all duration-300 h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-[#363636] text-sm sm:text-base font-bold text-white group hover:bg-[#4d4d4d]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Learn More
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>

              {/* Stats or additional info */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
