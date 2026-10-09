import { 
  AlertTriangle, 
  ShieldAlert, 
  Flame, 
  Activity, 
  ChevronRight, 
  Radio
} from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export const CriticalAlertsBar = () => {
  const { showToast, setActiveEHRDrawer } = useApp();

  const handleBroadcast = () => {
    showToast("EMERGENCY BROADCAST: Critical telemetry flags relayed to on-duty nurse station.", "error");
  };

  return (
    <div className="h-full p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl flex flex-col justify-between hover:border-[#28354E] transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C2436]/80">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-[#FF6384]" />
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#8E99A8]">
                CLINICAL SENTRY
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mt-1">
              Urgent Diagnostic Flags
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FF6384]/15 border border-[#FF6384]/35 text-[#FF6384] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6384] animate-pulse" />
            2 Critical
          </span>
        </div>

        {/* 2 Urgent Alert Cards */}
        <div className="mt-3.5 space-y-3">
          {/* Alert 1: Troponin */}
          <div className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#FF6384]/30 hover:border-[#FF6384]/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6384] shadow-sm animate-ping" />
                <span className="font-bold text-xs text-white">
                  Troponin I: 1.80 ng/mL
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#FF6384] font-bold">
                5m ago
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Robert Fox (Bed 09) • Rapid 2hr serial elevation. Acute coronary syndrome protocol standby.
            </p>
            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#1C2436]/60">
              <span className="text-[10px] font-mono text-[#8E99A8]">Attending: Dr. Ramesh</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveEHRDrawer({
                    name: "Robert Fox",
                    age: 64,
                    problem: "Troponin Elevation 1.80 ng/mL",
                  })
                }
                className="px-2.5 py-1 rounded-full bg-[#FF6384] hover:bg-[#ff4d73] text-black font-bold text-[10px] font-mono flex items-center gap-1 shadow-sm transition-all"
              >
                <span>Stat Review</span>
                <ChevronRight className="w-3 h-3 stroke-[2.5]" />
              </motion.button>
            </div>
          </div>

          {/* Alert 2: Hyperkalemia */}
          <div className="p-3.5 rounded-2xl bg-[#0D111A] border border-amber-900/40 hover:border-amber-700/60 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm" />
                <span className="font-bold text-xs text-white">
                  Potassium: 5.8 mEq/L
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 font-bold">
                18m ago
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              David Chen (Bed 04) • Hyperkalemia flag. Repeat verification ordered with ECG rhythm correlation.
            </p>
            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#1C2436]/60">
              <span className="text-[10px] font-mono text-[#8E99A8]">Central Pathology</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  showToast("Stat redraw confirmed for David Chen (Bed 04). Results expected in 15 mins.")
                }
                className="px-2.5 py-1 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-amber-300 border border-amber-800/60 font-bold text-[10px] font-mono flex items-center gap-1 transition-all"
              >
                <span>Verify Redraw</span>
                <ChevronRight className="w-3 h-3" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Broadcast Action */}
      <div className="pt-3 border-t border-[#1C2436]/80 mt-3.5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBroadcast}
          className="w-full py-2 px-3 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/50 hover:border-rose-500/50 text-rose-300 text-xs flex items-center justify-between transition-colors font-mono"
        >
          <span className="text-[11px] flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#FF6384]" />
            Broadcast Alert to Floor Team
          </span>
          <Radio className="w-3 h-3 text-[#FF6384] animate-pulse" />
        </motion.button>
      </div>
    </div>
  );
};

export default CriticalAlertsBar;
