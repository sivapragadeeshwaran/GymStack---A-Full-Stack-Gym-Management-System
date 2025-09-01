import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/authService";

// map user roles to their root panel paths
const roleRouteMap = {
  admin: "/adminpanel",
  trainer: "/trainerpanel",
  user: "/userpanel",
};

export default function Navbar({ onNavigate, activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const hoverTimeout = useRef(null);

  const navigate = useNavigate();
  const { authUser, logout } = useAuth();

  const handleClick = (section, e) => {
    e.preventDefault();
    if (onNavigate) onNavigate(section);
    setMobileMenuOpen(false);
  };

  const handleAvatarClick = () => {
    if (!authUser) return;
    const role = authUser.role?.toLowerCase();
    const target = roleRouteMap[role] || "/";
    navigate(target);
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowLogout(false);
    }, 800); // wait 2 seconds before hiding
  };

  const navItems = [
    { label: "Home", key: "home" },
    { label: "Classes", key: "classes" },
    { label: "Memberships", key: "membership" },
    { label: "Contact", key: "contact" },
  ];

  return (
    <div className="relative flex size-full flex-col overflow-x-hidden bg-[#1a1a1a] pb-24" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between border-b border-[#363636] px-4 sm:px-10 py-3 fixed top-0 left-0 right-0 z-30 bg-[#1a1a1a]">
          {/* Left: mobile hamburger + logo / Desktop logo */}
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none mr-1">
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Logo */}
            <div className="flex justify-center items-center gap-2 text-white">
              <div className="size-4 mb-4 mr-3">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <path fillRule="evenodd" clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" />
                </svg>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">STRENGTH ZONE</h2>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
            <div className="flex items-center gap-9">
              {navItems.map(({ label, key }) => (
                <button key={key} onClick={(e) => handleClick(key, e)} className={`text-sm font-medium text-white relative pb-1 ${activeSection === key ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white" : ""}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Desktop Auth (Hover to show Logout) */}
            {!authUser ? (
              <button onClick={() => navigate("/login")} className="flex h-10 min-w-[84px] transition active:scale-95 border-2 border-[#474747] items-center justify-center rounded-full bg-black px-4 text-sm font-bold text-white">
                Login
              </button>
            ) : (
              <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="flex items-center gap-2 cursor-pointer rounded-full border border-transparent bg-[#222] px-3 py-2" onClick={handleAvatarClick}>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black font-bold">
                    {authUser.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-white">{authUser.username}</span>
                </div>
                {showLogout && (
                  <div className="transition-all duration-200 absolute right-0 mt-2 w-[120px] bg-[#1f1f1f] border border-[#444] rounded-md shadow-lg z-50">
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-[#f1f1f1] hover:bg-[#2d2d2d] rounded-b-md">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Right Auth */}
          <div className="md:hidden flex items-center gap-3">
            {!authUser ? (
              <button onClick={() => navigate("/login")} className="flex h-9 px-3 py-2 rounded-full bg-black text-sm font-bold text-white border border-[#474747]">
                Login
              </button>
            ) : (
              <div className="relative group">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black font-bold cursor-pointer" onClick={handleAvatarClick}>
                  {authUser.username?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 absolute top-full mt-1 right-0 w-[100px] bg-[#1f1f1f] border border-[#444] rounded-md shadow-lg">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-[#f1f1f1] hover:bg-[#2d2d2d] rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-[#1a1a1a] pt-[80px]">
            {navItems.map(({ label, key }) => (
              <button key={key} onClick={(e) => handleClick(key, e)} className="text-sm font-medium text-white text-left">
                {label}
              </button>
            ))}

            {!authUser ? (
              <button onClick={() => { navigate("/login"); setMobileMenuOpen(false); }} className="w-full h-10 rounded-full bg-black px-4 text-sm font-bold text-white">
                Login
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black font-bold cursor-pointer" onClick={() => { handleAvatarClick(); setMobileMenuOpen(false); }}>
                  {authUser.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-white">{authUser.username}</span> 
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-sm text-gray-400 hover:text-white">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
