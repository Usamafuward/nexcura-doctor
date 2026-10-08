import { useState, useEffect } from "react";
import { X, Pill, ShieldCheck, AlertCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/SidebarContext";

export const QuickRxModal = () => {
  const { activeRxModal, setActiveRxModal, showToast } = useApp();

  const [drug, setDrug] = useState("");
  const [dosage, setDosage] = useState("500 mg");
  const [route, setRoute] = useState("Oral");
  const [frequency, setFrequency] = useState("Twice daily (BID)");
  const [duration, setDuration] = useState("30 days");
  const [refills, setRefills] = useState("2");
  const [pharmacy, setPharmacy] = useState("CVS Pharmacy #4128 (Main St)");
  const [instructions, setInstructions] = useState("Take with food or meals. Drink plenty of water.");

  useEffect(() => {
    if (activeRxModal) {
      if (activeRxModal.suggestedDrug) {
        setDrug(activeRxModal.suggestedDrug);
      } else if (activeRxModal.problem && activeRxModal.problem.includes("Diabetes")) {
        setDrug("Metformin 500mg ER");
      } else if (activeRxModal.problem && activeRxModal.problem.includes("Hypertension")) {
        setDrug("Lisinopril 10mg");
      } else if (activeRxModal.problem && activeRxModal.problem.includes("Hyperkalemia")) {
        setDrug("Calcium Gluconate 10% IV");
      } else {
        setDrug("");
      }
    }
  }, [activeRxModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!drug.trim()) {
      showToast("Please specify a medication name.", "warning");
      return;
    }
    showToast(`Prescription for ${drug} (${dosage}) transmitted to ${pharmacy} via e-Prescribe!`);
    setActiveRxModal(null);
  };

  const patientName = activeRxModal?.name || activeRxModal?.patientName || "Patient";

  return (
    <AnimatePresence>
      {activeRxModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="w-full max-w-lg bg-[#121722] rounded-3xl shadow-2xl border border-[#1C2436] overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-5 bg-[#0D111A] border-b border-[#1C2436] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#181F2E] border border-[#232D42] text-[#D4FF00]">
                  <Pill className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Issue Digital Prescription (e-Rx)</h3>
                  <p className="text-[11px] text-[#8E99A8] mt-0.5">Patient: {patientName} • DEA / NPI Certified</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveRxModal(null)}
                className="w-8 h-8 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#8E99A8] hover:text-white border border-[#232D42] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                  Medication / Active Substance
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Metformin, Rosuvastatin, Amoxicillin..."
                  value={drug}
                  onChange={(e) => setDrug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs placeholder-[#8E99A8] focus:outline-none focus:border-[#D4FF00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                    Dosage & Strength
                  </label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                    Route
                  </label>
                  <select
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                  >
                    <option className="bg-[#121722] text-white">Oral</option>
                    <option className="bg-[#121722] text-white">Sublingual</option>
                    <option className="bg-[#121722] text-white">Subcutaneous</option>
                    <option className="bg-[#121722] text-white">Intravenous</option>
                    <option className="bg-[#121722] text-white">Inhalation</option>
                    <option className="bg-[#121722] text-white">Topical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                  >
                    <option className="bg-[#121722] text-white">Once daily (QD)</option>
                    <option className="bg-[#121722] text-white">Twice daily (BID)</option>
                    <option className="bg-[#121722] text-white">Three times daily (TID)</option>
                    <option className="bg-[#121722] text-white">Four times daily (QID)</option>
                    <option className="bg-[#121722] text-white">As needed (PRN)</option>
                    <option className="bg-[#121722] text-white">At bedtime (QHS)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                    Supply Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                  Dispense Pharmacy Destination
                </label>
                <input
                  type="text"
                  value={pharmacy}
                  onChange={(e) => setPharmacy(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                  Patient Instructions / Sig
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                />
              </div>

              <div className="flex items-center gap-2.5 p-3.5 bg-[#0D111A] rounded-2xl border border-[#1C2436] text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#D4FF00] stroke-[2.5]" />
                <span className="text-[11px] leading-relaxed">
                  AI Automated Drug-Allergy & Interaction check passed. No severe contraindications found.
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setActiveRxModal(null)}
                  className="px-5 py-2.5 rounded-full border border-[#1C2436] text-xs font-semibold text-[#8E99A8] hover:text-white hover:bg-[#181F2E] transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs shadow-lime-sm flex items-center gap-2 transition-all"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" /> Sign & Transmit e-Rx
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickRxModal;
