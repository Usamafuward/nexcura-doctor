import { useState, useId } from "react";
import { ChevronDown, RefreshCw, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

export const SignatureElectricChart = ({ onReroll }) => {
  const gradientId = useId();
  const [activeRange, setActiveRange] = useState("1M"); // '1D', '1W', '1M', '1Y', 'All'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    includeInPerson: true,
    showTelehealth: true,
    compareToIndex: false,
    hideClosedPositions: false,
  });

  const [hoverIndex, setHoverIndex] = useState(null);

  // Range datasets with realistic medical/clinic volume & billing
  const datasets = {
    "1D": {
      mainVal: "$3,840.00",
      change: "+4.2%",
      subtitle: "Today",
      points: [18, 22, 28, 35, 42, 38, 48, 52, 60, 58, 65, 72, 68, 75, 80, 78, 85, 92, 88, 95],
      dates: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    },
    "1W": {
      mainVal: "$28,490.50",
      change: "+6.8%",
      subtitle: "This Week",
      points: [45, 52, 68, 75, 62, 58, 70, 82, 90, 84, 76, 88, 94, 98, 92, 105, 112, 108, 118, 125],
      dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    "1M": {
      mainVal: "$128,040.62",
      change: "+8.4%",
      subtitle: "This Month",
      points: [
        55, 62, 70, 85, 95, 110, 128, 140, 135, 125, 118, 105, 85, 72, 65, 60, 58, 62, 68, 72, 78, 85,
        92, 98, 105, 112, 120, 118, 124, 130,
      ],
      dates: ["Sep 9", "Sep 15", "Sep 21", "Sep 27"],
    },
    "1Y": {
      mainVal: "$1,420,950.00",
      change: "+14.2%",
      subtitle: "Past 12 Months",
      points: [40, 48, 65, 80, 115, 135, 142, 120, 95, 80, 70, 68, 72, 80, 88, 95, 110, 125, 135, 145],
      dates: ["2025", "Q1", "Q2", "Q3", "2026"],
    },
    All: {
      mainVal: "$3,892,100.00",
      change: "+22.5%",
      subtitle: "All Time",
      points: [30, 40, 55, 75, 105, 130, 160, 145, 120, 90, 75, 65, 70, 85, 100, 115, 130, 148, 165, 180],
      dates: ["2023", "2024", "2025", "2026"],
    },
  };

  const currentData = datasets[activeRange] || datasets["1M"];
  const points = currentData.points;

  // SVG Geometry
  const width = 1000;
  const height = 280;
  const paddingX = 20;
  const paddingBottom = 40;
  const paddingTop = 20;
  const graphWidth = width - paddingX * 2;
  const graphHeight = height - paddingTop - paddingBottom;

  const minVal = Math.min(...points) * 0.85;
  const maxVal = Math.max(...points) * 1.05;

  const getX = (index) => paddingX + (index / (points.length - 1)) * graphWidth;
  const getY = (val) => height - paddingBottom - ((val - minVal) / (maxVal - minVal)) * graphHeight;

  // Construct SVG spline path
  const linePath = points.reduce((acc, val, i, arr) => {
    const x = getX(i);
    const y = getY(val);
    if (i === 0) return `M ${x},${y}`;
    const prevX = getX(i - 1);
    const prevY = getY(arr[i - 1]);
    const cpX1 = prevX + (x - prevX) / 2;
    const cpY1 = prevY;
    const cpX2 = prevX + (x - prevX) / 2;
    const cpY2 = y;
    return `${acc} C ${cpX1},${cpY1} ${cpX2},${cpY2} ${x},${y}`;
  }, "");

  // Hover calculations
  const activeIndex = hoverIndex !== null ? hoverIndex : Math.floor(points.length * 0.72);
  const activeX = getX(activeIndex);
  const activeY = getY(points[activeIndex]);
  const activeVal = `$${(points[activeIndex] * 1024.5).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="relative rounded-3xl bg-[#121722] border border-[#1C2436] p-4 sm:p-6 text-white shadow-2xl flex flex-col justify-between overflow-hidden hover:border-[#28354E] transition-colors h-full"
    >
      {/* Soft background radial ambient glow in top corner */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#D4FF00]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row: Big highlighted metric & Top-right controls */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4 relative z-20">
        <div>
          <div className="flex items-center gap-3">
            <motion.span
              key={currentData.mainVal}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white"
            >
              {currentData.mainVal}
            </motion.span>
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-[#D4FF00] text-black shadow-lime-sm"
            >
              <span>↗</span> {currentData.change}
            </motion.span>
          </div>
          <div className="text-xs text-[#8E99A8] mt-1 font-medium">
            Clinical Revenue & Patient Volume • {currentData.subtitle}
          </div>
        </div>

        {/* Right Controls: Filters Dropdown, Time Range Pill, Re-roll button */}
        <div className="flex flex-wrap items-center gap-2 relative">
          {/* Filter Popover Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181F2E] hover:bg-[#1E273A] border border-[#232D42] text-xs font-medium text-slate-200 transition-colors shadow-sm"
            >
              <span>Filters</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </motion.button>

            {/* Filter Dropdown Popover */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#141A28] border border-[#232D42] p-3 shadow-2xl z-50 text-xs space-y-2"
                >
                  <div
                    onClick={() =>
                      setFilterOptions((prev) => ({ ...prev, includeInPerson: !prev.includeInPerson }))
                    }
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#1C2438] cursor-pointer"
                  >
                    <span className="text-slate-300">Include In-Person</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        filterOptions.includeInPerson ? "bg-[#D4FF00] text-black" : "border border-slate-600"
                      }`}
                    >
                      {filterOptions.includeInPerson && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setFilterOptions((prev) => ({ ...prev, showTelehealth: !prev.showTelehealth }))
                    }
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#1C2438] cursor-pointer"
                  >
                    <span className="text-slate-300">Show Telehealth</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        filterOptions.showTelehealth ? "bg-[#D4FF00] text-black" : "border border-slate-600"
                      }`}
                    >
                      {filterOptions.showTelehealth && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setFilterOptions((prev) => ({ ...prev, compareToIndex: !prev.compareToIndex }))
                    }
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#1C2438] cursor-pointer"
                  >
                    <span className="text-slate-300">Compare to Last Shift</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        filterOptions.compareToIndex ? "bg-[#D4FF00] text-black" : "border border-slate-600"
                      }`}
                    >
                      {filterOptions.compareToIndex && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setFilterOptions((prev) => ({
                        ...prev,
                        hideClosedPositions: !prev.hideClosedPositions,
                      }))
                    }
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#1C2438] cursor-pointer"
                  >
                    <span className="text-slate-300">Hide Discharged</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        filterOptions.hideClosedPositions ? "bg-[#D4FF00] text-black" : "border border-slate-600"
                      }`}
                    >
                      {filterOptions.hideClosedPositions && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Time Ranges Pill with Sliding Layout Indicator */}
          <div className="flex items-center bg-[#181F2E] p-1 rounded-full border border-[#232D42] text-xs font-mono relative">
            {["1D", "1W", "1M", "1Y", "All"].map((r) => {
              const isActive = activeRange === r;
              return (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className="relative px-3 py-1 rounded-full text-xs font-mono transition-colors z-10 block"
                >
                  {isActive && (
                    <motion.div
                      layoutId="chart-range-indicator"
                      className="absolute inset-0 bg-[#D4FF00] rounded-full shadow-lime-sm -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className={isActive ? "text-black font-bold" : "text-[#8E99A8] hover:text-white"}>
                    {r}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Re-roll / Refresh button with spinning spring */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={onReroll}
            className="p-2 rounded-full bg-[#181F2E] hover:bg-[#1E273A] border border-[#232D42] text-[#8E99A8] hover:text-[#D4FF00] transition-colors"
            title="Randomize / Re-roll data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      {/* The Signature Chart with Vertical Equalizer Bars + Glowing Spline */}
      <div className="relative w-full overflow-hidden my-auto flex-1 flex flex-col justify-center select-none py-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-52 sm:h-56 md:h-64 overflow-visible cursor-crosshair"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / rect.width) * width;
            const closestIndex = Math.round(
              ((mouseX - paddingX) / graphWidth) * (points.length - 1)
            );
            if (closestIndex >= 0 && closestIndex < points.length) {
              setHoverIndex(closestIndex);
            }
          }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            {/* Linear gradient for vertical bars: electric lime at top to black transparent at bottom */}
            <linearGradient id={`${gradientId}-barGradient`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4FF00" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#D4FF00" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#121722" stopOpacity="0.0" />
            </linearGradient>

            {/* Neon Glow Filter for line */}
            <filter id={`${gradientId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#D4FF00" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* 1. Dense Vertical Equalizer / Histogram Bars */}
          {points.map((val, idx) => {
            const x = getX(idx);
            const topY = getY(val);
            const barHeight = height - paddingBottom - topY;
            const isHover = idx === activeIndex;

            return (
              <motion.rect
                key={`${activeRange}-${idx}`}
                x={x - 2.5}
                width={5}
                rx={1.5}
                fill={`url(#${gradientId}-barGradient)`}
                opacity={isHover ? 1 : 0.75}
                initial={{ height: 0, y: height - paddingBottom }}
                animate={{ height: Math.max(barHeight, 0), y: topY }}
                transition={{ duration: 0.5, delay: idx * 0.012, ease: "easeOut" }}
              />
            );
          })}

          {/* 2. Electric Lime Glowing Bezier Curve with Animated Draw-In */}
          <motion.path
            key={activeRange}
            d={linePath}
            fill="none"
            stroke="#D4FF00"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${gradientId}-glow)`}
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          {/* 3. Horizontal Bottom Base line */}
          <line
            x1={paddingX}
            y1={height - paddingBottom}
            x2={width - paddingX}
            y2={height - paddingBottom}
            stroke="#1C2436"
            strokeWidth="1"
          />

          {/* 4. X-Axis Date Labels */}
          {currentData.dates.map((date, idx) => {
            const labelX = paddingX + (idx / (currentData.dates.length - 1)) * graphWidth;
            return (
              <text
                key={idx}
                x={labelX}
                y={height - 12}
                textAnchor="middle"
                fill="#627084"
                className="text-[11px] font-mono select-none"
              >
                {date}
              </text>
            );
          })}

          {/* 5. Active Hover Vertical Dashed Guideline */}
          <line
            x1={activeX}
            y1={paddingTop}
            x2={activeX}
            y2={height - paddingBottom}
            stroke="#8E99A8"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.8"
          />

          {/* 6. Active Point Circle Marker */}
          <circle cx={activeX} cy={activeY} r="7" fill="#D4FF00" stroke="#080B11" strokeWidth="2.5" />
          <circle cx={activeX} cy={activeY} r="3" fill="#FFFFFF" />

          {/* 7. Floating Hover Tooltip Card */}
          <g
            transform={`translate(${
              activeX > width - 160 ? activeX - 150 : activeX + 12
            }, ${Math.max(activeY - 65, 20)})`}
            className="select-none pointer-events-none transition-transform duration-100 ease-out"
          >
            <rect
              width="145"
              height="62"
              rx="12"
              fill="#0D111A"
              stroke="#2A354C"
              strokeWidth="1"
              filter="drop-shadow(0 10px 20px rgba(0,0,0,0.7))"
            />
            <text x="12" y="18" fill="#8E99A8" className="text-[10px] font-mono">
              Aug 2026
            </text>
            <text x="133" y="18" textAnchor="end" fill="#FFFFFF" className="text-[11px] font-bold font-mono">
              {activeVal}
            </text>
            <text x="12" y="34" fill="#D4FF00" className="text-[10px] font-mono font-bold">
              +2.8% since open
            </text>
            <text x="12" y="50" fill="#627084" className="text-[9px] font-mono">
              Now: <tspan fill="#FFFFFF">$128,040</tspan>
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Row of 4 Metric Badge Pills with Colored Indicator Dots */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-between gap-2 sm:gap-3 pt-3 border-t border-[#1C2436] font-mono text-xs">
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-center gap-2 bg-[#181F2E] px-3 py-1.5 rounded-full border border-[#232D42] cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-lime-sm animate-pulse" />
          <span className="text-slate-300">In-Person Visits:</span>
          <span className="font-bold text-white">18</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-center gap-2 bg-[#181F2E] px-3 py-1.5 rounded-full border border-[#232D42] cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF6384]" />
          <span className="text-slate-300">Critical Triage:</span>
          <span className="font-bold text-white">2</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-center gap-2 bg-[#181F2E] px-3 py-1.5 rounded-full border border-[#232D42] cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#B5A7FE]" />
          <span className="text-slate-300">Virtual Telehealth:</span>
          <span className="font-bold text-white">34</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-center gap-2 bg-[#181F2E] px-3 py-1.5 rounded-full border border-[#232D42] cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
          <span className="text-slate-300">Average Wait:</span>
          <span className="font-bold text-white">7.4 mins</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

SignatureElectricChart.propTypes = {
  onReroll: PropTypes.func,
};

export default SignatureElectricChart;
