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
} from "lucide-react";
// import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo.png";
import mediman from "../../assets/mediman.png";
// import needle from "../assets/needle.png";
import { useSidebar } from "../../context/SidebarContext";

import PropTypes from "prop-types";

const Sidebar = () => {
  const { isSidebarOpen, setSidebarOpen } = useSidebar();

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/" },
    {
      icon: <Calendar size={20} />,
      label: "Appointments",
      path: "/appointments",
    },
    { icon: <Users size={20} />, label: "Patients", path: "/patients" },
    { icon: <FileText size={20} />, label: "Records", path: "/records" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  const bottomMenuItems = [
    { icon: <HelpCircle size={20} />, label: "Help" },
    { icon: <LogOut size={20} />, label: "Logout" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full z-20 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-full sm:w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#024AE3] flex flex-col">
        <div className="flex items-center p-4 justify-center">
          {isSidebarOpen ? (
            <div className="flex items-center justify-center flex-col">
              <img
                src={logo}
                alt="logo"
                className="w-10 sm:w-12 h-10 sm:h-12"
              />
              <img
                src={mediman}
                alt="mediman"
                className="mt-2 w-20 sm:w-24 h-5 sm:h-6"
              />
            </div>
          ) : (
            // Show only the icon when sidebar is closed
            <div className="flex items-center justify-center flex-col">
              <img src={logo} alt="logo" className="w-6 sm:w-8 h-6 sm:h-8" />
              <img
                src={mediman}
                alt="mediman"
                className="mt-2 w-14 sm:w-16 h-2.5 sm:h-3"
              />
            </div>
          )}
        </div>

        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className={`absolute rounded-r-md bg-[#024AE3] shadow-lg transition-all duration-300 ${
            isSidebarOpen ? "left-64" : "left-20"
          }`}
          style={{ top: "12.5%", transform: "translateY(-50%)" }}
        >
          {/* <img
            src="../assets/needle.png"
            className="w-8 h-6"
            alt="toggle"
          /> */}
          {isSidebarOpen ? (
            <ChevronFirst size={20} className="text-white" />
          ) : (
            <ChevronLast size={20} className="text-white" />
          )}
        </button>

        <nav className="flex-1 flex flex-col pt-8 gap-2 px-3">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={(
                { isActive } // isActive is a boolean provided by NavLink
              ) =>
                `p-3 rounded-xl flex items-center ${
                  !isSidebarOpen ? "justify-center" : ""
                } transition-all duration-300 ease-in-out ${
                  isActive
                    ? "bg-white text-blue-600" // Active styles
                    : "text-white hover:bg-blue-500" // Default styles
                }`
              }
            >
              {item.icon}
              {isSidebarOpen && (
                <span className="ml-3 transition-opacity duration-300 ease-in-out opacity-100">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="pb-8 flex flex-col gap-2 px-3">
          {bottomMenuItems.map((item, index) => (
            <button
              key={index}
              className={`p-3 text-white hover:bg-blue-500 rounded-xl flex items-center gap-3 transition-colors ${ !isSidebarOpen ? "justify-center" : "" }`} 
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
