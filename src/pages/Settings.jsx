import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Video,
  ShieldCheck,
  CreditCard,
  Sliders,
  Moon,
  Sun,
  Check,
  Sparkles,
  Save,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import doctor from "../assets/doctor.png";

const Settings = () => {
  const { isDarkMode, toggleDarkMode, showToast } = useApp();

  const [activeTab, setActiveTab] = useState("profile"); // 'profile', 'telehealth', 'clinic', 'billing', 'security'

  // Profile form state
  const [profile, setProfile] = useState({
    name: "Dr. Ramesh Varma",
    title: "Chief of Cardiology & Internal Medicine",
    license: "MD-77821-NY",
    npi: "1892049102",
    dea: "BV7892341",
    hospital: "Metropolitan Academic Medical Center",
    email: "dr.ramesh@nexcura.health",
    phone: "+1 (555) 019-2834",
  });

  // Telehealth state
  const [telehealth, setTelehealth] = useState({
    autoRecord: true,
    aiScribe: true,
    ambientListening: true,
    videoQuality: "1080p Full HD",
    audioDevice: "Default - Studio Array Mic (Realtek HD)",
  });

  // Clinic scheduling
  const [schedule, setSchedule] = useState({
    slotDuration: "30",
    bufferTime: "5",
    maxPatientsPerShift: "18",
    autoConfirmTelehealth: true,
  });

  // Fees
  const [fees, setFees] = useState({
    inPerson: "150.00",
    telehealth: "120.00",
    emergency: "250.00",
    currency: "USD ($)",
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast("Physician Profile & Medical Credentials saved!");
  };

  const handleSaveTelehealth = (e) => {
    e.preventDefault();
    showToast("Telehealth & Bio-Telemetry configurations updated!");
  };

  const handleSaveSchedule = (e) => {
    e.preventDefault();
    showToast("Clinical Schedule & Slot Rules saved!");
  };

  const handleSaveFees = (e) => {
    e.preventDefault();
    showToast("Fee Schedule updated & synced to billing engine!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Physician Settings & Clinical System Controls
        </h1>
        <p className="text-xs text-[#8E99A8] mt-1">
          Configure physician credentials, telemedicine room parameters, slot intervals, billing rates, and HIPAA compliance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-2 sm:p-5 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-xl flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible relative max-w-full">
            {[
              { id: "profile", label: "Physician Profile & NPI", icon: <User className="w-4 h-4" /> },
              { id: "telehealth", label: "Telemedicine & AI Scribe", icon: <Video className="w-4 h-4" /> },
              { id: "clinic", label: "Clinic Slots & Scheduling", icon: <Sliders className="w-4 h-4" /> },
              { id: "billing", label: "Consultation Fee Matrix", icon: <CreditCard className="w-4 h-4" /> },
              { id: "security", label: "HIPAA Security & 2FA", icon: <Lock className="w-4 h-4" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative shrink-0 lg:w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:p-3.5 rounded-2xl text-xs font-semibold transition-colors z-10 text-left whitespace-nowrap lg:whitespace-normal"
                >
                  {isActive && (
                    <motion.div
                      layoutId="settings-active-tab-bg"
                      className="absolute inset-0 bg-[#D4FF00] rounded-2xl shadow-lime-sm -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className={isActive ? "text-black" : "text-[#8E99A8]"}>
                    {tab.icon}
                  </span>
                  <span className={isActive ? "text-black font-bold" : "text-[#8E99A8] hover:text-white"}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Doctor Summary Card in Sidebar (hidden on mobile to prioritize form) */}
          <div className="hidden lg:block p-5 rounded-3xl bg-[#121722] border border-[#1C2436] text-xs text-[#8E99A8] space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#D4FF00]" /> Active Verification
            </div>
            <p className="text-[11px] leading-relaxed">
              Provider credentials linked with National Plan & Provider Enumeration System (NPPES).
            </p>
            <div className="pt-1 flex items-center justify-between font-mono text-[10px] text-[#D4FF00]">
              <span>Status: ACTIVE MD</span>
              <span className="text-[#8E99A8]">SHA-256</span>
            </div>
          </div>
        </div>

        {/* Tab Content (8 cols) */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {/* Tab 1: Profile */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl space-y-6"
              >
                <div className="flex items-center gap-4 pb-4 border-b border-[#1C2436]">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#D4FF00] shadow-lime-sm">
                    <img src={doctor} alt="Dr. Ramesh" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-[#D4FF00] font-medium mt-0.5">
                      {profile.title}
                    </p>
                    <p className="text-[11px] text-[#8E99A8] font-mono mt-0.5">
                      NPI: {profile.npi} • License: {profile.license}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        Clinical Specialty
                      </label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        NPI Number
                      </label>
                      <input
                        type="text"
                        value={profile.npi}
                        onChange={(e) => setProfile({ ...profile, npi: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white font-mono focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        State License ID
                      </label>
                      <input
                        type="text"
                        value={profile.license}
                        onChange={(e) => setProfile({ ...profile, license: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white font-mono focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        DEA Registration
                      </label>
                      <input
                        type="text"
                        value={profile.dea}
                        onChange={(e) => setProfile({ ...profile, dea: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white font-mono focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                      Hospital Affiliation
                    </label>
                    <input
                      type="text"
                      value={profile.hospital}
                      onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white focus:outline-none focus:border-[#D4FF00]"
                    />
                  </div>

                  <div className="flex justify-end pt-3">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-2 shadow-lime-sm transition-all"
                    >
                      <Save className="w-4 h-4 stroke-[2.5]" /> Save Credentials
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Tab 2: Telehealth */}
            {activeTab === "telehealth" && (
              <motion.div
                key="telehealth"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl space-y-6"
              >
                <div className="pb-4 border-b border-[#1C2436]">
                  <h3 className="font-bold text-base text-white">
                    Telehealth & Ambient AI Scribe Setup
                  </h3>
                  <p className="text-xs text-[#8E99A8] mt-1">
                    Configure streaming codecs, real-time SOAP note generators, and microphone telemetry
                  </p>
                </div>

                <form onSubmit={handleSaveTelehealth} className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">
                        AI Ambient Consultation Scribe
                      </div>
                      <div className="text-[#8E99A8] text-[11px] mt-0.5">
                        Automatically transcribe and structure audio dialogue into clinical SOAP format.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={telehealth.aiScribe}
                      onChange={(e) => setTelehealth({ ...telehealth, aiScribe: e.target.checked })}
                      className="w-5 h-5 accent-[#D4FF00] cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">
                        Automated Drug Interaction Interceptor
                      </div>
                      <div className="text-[#8E99A8] text-[11px] mt-0.5">
                        Alert physician in real-time during virtual consultation if ordered medication conflicts with patient history.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={telehealth.ambientListening}
                      onChange={(e) => setTelehealth({ ...telehealth, ambientListening: e.target.checked })}
                      className="w-5 h-5 accent-[#D4FF00] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                      Telehealth Video Resolution
                    </label>
                    <select
                      value={telehealth.videoQuality}
                      onChange={(e) => setTelehealth({ ...telehealth, videoQuality: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white focus:outline-none focus:border-[#D4FF00]"
                    >
                      <option className="bg-[#121722] text-white">1080p Full HD (Adaptive Bitrate)</option>
                      <option className="bg-[#121722] text-white">720p HD (Low Latency)</option>
                      <option className="bg-[#121722] text-white">4K Ultra HD (High Bandwidth)</option>
                    </select>
                  </div>

                  <div className="flex justify-end pt-3">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-2 shadow-lime-sm transition-all"
                    >
                      <Save className="w-4 h-4 stroke-[2.5]" /> Save Telehealth Rules
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Tab 3: Clinic Slots */}
            {activeTab === "clinic" && (
              <motion.div
                key="clinic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl space-y-6"
              >
                <div className="pb-4 border-b border-[#1C2436]">
                  <h3 className="font-bold text-base text-white">
                    Clinic Slots & Scheduling Intervals
                  </h3>
                  <p className="text-xs text-[#8E99A8] mt-1">
                    Customize appointment slot granularity and shift limits
                  </p>
                </div>

                <form onSubmit={handleSaveSchedule} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        Default Slot Duration (Minutes)
                      </label>
                      <select
                        value={schedule.slotDuration}
                        onChange={(e) => setSchedule({ ...schedule, slotDuration: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white focus:outline-none focus:border-[#D4FF00]"
                      >
                        <option className="bg-[#121722] text-white" value="15">15 Minutes (Express / Follow-up)</option>
                        <option className="bg-[#121722] text-white" value="30">30 Minutes (Standard Consultation)</option>
                        <option className="bg-[#121722] text-white" value="45">45 Minutes (Comprehensive Cardiac Exam)</option>
                        <option className="bg-[#121722] text-white" value="60">60 Minutes (New Patient Intake)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        Buffer Interval Between Appointments
                      </label>
                      <select
                        value={schedule.bufferTime}
                        onChange={(e) => setSchedule({ ...schedule, bufferTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white focus:outline-none focus:border-[#D4FF00]"
                      >
                        <option className="bg-[#121722] text-white" value="0">0 mins (Back-to-back)</option>
                        <option className="bg-[#121722] text-white" value="5">5 mins (Recommended for notes)</option>
                        <option className="bg-[#121722] text-white" value="10">10 mins (Decompression buffer)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-2 shadow-lime-sm transition-all"
                    >
                      <Save className="w-4 h-4 stroke-[2.5]" /> Save Schedule Rules
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Tab 4: Billing Matrix */}
            {activeTab === "billing" && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl space-y-6"
              >
                <div className="pb-4 border-b border-[#1C2436]">
                  <h3 className="font-bold text-base text-white">
                    Consultation Fee Matrix & Insurance Modifiers
                  </h3>
                  <p className="text-xs text-[#8E99A8] mt-1">
                    Set baseline fees for clinical encounters and virtual visits
                  </p>
                </div>

                <form onSubmit={handleSaveFees} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        In-Person Physical Visit ($)
                      </label>
                      <input
                        type="text"
                        value={fees.inPerson}
                        onChange={(e) => setFees({ ...fees, inPerson: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white font-mono focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        Virtual Telehealth Visit ($)
                      </label>
                      <input
                        type="text"
                        value={fees.telehealth}
                        onChange={(e) => setFees({ ...fees, telehealth: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white font-mono focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E99A8] mb-1.5">
                        Emergency Triage Review ($)
                      </label>
                      <input
                        type="text"
                        value={fees.emergency}
                        onChange={(e) => setFees({ ...fees, emergency: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D111A] border border-[#1C2436] text-white font-mono focus:outline-none focus:border-[#D4FF00]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-2 shadow-lime-sm transition-all"
                    >
                      <Save className="w-4 h-4 stroke-[2.5]" /> Save Fee Matrix
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Tab 5: Security */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl space-y-6"
              >
                <div className="flex items-center gap-3 text-[#D4FF00] pb-4 border-b border-[#1C2436]">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                  <div>
                    <h3 className="font-bold text-base text-white">
                      HIPAA Compliance & Cryptographic Safeguards
                    </h3>
                    <p className="text-xs text-[#8E99A8] mt-0.5">
                      256-bit AES encryption active across all medical telemetry & database transmissions
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">
                        Two-Factor Authentication (2FA / Biometric Passkey)
                      </div>
                      <div className="text-[11px] text-[#8E99A8] mt-0.5">
                        Enforce hardware security key or authenticator app code for each clinical login.
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/15 border border-[#D4FF00]/30 px-3 py-1 rounded-full">
                      Enabled
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">
                        EHR Audit Trail Logging
                      </div>
                      <div className="text-[11px] text-[#8E99A8] mt-0.5">
                        Immutable record access logging with timestamp and workstation IP.
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#D4FF00] bg-[#D4FF00]/15 border border-[#D4FF00]/30 px-3 py-1 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">
                        Automatic Idle Session Lockout
                      </div>
                      <div className="text-[11px] text-[#8E99A8] mt-0.5">
                        Lock physician screen after 15 minutes of inactivity.
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#38BDF8] bg-[#38BDF8]/15 border border-[#38BDF8]/30 px-3 py-1 rounded-full">
                      15 mins
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;