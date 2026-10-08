import { useState, useEffect } from "react";
import {
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Sparkles,
  Plus,
  Send,
  FileText,
  Activity,
  Heart,
  ShieldCheck,
  Share2,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

export const TeleconsultationModal = () => {
  const { activeTeleconsultation, setActiveTeleconsultation, showToast } = useApp();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [activeTab, setActiveTab] = useState("transcript"); // 'transcript', 'rx', 'soap'
  const [duration, setDuration] = useState(145); // seconds elapsed

  const [transcripts, setTranscripts] = useState([
    { sender: "Doctor", time: "00:05", text: "Good afternoon Kamalesh, how have you been feeling since we adjusted your Metformin?" },
    { sender: "Patient", time: "00:22", text: "Hello Dr. Ramesh. Much better overall, but I felt a little lightheaded yesterday morning before breakfast." },
    { sender: "Doctor", time: "00:45", text: "I see. Have you been checking your fasting morning blood glucose readings?" },
    { sender: "Patient", time: "01:10", text: "Yes, yesterday it was 104 mg/dL, and today was 98 mg/dL." },
  ]);

  const [newRx, setNewRx] = useState({ drug: "", dose: "500mg", freq: "Twice daily with meals", days: "30" });
  const [prescriptions, setPrescriptions] = useState([
    { drug: "Metformin Hydrochloride", dose: "500mg", freq: "Twice daily", days: "30 days" },
    { drug: "Glimepiride", dose: "1mg", freq: "Once daily before breakfast", days: "30 days" },
  ]);

  useEffect(() => {
    if (!activeTeleconsultation) return;
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTeleconsultation]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  const handleAddRx = (e) => {
    e.preventDefault();
    if (!newRx.drug.trim()) return;
    setPrescriptions([...prescriptions, { ...newRx }]);
    setNewRx({ drug: "", dose: "500mg", freq: "Twice daily with meals", days: "30" });
    showToast(`Prescription for ${newRx.drug} added to order!`);
  };

  const handleCompleteConsultation = () => {
    showToast(`Consultation completed for ${activeTeleconsultation.patientName}. SOAP notes synced to EHR.`);
    setActiveTeleconsultation(null);
  };

  return (
    <AnimatePresence>
      {activeTeleconsultation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-6xl h-[92vh] bg-[#0C0F17] rounded-3xl border border-[#1C2436] shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Top Telehealth Status Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#121722] border-b border-[#1C2436]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 px-3 py-1 rounded-full text-xs font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                  <span>LIVE ENCRYPTED STREAM</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {activeTeleconsultation.patientName} (Age: {activeTeleconsultation.age || 32}, {activeTeleconsultation.problem || "Internal Medicine"})
                </span>
                <span className="text-xs text-[#8E99A8] font-mono hidden md:inline px-2.5 py-0.5 rounded-full bg-[#0D111A] border border-[#1C2436]">
                  Session ID: #TC-2026-904
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="font-mono text-xs px-3 py-1.5 bg-[#080B11] rounded-full text-[#D4FF00] border border-[#1C2436] font-semibold flex items-center gap-1.5">
                  <span>⏱</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTeleconsultation(null)}
                  className="w-8 h-8 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#8E99A8] hover:text-white border border-[#232D42] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              {/* Left: Video & Telemetry HUD (8 cols) */}
              <div className="lg:col-span-8 flex flex-col bg-[#080B11] relative overflow-hidden p-4">
                {/* Simulated Patient Video Stream */}
                <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0D111A] to-[#080B11] border border-[#1C2436] flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      {/* Futuristic Patient Avatar Representation */}
                      <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-[#121722] p-1 border-2 border-[#D4FF00] shadow-lime-sm flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-[#0D111A] flex items-center justify-center text-4xl font-extrabold text-[#D4FF00]">
                          {activeTeleconsultation.patientName.slice(0, 2).toUpperCase()}
                        </div>
                        {/* Pulsing ring */}
                        <div className="absolute inset-0 rounded-full border border-[#D4FF00] animate-ping opacity-25" />
                      </div>

                      <div className="mt-4 text-center">
                        <h3 className="text-base font-bold text-white">{activeTeleconsultation.patientName}</h3>
                        <p className="text-xs text-[#D4FF00] flex items-center justify-center gap-1.5 mt-1 font-mono">
                          <span className="w-2 h-2 rounded-full bg-[#D4FF00] inline-block animate-pulse" />
                          Patient HD 1080p Stream Connected • Low Latency (24ms)
                        </p>
                      </div>

                      {/* Animated Equalizer Waveform */}
                      <div className="flex items-center gap-1 mt-3">
                        <span className="w-1 h-3 bg-[#D4FF00] rounded-full animate-bounce" />
                        <span className="w-1 h-5 bg-[#D4FF00] rounded-full animate-bounce [animation-delay:0.15s]" />
                        <span className="w-1 h-2 bg-[#D4FF00] rounded-full animate-bounce [animation-delay:0.3s]" />
                        <span className="w-1 h-4 bg-[#D4FF00] rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1 h-6 bg-[#D4FF00] rounded-full animate-bounce [animation-delay:0.1s]" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-[#8E99A8]">
                      <VideoOff className="w-12 h-12 mb-2 text-[#8E99A8]" />
                      <p className="text-xs">Video Feed Suspended</p>
                    </div>
                  )}

                  {/* Patient Live Vitals Overlay (HUD style in top-left) */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-4 left-4 flex flex-col gap-2.5 bg-[#121722]/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#1C2436] font-mono text-xs shadow-xl"
                  >
                    <div className="flex items-center gap-2 text-[#FF6384]">
                      <Heart className="w-4 h-4 animate-pulse stroke-[2.5]" />
                      <span className="font-bold text-sm text-white">74</span>
                      <span className="text-[10px] text-[#8E99A8]">BPM</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#D4FF00]">
                      <Activity className="w-4 h-4 stroke-[2.5]" />
                      <span className="font-bold text-sm text-white">99%</span>
                      <span className="text-[10px] text-[#8E99A8]">SpO2</span>
                    </div>
                    <div className="text-white flex items-center gap-1.5">
                      <span className="text-[10px] text-[#8E99A8]">BP:</span>
                      <span className="font-bold text-[#38BDF8]">122/80</span>
                      <span className="text-[10px] text-[#8E99A8]">mmHg</span>
                    </div>
                  </motion.div>

                  {/* Doctor PiP Video Feed */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                    className="absolute bottom-4 right-4 w-36 h-28 sm:w-44 sm:h-32 bg-[#121722] rounded-2xl border-2 border-[#D4FF00] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-2"
                  >
                    <div className="text-xs font-bold text-white">Dr. Ramesh Varma</div>
                    <div className="text-[10px] text-[#8E99A8]">Attending Physician</div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] text-[#D4FF00] font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] inline-block animate-pulse" /> You
                    </div>
                  </motion.div>
                </div>

                {/* Video Controls Bar */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 py-2">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`p-3.5 rounded-full transition-all ${
                      isMicOn
                        ? "bg-[#181F2E] hover:bg-[#232D42] text-white border border-[#232D42]"
                        : "bg-[#FF6384] text-black font-bold shadow-lg"
                    }`}
                    title={isMicOn ? "Mute Mic" : "Unmute Mic"}
                  >
                    {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-3.5 rounded-full transition-all ${
                      isVideoOn
                        ? "bg-[#181F2E] hover:bg-[#232D42] text-white border border-[#232D42]"
                        : "bg-[#FF6384] text-black font-bold shadow-lg"
                    }`}
                    title={isVideoOn ? "Turn off Camera" : "Turn on Camera"}
                  >
                    {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setIsRecording(!isRecording)}
                    className={`px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                      isRecording
                        ? "bg-[#D4FF00] text-black shadow-lime-sm"
                        : "bg-[#181F2E] text-[#8E99A8] hover:text-white border border-[#232D42]"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 animate-spin [animation-duration:6s]" />
                    <span>{isRecording ? "AI Scribe Active" : "Resume Scribe"}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCompleteConsultation}
                    className="px-6 py-3 bg-[#FF6384] hover:bg-[#ff4d73] text-black font-bold rounded-full shadow-lg flex items-center gap-2 text-xs transition-all"
                  >
                    <PhoneOff className="w-4 h-4 stroke-[2.5]" />
                    <span>End & Save</span>
                  </motion.button>
                </div>
              </div>

              {/* Right: AI Scribe, Transcripts & Digital Prescription Pad (4 cols) */}
              <div className="lg:col-span-4 bg-[#121722] border-l border-[#1C2436] flex flex-col overflow-hidden">
                {/* Pill Tab navigation with sliding layout indicator */}
                <div className="flex border-b border-[#1C2436] bg-[#0C0F17] p-2 gap-1.5 relative">
                  {[
                    { id: "transcript", label: "Live Transcript" },
                    { id: "rx", label: `Prescription (${prescriptions.length})` },
                    { id: "soap", label: "AI SOAP Note" },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative flex-1 py-1.5 px-2 text-xs font-semibold rounded-full transition-colors z-10 block"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="tele-tab-pill"
                            className="absolute inset-0 bg-[#D4FF00] rounded-full shadow-lime-sm -z-10"
                            transition={{ type: "spring", stiffness: 450, damping: 30 }}
                          />
                        )}
                        <span className={isActive ? "text-black font-bold" : "text-[#8E99A8] hover:text-white"}>
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: Live Transcript Stream */}
                {activeTab === "transcript" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col p-4 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1C2436] text-xs">
                      <span className="flex items-center gap-1.5 text-[#D4FF00] font-mono text-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        Ambient Listening Engine
                      </span>
                      <span className="text-[10px] bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 px-2 py-0.5 rounded-full font-mono">
                        Real-time
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                      {transcripts.map((t, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className={`p-3 rounded-2xl ${
                            t.sender === "Doctor"
                              ? "bg-[#181F2E] border border-[#D4FF00]/30 text-white ml-4"
                              : "bg-[#0D111A] border border-[#1C2436] text-slate-300 mr-4"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1 text-[10px] text-[#8E99A8]">
                            <span className={`font-semibold ${t.sender === "Doctor" ? "text-[#D4FF00]" : "text-white"}`}>
                              {t.sender}
                            </span>
                            <span className="font-mono">{t.time}</span>
                          </div>
                          <p className="leading-relaxed">{t.text}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#1C2436]">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Add doctor observation or remark..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              setTranscripts([
                                ...transcripts,
                                { sender: "Doctor", time: formatTime(duration), text: e.target.value.trim() },
                              ]);
                              e.target.value = "";
                            }
                          }}
                          className="w-full bg-[#0D111A] border border-[#1C2436] rounded-full px-4 py-2.5 text-xs text-white placeholder-[#8E99A8] focus:outline-none focus:border-[#D4FF00] pr-10"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-[#D4FF00] hover:text-[#CCFF00]"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab 2: Digital Prescription Pad */}
                {activeTab === "rx" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4"
                  >
                    <div className="text-xs font-semibold text-white flex items-center justify-between">
                      <span>Current Prescriptions</span>
                      <span className="text-[10px] text-[#D4FF00] font-mono">Auto-Drug Conflict Checked</span>
                    </div>

                    <div className="space-y-2">
                      {prescriptions.map((rx, idx) => (
                        <div key={idx} className="p-3 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex justify-between items-start">
                          <div>
                            <div className="text-xs font-bold text-white">{rx.drug}</div>
                            <div className="text-[11px] text-[#8E99A8] mt-0.5">{rx.dose} • {rx.freq}</div>
                            <div className="text-[10px] text-[#D4FF00] mt-1 font-mono">Duration: {rx.days}</div>
                          </div>
                          <button
                            onClick={() => setPrescriptions(prescriptions.filter((_, i) => i !== idx))}
                            className="text-[#8E99A8] hover:text-[#FF6384] p-1 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddRx} className="p-4 bg-[#0D111A] rounded-2xl border border-[#1C2436] space-y-3">
                      <div className="text-xs font-bold text-[#D4FF00] flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Add Medication
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E99A8] block mb-1">
                          Drug Name / Molecule
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Atorvastatin, Lisinopril..."
                          value={newRx.drug}
                          onChange={(e) => setNewRx({ ...newRx, drug: e.target.value })}
                          className="w-full bg-[#121722] border border-[#1C2436] rounded-xl px-3 py-2 text-xs text-white placeholder-[#8E99A8] focus:outline-none focus:border-[#D4FF00]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E99A8] block mb-1">Dosage</label>
                          <input
                            type="text"
                            value={newRx.dose}
                            onChange={(e) => setNewRx({ ...newRx, dose: e.target.value })}
                            className="w-full bg-[#121722] border border-[#1C2436] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF00]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E99A8] block mb-1">Duration (days)</label>
                          <input
                            type="text"
                            value={newRx.days}
                            onChange={(e) => setNewRx({ ...newRx, days: e.target.value })}
                            className="w-full bg-[#121722] border border-[#1C2436] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF00]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#8E99A8] block mb-1">Frequency</label>
                        <input
                          type="text"
                          value={newRx.freq}
                          onChange={(e) => setNewRx({ ...newRx, freq: e.target.value })}
                          className="w-full bg-[#121722] border border-[#1C2436] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF00]"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-2.5 bg-[#D4FF00] hover:bg-[#CCFF00] text-black rounded-full text-xs font-bold shadow-lime-sm mt-2 transition-colors"
                      >
                        Add to Rx Order
                      </motion.button>
                    </form>
                  </motion.div>
                )}

                {/* Tab 3: Generated AI SOAP Note */}
                {activeTab === "soap" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 p-4 overflow-y-auto space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#1C2436]">
                      <span className="font-semibold text-white">AI Clinical Summary (SOAP)</span>
                      <span className="text-[10px] text-[#D4FF00] bg-[#D4FF00]/10 border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-full font-mono">
                        Ready
                      </span>
                    </div>

                    <div className="bg-[#0D111A] p-4 rounded-2xl border border-[#1C2436] space-y-3">
                      <div>
                        <span className="font-bold text-[#D4FF00] block text-xs">S (Subjective):</span>
                        <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                          32yo male reports well-tolerated Metformin regimen, with isolated mild morning lightheadedness. Fasting BGL well controlled (98-104 mg/dL).
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-[#D4FF00] block text-xs">O (Objective):</span>
                        <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                          HR: 74 BPM (NSR), SpO2: 99%, BP: 122/80 mmHg. No peripheral edema reported.
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-[#D4FF00] block text-xs">A (Assessment):</span>
                        <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                          Type 2 Diabetes Mellitus without complications (ICD-10 E11.9) - Excellent glycemic control.
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-[#D4FF00] block text-xs">P (Plan):</span>
                        <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                          Continue Metformin 500mg BID. Maintain home glucose log. Schedule repeat HbA1c panel in 3 months.
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showToast("SOAP note officially signed and pushed to Hospital EHR!")}
                      className="w-full py-2.5 bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold rounded-full flex items-center justify-center gap-2 shadow-lime-sm transition-all text-xs"
                    >
                      <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                      Sign & Push to EHR Record
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeleconsultationModal;
