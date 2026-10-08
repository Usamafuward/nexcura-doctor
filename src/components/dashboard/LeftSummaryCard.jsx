import { ArrowUpRight, TrendingUp, Users, Video, Activity, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useApp } from "@/context/SidebarContext";

export const LeftSummaryCard = ({ onOpenBilling }) => {
  const navigate = useNavigate();
  const { setActiveTeleconsultation, setActiveRxModal, showToast } = useApp();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-3xl bg-[#121722] border border-[#1C2436] p-6 text-white shadow-2xl flex flex-col justify-between h-full hover:border-[#28354E] transition-colors"
    >
      {/* Top Header & Main Big Metric */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E99A8]">
              Physician Performance
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#182030] text-slate-300 border border-[#232D42]">
              Q3 2026
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpenBilling}
            className="p-1.5 rounded-full hover:bg-[#1E2638] text-slate-400 hover:text-white transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Big Bold Headline Number with Pill */}
        <div className="flex items-baseline gap-3 my-2">
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight"
          >
            $32,406.94
          </motion.span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.25 }}
            className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-[#D4FF00] text-black shadow-lime-sm"
          >
            +14.2%
          </motion.span>
        </div>
        <div className="text-xs text-[#8E99A8]">
          Shift billings & completed clinical encounters
        </div>
      </div>

      {/* 2x2 Grid of Sub-Metrics */}
      <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-[#1C2436]">
        {/* Cell 1 */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/patients")}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#D4FF00]/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] text-[#8E99A8] mb-1">
            <span>In-Clinic</span>
            <Users className="w-3 h-3 text-[#D4FF00] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg font-bold font-mono text-white">$4,634.30</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">+8.1% vs avg</div>
        </motion.div>

        {/* Cell 2 */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTeleconsultation({ patientName: "Kamalesh Patel", age: 32, problem: "Diabetes Review" })}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#38BDF8]/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] text-[#8E99A8] mb-1">
            <span>Telehealth</span>
            <Video className="w-3 h-3 text-[#38BDF8] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg font-bold font-mono text-white">$1,357.65</div>
          <div className="text-[10px] text-cyan-400 font-mono mt-0.5">14 completed</div>
        </motion.div>

        {/* Cell 3 */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => showToast("6 lab orders currently undergoing automated pathology processing.")}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#B5A7FE]/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] text-[#8E99A8] mb-1">
            <span>Lab Orders</span>
            <FileText className="w-3 h-3 text-[#B5A7FE] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg font-bold font-mono text-white">$1,892.10</div>
          <div className="text-[10px] text-purple-400 font-mono mt-0.5">6 pending</div>
        </motion.div>

        {/* Cell 4 */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveRxModal({ patientName: "Marcus Vance", problem: "Cardiology Titration" })}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#FF6384]/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] text-[#8E99A8] mb-1">
            <span>Rx Refills</span>
            <Activity className="w-3 h-3 text-[#FF6384] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-lg font-bold font-mono text-white">$1,399.45</div>
          <div className="text-[10px] text-rose-400 font-mono mt-0.5">100% verified</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

LeftSummaryCard.propTypes = {
  onOpenBilling: PropTypes.func,
};

export default LeftSummaryCard;
