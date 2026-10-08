import { Sparkles, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import PropTypes from "prop-types";

export const ClinicalNotesCard = ({ note, onOpenNotes }) => {
  const { showToast } = useApp();

  const sources = [
    { label: "EHR", bg: "bg-[#182030] text-slate-200 border-[#2A3650]" },
    { label: "LAB", bg: "bg-[#2A2338] text-purple-300 border-purple-500/30" },
    { label: "ECG", bg: "bg-[#1B2D26] text-emerald-300 border-emerald-500/30" },
    { label: "AI", bg: "bg-[#1F2B00] text-[#D4FF00] border-[#D4FF00]/40 font-bold" },
    { label: "RX", bg: "bg-[#331E28] text-rose-300 border-rose-500/30" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
      className="rounded-3xl bg-[#121722] border border-[#1C2436] p-5 text-white shadow-2xl flex flex-col justify-between hover:border-[#28354E] transition-colors h-full"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4FF00] animate-spin [animation-duration:8s]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E99A8]">
            Clinical Intelligence
          </h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.15, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenNotes}
          className="p-1.5 rounded-full hover:bg-[#1E2638] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Note Body with Animated Crossfade */}
      <div className="my-2 min-h-[56px] flex items-center">
        <motion.p
          key={typeof note === "string" ? note : Math.random()}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs sm:text-[13px] leading-relaxed text-slate-300"
        >
          {note || (
            <>
              Fasting blood glucose levels{" "}
              <strong className="text-white font-extrabold underline decoration-[#D4FF00] decoration-2 underline-offset-4">
                eased 14 mg/dL
              </strong>{" "}
              across Type 2 diabetes cohort following automated Metformin dosage titration.
            </>
          )}
        </motion.p>
      </div>

      {/* Circular Source Badges with spring bounce */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#1C2436] mt-2">
        {sources.map((src, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.18, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 450, damping: 20 }}
            onClick={() => showToast(`Filtered clinical feeds by ${src.label}`)}
            className={`w-7 h-7 rounded-full border text-[10px] font-mono flex items-center justify-center transition-colors shadow-sm ${src.bg}`}
          >
            {src.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

ClinicalNotesCard.propTypes = {
  note: PropTypes.node,
  onOpenNotes: PropTypes.func,
};

export default ClinicalNotesCard;
