import { useState, useEffect, useRef } from "react";
import {
  Activity,
  Heart,
  Radio,
  Volume2,
  VolumeX,
  UserCheck,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
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
    pr: "158 ms",
    qrs: "88 ms",
    qtc: "416 ms",
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
    pr: "142 ms",
    qrs: "94 ms",
    qtc: "438 ms",
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
    pr: "164 ms",
    qrs: "84 ms",
    qtc: "408 ms",
  },
];

export const LiveBedsideTelemetryCard = () => {
  const { showToast, setActiveEHRDrawer } = useApp();
  const [selectedBed, setSelectedBed] = useState(BEDS[0]);
  const [isAudioBeep, setIsAudioBeep] = useState(false);
  const canvasRef = useRef(null);

  // Animate Dual-Channel Waveform (Channel 1: Lead II ECG, Channel 2: SpO2 Plethysmograph)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let xOffset = 0;

    // Standard ECG P-Q-R-S-T repeating pattern
    const ecgSample = (t) => {
      const cycle = t % 1;
      if (cycle < 0.15) return 0;
      if (cycle < 0.25) return 0.12 * Math.sin((cycle - 0.15) * Math.PI * 10);
      if (cycle < 0.35) return 0;
      if (cycle < 0.38) return -0.15;
      if (cycle < 0.44) return 1.0;
      if (cycle < 0.50) return -0.3;
      if (cycle < 0.60) return 0;
      if (cycle < 0.78) return 0.22 * Math.sin((cycle - 0.60) * Math.PI * (1 / 0.18));
      return 0;
    };

    // Photoplethysmogram (PPG / SpO2 Pleth) waveform with dicrotic notch
    const plethSample = (t) => {
      const cycle = t % 1;
      if (cycle < 0.22) {
        return Math.sin((cycle / 0.22) * (Math.PI / 2));
      } else if (cycle < 0.38) {
        return 1 - 0.52 * Math.sin(((cycle - 0.22) / 0.16) * (Math.PI / 2));
      } else if (cycle < 0.48) {
        return 0.48 + 0.14 * Math.sin(((cycle - 0.38) / 0.10) * Math.PI);
      } else {
        return 0.48 * Math.exp(-3.8 * (cycle - 0.48));
      }
    };

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const ecgMidY = height * 0.28;
      const plethMidY = height * 0.74;

      ctx.clearRect(0, 0, width, height);

      // Subtle clinical telemetry grid
      ctx.strokeStyle = "rgba(28, 36, 54, 0.4)";
      ctx.lineWidth = 1;
      const gridSize = 18;
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

      // Divider line between Channel 1 and Channel 2
      ctx.strokeStyle = "rgba(28, 36, 54, 0.85)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, height * 0.52);
      ctx.lineTo(width, height * 0.52);
      ctx.stroke();
      ctx.setLineDash([]);

      const speedFactor = selectedBed.hr / 60;
      const points = width;

      // ---------------- Channel 1: Lead II ECG (Electric Lime) ----------------
      ctx.strokeStyle = "#D4FF00";
      ctx.lineWidth = 2.2;
      ctx.shadowColor = "#D4FF00";
      ctx.shadowBlur = 6;
      ctx.beginPath();

      for (let i = 0; i < points; i++) {
        const t = ((i + xOffset) / (width * 0.38)) * speedFactor;
        const val = ecgSample(t);
        const y = ecgMidY - val * (height * 0.22);

        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // Channel 1 Cursor head
      const sweepX = (xOffset * 1.5) % width;
      const cursorValEcg = ecgSample(((sweepX + xOffset) / (width * 0.38)) * speedFactor);
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(sweepX, ecgMidY - cursorValEcg * (height * 0.22), 3, 0, Math.PI * 2);
      ctx.fill();

      // ---------------- Channel 2: SpO2 Plethysmograph (Cyan) ----------------
      ctx.strokeStyle = "#38BDF8";
      ctx.lineWidth = 2.0;
      ctx.shadowColor = "#38BDF8";
      ctx.shadowBlur = 6;
      ctx.beginPath();

      for (let i = 0; i < points; i++) {
        const t = ((i + xOffset) / (width * 0.38)) * speedFactor;
        const val = plethSample(t);
        const y = plethMidY - val * (height * 0.18);

        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // Channel 2 Cursor head
      const cursorValPleth = plethSample(((sweepX + xOffset) / (width * 0.38)) * speedFactor);
      ctx.fillStyle = "#E0F2FE";
      ctx.shadowColor = "#38BDF8";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(sweepX, plethMidY - cursorValPleth * (height * 0.18), 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      xOffset += 1.6 * speedFactor;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedBed]);

  return (
    <div className="h-full p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl flex flex-col hover:border-[#28354E] transition-colors">
      {/* Top Header: Patient & Bed Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1C2436]/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-lime-sm animate-pulse" />
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#8E99A8]">
              ICU BEDSIDE OSCILLOSCOPE • LIVE
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-[#0D111A] px-2 py-0.5 rounded border border-[#1C2436]">
              {selectedBed.lead} • 25 mm/s
            </span>
          </div>
          <div className="flex items-center gap-2.5 mt-1.5">
            <h3 className="text-lg font-bold text-white tracking-tight">
              {selectedBed.name}
            </h3>
            <span className="text-[10px] font-mono text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-full font-bold">
              {selectedBed.room}
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                selectedBed.statusColor === "rose"
                  ? "bg-[#FF6384]/20 text-[#FF6384] border border-[#FF6384]/40"
                  : "bg-emerald-950 text-emerald-300 border border-emerald-800"
              }`}
            >
              {selectedBed.status}
            </span>
          </div>
        </div>

        {/* Bed Switcher Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#0D111A] p-1 rounded-full border border-[#1C2436]">
            {BEDS.map((bed) => {
              const isActive = bed.id === selectedBed.id;
              return (
                <button
                  key={bed.id}
                  onClick={() => setSelectedBed(bed)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold font-mono transition-all ${
                    isActive
                      ? "bg-[#D4FF00] text-black font-bold shadow-lime-sm"
                      : "text-[#8E99A8] hover:text-white"
                  }`}
                >
                  {bed.room}
                </button>
              );
            })}
          </div>

          {/* Audio Beeper Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsAudioBeep(!isAudioBeep);
              showToast(isAudioBeep ? "Telemetry audio muted." : "Telemetry pulse audio active.");
            }}
            className={`p-2 rounded-full border transition-colors ${
              isAudioBeep
                ? "bg-[#D4FF00]/20 border-[#D4FF00]/50 text-[#D4FF00]"
                : "bg-[#0D111A] border-[#1C2436] text-[#8E99A8] hover:text-white"
            }`}
            title={isAudioBeep ? "Mute pulse tone" : "Enable pulse tone"}
          >
            {isAudioBeep ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </motion.button>
        </div>
      </div>

      {/* Oscilloscope Dual-Channel Canvas Display (Fills middle area) */}
      <div className="relative my-3.5 bg-[#090D15] rounded-2xl border border-[#1C2436] overflow-hidden p-2 flex-1 flex flex-col justify-center min-h-[200px]">
        {/* Channel Labels Overlay */}
        <div className="absolute top-2.5 left-3 flex items-center gap-2 pointer-events-none z-10">
          <span className="text-[10px] font-mono font-bold text-[#D4FF00] bg-[#121722]/80 px-2 py-0.5 rounded border border-[#1C2436]">
            CH 1: {selectedBed.lead}
          </span>
          <span className="text-[10px] font-mono text-slate-400">1.0 mV/cm</span>
        </div>

        <div className="absolute bottom-2.5 left-3 flex items-center gap-2 pointer-events-none z-10">
          <span className="text-[10px] font-mono font-bold text-[#38BDF8] bg-[#121722]/80 px-2 py-0.5 rounded border border-[#1C2436]">
            CH 2: Pleth (SpO₂)
          </span>
          <span className="text-[10px] font-mono text-slate-400">Pulse Plethysmogram</span>
        </div>

        {/* Real-time Heart Rate Overlay Badge */}
        <div className="absolute top-2.5 right-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0D121D]/90 backdrop-blur-md border border-[#1C2436] z-10">
          <Heart className="w-4 h-4 text-[#FF6384] animate-pulse" />
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-xl font-extrabold text-white">{selectedBed.hr}</span>
            <span className="text-[10px] text-[#8E99A8]">BPM</span>
          </div>
        </div>

        {/* Dual Waveform Canvas */}
        <canvas
          ref={canvasRef}
          width={800}
          height={210}
          className="w-full h-48 block rounded-xl"
        />
      </div>

      {/* Clinical Telemetry Rhythm Diagnostic Strip */}
      <div className="mb-3.5 px-3.5 py-2 rounded-xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between text-[11px] font-mono text-[#8E99A8]">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div>PR: <strong className="text-white ml-1">{selectedBed.pr}</strong></div>
          <div>QRS: <strong className="text-white ml-1">{selectedBed.qrs}</strong></div>
          <div>QTc: <strong className="text-white ml-1">{selectedBed.qtc}</strong></div>
          <div className="hidden md:inline">ST Seg: <strong className="text-emerald-400 ml-1">Isoelectric (0.0 mV)</strong></div>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-[10px] tracking-wide uppercase">Telemetry Synchronized</span>
        </div>
      </div>

      {/* Bottom Telemetry Vitals Strip (4 Metric Tiles matching HUD style) */}
      <div className="pt-3.5 border-t border-[#1C2436]/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full sm:w-auto flex-1 font-mono">
          {/* SpO2 */}
          <div className="p-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-center">
            <div className="text-[10px] text-[#8E99A8]">SpO₂</div>
            <div className="text-sm font-bold text-[#38BDF8] mt-0.5">{selectedBed.spo2}%</div>
          </div>

          {/* NIBP */}
          <div className="p-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-center">
            <div className="text-[10px] text-[#8E99A8]">NIBP</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{selectedBed.nibp}</div>
          </div>

          {/* Resp Rate */}
          <div className="p-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-center">
            <div className="text-[10px] text-[#8E99A8]">RESP</div>
            <div className="text-sm font-bold text-[#B5A7FE] mt-0.5">{selectedBed.resp} <span className="text-[9px]">/m</span></div>
          </div>

          {/* Temp */}
          <div className="p-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-center">
            <div className="text-[10px] text-[#8E99A8]">TEMP</div>
            <div className="text-sm font-bold text-[#D4FF00] mt-0.5">{selectedBed.temp}</div>
          </div>
        </div>

        {/* Direct Action: Open Full Patient Chart */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveEHRDrawer(selectedBed)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#181F2E] hover:bg-[#222B3E] border border-[#28354E] hover:border-[#D4FF00]/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          <UserCheck className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>Bedside Chart</span>
          <ChevronRight className="w-3 h-3 text-[#8E99A8]" />
        </motion.button>
      </div>
    </div>
  );
};

export default LiveBedsideTelemetryCard;
