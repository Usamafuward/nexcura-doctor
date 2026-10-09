import { useState } from "react";
import { RefreshCw } from "lucide-react";
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
import ConsultationsQueueCard from "@/components/dashboard/ConsultationsQueueCard";
import { useApp } from "@/context/AppContext";

const Dashboard = () => {
  const { showToast } = useApp();

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
      className="space-y-6"
    >
      {/* 1. Physician Shift & Capacity Telemetry HUD (4 Metric Cards) */}
      <ShiftCapacityHUD />

      {/* 2. Top Grid: Left Summary Card (4 cols) & Dominant Signature Electric Chart (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <LeftSummaryCard onOpenBilling={() => showToast("Opening Physician Billings modal...")} />
        </div>
        <div className="lg:col-span-8 flex flex-col">
          <SignatureElectricChart onReroll={handleReroll} />
        </div>
      </div>

      {/* 3. Diagnostic Metrics Grid: 3 Equal-Sized Modular Cards from the Video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
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

      {/* 4. Clinical Telemetry & Command Bay: 8 cols Bedside Monitor & 4 cols Command Dock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <LiveBedsideTelemetryCard />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <PhysicianCommandDock />
        </div>
      </div>

      {/* 5. Clinical Operations & Safety Deck: 3 Equal-Sized Modular Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Card 1: Today's Active Consultations Queue */}
        <ConsultationsQueueCard />

        {/* Card 2: Neural Drug Safety & Clinical Copilot */}
        <AICopilotWidget />

        {/* Card 3: Critical Diagnostic Sentry & Alert Dispatch */}
        <CriticalAlertsBar />
      </div>

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
        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">Physician: Dr. Ramesh Varma, MD</span>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
