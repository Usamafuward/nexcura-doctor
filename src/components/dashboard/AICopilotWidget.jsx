import { useState } from "react";
import { 
  Sparkles, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  RefreshCw, 
  FileCheck2, 
  FileText,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/SidebarContext";

export const AICopilotWidget = () => {
  const { showToast, setActiveEHRDrawer } = useApp();
  const [activeTab, setActiveTab] = useState("interactions"); // 'interactions', 'differential', 'scribeQueue'
  const [drug1, setDrug1] = useState("Warfarin");
  const [drug2, setDrug2] = useState("Aspirin");
  const [interactionResult, setInteractionResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const [symptoms, setSymptoms] = useState("Exertional dyspnea, bilateral ankle edema, fatigue");
  const [differentialResult, setDifferentialResult] = useState(null);

  const [scribeNotes, setScribeNotes] = useState([
    {
      id: "sn-1",
      patient: "Emma Davis (29y)",
      type: "Post-Op Day 7 Follow-Up",
      summary: "Wound clean, sutures intact. Tolerating oral intake. Discontinue Ketorolac, continue oral Ibuprofen PRN.",
      time: "10m ago",
      confidence: "99.4%",
    },
    {
      id: "sn-2",
      patient: "Marcus Vance (58y)",
      type: "ICU Admission Progress Note",
      summary: "Stabilized post-PCI. Dual antiplatelet therapy initiated. Echocardiogram shows EF 48%. Strict telemetry monitoring.",
      time: "32m ago",
      confidence: "98.8%",
    },
    {
      id: "sn-3",
      patient: "David Kalu (62y)",
      type: "Pulmonology Consult",
      summary: "Exacerbation secondary to viral URI. Prescribed Budesonide/Formoterol inhaler and oral Prednisone taper.",
      time: "1h ago",
      confidence: "97.6%",
    },
  ]);

  const handleCheckInteraction = (e) => {
    e.preventDefault();
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setInteractionResult({
        severity: "Major",
        title: "Major Bleeding Risk (Pharmacodynamic Synergy)",
        description:
          "Concurrent use of Warfarin with Aspirin significantly increases risk of major gastrointestinal and systemic bleeding. If combination is clinically indicated (e.g., mechanical heart valve), monitor INR strictly and consider gastroprotection.",
        recommendation: "Consider replacing with low-dose single agent or consult cardiology guidelines.",
      });
      showToast("AI Drug Interaction analysis complete.");
    }, 600);
  };

  const handleDifferential = (e) => {
    e.preventDefault();
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setDifferentialResult([
        { diagnosis: "Congestive Heart Failure (NYHA Class II)", prob: "68%", icd: "I50.9" },
        { diagnosis: "Chronic Venous Insufficiency", prob: "18%", icd: "I87.2" },
        { diagnosis: "Nephrotic Syndrome / Renal Impairment", prob: "14%", icd: "N04.9" },
      ]);
      showToast("Differential diagnosis generated from clinical presentation.");
    }, 700);
  };

  const handleSignNote = (id, patient) => {
    setScribeNotes((prev) => prev.filter((n) => n.id !== id));
    showToast(`Digitally signed & committed SOAP note for ${patient} to EHR.`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-3xl bg-[#121722] text-white p-5 sm:p-6 border border-[#1C2436] shadow-2xl relative overflow-hidden hover:border-[#28354E] transition-colors"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0D111A] border border-[#1C2436] p-0.5 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#D4FF00]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                NEXCURA NEURAL COPILOT
              </h3>
              <span className="text-[10px] font-mono uppercase bg-[#D4FF00]/15 text-[#D4FF00] px-2 py-0.5 rounded-full border border-[#D4FF00]/30 font-bold">
                LLM v4.5 Med
              </span>
            </div>
            <p className="text-xs text-[#8E99A8]">
              Real-time clinical decision support, pharmacovigilance & ambient scribe reviews
            </p>
          </div>
        </div>

        {/* Tab switch with sliding layout pill */}
        <div className="flex bg-[#0D111A] p-1 rounded-full border border-[#1C2436] text-xs gap-1">
          <button
            onClick={() => setActiveTab("interactions")}
            className={`relative px-3.5 py-1.5 rounded-full font-semibold transition-all ${
              activeTab === "interactions"
                ? "text-black font-bold"
                : "text-[#8E99A8] hover:text-white"
            }`}
          >
            {activeTab === "interactions" && (
              <motion.div
                layoutId="copilot-tab-pill"
                className="absolute inset-0 bg-[#D4FF00] rounded-full shadow-lime-sm -z-0"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">Drug Safety</span>
          </button>

          <button
            onClick={() => setActiveTab("differential")}
            className={`relative px-3.5 py-1.5 rounded-full font-semibold transition-all ${
              activeTab === "differential"
                ? "text-black font-bold"
                : "text-[#8E99A8] hover:text-white"
            }`}
          >
            {activeTab === "differential" && (
              <motion.div
                layoutId="copilot-tab-pill"
                className="absolute inset-0 bg-[#D4FF00] rounded-full shadow-lime-sm -z-0"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">Differential AI</span>
          </button>

          <button
            onClick={() => setActiveTab("scribeQueue")}
            className={`relative px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "scribeQueue"
                ? "text-black font-bold"
                : "text-[#8E99A8] hover:text-white"
            }`}
          >
            {activeTab === "scribeQueue" && (
              <motion.div
                layoutId="copilot-tab-pill"
                className="absolute inset-0 bg-[#D4FF00] rounded-full shadow-lime-sm -z-0"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">Scribe Sign-Offs</span>
            {scribeNotes.length > 0 && (
              <span className={`relative z-10 text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                activeTab === "scribeQueue" ? "bg-black text-[#D4FF00]" : "bg-[#FF6384] text-black"
              }`}>
                {scribeNotes.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab 1: Drug Interaction Checker */}
      {activeTab === "interactions" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4 relative z-10 text-xs"
        >
          <form onSubmit={handleCheckInteraction} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                Primary Drug
              </label>
              <input
                type="text"
                value={drug1}
                onChange={(e) => setDrug1(e.target.value)}
                placeholder="e.g. Warfarin"
                className="w-full px-3 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white focus:outline-none focus:border-[#D4FF00] font-medium"
              />
            </div>
            <div className="sm:col-span-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                Secondary Agent
              </label>
              <input
                type="text"
                value={drug2}
                onChange={(e) => setDrug2(e.target.value)}
                placeholder="e.g. Aspirin"
                className="w-full px-3 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white focus:outline-none focus:border-[#D4FF00] font-medium"
              />
            </div>
            <div className="sm:col-span-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={isChecking}
                className="w-full py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold flex items-center justify-center gap-1.5 shadow-lime-sm transition-all disabled:opacity-50"
              >
                {isChecking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 stroke-[2.5]" />}
                <span>Check</span>
              </motion.button>
            </div>
          </form>

          {interactionResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-[#0D111A] border border-[#FF6384]/40 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 text-[#FF6384]">
                  <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                  <span>{interactionResult.title}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#FF6384] text-black font-mono text-[9px] uppercase font-bold">
                  {interactionResult.severity} Severity
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {interactionResult.description}
              </p>
              <div className="text-[11px] text-[#D4FF00] bg-[#121722] p-2.5 rounded-xl border border-[#1C2436] flex items-start gap-2">
                <strong className="text-white">Recommendation:</strong>
                <span>{interactionResult.recommendation}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Tab 2: Differential AI */}
      {activeTab === "differential" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4 relative z-10 text-xs"
        >
          <form onSubmit={handleDifferential} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                Enter Patient Presenting Symptoms & Signs
              </label>
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white focus:outline-none focus:border-[#D4FF00]"
              />
            </div>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={isChecking}
                className="px-6 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold flex items-center gap-1.5 shadow-lime-sm transition-all"
              >
                {isChecking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Generate Differential</span>
              </motion.button>
            </div>
          </form>

          {differentialResult && (
            <div className="space-y-2">
              {differentialResult.map((res, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between hover:border-[#D4FF00]/40 transition-colors"
                >
                  <div>
                    <span className="font-bold text-white text-xs">{res.diagnosis}</span>
                    <span className="text-[10px] text-[#8E99A8] ml-2 font-mono">ICD-10: {res.icd}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D4FF00] bg-[#121722] px-2.5 py-1 rounded-full border border-[#1C2436]">
                    {res.prob} match
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Tab 3: Scribe Sign-Offs Queue */}
      {activeTab === "scribeQueue" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3 relative z-10 text-xs"
        >
          {scribeNotes.length === 0 ? (
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-[#1C2436] text-center text-slate-400">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="font-bold text-white text-xs">All Ambient Scribe Notes Signed</div>
              <p className="text-[11px] text-[#8E99A8] mt-0.5">
                No outstanding clinical documentation awaits your electronic signature.
              </p>
            </div>
          ) : (
            scribeNotes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#D4FF00]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{note.patient}</span>
                    <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded">
                      {note.type}
                    </span>
                    <span className="text-[10px] font-mono text-[#D4FF00]">
                      {note.confidence} match
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 ml-auto sm:ml-0">
                      {note.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8E99A8] mt-1 line-clamp-1">
                    {note.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setActiveEHRDrawer({
                        name: note.patient.split(" ")[0],
                        age: 30,
                        problem: note.type,
                      });
                      showToast(`Opening EHR chart for ${note.patient}`);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#182030] hover:bg-[#232D42] text-slate-300 text-xs font-semibold"
                  >
                    Review
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleSignNote(note.id, note.patient)}
                    className="px-3.5 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-1 shadow-lime-sm"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Sign Note</span>
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AICopilotWidget;
