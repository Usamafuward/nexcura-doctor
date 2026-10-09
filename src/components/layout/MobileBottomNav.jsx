import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Sliders,
} from "lucide-react";

export const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { label: "Overview", path: "/", icon: LayoutDashboard },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Schedule", path: "/appointments", icon: Calendar },
    { label: "Records", path: "/records", icon: FileText },
    { label: "Settings", path: "/settings", icon: Sliders },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0D111A]/95 backdrop-blur-2xl border-t border-[#1C2436] px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all group"
            >
              <motion.div
                whileTap={{ scale: 0.88 }}
                className={`relative p-1.5 rounded-xl flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-[#D4FF00]/15 text-[#D4FF00]"
                    : "text-[#8E99A8] group-hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active-dot"
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_6px_rgba(212,255,0,0.8)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight font-medium transition-colors ${
                  isActive
                    ? "text-[#D4FF00] font-bold"
                    : "text-[#8E99A8] group-hover:text-slate-300"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
