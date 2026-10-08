import { useState } from "react";
import { 
  Pill, 
  CalendarPlus, 
  Video, 
  Mic, 
  FlaskConical, 
  Flame, 
  Sparkles,
  Command,
  CheckCircle2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/SidebarContext";

export const PhysicianCommandDock = () => {
  const { 
    setActiveRxModal, 
    setNewAppointmentModalOpen, 
    setActiveTeleconsultation, 
    setCommandPaletteOpen,
    showToast 
  } = useApp();

  const [isScribeOpen, setScribeOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [scribeNotes, setScribeNotes] = useState(
    "Subjective: 54yo male reports 3-week history of progressive exertional shortness of breath, aggravated when climbing stairs. Denies chest pain or palpitations.\nObjective: BP 134/86 mmHg, HR 74 regular, SpO2 97% on room air. Mild bilateral pretibial edema (1+). S1/S2 distinct, no gallop.\nAssessment: Mild congestive heart failure exacerbation vs. medication non-compliance.\nPlan: Check BNP, serum electrolytes. Initiate Furosemide 20mg daily, follow-up in 10 days."
  );

  const [isLabOrderOpen, setLabOrderOpen] = useState(false);
  const [selectedLabs, setSelectedLabs] = useState(["CBC", "BMP", "Troponin I"]);

  const labOptions = [
    { id: "CBC", name: "Complete Blood Count (CBC)", turnAround: "35 mins" },
    { id: "BMP", name: "Basic Metabolic Panel (BMP)", turnAround: "45 mins" },
    { id: "Troponin I", name: "High-Sensitivity Troponin I", turnAround: "20 mins", stat: true },
    { id: "HbA1c", name: "Glycated Hemoglobin (HbA1c)", turnAround: "60 mins" },
    { id: "Lipid", name: "Comprehensive Lipid Panel", turnAround: "90 mins" },
    { id: "D-Dimer", name: "Quantitative D-Dimer", turnAround: "30 mins", stat: true },
  ];

  const toggleLab = (id) => {
    setSelectedLabs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOrderLabs = () => {
    setLabOrderOpen(false);
    showToast(`Stat requisition dispatched for ${selectedLabs.length} lab panels to Central Pathology.`);
  };

  const handleCodeAlert = () => {
    showToast("EMERGENCY: Rapid Response / Code Alert broadcast to Floor Team.", "error");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-3xl bg-[#121722] border border-[#1C2436] p-4 sm:p-5 shadow-2xl hover:border-[#28354E] transition-colors"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D4FF00]" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Physician Fast-Action Command Dock
              </h3>
              <p className="text-[11px] text-[#8E99A8]">
                One-tap clinical workflows, voice scribing & stat orders
              </p>
            </div>
          </div>

          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D111A] hover:bg-[#182030] text-slate-300 hover:text-white border border-[#1C2436] text-[11px] font-mono transition-colors"
          >
            <Command className="w-3 h-3 text-[#D4FF00]" />
            <span>Open Command Palette</span>
            <kbd className="bg-[#182030] px-1.5 py-0.5 rounded text-[9px] text-[#8E99A8]">⌘K</kbd>
          </button>
        </div>

        {/* 6 Action Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Action 1: Write Rx */}
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setActiveRxModal({ patientName: "Marcus Vance", problem: "Cardiology Titration" });
              showToast("Opening Quick Rx Pad...");
            }}
            className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#D4FF00]/50 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center mb-2 group-hover:bg-[#D4FF00] group-hover:text-black transition-colors">
              <Pill className="w-4 h-4 text-[#D4FF00] group-hover:text-black transition-colors" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-[#D4FF00] transition-colors">
                Quick Rx Pad
              </span>
              <span className="text-[10px] text-[#8E99A8] font-mono">e-Prescriptions</span>
            </div>
          </motion.button>

          {/* Action 2: New Appointment */}
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setNewAppointmentModalOpen(true)}
            className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#B5A7FE]/50 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#B5A7FE]/10 border border-[#B5A7FE]/20 flex items-center justify-center mb-2 group-hover:bg-[#B5A7FE] group-hover:text-black transition-colors">
              <CalendarPlus className="w-4 h-4 text-[#B5A7FE] group-hover:text-black transition-colors" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-[#B5A7FE] transition-colors">
                New Consult
              </span>
              <span className="text-[10px] text-[#8E99A8] font-mono">Book Slot / OPD</span>
            </div>
          </motion.button>

          {/* Action 3: Tele-Room */}
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() =>
              setActiveTeleconsultation({
                patientName: "Kamalesh Patel",
                age: 32,
                problem: "Diabetes Review",
              })
            }
            className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#38BDF8]/50 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center mb-2 group-hover:bg-[#38BDF8] group-hover:text-black transition-colors">
              <Video className="w-4 h-4 text-[#38BDF8] group-hover:text-black transition-colors" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-[#38BDF8] transition-colors">
                Tele-Room
              </span>
              <span className="text-[10px] text-[#8E99A8] font-mono">HD Encrypted Call</span>
            </div>
          </motion.button>

          {/* Action 4: Ambient AI Scribe */}
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setScribeOpen(true)}
            className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#10B981]/50 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mb-2 group-hover:bg-[#10B981] group-hover:text-black transition-colors">
              <Mic className="w-4 h-4 text-[#10B981] group-hover:text-black transition-colors" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-[#10B981] transition-colors">
                Ambient Scribe
              </span>
              <span className="text-[10px] text-[#8E99A8] font-mono">Live Voice SOAP</span>
            </div>
          </motion.button>

          {/* Action 5: Stat Lab Orders */}
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setLabOrderOpen(true)}
            className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#F59E0B]/50 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center mb-2 group-hover:bg-[#F59E0B] group-hover:text-black transition-colors">
              <FlaskConical className="w-4 h-4 text-[#F59E0B] group-hover:text-black transition-colors" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-[#F59E0B] transition-colors">
                Stat Lab Order
              </span>
              <span className="text-[10px] text-[#8E99A8] font-mono">Pathology Panel</span>
            </div>
          </motion.button>

          {/* Action 6: Code Emergency */}
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCodeAlert}
            className="p-3.5 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#FF6384]/50 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF6384]/10 border border-[#FF6384]/20 flex items-center justify-center mb-2 group-hover:bg-[#FF6384] group-hover:text-black transition-colors">
              <Flame className="w-4 h-4 text-[#FF6384] group-hover:text-black transition-colors" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#FF6384] block transition-colors">
                Rapid Response
              </span>
              <span className="text-[10px] text-[#8E99A8] font-mono">Code Team Alert</span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Ambient Voice Scribe Modal */}
      <AnimatePresence>
        {isScribeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setScribeOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#121722] border border-[#1C2436] p-6 shadow-2xl text-white z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#1C2436] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center">
                    <Mic className={`w-5 h-5 text-[#10B981] ${isRecording ? "animate-pulse" : ""}`} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base">Ambient Clinical Voice Scribe</h3>
                    <p className="text-xs text-[#8E99A8]">
                      AI Speech-to-SOAP note generator with medical terminology parsing
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setScribeOpen(false)}
                  className="p-2 rounded-full hover:bg-[#1C2436] text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Live Audio Visualizer Bar */}
              <div className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsRecording(!isRecording);
                      showToast(isRecording ? "Scribe paused." : "Ambient microphone active.");
                    }}
                    className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-all ${
                      isRecording
                        ? "bg-[#FF6384] text-black shadow-sm"
                        : "bg-[#10B981] text-black shadow-lime-sm"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isRecording ? "bg-black animate-ping" : "bg-black"}`} />
                    {isRecording ? "Stop Recording" : "Start Live Dictation"}
                  </button>

                  <span className="text-xs font-mono text-slate-400">
                    {isRecording ? "Listening to room audio (48 kHz)..." : "Microphone on standby"}
                  </span>
                </div>

                {/* Animated Waveform Bars */}
                <div className="flex items-center gap-1 h-6">
                  {[40, 70, 30, 90, 60, 80, 50, 95, 45, 65].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={isRecording ? { height: ["20%", `${h}%`, "30%"] } : { height: "20%" }}
                      transition={isRecording ? { repeat: Infinity, duration: 0.8, delay: i * 0.08 } : {}}
                      className="w-1 rounded-full bg-[#10B981]"
                    />
                  ))}
                </div>
              </div>

              {/* Generated Clinical Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8E99A8] mb-2">
                  Generated Clinical SOAP Note
                </label>
                <textarea
                  rows={6}
                  value={scribeNotes}
                  onChange={(e) => setScribeNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#0D111A] border border-[#1C2436] text-white font-mono text-xs focus:outline-none focus:border-[#D4FF00] leading-relaxed resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono text-[#D4FF00]">
                  Confidence: 99.2% • SNOMED-CT Mapped
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScribeOpen(false)}
                    className="px-4 py-2 rounded-full bg-[#0D111A] hover:bg-[#182030] text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setScribeOpen(false);
                      showToast("SOAP Note digitally signed and synced to Patient EHR Chart.");
                    }}
                    className="px-5 py-2 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-1.5 shadow-lime-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>Sign & Save to EHR</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stat Lab Requisition Modal */}
      <AnimatePresence>
        {isLabOrderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLabOrderOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl rounded-3xl bg-[#121722] border border-[#1C2436] p-6 shadow-2xl text-white z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#1C2436] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center">
                    <FlaskConical className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base">Stat Diagnostic Lab Requisition</h3>
                    <p className="text-xs text-[#8E99A8]">
                      Select urgent pathology and chemistry panels for priority specimen run
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setLabOrderOpen(false)}
                  className="p-2 rounded-full hover:bg-[#1C2436] text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lab Panel Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {labOptions.map((lab) => {
                  const isChecked = selectedLabs.includes(lab.id);
                  return (
                    <motion.div
                      key={lab.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => toggleLab(lab.id)}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? "bg-[#0D111A] border-[#D4FF00] shadow-lime-sm"
                          : "bg-[#0D111A] border-[#1C2436] hover:border-slate-600"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{lab.name}</span>
                          {lab.stat && (
                            <span className="text-[9px] font-mono bg-[#FF6384] text-black px-1.5 py-0.2 rounded font-bold">
                              STAT
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#8E99A8] font-mono mt-0.5">
                          TAT: ~{lab.turnAround}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                          isChecked
                            ? "bg-[#D4FF00] border-[#D4FF00] text-black"
                            : "border-[#1C2436]"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1C2436]">
                <span className="text-xs font-mono text-slate-400">
                  {selectedLabs.length} Panels Selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLabOrderOpen(false)}
                    className="px-4 py-2 rounded-full bg-[#0D111A] hover:bg-[#182030] text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    disabled={selectedLabs.length === 0}
                    onClick={handleOrderLabs}
                    className="px-5 py-2 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-1.5 shadow-lime-sm disabled:opacity-50"
                  >
                    <span>Dispatch Stat Requisition</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhysicianCommandDock;
