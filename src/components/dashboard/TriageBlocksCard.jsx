import { Users, AlertTriangle, Video, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import PropTypes from "prop-types";

export const TriageBlocksCard = ({ stats }) => {
  const { setActiveTeleconsultation, setActiveEHRDrawer } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
      className="rounded-3xl bg-[#121722] border border-[#1C2436] p-4 sm:p-5 text-white shadow-2xl flex flex-col justify-between hover:border-[#28354E] transition-colors h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E99A8]">
          Patient Triage & Queues
        </h3>
        <motion.button
          whileHover={{ scale: 1.15, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            setActiveEHRDrawer({
              name: "Kamalesh Patel",
              age: 32,
              problem: "Triage Review",
            })
          }
          className="p-1.5 rounded-full hover:bg-[#1E2638] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* 3 Colorful Block Mini-Cards with spring hover physics */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
        {/* Block 1: Soft Coral Red */}
        <motion.div
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          onClick={() =>
            setActiveEHRDrawer({
              name: "Robert Fox",
              age: 64,
              problem: "Severe Angina Triage",
            })
          }
          className="p-2.5 sm:p-3.5 rounded-2xl bg-[#FF6384] text-slate-950 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-[#FF6384]/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">Urgent</span>
            <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <motion.div
              key={stats?.urgent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xl sm:text-2xl font-black font-mono leading-none"
            >
              {stats?.urgent || "03"}
            </motion.div>
            <div className="text-[9px] sm:text-[10px] font-bold opacity-85 mt-1 truncate">Critical Priority</div>
          </div>
        </motion.div>

        {/* Block 2: Electric Lime */}
        <motion.div
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          onClick={() =>
            setActiveTeleconsultation({
              patientName: "Kamalesh Patel",
              age: 32,
              problem: "Diabetes Review",
            })
          }
          className="p-2.5 sm:p-3.5 rounded-2xl bg-[#D4FF00] text-slate-950 flex flex-col justify-between cursor-pointer shadow-lime-sm hover:shadow-[#D4FF00]/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">Telehealth</span>
            <Video className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <motion.div
              key={stats?.tele}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xl sm:text-2xl font-black font-mono leading-none"
            >
              {stats?.tele || "12"}
            </motion.div>
            <div className="text-[9px] sm:text-[10px] font-bold opacity-85 mt-1 truncate">Virtual Rooms</div>
          </div>
        </motion.div>

        {/* Block 3: Soft Pastel Lavender */}
        <motion.div
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
          onClick={() =>
            setActiveEHRDrawer({
              name: "Alice Brown",
              age: 45,
              problem: "Routine Examination",
            })
          }
          className="p-2.5 sm:p-3.5 rounded-2xl bg-[#B5A7FE] text-slate-950 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-[#B5A7FE]/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">Scheduled</span>
            <Users className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <motion.div
              key={stats?.scheduled}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xl sm:text-2xl font-black font-mono leading-none"
            >
              {stats?.scheduled || "24"}
            </motion.div>
            <div className="text-[9px] sm:text-[10px] font-bold opacity-85 mt-1 truncate">In-Clinic Roster</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

TriageBlocksCard.propTypes = {
  stats: PropTypes.shape({
    urgent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tele: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    scheduled: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default TriageBlocksCard;
