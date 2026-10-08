import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("nexcura-theme") === "dark" || false;
  });
  const [activeTeleconsultation, setActiveTeleconsultation] = useState(null);
  const [activeEHRDrawer, setActiveEHRDrawer] = useState(null);
  const [activeRxModal, setActiveRxModal] = useState(null);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isNewAppointmentModalOpen, setNewAppointmentModalOpen] = useState(false);
  const [doctorStatus, setDoctorStatus] = useState("available"); // 'available', 'in-consultation', 'on-break'
  
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      title: "Critical Lab Alert: Troponin I",
      desc: "Patient Robert Fox (Bed 4) - Elevated Troponin 1.8 ng/mL. Immediate cardiology review required.",
      time: "5m ago",
      type: "emergency",
      read: false,
    },
    {
      id: "n2",
      title: "New Tele-Consultation Request",
      desc: "Kamalesh Patel checked in 8 mins early for Diabetes Follow-up.",
      time: "12m ago",
      type: "info",
      read: false,
    },
    {
      id: "n3",
      title: "AI Scribe Summary Ready",
      desc: "SOAP notes generated for Emma Davis (Post-op Day 7).",
      time: "45m ago",
      type: "ai",
      read: true,
    }
  ]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("nexcura-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("nexcura-theme", "light");
    }
  }, [isDarkMode]);

  // Global keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        activeTeleconsultation,
        setActiveTeleconsultation,
        activeEHRDrawer,
        setActiveEHRDrawer,
        activeRxModal,
        setActiveRxModal,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        isNewAppointmentModalOpen,
        setNewAppointmentModalOpen,
        doctorStatus,
        setDoctorStatus,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const useAppContext = useApp;

export default AppContext;
