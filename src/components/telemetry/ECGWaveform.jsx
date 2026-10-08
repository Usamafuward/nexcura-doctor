import { useEffect, useRef, useState } from "react";
import { Activity, Heart, Zap, Volume2, VolumeX } from "lucide-react";
import PropTypes from "prop-types";

export const ECGWaveform = ({ height = 120, bpm = 72, patientName = "Active Telemetry" }) => {
  const canvasRef = useRef(null);
  const [currentBpm, setCurrentBpm] = useState(bpm);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [rhythmMode, setRhythmMode] = useState("normal"); // 'normal', 'tachycardia', 'elevated'

  useEffect(() => {
    // Subtle realistic BPM fluctuation
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * 4;
      const base = rhythmMode === "tachycardia" ? 115 : rhythmMode === "elevated" ? 88 : 72;
      setCurrentBpm(Math.round(base + delta));
    }, 2500);
    return () => clearInterval(interval);
  }, [rhythmMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 400);
    let h = (canvas.height = height);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        h = canvas.height = height;
      }
    };
    window.addEventListener("resize", handleResize);

    // ECG points pattern representing P-Q-R-S-T wave
    const sampleWave = [
      0, 0, 0, 0.05, 0.1, 0.08, 0, 0, -0.05, 0.8, -0.3, 0.05, 0, 0.1, 0.2, 0.15, 0.05, 0, 0, 0, 0, 0,
    ];

    let x = 0;
    let waveIndex = 0;
    const speed = rhythmMode === "tachycardia" ? 3.2 : 2.4;
    const points = [];

    const draw = () => {
      // Semi-transparent fade trail
      ctx.fillStyle = "rgba(10, 15, 29, 0.14)";
      ctx.fillRect(0, 0, width, h);

      // Grid lines
      ctx.strokeStyle = "rgba(0, 242, 254, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let gx = 0; gx < width; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // Calculate next ECG Y position
      const centerY = h * 0.55;
      const waveValue = sampleWave[Math.floor(waveIndex) % sampleWave.length] || 0;
      const y = centerY - waveValue * (h * 0.42);

      points.push({ x, y });
      if (points.length > width) {
        points.shift();
      }

      // Draw glowing ECG line
      ctx.beginPath();
      ctx.strokeStyle = "#00F2FE";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#00F2FE";
      ctx.shadowBlur = 8;

      for (let i = 0; i < points.length; i++) {
        if (i === 0) {
          ctx.moveTo(points[i].x, points[i].y);
        } else {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }
      ctx.stroke();

      // Lead cursor blip
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Clear leading edge ahead
      ctx.clearRect(x + 2, 0, 18, h);

      x = (x + speed) % width;
      waveIndex += 0.35;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [height, rhythmMode]);

  return (
    <div className="relative rounded-2xl bg-[#090E1A] p-4 text-white border border-cyan-500/20 shadow-glow-cyan/10 overflow-hidden">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-cyan-500/10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>LIVE BIO-TELEMETRY</span>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">Lead II • {patientName}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-cyan-400 font-mono">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>0.05 - 150 Hz</span>
          </div>
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title={isAudioMuted ? "Unmute pulse tone" : "Mute pulse tone"}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Canvas Waveform */}
      <div className="relative w-full overflow-hidden rounded-lg bg-black/40">
        <canvas ref={canvasRef} className="w-full block" />
      </div>

      {/* Bottom Live Vitals Strip */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 font-mono text-xs">
        <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
          <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
          <div>
            <div className="text-[10px] text-slate-400">HEART RATE</div>
            <div className="text-base font-bold text-white tracking-wider">
              {currentBpm} <span className="text-[10px] font-normal text-rose-400">BPM</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
          <Activity className="w-4 h-4 text-cyan-400" />
          <div>
            <div className="text-[10px] text-slate-400">SpO2 PULSE-OX</div>
            <div className="text-base font-bold text-cyan-300">
              99 <span className="text-[10px] font-normal text-cyan-400">%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
          <div className="text-[11px] font-bold text-amber-400">BP</div>
          <div>
            <div className="text-[10px] text-slate-400">BLOOD PRESSURE</div>
            <div className="text-base font-bold text-amber-300">
              118/76 <span className="text-[10px] font-normal text-amber-400">mmHg</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400">RHYTHM</div>
            <div className="text-xs font-semibold text-emerald-400">
              {rhythmMode === "normal" ? "Sinus Rhythm" : rhythmMode === "tachycardia" ? "Sinus Tachy" : "Elevated"}
            </div>
          </div>
          <button
            onClick={() => setRhythmMode((prev) => (prev === "normal" ? "elevated" : prev === "elevated" ? "tachycardia" : "normal"))}
            className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-400 hover:bg-slate-700 transition-colors"
          >
            Simulate
          </button>
        </div>
      </div>
    </div>
  );
};

ECGWaveform.propTypes = {
  height: PropTypes.number,
  bpm: PropTypes.number,
  patientName: PropTypes.string,
};

export default ECGWaveform;
