import { useState } from "react";
import { X, Calendar, Clock, User, Video, MapPin, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/SidebarContext";

export const NewAppointmentModal = () => {
  const { isNewAppointmentModalOpen, setNewAppointmentModalOpen, showToast } = useApp();

  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("2026-10-09");
  const [time, setTime] = useState("10:30 AM");
  const [type, setType] = useState("Video Consultation");
  const [reason, setReason] = useState("");
  const [room, setRoom] = useState("Telehealth Room 02");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      showToast("Please provide the patient name.", "warning");
      return;
    }
    showToast(`Appointment booked for ${patientName} on ${date} at ${time}!`);
    setNewAppointmentModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isNewAppointmentModalOpen && (
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
                  <Calendar className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Schedule New Appointment</h3>
                  <p className="text-[11px] text-[#8E99A8] mt-0.5">Doctor Calendar Sync & Automated Reminder</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setNewAppointmentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#8E99A8] hover:text-white border border-[#232D42] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kamalesh Patel, Maria Garcia..."
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs placeholder-[#8E99A8] focus:outline-none focus:border-[#D4FF00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                    Consultation Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                  >
                    <option className="bg-[#121722] text-white">Video Consultation</option>
                    <option className="bg-[#121722] text-white">In-Person Physical Clinic</option>
                    <option className="bg-[#121722] text-white">Urgent Follow-up</option>
                    <option className="bg-[#121722] text-white">Cardiac Tele-monitoring</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                    Assigned Clinic / Room
                  </label>
                  <select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs focus:outline-none focus:border-[#D4FF00]"
                  >
                    <option className="bg-[#121722] text-white">Telehealth Room 02</option>
                    <option className="bg-[#121722] text-white">Physical Examination Suite 4B</option>
                    <option className="bg-[#121722] text-white">Cardiology Diagnostic Lab</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                  Chief Complaint / Clinical Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Follow-up regarding blood pressure stability, review ECG..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white text-xs placeholder-[#8E99A8] focus:outline-none focus:border-[#D4FF00]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setNewAppointmentModalOpen(false)}
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
                  <Check className="w-4 h-4 stroke-[2.5]" /> Confirm & Book Slot
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewAppointmentModal;
