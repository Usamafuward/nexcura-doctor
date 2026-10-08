import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Command,
  Video,
  ChevronDown,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import doctor from "../../assets/doctor.png";
import logo from "../../assets/logo.png";
import { useApp } from "../../context/AppContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const {
    setCommandPaletteOpen,
    setActiveTeleconsultation,
    doctorStatus,
    setDoctorStatus,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    showToast,
  } = useApp();

  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Dynamic header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close notification and profile panels when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close panels automatically when switching routes
  useEffect(() => {
    setIsNotificationsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: "Overview", path: "/" },
    { label: "Patients", path: "/patients" },
    { label: "Appointments", path: "/appointments" },
    { label: "Records", path: "/records" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`w-full px-4 sm:px-8 flex items-center justify-between z-30 sticky top-0 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080B11]/90 backdrop-blur-xl border-b border-[#1C2436]/80 shadow-2xl py-4"
          : "bg-transparent border-b border-transparent pt-5 sm:pt-6 pb-3"
      }`}
    >
      {/* Left: Brand + Pill Navigation Tabs */}
      <div className="flex items-center gap-3.5 sm:gap-5">
        {/* Brand Logo & Name inside rounded div with no logo background */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="h-11 px-4 py-2 rounded-full bg-[#121722] border border-[#1C2436] hover:border-[#D4FF00]/40 transition-colors cursor-pointer shadow-md flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-transparent overflow-hidden flex-shrink-0">
            <img src={logo} alt="Nexcura" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold text-[15px] tracking-wide text-white pr-1">
            Nexcura
          </span>
        </motion.div>

        {/* Pill Navigation Tabs with Sliding Layout Indicator */}
        <nav className="hidden md:flex items-center bg-[#121722] p-1 rounded-full border border-[#1C2436] h-11 relative">
          {navLinks.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className="relative px-4 sm:px-5 py-2 rounded-full font-semibold transition-colors text-sm z-10 block"
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-[#D4FF00] rounded-full shadow-lime-sm -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className={isActive ? "text-black font-bold" : "text-[#8E99A8] hover:text-white"}>
                  {tab.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Right Controls: Search, Tele-Clinic, Notifications & Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Command Search Bar */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setCommandPaletteOpen(true)}
          className="h-11 flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#121722] hover:bg-[#181F2E] border border-[#1C2436] text-sm text-[#8E99A8] transition-colors"
        >
          <Search className="w-4 h-4 text-[#D4FF00]" />
          <span className="hidden sm:inline font-medium">Search...</span>
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono bg-[#1C2438] px-2 py-0.5 rounded text-slate-300">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </motion.button>

        {/* Start Tele-Clinic Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setActiveTeleconsultation({
              patientName: "Kamalesh Patel",
              age: 32,
              problem: "Diabetes Review",
            })
          }
          className="h-11 px-4 sm:px-5 py-2 rounded-full bg-[#181F2E] hover:bg-[#1F283C] border border-[#D4FF00]/40 text-[#D4FF00] text-sm font-bold font-mono flex items-center gap-2 transition-all shadow-sm"
        >
          <Video className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Tele-Room</span>
        </motion.button>

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              setIsProfileOpen(false);
            }}
            aria-label="Notifications"
            className="relative w-11 h-11 rounded-full bg-[#121722] hover:bg-[#181F2E] border border-[#1C2436] text-[#8E99A8] hover:text-white transition-colors flex items-center justify-center"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#D4FF00] shadow-lime-sm animate-pulse" />
            )}
          </motion.button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute right-0 mt-2 w-80 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl p-4 z-50 text-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#1C2436]">
                  <span className="font-bold text-white text-sm">Notifications</span>
                  <button
                    onClick={clearAllNotifications}
                    className="text-[10px] text-[#D4FF00] hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="divide-y divide-[#1C2436]/60 max-h-64 overflow-y-auto mt-2">
                  {notifications.map((n) => (
                    <motion.div
                      key={n.id}
                      whileHover={{ x: 3 }}
                      onClick={() => markNotificationAsRead(n.id)}
                      className="py-2.5 cursor-pointer hover:bg-white/5 rounded-xl px-2 transition-colors"
                    >
                      <div className="font-semibold text-white">{n.title}</div>
                      <div className="text-[11px] text-[#8E99A8] mt-0.5">{n.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Doctor Avatar with Status Indicator */}
        <div className="relative" ref={profileRef}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setIsProfileOpen((prev) => !prev);
              setIsNotificationsOpen(false);
            }}
            aria-label="Doctor Profile Menu"
            className="h-11 flex items-center gap-2.5 p-1 pl-1.5 pr-3.5 rounded-full bg-[#121722] hover:bg-[#181F2E] border border-[#1C2436] transition-colors"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D4FF00]/50 flex-shrink-0">
              <img src={doctor} alt="Dr. Ramesh" className="w-full h-full object-cover" />
            </div>
            <span className="hidden sm:inline text-sm font-bold text-white">Dr. Ramesh</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#8E99A8] transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
          </motion.button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#121722] border border-[#1C2436] p-3 shadow-2xl z-50 text-xs space-y-2"
              >
                <div className="pb-2 border-b border-[#1C2436]">
                  <div className="font-bold text-white">Dr. Ramesh Varma, MD</div>
                  <div className="text-[10px] text-[#8E99A8]">Chief Cardiologist</div>
                </div>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => {
                    setDoctorStatus("available");
                    setIsProfileOpen(false);
                    showToast("Status: Active On Duty");
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[#181F2E] text-slate-200 flex items-center justify-between"
                >
                  <span>On Duty</span>
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => {
                    setDoctorStatus("on-break");
                    setIsProfileOpen(false);
                    showToast("Status: On Break");
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[#181F2E] text-slate-400 flex items-center justify-between"
                >
                  <span>On Break</span>
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => {
                    navigate("/settings");
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[#181F2E] text-slate-300 flex items-center justify-between border-t border-[#1C2436]/60 pt-2"
                >
                  <span>Clinic Settings</span>
                  <Sliders className="w-3.5 h-3.5 text-[#8E99A8]" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
