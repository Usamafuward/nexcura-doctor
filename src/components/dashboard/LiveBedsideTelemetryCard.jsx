import { useState, useEffect, useRef } from "react";
import {
  Activity,
  Heart,
  Radio,
  Volume2,
  VolumeX,
  Printer,
  UserCheck,
  Zap,
  BellRing,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

const BEDS = [
  {
    id: "bed-04",
    name: "Marcus Vance",
    age: 58,
    room: "ICU Bed 04",
    condition: "Post-STEMI Recovery",
    status: "Normal Sinus Rhythm",
    statusColor: "emerald",
    hr: 72,
    spo2: 98,
    nibp: "122/78",
    resp: 16,
    temp: "98.4°F",
    lead: "Lead II",
  },
  {
    id: "bed-09",
    name: "Robert Fox",
    age: 64,
    room: "Step-Down 09",
    condition: "Chest Tightness / Prioritized",
    status: "Sinus Tachycardia",
    statusColor: "rose",
    hr: 104,
    spo2: 94,
    nibp: "138/88",
    resp: 20,
    temp: "99.1°F",
    lead: "Lead V5",
  },
  {
    id: "room-12",
    name: "Sarah Jenkins",
    age: 41,
    room: "Ward Room 12",
    condition: "Post-Op Day 1 (Appendectomy)",
    status: "Stable Baseline",
    statusColor: "cyan",
    hr: 64,
    spo2: 99,
    nibp: "116/72",
    resp: 14,
    temp: "98.6°F",
    lead: "Lead II",
  },
];

export const LiveBedsideTelemetryCard = () => {
  const { showToast, setActiveEHRDrawer } = useApp();
  const [selectedBed, setSelectedBed] = useState(BEDS[0]);
  const [selectedLead, setSelectedLead] = useState("Lead II");
  const [isAudioBeep, setIsAudioBeep] = useState(false);
  const canvasRef = useRef(null);

  // Animate ECG waveform smoothly on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let xOffset = 0;

    // Standard ECG P-Q-R-S-T repeating pattern points (normalized 0 to 1)
    const ecgSample = (t) => {
      const cycle = t % 1;
      if (cycle < 0.15) return 0; // baseline
      if (cycle < 0.25) return 0.12 * Math.sin((cycle - 0.15) * Math.PI * 10); // P wave
      if (cycle < 0.35) return 0; // PR segment
      if (cycle < 0.38) return -0.15; // Q dip
      if (cycle < 0.44) return 1.0; // R peak
      if (cycle < 0.50) return -0.3; // S dip
      if (cycle < 0.60) return 0; // ST segment
      if (cycle < 0.78) return 0.22 * Math.sin((cycle - 0.60) * Math.PI * (1 / 0.18)); // T wave
      return 0; // TP baseline
    };

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw faint telemetry grid
      ctx.strokeStyle = "rgba(28, 36, 54, 0.4)";
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw active ECG waveform
      ctx.strokeStyle = "#D4FF00";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#D4FF00";
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const speedFactor = selectedBed.hr / 60; // adjust speed by heart rate
      const points = width;

      for (let i = 0; i < points; i++) {
        const t = (i + xOffset) / (width * 0.4) * speedFactor;
        const val = ecgSample(t);
        const y = midY - val * (height * 0.38);

        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();

      // Draw leading glowing sweep cursor point
      const sweepX = (xOffset * 1.5) % width;
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      const cursorVal = ecgSample((sweepX + xOffset) / (width * 0.4) * speedFactor);
      ctx.arc(sweepX, midY - cursorVal * (height * 0.38), 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Reset shadows
      ctx.shadowBlur = 0;

      xOffset += 1.8 * speedFactor;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedBed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-3xl bg-[#121722] border border-[#1C2436] p-5 sm:p-6 shadow-2xl hover:border-[#28354E] transition-colors flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#D4FF00]/15 border border-[#D4FF00]/30 flex items-center justify-center">
            <Radio className="w-5 h-5 text-[#D4FF00] animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base tracking-wide text-white">
              LIVE BEDSIDE TELEMETRY MONITOR
            </h3>
            <p className="text-xs text-[#8E99A8]">
              Direct continuous rhythm stream from ward telemetry pods & ICU monitors
            </p>
          </div>
        </div>

        {/* Lead and Audio Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#0D111A] p-1 rounded-full border border-[#1C2436] text-[11px] font-mono">
            {["Lead II", "Lead V1", "Lead V5"].map((lead) => (
              <button
                key={lead}
                onClick={() => setSelectedLead(lead)}
                className={`px-2.5 py-1 rounded-full transition-all ${selectedLead === lead
                    ? "bg-[#D4FF00] text-black font-bold"
                    : "text-[#8E99A8] hover:text-white"
                  }`}
              >
                {lead}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setIsAudioBeep(!isAudioBeep);
              showToast(isAudioBeep ? "Cardiac pulse audio muted" : "Cardiac pulse audio enabled (QRS beep)");
            }}
            className="p-2 rounded-xl bg-[#0D111A] border border-[#1C2436] text-slate-400 hover:text-white hover:border-[#D4FF00]/40 transition-colors"
            title={isAudioBeep ? "Mute QRS Audio" : "Enable QRS Audio"}
          >
            {isAudioBeep ? <Volume2 className="w-3.5 h-3.5 text-[#D4FF00]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Bed Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        {BEDS.map((bed) => {
          const isSelected = selectedBed.id === bed.id;
          return (
            <motion.div
              key={bed.id}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedBed(bed)}
              className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${isSelected
                  ? "bg-[#0D111A] border-[#D4FF00] shadow-lime-sm"
                  : "bg-[#0D111A] border-[#1C2436] hover:border-slate-600 opacity-70"
                }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{bed.room}</span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${bed.statusColor === "emerald"
                        ? "bg-emerald-400/20 text-emerald-400"
                        : bed.statusColor === "rose"
                          ? "bg-rose-400/20 text-rose-400"
                          : "bg-cyan-400/20 text-cyan-400"
                      }`}
                  >
                    {bed.status}
                  </span>
                </div>
                <div className="text-[11px] text-[#8E99A8] font-medium mt-0.5">
                  {bed.name} ({bed.age}y)
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-black font-mono text-white block">
                  {bed.hr} <span className="text-[10px] text-slate-500 font-normal">BPM</span>
                </span>
                <span className="text-[10px] font-mono text-[#D4FF00]">{bed.spo2}% SpO2</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ECG Canvas Waveform Strip */}
      <div className="relative rounded-2xl bg-[#080C14] border border-[#1C2436] p-4 overflow-hidden mb-4 shadow-inner">
        {/* Top-right telemetry badge */}
        <div className="absolute top-3 right-4 z-10 flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400 bg-[#0D111A]/90 px-2 py-0.5 rounded border border-[#1C2436]">
            {selectedLead} • 25 mm/s • 10 mm/mV
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-[#0D111A]/90 px-2 py-0.5 rounded border border-[#1C2436]">
            <Heart className="w-3 h-3 text-[#FF6384] fill-[#FF6384] animate-pulse" />
            {selectedBed.hr} BPM
          </span>
        </div>

        {/* Patient Label overlaid */}
        <div className="absolute top-3 left-4 z-10">
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            {selectedBed.room} — {selectedBed.name}
          </span>
          <span className="text-[10px] font-mono text-[#8E99A8] block">
            {selectedBed.condition}
          </span>
        </div>

        {/* Live Canvas */}
        <canvas
          ref={canvasRef}
          width={900}
          height={140}
          className="w-full h-32 sm:h-36 block mt-5"
        />
      </div>

      {/* 5-Column Live Biometrics HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
        {/* Metric 1: Heart Rate */}
        <div className="p-3 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8E99A8]">Heart Rate</div>
            <div className="text-lg font-mono font-black text-white flex items-baseline gap-1">
              <span>{selectedBed.hr}</span>
              <span className="text-[10px] text-slate-400 font-normal">bpm</span>
            </div>
          </div>
          <Heart className="w-4 h-4 text-[#FF6384] fill-[#FF6384]/40" />
        </div>

        {/* Metric 2: SpO2 */}
        <div className="p-3 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8E99A8]">SpO2 Sat</div>
            <div className="text-lg font-mono font-black text-[#D4FF00] flex items-baseline gap-1">
              <span>{selectedBed.spo2}</span>
              <span className="text-[10px] text-slate-400 font-normal">%</span>
            </div>
          </div>
          <Activity className="w-4 h-4 text-[#D4FF00]" />
        </div>

        {/* Metric 3: NIBP Blood Pressure */}
        <div className="p-3 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8E99A8]">NIBP Pressure</div>
            <div className="text-base font-mono font-black text-white flex items-baseline gap-1">
              <span>{selectedBed.nibp}</span>
              <span className="text-[9px] text-slate-400 font-normal">mmHg</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-1.5 py-0.5 rounded">
            MAP 92
          </span>
        </div>

        {/* Metric 4: Respiration */}
        <div className="p-3 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8E99A8]">Respiration</div>
            <div className="text-lg font-mono font-black text-white flex items-baseline gap-1">
              <span>{selectedBed.resp}</span>
              <span className="text-[10px] text-slate-400 font-normal">/min</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        {/* Metric 5: Core Temperature */}
        <div className="p-3 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8E99A8]">Core Temp</div>
            <div className="text-lg font-mono font-black text-white">
              {selectedBed.temp}
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Norm</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1C2436] text-xs">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => showToast(`12-Lead rhythm strip sent to ICU Station Laser Printer.`)}
            className="px-3.5 py-1.5 rounded-full bg-[#0D111A] hover:bg-[#182030] text-slate-300 hover:text-white border border-[#1C2436] font-medium flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>Print 12-Lead Strip</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => showToast(`Floor nurse dispatched to ${selectedBed.room}.`)}
            className="px-3.5 py-1.5 rounded-full bg-[#0D111A] hover:bg-[#182030] text-slate-300 hover:text-white border border-[#1C2436] font-medium flex items-center gap-1.5 transition-colors"
          >
            <BellRing className="w-3.5 h-3.5 text-[#FF6384]" />
            <span>Nurse Alert</span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setActiveEHRDrawer({
              name: selectedBed.name,
              age: selectedBed.age,
              problem: selectedBed.condition,
            });
            showToast(`Opening EHR Chart for ${selectedBed.name}`);
          }}
          className="px-4 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold flex items-center gap-1.5 shadow-lime-sm transition-all"
        >
          <UserCheck className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Open Full Patient EHR</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LiveBedsideTelemetryCard;
