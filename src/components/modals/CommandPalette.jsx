import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Calendar,
  FileText,
  Activity,
  Pill,
  Moon,
  Sun,
  X,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/SidebarContext";

export const CommandPalette = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    isDarkMode,
    toggleDarkMode,
    setActiveTeleconsultation,
    setActiveRxModal,
    setActiveEHRDrawer,
    setNewAppointmentModalOpen,
  } = useApp();

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const mockItems = [
    {
      id: "pt1",
      category: "Patients",
      icon: <User className="w-4 h-4 text-[#38BDF8]" />,
      title: "Kamalesh Patel (Age: 32)",
      subtitle: "Type 2 Diabetes • Next consultation in queue",
      action: () => {
        setActiveEHRDrawer({ name: "Kamalesh Patel", age: 32, problem: "Diabetes", id: "#MED-9042" });
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "pt2",
      category: "Patients",
      icon: <User className="w-4 h-4 text-[#38BDF8]" />,
      title: "Alice Brown (Age: 45)",
      subtitle: "Hypertension Stage 2 • Last visit 3 days ago",
      action: () => {
        setActiveEHRDrawer({ name: "Alice Brown", age: 45, problem: "Hypertension", id: "#MED-8021" });
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "pt3",
      category: "Patients",
      icon: <User className="w-4 h-4 text-[#38BDF8]" />,
      title: "David Chen (Age: 58)",
      subtitle: "Post-PCI Stent Follow-up • Lab report ready",
      action: () => {
        setActiveEHRDrawer({ name: "David Chen", age: 58, problem: "Cardiac Follow-up", id: "#MED-7019" });
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "act1",
      category: "Quick Actions",
      icon: <Activity className="w-4 h-4 text-[#FF6384]" />,
      title: "Launch Emergency Teleconsultation Room",
      subtitle: "Open encrypted video room with live bio-telemetry",
      action: () => {
        setActiveTeleconsultation({ patientName: "Kamalesh Patel", age: 32, problem: "Diabetes" });
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "act2",
      category: "Quick Actions",
      icon: <Pill className="w-4 h-4 text-[#D4FF00]" />,
      title: "Rapid e-Prescription (Rx) Pad",
      subtitle: "Issue digital script with automated drug contraindication check",
      action: () => {
        setActiveRxModal({ name: "Kamalesh Patel" });
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "act3",
      category: "Quick Actions",
      icon: <Calendar className="w-4 h-4 text-[#B5A7FE]" />,
      title: "Schedule New Clinic Appointment",
      subtitle: "Book patient into physical clinic or video slot",
      action: () => {
        setNewAppointmentModalOpen(true);
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "act4",
      category: "Appearance",
      icon: isDarkMode ? <Sun className="w-4 h-4 text-[#D4FF00]" /> : <Moon className="w-4 h-4 text-[#B5A7FE]" />,
      title: `Switch to ${isDarkMode ? "Light" : "Cyber Dark"} Mode`,
      subtitle: "Toggle clinical interface theme",
      action: () => {
        toggleDarkMode();
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "nav1",
      category: "Navigation",
      icon: <FileText className="w-4 h-4 text-[#D4FF00]" />,
      title: "Jump to Lab & Radiology Records",
      subtitle: "View pending imaging, pathology, and diagnostic slips",
      action: () => {
        navigate("/records");
        setCommandPaletteOpen(false);
      },
    },
  ];

  const filtered = mockItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/75 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className="w-full max-w-2xl bg-[#121722] rounded-3xl shadow-2xl border border-[#1C2436] overflow-hidden text-white flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-4 border-b border-[#1C2436] bg-[#0D111A]">
              <Search className="w-5 h-5 text-[#D4FF00] shrink-0 mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search patients, tele-actions, appointments, or medications... (⌘K / Ctrl + K)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-sm focus:outline-none placeholder-[#8E99A8] text-white"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCommandPaletteOpen(false)}
                className="w-7 h-7 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#8E99A8] hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-[#8E99A8] text-xs">
                  No matching clinical record or action found for &quot;{query}&quot;.
                </div>
              ) : (
                filtered.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    onClick={item.action}
                    className="w-full text-left p-3 rounded-2xl hover:bg-[#181F2E] transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] group-hover:border-[#D4FF00]/40 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          {item.title}
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0D111A] border border-[#1C2436] text-[#8E99A8] font-normal">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8E99A8] mt-0.5">{item.subtitle}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8E99A8] group-hover:text-[#D4FF00] transform group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))
              )}
            </div>

            {/* Footer shortcuts */}
            <div className="p-3 px-5 bg-[#0D111A] border-t border-[#1C2436] text-[11px] text-[#8E99A8] flex items-center justify-between font-mono">
              <div className="flex items-center gap-3">
                <span>Navigation: <kbd className="px-1.5 py-0.5 rounded bg-[#181F2E] border border-[#232D42] text-[10px] text-white">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[#181F2E] border border-[#232D42] text-[10px] text-white">↓</kbd></span>
                <span>Select: <kbd className="px-1.5 py-0.5 rounded bg-[#181F2E] border border-[#232D42] text-[10px] text-white">Enter</kbd></span>
                <span>Close: <kbd className="px-1.5 py-0.5 rounded bg-[#181F2E] border border-[#232D42] text-[10px] text-white">ESC</kbd></span>
              </div>
              <span className="text-[#D4FF00] font-mono text-[10px]">Mediman Clinical Core v2.4</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
