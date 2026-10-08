import { useState } from "react";
import { 
  Clock, 
  Users, 
  BedDouble, 
  FileCheck2, 
  ChevronRight, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/SidebarContext";

export const ShiftCapacityHUD = () => {
  const { showToast, setActiveEHRDrawer } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {/* Metric 1: Shift Progress */}
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="p-4 sm:p-5 rounded-3xl bg-[#121722] border border-[#1C2436] hover:border-[#D4FF00]/40 transition-colors shadow-xl"
      >
        <div className="flex items-center justify-between text-xs text-[#8E99A8] mb-2">
          <span className="font-bold uppercase tracking-wider">Physician Shift</span>
          <Clock className="w-3.5 h-3.5 text-[#D4FF00]" />
        </div>
        <div className="text-xl sm:text-2xl font-black font-mono text-white mb-1">
          06h 45m <span className="text-xs text-[#8E99A8] font-normal font-sans">/ 10h</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#0D111A] overflow-hidden my-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "67.5%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-[#D4FF00]"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>08:00 - 18:00</span>
          <span className="text-[#D4FF00]">3h 15m left</span>
        </div>
      </motion.div>

      {/* Metric 2: OPD Consult Throughput */}
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="p-4 sm:p-5 rounded-3xl bg-[#121722] border border-[#1C2436] hover:border-[#38BDF8]/40 transition-colors shadow-xl"
      >
        <div className="flex items-center justify-between text-xs text-[#8E99A8] mb-2">
          <span className="font-bold uppercase tracking-wider">Daily Consultations</span>
          <Users className="w-3.5 h-3.5 text-[#38BDF8]" />
        </div>
        <div className="text-xl sm:text-2xl font-black font-mono text-white mb-1">
          18 <span className="text-xs text-[#8E99A8] font-normal font-sans">of 24 seen</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#0D111A] overflow-hidden my-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-[#38BDF8]"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Avg 11.2 min/patient</span>
          <span className="text-cyan-400">75% on track</span>
        </div>
      </motion.div>

      {/* Metric 3: Ward Bed Capacity */}
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="p-4 sm:p-5 rounded-3xl bg-[#121722] border border-[#1C2436] hover:border-[#B5A7FE]/40 transition-colors shadow-xl"
      >
        <div className="flex items-center justify-between text-xs text-[#8E99A8] mb-2">
          <span className="font-bold uppercase tracking-wider">ICU / Inpatient Beds</span>
          <BedDouble className="w-3.5 h-3.5 text-[#B5A7FE]" />
        </div>
        <div className="text-xl sm:text-2xl font-black font-mono text-white mb-1">
          34 <span className="text-xs text-[#8E99A8] font-normal font-sans">/ 40 occupied</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#0D111A] overflow-hidden my-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-[#B5A7FE]"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>6 beds available</span>
          <span className="text-purple-400">85% load</span>
        </div>
      </motion.div>

      {/* Metric 4: Pending Sign-Offs */}
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => showToast("Opening 3 pending charts awaiting MD digital signature.")}
        className="p-4 sm:p-5 rounded-3xl bg-[#121722] border border-[#1C2436] hover:border-[#FF6384]/40 transition-colors shadow-xl cursor-pointer group"
      >
        <div className="flex items-center justify-between text-xs text-[#8E99A8] mb-2">
          <span className="font-bold uppercase tracking-wider">Pending Sign-Offs</span>
          <FileCheck2 className="w-3.5 h-3.5 text-[#FF6384] group-hover:scale-110 transition-transform" />
        </div>
        <div className="text-xl sm:text-2xl font-black font-mono text-white mb-1 flex items-center justify-between">
          <span>3 Charts</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#FF6384]/20 text-[#FF6384]">
            Action Due
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#0D111A] overflow-hidden my-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-[#FF6384]"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>2 Scribe notes • 1 Discharge</span>
          <span className="text-rose-400 group-hover:underline flex items-center gap-0.5">
            Sign now <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShiftCapacityHUD;
