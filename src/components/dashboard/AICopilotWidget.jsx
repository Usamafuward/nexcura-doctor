import { useState } from "react";
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  FileCheck2, 
  ShieldCheck,
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export const AICopilotWidget = () => {
  const { showToast, setActiveRxModal } = useApp();
  const [isAuditing, setIsAuditing] = useState(false);

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      showToast("Pharmacovigilance scan: 18 active patient regimens audited. 1 critical interaction flagged.");
    }, 600);
  };

  return (
    <div className="h-full p-4 sm:p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl flex flex-col justify-between hover:border-[#28354E] transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1C2436]/80">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#8E99A8]">
                NEURAL COPILOT
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mt-1">
              Ambient Pharmacovigilance
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
            AI Sentry Active
          </span>
        </div>

        {/* Content Section 1: Real-time Drug-Drug Interaction Alert */}
        <div className="mt-3.5 space-y-3">
          <div className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#FF6384]/30 hover:border-[#FF6384]/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <AlertTriangle className="w-3.5 h-3.5 text-[#FF6384] stroke-[2.5]" />
                <span>Warfarin + Aspirin</span>
              </div>
              <span className="text-[9px] font-mono font-bold uppercase bg-[#FF6384]/20 text-[#FF6384] px-2 py-0.5 rounded border border-[#FF6384]/40">
                Major Bleeding Risk
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
              Synergistic anticoagulant interaction increases systemic hemorrhage risk 3.8x.
            </p>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-[#1C2436]/60 text-[10px] font-mono">
              <span className="text-[#8E99A8]">Rec: Titrate single agent</span>
              <button
                onClick={() => {
                  setActiveRxModal({ patientName: "Marcus Vance", problem: "Warfarin Adjustment" });
                  showToast("Opening Rx Pad for Warfarin titration...");
                }}
                className="text-[#D4FF00] hover:underline font-bold"
              >
                Modify Rx →
              </button>
            </div>
          </div>

          {/* Content Section 2: AI Voice SOAP Scribe Snippet */}
          <div className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#D4FF00]/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <FileCheck2 className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>Emma Davis (29y)</span>
              </div>
              <span className="text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                99.4% Verified
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1.5 line-clamp-2 leading-relaxed font-sans">
              &ldquo;Post-op Day 7: Wound clean, sutures intact. Discontinue Ketorolac, continue oral Ibuprofen PRN.&rdquo;
            </p>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-[#1C2436]/60 text-[10px] font-mono text-[#8E99A8]">
              <span>Ambient SOAP • 10m ago</span>
              <span className="text-slate-300">Signed Dr. Ramesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Audit Trigger */}
      <div className="pt-3 border-t border-[#1C2436]/80 mt-3.5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRunAudit}
          disabled={isAuditing}
          className="w-full py-2 px-3 rounded-xl bg-[#0D111A] hover:bg-[#181F2E] border border-[#1C2436] hover:border-[#D4FF00]/40 text-slate-300 text-xs flex items-center justify-between transition-colors font-mono"
        >
          <span className="text-[11px] text-[#8E99A8] flex items-center gap-1.5">
            <RefreshCw className={`w-3 h-3 text-[#D4FF00] ${isAuditing ? "animate-spin" : ""}`} />
            Run Regimen Safety Audit
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4FF00]" />
        </motion.button>
      </div>
    </div>
  );
};

export default AICopilotWidget;
