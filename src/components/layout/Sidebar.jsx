import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLast,
  ChevronFirst,
  Plus,
  ShieldCheck,
  Zap,
} from "lucide-react";
import logo from "../../assets/logo.png";
import mediman from "../../assets/mediman.png";
import { useApp } from "../../context/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, setSidebarOpen, setNewAppointmentModalOpen, showToast } = useApp();

  const menuItems = [
    { icon: <Home size={19} />, label: "Dashboard", path: "/" },
    {
      icon: <Calendar size={19} />,
      label: "Appointments",
      path: "/appointments",
      badge: "8",
    },
    { icon: <Users size={19} />, label: "Patients & EHR", path: "/patients", badge: "1.2k" },
    { icon: <FileText size={19} />, label: "Medical Records", path: "/records", badge: "3 new" },
    { icon: <Settings size={19} />, label: "Clinic Settings", path: "/settings" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-gradient-to-b from-[#051329] via-[#091D3E] to-[#040C1A] text-white flex flex-col border-r border-slate-800/80 shadow-2xl relative">
        {/* Brand Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800/60">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative shrink-0 p-1.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-cyan-500/30 shadow-glow-cyan/20">
              <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#091D3E]" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-wide bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                    NEXCURA
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded-md border border-cyan-500/40">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Clinical OS v2.4</span>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3.5 top-16 z-50 w-7 h-7 rounded-full bg-blue-600 hover:bg-cyan-500 text-white shadow-lg flex items-center justify-center border-2 border-slate-900 transition-all hover:scale-110"
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? <ChevronFirst size={14} /> : <ChevronLast size={14} />}
        </button>

        {/* Quick Action Button */}
        <div className="px-3 pt-4">
          <button
            onClick={() => setNewAppointmentModalOpen(true)}
            className={`w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all ${
              !isSidebarOpen ? "px-0" : "px-3"
            }`}
          >
            <Plus size={16} />
            {isSidebarOpen && <span>New Appointment</span>}
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 flex flex-col pt-4 gap-1.5 px-3 overflow-y-auto">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `p-2.5 rounded-xl flex items-center justify-between text-xs font-medium transition-all group ${
                  !isSidebarOpen ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30 font-semibold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <div className="text-cyan-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
              </div>

              {isSidebarOpen && item.badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Compliance & Telemetry Status Card (when expanded) */}
        {isSidebarOpen && (
          <div className="mx-3 mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <ShieldCheck size={14} />
              <span>HIPAA Compliant</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              256-bit Encrypted Telehealth Sync active.
            </p>
          </div>
        )}

        {/* Bottom Menu */}
        <div className="pb-4 pt-2 border-t border-slate-800/80 flex flex-col gap-1 px-3">
          <button
            onClick={() => showToast("Doctor Documentation & Helpdesk opened")}
            className={`p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl flex items-center gap-3 text-xs transition-colors ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <HelpCircle size={18} />
            {isSidebarOpen && <span>Help & Protocol</span>}
          </button>

          <button
            onClick={() => {
              if (window.confirm("Do you wish to log out of your physician session?")) {
                showToast("Signed out successfully.");
              }
            }}
            className={`p-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl flex items-center gap-3 text-xs transition-colors ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>End Shift / Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
