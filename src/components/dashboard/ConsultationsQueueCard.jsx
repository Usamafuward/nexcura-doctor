import { Video, UserCheck, Calendar, ChevronRight, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export const ConsultationsQueueCard = () => {
  const navigate = useNavigate();
  const { setActiveTeleconsultation, setActiveEHRDrawer } = useApp();

  const queue = [
    {
      id: "q-1",
      name: "Kamalesh Patel",
      age: 32,
      condition: "Diabetes Mellitus Review",
      time: "03:00 PM",
      type: "Virtual Telehealth",
      typeColor: "lime",
      btnLabel: "Join Video",
      btnAction: () =>
        setActiveTeleconsultation({
          patientName: "Kamalesh Patel",
          age: 32,
          problem: "Diabetes Review",
        }),
    },
    {
      id: "q-2",
      name: "Robert Fox",
      age: 64,
      condition: "Acute Chest Tightness",
      time: "03:15 PM",
      type: "Emergency Triage",
      typeColor: "rose",
      btnLabel: "Review Chart",
      btnAction: () =>
        setActiveEHRDrawer({
          name: "Robert Fox",
          age: 64,
          problem: "Chest Tightness",
        }),
    },
    {
      id: "q-3",
      name: "Alice Brown",
      age: 45,
      condition: "Stage 2 Hypertension",
      time: "03:30 PM",
      type: "In-Clinic Suite 4B",
      typeColor: "cyan",
      btnLabel: "Examine",
      btnAction: () =>
        setActiveEHRDrawer({
          name: "Alice Brown",
          age: 45,
          problem: "Hypertension",
        }),
    },
  ];

  return (
    <div className="h-full p-4 sm:p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl flex flex-col justify-between hover:border-[#28354E] transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C2436]/80">
          <div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#8E99A8]">
                CONSULTATION QUEUE
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mt-1">
              Active Patient Encounters
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] font-bold">
            3 In Waiting
          </span>
        </div>

        {/* Queue Items */}
        <div className="space-y-2.5 mt-3.5">
          {queue.map((pt) => (
            <motion.div
              key={pt.id}
              whileHover={{ y: -1, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-3 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#D4FF00]/40 transition-colors flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white group-hover:text-[#D4FF00] transition-colors truncate">
                    {pt.name}
                  </span>
                  <span className="text-[10px] text-[#8E99A8] font-mono shrink-0">
                    {pt.age}y
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 truncate mt-0.5">
                  {pt.condition}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] font-mono">
                  <span className="text-slate-400">{pt.time}</span>
                  <span>•</span>
                  <span
                    className={
                      pt.typeColor === "lime"
                        ? "text-[#D4FF00]"
                        : pt.typeColor === "rose"
                        ? "text-[#FF6384] font-semibold"
                        : "text-[#38BDF8]"
                    }
                  >
                    {pt.type}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={pt.btnAction}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1 shadow-sm ${
                  pt.typeColor === "lime"
                    ? "bg-[#D4FF00] hover:bg-[#CCFF00] text-black shadow-lime-sm"
                    : pt.typeColor === "rose"
                    ? "bg-[#FF6384] hover:bg-[#ff4d73] text-black"
                    : "bg-[#181F2E] hover:bg-[#232D42] text-slate-200 border border-[#232D42]"
                }`}
              >
                {pt.typeColor === "lime" && <Video className="w-3 h-3 stroke-[2.5]" />}
                {pt.typeColor === "rose" && <UserCheck className="w-3 h-3 stroke-[2.5]" />}
                <span>{pt.btnLabel}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Link */}
      <div className="pt-3 border-t border-[#1C2436]/80 mt-3.5">
        <button
          onClick={() => navigate("/appointments")}
          className="w-full text-left text-xs font-mono text-[#8E99A8] hover:text-white flex items-center justify-between transition-colors group"
        >
          <span>All Scheduled Appointments (12 total)</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4FF00] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ConsultationsQueueCard;
