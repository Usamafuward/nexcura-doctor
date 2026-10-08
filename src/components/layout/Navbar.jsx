import { useState } from "react";
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
import { useApp } from "../../context/SidebarContext";

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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-[#080B11]/90 backdrop-blur-xl border-b border-[#1C2436] px-4 sm:px-8 py-3 flex items-center justify-between z-30 sticky top-0"
    >
      {/* Left: Brand + Pill Navigation Tabs */}
      <div className="flex items-center gap-6">
        {/* Brand Logo & Name */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-[#D4FF00] p-1.5 flex items-center justify-center shadow-lime-sm">
            <img src={logo} alt="Mediman" className="w-full h-full object-contain filter invert" />
          </div>
          <span className="font-extrabold text-base tracking-wider text-white">
            Mediman
          </span>
        </motion.div>

        {/* Pill Navigation Tabs with Sliding Layout Indicator */}
        <nav className="hidden md:flex items-center bg-[#121722] p-1 rounded-full border border-[#1C2436] text-xs relative">
          {navLinks.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className="relative px-4 py-1.5 rounded-full font-medium transition-colors text-xs z-10 block"
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
      <div className="flex items-center gap-3">
        {/* Command Search Bar */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121722] hover:bg-[#181F2E] border border-[#1C2436] text-xs text-[#8E99A8] transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span className="hidden sm:inline">Search...</span>
          <div className="hidden sm:flex items-center gap-0.5 text-[9px] font-mono bg-[#1C2438] px-1.5 py-0.5 rounded text-slate-300">
            <Command className="w-2.5 h-2.5" />
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
          className="px-3.5 py-1.5 rounded-full bg-[#181F2E] hover:bg-[#1F283C] border border-[#D4FF00]/40 text-[#D4FF00] text-xs font-bold font-mono flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Video className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tele-Room</span>
        </motion.button>

        {/* Notification Bell */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-full bg-[#121722] hover:bg-[#181F2E] border border-[#1C2436] text-[#8E99A8] hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4FF00] shadow-lime-sm animate-pulse" />
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
                  <span className="font-bold text-white">Notifications</span>
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
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-[#121722] hover:bg-[#181F2E] border border-[#1C2436] transition-colors"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#D4FF00]/50">
              <img src={doctor} alt="Dr. Ramesh" className="w-full h-full object-cover" />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#D4FF00]" />
            </div>
            <span className="hidden sm:inline text-xs font-bold text-white">Dr. Ramesh</span>
            <ChevronDown className={`w-3 h-3 text-[#8E99A8] transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
