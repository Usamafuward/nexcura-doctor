import { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Activity,
  Pill,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Zap,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

const INITIAL_ALERTS = [
  {
    id: "alert-1",
    severity: "critical",
    category: "lab",
    patientName: "Marcus Vance",
    location: "ICU Bed 04",
    title: "Critical Hyperkalemia (K+ 6.2 mEq/L)",
    detail: "Stat serum chemistry flagged severe potassium elevation. Accompanying ECG shows peaked T-waves. Immediate cardio-protective stabilization recommended.",
    actionText: "Order Calcium Gluconate",
    actionType: "rx",
    time: "2m ago",
    badge: "STAT LAB",
  },
  {
    id: "alert-2",
    severity: "warning",
    category: "pharma",
    patientName: "Elena Rostova",
    location: "Telehealth Room 02",
    title: "High-Risk Drug Interaction (Warfarin + Fluconazole)",
    detail: "CYP2C9 hepatic inhibition flagged by Neural Sentry. Estimated 2.8x increase in systemic bleeding risk and INR elongation.",
    actionText: "Adjust Warfarin Titration",
    actionType: "rx",
    time: "8m ago",
    badge: "AI SENTRY",
  },
  {
    id: "alert-3",
    severity: "caution",
    category: "vitals",
    patientName: "David Kalu",
    location: "Ward 3B - Bed 12",
    title: "Desaturation Event (SpO2 88% on Room Air)",
    detail: "Ambient pulse oximetry dropped below 90% threshold for 3 consecutive minutes in post-bronchoscopy patient.",
    actionText: "Order Supplemental O2",
    actionType: "ehr",
    time: "14m ago",
    badge: "VITALS DRIFT",
  },
];

export const CriticalAlertsBar = () => {
  const { showToast, setActiveEHRDrawer, setActiveRxModal } = useApp();
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const filteredAlerts = alerts.filter((a) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "critical") return a.severity === "critical";
    if (activeFilter === "pharma") return a.category === "pharma";
    if (activeFilter === "vitals") return a.category === "vitals";
    return true;
  });

  const handleAcknowledge = (id, patientName) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast(`Acknowledged alert for ${patientName}. Clinical audit logged.`);
  };

  const handleAction = (alert) => {
    if (alert.actionType === "rx") {
      setActiveRxModal({
        patientName: alert.patientName,
        problem: alert.title,
      });
      showToast(`Launching Clinical Rx Pad for ${alert.patientName}`);
    } else {
      setActiveEHRDrawer({
        name: alert.patientName,
        age: 58,
        problem: alert.title,
      });
      showToast(`Opening EHR Chart for ${alert.patientName}`);
    }
  };

  if (alerts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-[#0D111A] border border-[#1C2436] p-3 px-5 flex items-center justify-between text-xs text-slate-400"
      >
        <div className="flex items-center gap-2.5 text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>All high-priority clinical lab flags and telemetry sentries are acknowledged & stable.</span>
        </div>
        <button
          onClick={() => setAlerts(INITIAL_ALERTS)}
          className="text-[11px] font-mono text-[#D4FF00] hover:underline"
        >
          Reset Demo Alerts
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-[#121722] border border-[#232D42] shadow-2xl overflow-hidden hover:border-[#2E3C56] transition-colors"
    >
      {/* Top Banner Header */}
      <div className="p-4 sm:px-6 bg-gradient-to-r from-[#181F2E] via-[#121722] to-[#121722] border-b border-[#1C2436] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-2xl bg-[#FF6384]/15 border border-[#FF6384]/40 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-[#FF6384] animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6384] text-black text-[9px] font-mono font-black flex items-center justify-center shadow-sm">
              {alerts.length}
            </span>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
              Clinical Priority Sentry
            </h3>
            <p className="text-[11px] text-[#8E99A8]">
              Automated telemetry flags, critical lab values & AI pharmacovigilance
            </p>
          </div>
        </div>

        {/* Filter Pills and Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex bg-[#0D111A] p-1 rounded-full border border-[#1C2436] text-[11px]">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-2.5 py-1 rounded-full font-mono transition-all ${activeFilter === "all"
                  ? "bg-[#D4FF00] text-black font-bold"
                  : "text-[#8E99A8] hover:text-white"
                }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setActiveFilter("critical")}
              className={`px-2.5 py-1 rounded-full font-mono transition-all ${activeFilter === "critical"
                  ? "bg-[#FF6384] text-black font-bold"
                  : "text-[#8E99A8] hover:text-white"
                }`}
            >
              Critical
            </button>
            <button
              onClick={() => setActiveFilter("pharma")}
              className={`px-2.5 py-1 rounded-full font-mono transition-all ${activeFilter === "pharma"
                  ? "bg-[#B5A7FE] text-black font-bold"
                  : "text-[#8E99A8] hover:text-white"
                }`}
            >
              Pharma
            </button>
            <button
              onClick={() => setActiveFilter("vitals")}
              className={`px-2.5 py-1 rounded-full font-mono transition-all ${activeFilter === "vitals"
                  ? "bg-[#38BDF8] text-black font-bold"
                  : "text-[#8E99A8] hover:text-white"
                }`}
            >
              Vitals
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              showToast(isMuted ? "Telemetry alert audio unmuted" : "Telemetry audio muted");
            }}
            className="p-2 rounded-xl bg-[#0D111A] border border-[#1C2436] text-slate-400 hover:text-white hover:border-[#D4FF00]/40 transition-colors"
            title={isMuted ? "Unmute Sentry Audio" : "Mute Sentry Audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#D4FF00]" />}
          </button>

          {/* Expand/Collapse Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-[#0D111A] border border-[#1C2436] text-slate-400 hover:text-white hover:border-[#D4FF00]/40 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Alert Items List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="divide-y divide-[#1C2436] overflow-hidden"
          >
            {filteredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.25 }}
                className="p-4 sm:px-6 hover:bg-[#151C2A] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Patient Info & Description */}
                <div className="flex items-start gap-3.5">
                  <div
                    className={`mt-0.5 p-2 rounded-xl flex items-center justify-center flex-shrink-0 ${alert.severity === "critical"
                        ? "bg-[#FF6384]/15 text-[#FF6384] border border-[#FF6384]/30"
                        : alert.severity === "warning"
                          ? "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30"
                          : "bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30"
                      }`}
                  >
                    {alert.category === "lab" ? (
                      <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                    ) : alert.category === "pharma" ? (
                      <Pill className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Activity className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-wide">
                        {alert.patientName}
                      </span>
                      <span className="text-[10px] font-mono text-[#8E99A8] bg-[#0D111A] px-2 py-0.5 rounded border border-[#1C2436]">
                        {alert.location}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${alert.severity === "critical"
                            ? "bg-[#FF6384] text-black"
                            : alert.severity === "warning"
                              ? "bg-[#F59E0B] text-black"
                              : "bg-[#38BDF8] text-black"
                          }`}
                      >
                        {alert.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 ml-auto md:ml-0">
                        {alert.time}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-100 mt-1">
                      {alert.title}
                    </h4>
                    <p className="text-[11px] text-[#8E99A8] mt-0.5 line-clamp-2 md:line-clamp-none max-w-3xl leading-relaxed">
                      {alert.detail}
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAction(alert)}
                    className="px-3.5 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-1.5 shadow-lime-sm transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{alert.actionText}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAcknowledge(alert.id, alert.patientName)}
                    className="p-1.5 px-2.5 rounded-full bg-[#0D111A] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#1C2436] text-xs font-medium flex items-center gap-1 transition-colors"
                    title="Acknowledge and clear alert"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                    <span className="hidden sm:inline text-[11px]">Ack</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CriticalAlertsBar;
