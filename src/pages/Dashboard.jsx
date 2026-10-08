import { useState } from "react";
import { RefreshCw, Video, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import LeftSummaryCard from "@/components/dashboard/LeftSummaryCard";
import SignatureElectricChart from "@/components/analytics/SignatureElectricChart";
import TriageBlocksCard from "@/components/dashboard/TriageBlocksCard";
import ArcGaugeCard from "@/components/dashboard/ArcGaugeCard";
import ClinicalNotesCard from "@/components/dashboard/ClinicalNotesCard";
import CriticalAlertsBar from "@/components/dashboard/CriticalAlertsBar";
import ShiftCapacityHUD from "@/components/dashboard/ShiftCapacityHUD";
import PhysicianCommandDock from "@/components/dashboard/PhysicianCommandDock";
import LiveBedsideTelemetryCard from "@/components/dashboard/LiveBedsideTelemetryCard";
import AICopilotWidget from "@/components/dashboard/AICopilotWidget";
import { useApp } from "@/context/SidebarContext";

const Dashboard = () => {
  const { setActiveTeleconsultation, setActiveEHRDrawer, showToast } = useApp();

  // State to simulate the "One click re-rolls the whole board" feature shown in the video
  const [boardSeed, setBoardSeed] = useState(1);
  const [gaugeScore, setGaugeScore] = useState(84);
  const [triageStats, setTriageStats] = useState({
    urgent: 3,
    tele: 12,
    scheduled: 24,
  });

  const notesList = [
    <>
      Fasting blood glucose levels{" "}
      <strong className="text-white font-extrabold underline decoration-[#D4FF00] decoration-2 underline-offset-4">
        eased 14 mg/dL
      </strong>{" "}
      across Type 2 diabetes cohort following automated Metformin dosage titration.
    </>,
    <>
      Mean systolic blood pressure{" "}
      <strong className="text-white font-extrabold underline decoration-[#D4FF00] decoration-2 underline-offset-4">
        decreased 8.4 mmHg
      </strong>{" "}
      in Stage 2 hypertension patients with ambient telehealth compliance.
    </>,
    <>
      Post-operative telemetry alerts{" "}
      <strong className="text-white font-extrabold underline decoration-[#D4FF00] decoration-2 underline-offset-4">
        dropped 22%
      </strong>{" "}
      this shift, stabilizing cardiac telemetry recovery time to 1.4 days.
    </>,
  ];

  const currentNote = notesList[boardSeed % notesList.length];

  const handleReroll = () => {
    setBoardSeed((prev) => prev + 1);
    setGaugeScore(Math.floor(65 + Math.random() * 30));
    setTriageStats({
      urgent: Math.floor(1 + Math.random() * 4),
      tele: Math.floor(8 + Math.random() * 8),
      scheduled: Math.floor(20 + Math.random() * 10),
    });
    showToast("Re-rolled clinical telemetry and board metrics.");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-8"
    >
      {/* 1. Physician Shift & Capacity Telemetry HUD (4 Metric Cards) */}
      <ShiftCapacityHUD />

      {/* 2. Top Grid: Left Summary Card (4 cols) & Dominant Signature Electric Chart (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <LeftSummaryCard onOpenBilling={() => showToast("Opening Physician Billings modal...")} />
        </div>
        <div className="lg:col-span-8 flex flex-col">
          <SignatureElectricChart onReroll={handleReroll} />
        </div>
      </div>

      {/* 3. Physician Fast-Action Command Dock (Quick Rx, Consult, Tele-Room, Ambient Voice Scribe, Stat Labs, Rapid Code) */}
      <PhysicianCommandDock />

      {/* 4. Bottom Grid: 3 Equal-Sized Modular Cards from the Video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Colorful Triage Blocks */}
        <TriageBlocksCard stats={triageStats} />

        {/* Card 2: Semi-Circular Arc Recovery Gauge */}
        <ArcGaugeCard
          score={gaugeScore}
          onOpenDetail={() => showToast("Opening recovery cohort breakdown...")}
        />

        {/* Card 3: Clinical Notes with Highlighted Text & Circular Badges */}
        <ClinicalNotesCard
          note={currentNote}
          onOpenNotes={() => showToast("Opening Clinical Notes repository...")}
        />
      </div>

      {/* 5. Live Bedside Telemetry Monitor (Real-Time ECG Rhythm Waveform & Biometrics HUD) */}
      <LiveBedsideTelemetryCard />

      {/* 6. Neural AI Clinical Co-Pilot & Pharmacovigilance Intelligence */}
      <AICopilotWidget />

      {/* 7. Today's Active Consultations Queue Drawer strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="p-5 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl hover:border-[#28354E] transition-colors"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Today&apos;s Active Consultations Queue
            </h3>
            <p className="text-xs text-[#8E99A8]">
              Direct tele-room launchers and EHR chart access
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#D4FF00] text-black shadow-lime-sm">
            6 in Queue
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Patient 1 */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#D4FF00]/50 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-white">Kamalesh Patel (32y)</div>
              <div className="text-[11px] text-[#8E99A8] mt-0.5">Diabetes • 03:00 PM</div>
              <span className="inline-block mt-1 text-[9px] font-mono font-bold bg-[#D4FF00]/20 text-[#D4FF00] px-1.5 py-0.5 rounded">
                Virtual Telehealth
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() =>
                setActiveTeleconsultation({
                  patientName: "Kamalesh Patel",
                  age: 32,
                  problem: "Diabetes Review",
                })
              }
              className="px-3.5 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-1 shadow-lime-sm transition-all"
            >
              <Video className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Join</span>
            </motion.button>
          </motion.div>

          {/* Patient 2 */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#FF6384]/50 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-white">Robert Fox (64y)</div>
              <div className="text-[11px] text-[#FF6384] font-semibold mt-0.5">Chest Tightness • Prioritized</div>
              <span className="inline-block mt-1 text-[9px] font-mono font-bold bg-[#FF6384]/20 text-[#FF6384] px-1.5 py-0.5 rounded">
                Emergency Triage
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() =>
                setActiveEHRDrawer({
                  name: "Robert Fox",
                  age: 64,
                  problem: "Chest Tightness",
                })
              }
              className="px-3.5 py-1.5 rounded-full bg-[#FF6384] hover:bg-[#ff4d73] text-black font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Chart</span>
            </motion.button>
          </motion.div>

          {/* Patient 3 */}
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#38BDF8]/50 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-white">Alice Brown (45y)</div>
              <div className="text-[11px] text-[#8E99A8] mt-0.5">Hypertension • 03:30 PM</div>
              <span className="inline-block mt-1 text-[9px] font-mono font-bold bg-[#B5A7FE]/20 text-[#B5A7FE] px-1.5 py-0.5 rounded">
                In-Clinic Suite 4B
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() =>
                setActiveEHRDrawer({
                  name: "Alice Brown",
                  age: 45,
                  problem: "Hypertension",
                })
              }
              className="px-3.5 py-1.5 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-slate-200 border border-[#232D42] font-semibold text-xs flex items-center gap-1 transition-all"
            >
              <span>Examine</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* 8. Critical Clinical Priority Sentry Bar (Urgent Lab & Telemetry Flags) */}
      <CriticalAlertsBar />

      {/* Video's Signature Interactive Caption: "One click re-rolls the whole board" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex items-center justify-between pt-2 px-1 text-xs text-[#8E99A8]"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReroll}
          className="flex items-center gap-2 group text-slate-300 hover:text-[#D4FF00] transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-[#121722] border border-[#1C2436] group-hover:border-[#D4FF00] flex items-center justify-center transition-colors">
            <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
          </div>
          <span className="font-mono text-[11px] font-medium tracking-wide">
            One click re-rolls the whole board
          </span>
        </motion.button>

        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="text-slate-500 hidden sm:inline">Physician: Dr. Ramesh Varma, MD</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Encrypted Sync
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
