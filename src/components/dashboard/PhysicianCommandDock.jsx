import { 
  Pill, 
  CalendarPlus, 
  Video, 
  Mic, 
  FlaskConical, 
  Flame, 
  Command,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export const PhysicianCommandDock = () => {
  const { 
    setActiveRxModal, 
    setNewAppointmentModalOpen, 
    setActiveTeleconsultation, 
    setCommandPaletteOpen,
    showToast 
  } = useApp();

  const dockActions = [
    {
      id: "rx",
      title: "Quick Rx",
      subtitle: "e-Prescriptions",
      icon: Pill,
      color: "#D4FF00",
      bgClass: "bg-[#D4FF00]/10",
      borderClass: "border-[#D4FF00]/25",
      textClass: "text-[#D4FF00]",
      hoverBorder: "hover:border-[#D4FF00]/60",
      hoverShadow: "hover:shadow-[0_8px_20px_rgba(212,255,0,0.12)]",
      onClick: () => {
        setActiveRxModal({ patientName: "Marcus Vance", problem: "Cardiology Titration" });
        showToast("Opening Quick Rx Pad...");
      },
    },
    {
      id: "consult",
      title: "New Consult",
      subtitle: "Book OPD Slot",
      icon: CalendarPlus,
      color: "#B5A7FE",
      bgClass: "bg-[#B5A7FE]/10",
      borderClass: "border-[#B5A7FE]/25",
      textClass: "text-[#B5A7FE]",
      hoverBorder: "hover:border-[#B5A7FE]/60",
      hoverShadow: "hover:shadow-[0_8px_20px_rgba(181,167,254,0.14)]",
      onClick: () => setNewAppointmentModalOpen(true),
    },
    {
      id: "tele",
      title: "Tele-Room",
      subtitle: "HD Video Call",
      icon: Video,
      color: "#38BDF8",
      bgClass: "bg-[#38BDF8]/10",
      borderClass: "border-[#38BDF8]/25",
      textClass: "text-[#38BDF8]",
      hoverBorder: "hover:border-[#38BDF8]/60",
      hoverShadow: "hover:shadow-[0_8px_20px_rgba(56,189,248,0.14)]",
      onClick: () =>
        setActiveTeleconsultation({
          patientName: "Kamalesh Patel",
          age: 32,
          problem: "Diabetes Review",
        }),
    },
    {
      id: "scribe",
      title: "Voice Scribe",
      subtitle: "Ambient SOAP",
      icon: Mic,
      color: "#10B981",
      bgClass: "bg-[#10B981]/10",
      borderClass: "border-[#10B981]/25",
      textClass: "text-[#10B981]",
      hoverBorder: "hover:border-[#10B981]/60",
      hoverShadow: "hover:shadow-[0_8px_20px_rgba(16,185,129,0.14)]",
      onClick: () => showToast("Ambient AI Clinical Scribe activated. Listening for physician dictation..."),
    },
    {
      id: "labs",
      title: "Stat Labs",
      subtitle: "Pathology Order",
      icon: FlaskConical,
      color: "#F59E0B",
      bgClass: "bg-[#F59E0B]/10",
      borderClass: "border-[#F59E0B]/25",
      textClass: "text-[#F59E0B]",
      hoverBorder: "hover:border-[#F59E0B]/60",
      hoverShadow: "hover:shadow-[0_8px_20px_rgba(245,158,11,0.14)]",
      onClick: () => showToast("Stat Lab Requisition panel dispatched to Central Pathology."),
    },
    {
      id: "code",
      title: "Code Red",
      subtitle: "Rapid Response",
      icon: Flame,
      color: "#FF6384",
      bgClass: "bg-[#FF6384]/10",
      borderClass: "border-[#FF6384]/25",
      textClass: "text-[#FF6384]",
      hoverBorder: "hover:border-[#FF6384]/60",
      hoverShadow: "hover:shadow-[0_8px_20px_rgba(255,99,132,0.16)]",
      onClick: () => showToast("EMERGENCY: Rapid Response Code Alert broadcast to Floor Team.", "error"),
    },
  ];

  return (
    <div className="h-full p-4 sm:p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl flex flex-col hover:border-[#28354E] transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1C2436]/80">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#8E99A8]">
              COMMAND DOCK
            </span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight mt-1">
            Physician Fast-Action
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
          6 Ready
        </span>
      </div>

      {/* 6 Action Tiles Grid (2 cols x 3 rows) - flex-1 with uniform distribution */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 my-3.5 flex-1">
        {dockActions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
              onClick={action.onClick}
              className={`p-3 sm:p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] ${action.hoverBorder} ${action.hoverShadow} text-left transition-[border-color,box-shadow] duration-200 group flex flex-col justify-between h-full min-h-[90px] sm:min-h-[96px]`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-8 h-8 rounded-xl ${action.bgClass} border ${action.borderClass} ${action.textClass} flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-300">
                  ⌘{action.id.toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div className="mt-2.5">
                <div className="font-bold text-xs text-white group-hover:text-[#D4FF00] transition-colors leading-tight">
                  {action.title}
                </div>
                <div className="text-[10px] text-[#8E99A8] mt-0.5 truncate">
                  {action.subtitle}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Command Search Shortcut */}
      <div className="pt-3.5 border-t border-[#1C2436]/80 mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full py-2.5 px-3 rounded-xl bg-[#0D111A] hover:bg-[#181F2E] border border-[#1C2436] hover:border-[#D4FF00]/40 text-slate-300 text-xs flex items-center justify-between transition-colors font-mono"
        >
          <span className="text-[11px] text-[#8E99A8]">Global Search / Quick Filter</span>
          <div className="flex items-center gap-1 text-[10px] bg-[#181F2E] px-2 py-0.5 rounded text-slate-300 border border-[#232D42]">
            <Command className="w-3 h-3 text-[#D4FF00]" />
            <span>K</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default PhysicianCommandDock;
