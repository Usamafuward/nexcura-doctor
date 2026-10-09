import { X, User, Heart, Activity, AlertTriangle, Pill, FileText, Calendar, Clock, Download, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

export const EHRDrawer = () => {
  const { activeEHRDrawer, setActiveEHRDrawer, setActiveTeleconsultation, setActiveRxModal, showToast } = useApp();

  const patient = activeEHRDrawer;

  return (
    <AnimatePresence>
      {activeEHRDrawer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="w-full max-w-full sm:max-w-2xl bg-[#0C0F17] h-full shadow-2xl border-l border-[#1C2436] flex flex-col text-white overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 bg-[#121722] border-b border-[#1C2436] flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#181F2E] border-2 border-[#D4FF00] shadow-lime-sm flex items-center justify-center text-lg sm:text-xl font-extrabold text-[#D4FF00] shrink-0">
                  {patient.name ? patient.name.slice(0, 2).toUpperCase() : "PT"}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-white">{patient.name || patient.patientName}</h2>
                    <span className="text-xs bg-[#0D111A] text-[#D4FF00] border border-[#1C2436] px-2.5 py-0.5 rounded-full font-mono">
                      {patient.id || "#MED-8041"}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#8E99A8] mt-1">
                    Age: {patient.age || 32} • Gender: {patient.gender || "Male"} • Blood: O+
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveEHRDrawer(null)}
                className="w-8 h-8 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#8E99A8] hover:text-white border border-[#232D42] flex items-center justify-center transition-colors shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Action quick bar */}
            <div className="p-3 bg-[#080B11] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-2.5 border-b border-[#1C2436]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTeleconsultation(patient);
                  setActiveEHRDrawer(null);
                }}
                className="flex-1 min-w-[140px] py-2 px-3 bg-[#D4FF00] hover:bg-[#CCFF00] text-black text-xs font-bold rounded-full flex items-center justify-center gap-1.5 shadow-lime-sm transition-all"
              >
                <Activity className="w-4 h-4 stroke-[2.5]" /> Start Video Exam
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveRxModal(patient);
                }}
                className="flex-1 min-w-[140px] py-2 px-3 bg-[#181F2E] hover:bg-[#232D42] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 border border-[#232D42] transition-all"
              >
                <Pill className="w-4 h-4 text-[#D4FF00]" /> New Prescription
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => showToast("Exporting comprehensive EHR summary PDF...")}
                className="p-2 bg-[#181F2E] hover:bg-[#232D42] text-[#8E99A8] hover:text-[#D4FF00] rounded-full border border-[#232D42] transition-colors"
                title="Download Summary"
              >
                <Download className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Vitals Snapshot */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E99A8] mb-3 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#FF6384] stroke-[2.5]" /> Latest Measured Vitals (Recorded Today)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3.5 rounded-2xl bg-[#121722] border border-[#1C2436]"
                  >
                    <div className="text-[10px] font-bold text-[#8E99A8]">BLOOD PRESSURE</div>
                    <div className="text-base font-bold text-white mt-1">124/82</div>
                    <span className="text-[10px] text-[#D4FF00] font-mono">Optimal Range</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3.5 rounded-2xl bg-[#121722] border border-[#1C2436]"
                  >
                    <div className="text-[10px] font-bold text-[#8E99A8]">PULSE RATE</div>
                    <div className="text-base font-bold text-white mt-1">72 BPM</div>
                    <span className="text-[10px] text-[#D4FF00] font-mono">Normal Sinus</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3.5 rounded-2xl bg-[#121722] border border-[#1C2436]"
                  >
                    <div className="text-[10px] font-bold text-[#8E99A8]">FASTING GLUCOSE</div>
                    <div className="text-base font-bold text-white mt-1">102 mg/dL</div>
                    <span className="text-[10px] text-[#38BDF8] font-mono">Pre-prandial</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3.5 rounded-2xl bg-[#121722] border border-[#1C2436]"
                  >
                    <div className="text-[10px] font-bold text-[#8E99A8]">BODY TEMP</div>
                    <div className="text-base font-bold text-white mt-1">98.4 °F</div>
                    <span className="text-[10px] text-[#D4FF00] font-mono">Afebrile</span>
                  </motion.div>
                </div>
              </div>

              {/* Allergy & Pre-existing Warning */}
              <div className="p-4 rounded-2xl bg-[#2A1820] border border-[#FF6384]/40 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#FF6384] shrink-0 mt-0.5 stroke-[2.5]" />
                <div>
                  <h4 className="text-xs font-bold text-white">Clinical Alerts & Allergies</h4>
                  <p className="text-xs text-[#FF6384] mt-1">
                    <strong>Severe Allergy:</strong> Penicillin (Anaphylaxis risk). Avoid Cephalosporins cross-reactivity.
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    <strong>Diagnosis:</strong> Type 2 Diabetes Mellitus (E11.9), Primary Hypertension (I10).
                  </p>
                </div>
              </div>

              {/* Active Medication Regimen */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E99A8] flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-[#D4FF00]" /> Active Prescribed Medications
                  </h3>
                  <button
                    onClick={() => setActiveRxModal(patient)}
                    className="text-xs text-[#D4FF00] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3 h-3 stroke-[2.5]" /> Add Drug
                  </button>
                </div>

                <div className="space-y-2">
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="p-3.5 rounded-2xl bg-[#121722] border border-[#1C2436] flex justify-between items-center transition-colors hover:border-[#D4FF00]/40"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Metformin HCl 500mg Extended Release</div>
                      <div className="text-[11px] text-[#8E99A8] mt-0.5">Oral Tablet • 1 tablet BID with morning and evening meals</div>
                    </div>
                    <span className="text-[10px] bg-[#D4FF00]/15 border border-[#D4FF00]/30 text-[#D4FF00] px-2.5 py-0.5 rounded-full font-mono font-bold">
                      Refills: 2 left
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 3 }}
                    className="p-3.5 rounded-2xl bg-[#121722] border border-[#1C2436] flex justify-between items-center transition-colors hover:border-[#D4FF00]/40"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Lisinopril 10mg</div>
                      <div className="text-[11px] text-[#8E99A8] mt-0.5">Oral Tablet • Once daily in the morning</div>
                    </div>
                    <span className="text-[10px] bg-[#D4FF00]/15 border border-[#D4FF00]/30 text-[#D4FF00] px-2.5 py-0.5 rounded-full font-mono font-bold">
                      Refills: 3 left
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Consultation History */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E99A8] mb-3 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#B5A7FE]" /> Recent Clinical Encounters
                </h3>
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="p-4 rounded-2xl bg-[#121722] border border-[#1C2436] hover:border-[#D4FF00]/50 transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Telehealth Follow-up • Dr. Ramesh Varma</span>
                      <span className="text-[#8E99A8] font-mono text-[11px]">14 Days Ago</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Routine glycemic review. HbA1c improved to 7.1%. Tolerating low-carb nutrition plan. Encouraged 30min daily aerobic walking.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 3 }}
                    className="p-4 rounded-2xl bg-[#121722] border border-[#1C2436] hover:border-[#D4FF00]/50 transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Comprehensive Physical Exam • Main Clinic</span>
                      <span className="text-[#8E99A8] font-mono text-[11px]">3 Months Ago</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Annual wellness evaluation. Fundoscopic exam normal. Pedal pulses intact bilaterally. Lipid panel ordered.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EHRDrawer;
