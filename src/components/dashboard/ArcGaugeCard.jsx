import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const ArcGaugeCard = ({ score = 84, onOpenDetail }) => {
  const [currentScore, setCurrentScore] = useState(score);

  useEffect(() => {
    setCurrentScore(score);
  }, [score]);

  // Semi-circle arc geometry (Range 0 to 100)
  const radius = 62;
  const cx = 95;
  const cy = 85;

  const angle = Math.PI - (currentScore / 100) * Math.PI;
  const dotX = cx + radius * Math.cos(angle);
  const dotY = cy - radius * Math.sin(angle);

  const bgPath = `M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`;
  const fillPath = `M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${dotX},${dotY}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
      className="rounded-3xl bg-[#121722] border border-[#1C2436] p-4 sm:p-5 text-white shadow-2xl flex flex-col justify-between hover:border-[#28354E] transition-colors h-full"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E99A8]">
          Recovery & Wellness Score
        </h3>
        <motion.button
          whileHover={{ scale: 1.15, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpenDetail}
          className="p-1.5 rounded-full hover:bg-[#1E2638] text-slate-400 hover:text-white transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Main Score and Semi-circle Arc Gauge */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 my-auto">
        <div>
          <div className="flex items-baseline gap-1.5 font-mono">
            <motion.span
              key={currentScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="text-3xl sm:text-4xl font-black text-white"
            >
              {currentScore}
            </motion.span>
            <span className="text-xs text-[#8E99A8] font-bold">/ 100</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-[#8E99A8] mt-1">
            Cohort health outcome rating
          </div>
        </div>

        {/* Semi-Circle Arc SVG Gauge */}
        <div className="relative w-36 sm:w-44 h-20 sm:h-24 flex items-center justify-center">
          <svg viewBox="0 0 190 95" className="w-full h-full overflow-visible">
            {/* Background Track */}
            <path
              d={bgPath}
              fill="none"
              stroke="#1C2438"
              strokeWidth="11"
              strokeLinecap="round"
            />

            {/* Filled Electric Lime Arc with sweep animation */}
            <motion.path
              key={currentScore}
              d={fillPath}
              fill="none"
              stroke="#D4FF00"
              strokeWidth="11"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(212,255,0,0.6)]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Indicator White Dot on the arc */}
            <motion.circle
              cx={dotX}
              cy={dotY}
              r="8"
              fill="#FFFFFF"
              stroke="#080B11"
              strokeWidth="3"
              className="drop-shadow-md cursor-pointer"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              onClick={() => setCurrentScore((prev) => (prev >= 95 ? 65 : prev + 10))}
            />
          </svg>
        </div>
      </div>

      {/* Subtitle */}
      <div className="text-[11px] text-[#8E99A8] border-t border-[#1C2436] pt-2.5 mt-2 flex items-center justify-between">
        <span>
          Patient recovery index improved by <strong className="text-white">3.4%</strong> this quarter
        </span>
      </div>
    </motion.div>
  );
};

ArcGaugeCard.propTypes = {
  score: PropTypes.number,
  onOpenDetail: PropTypes.func,
};

export default ArcGaugeCard;
