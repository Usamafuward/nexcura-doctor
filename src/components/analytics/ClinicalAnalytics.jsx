import { useState } from "react";
import { TrendingUp, Users, Video, Activity, Sparkles } from "lucide-react";

export const ClinicalAnalytics = () => {
  const [activeRange, setActiveRange] = useState("7d"); // '7d', '30d', '90d'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // 7-day data
  const data = [
    { day: "Mon", inClinic: 12, tele: 8, wait: "9m" },
    { day: "Tue", inClinic: 15, tele: 11, wait: "12m" },
    { day: "Wed", inClinic: 10, tele: 14, wait: "8m" },
    { day: "Thu", inClinic: 18, tele: 16, wait: "14m" },
    { day: "Fri", inClinic: 14, tele: 19, wait: "10m" },
    { day: "Sat", inClinic: 8, tele: 22, wait: "6m" },
    { day: "Sun", inClinic: 4, tele: 12, wait: "5m" },
  ];

  // SVG dimensions
  const svgWidth = 560;
  const svgHeight = 170;
  const paddingX = 40;
  const paddingY = 25;
  const graphWidth = svgWidth - paddingX * 2;
  const graphHeight = svgHeight - paddingY * 2;

  const maxVal = 25;

  const getX = (index) => paddingX + (index / (data.length - 1)) * graphWidth;
  const getY = (val) => svgHeight - paddingY - (val / maxVal) * graphHeight;

  // Paths
  const clinicPoints = data.map((d, i) => `${getX(i)},${getY(d.inClinic)}`).join(" ");
  const telePoints = data.map((d, i) => `${getX(i)},${getY(d.tele)}`).join(" ");

  const clinicArea = `${getX(0)},${svgHeight - paddingY} ${clinicPoints} ${getX(data.length - 1)},${svgHeight - paddingY}`;
  const teleArea = `${getX(0)},${svgHeight - paddingY} ${telePoints} ${getX(data.length - 1)},${svgHeight - paddingY}`;

  // Diagnosis distribution
  const diagnoses = [
    { label: "Cardiovascular & HTN", pct: 38, color: "#3B82F6" },
    { label: "Metabolic & Diabetes", pct: 28, color: "#00F2FE" },
    { label: "Respiratory & Asthma", pct: 18, color: "#10B981" },
    { label: "General & Post-Op", pct: 16, color: "#F59E0B" },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Chart 1: Consultation Trends Area Chart */}
      <div className="xl:col-span-8 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Consultation Volume & Telehealth Velocity
              </h3>
              <span className="text-[10px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 px-2 py-0.5 rounded-full font-bold">
                +18.4% WoW
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comparative traffic: In-Person Physical vs Virtual Encounters
            </p>
          </div>

          {/* Time range tabs & Legend */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block shadow-glow-cyan" />
                <span>Telehealth</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                <span>In-Clinic</span>
              </div>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              {["7d", "30d", "90d"].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activeRange === r
                      ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        <div className="relative w-full overflow-hidden">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="teleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="clinicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 10, 20].map((val) => {
              const y = getY(val);
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-mono"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Area Fills */}
            <polygon points={teleArea} fill="url(#teleGradient)" />
            <polygon points={clinicArea} fill="url(#clinicGradient)" />

            {/* Polyline paths */}
            <polyline
              points={clinicPoints}
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={telePoints}
              fill="none"
              stroke="#00F2FE"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]"
            />

            {/* Interactive Data Points */}
            {data.map((d, i) => {
              const tx = getX(i);
              const ty = getY(d.tele);
              const isHovered = hoveredPoint === i;

              return (
                <g
                  key={i}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Day label */}
                  <text
                    x={tx}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    className={`text-[11px] font-mono ${
                      isHovered ? "fill-cyan-400 font-bold" : "fill-slate-400"
                    }`}
                  >
                    {d.day}
                  </text>

                  {/* Tele point */}
                  <circle
                    cx={tx}
                    cy={ty}
                    r={isHovered ? 6 : 4}
                    fill="#00F2FE"
                    stroke="#0a0f1d"
                    strokeWidth="2"
                    className="transition-all"
                  />

                  {/* Hover tooltip popup in SVG */}
                  {isHovered && (
                    <g transform={`translate(${tx}, ${ty - 35})`}>
                      <rect
                        x="-45"
                        y="-10"
                        width="90"
                        height="30"
                        rx="6"
                        fill="#0f172a"
                        stroke="#00F2FE"
                        strokeWidth="1"
                        className="shadow-xl"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#ffffff"
                        className="text-[10px] font-bold font-mono"
                      >
                        Tele: {d.tele} | Clinic: {d.inClinic}
                      </text>
                      <text
                        x="0"
                        y="15"
                        textAnchor="middle"
                        fill="#94a3b8"
                        className="text-[8px] font-mono"
                      >
                        Wait: {d.wait}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Quick summary footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>Average patient throughput up 22% with AI ambient charting</span>
          </div>
          <span className="font-mono text-[11px]">Average wait: 9.5 mins</span>
        </div>
      </div>

      {/* Chart 2: Clinical Caseload & Diagnosis Distribution */}
      <div className="xl:col-span-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Primary Diagnoses
            </h3>
            <span className="text-xs text-slate-400 font-mono">This Month</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Patient cohort distribution by primary ICD-10 category
          </p>

          {/* High-tech Multi-segment Bar */}
          <div className="h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800 flex overflow-hidden p-0.5 gap-0.5 mb-5 shadow-inner">
            {diagnoses.map((item, idx) => (
              <div
                key={idx}
                style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                className="h-full rounded-full transition-all hover:opacity-80"
                title={`${item.label}: ${item.pct}%`}
              />
            ))}
          </div>

          {/* Distribution Breakdown items */}
          <div className="space-y-3">
            {diagnoses.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 dark:text-slate-200 font-medium">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-slate-900 dark:text-white">{item.pct}%</span>
                  <span className="text-[10px] text-slate-400">({Math.round(item.pct * 1.8)} pts)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="mt-5 p-3 rounded-2xl bg-blue-50 dark:bg-slate-800/60 border border-blue-200/80 dark:border-slate-700 text-xs text-blue-900 dark:text-slate-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-snug text-[11px]">
            <strong>Clinical Copilot Insight:</strong> 14% rise in seasonal respiratory symptoms noted in Zip 10024. Consider stocking prophylactic inhaler refills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalAnalytics;
