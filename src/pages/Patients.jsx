import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  User,
  Heart,
  Activity,
  AlertTriangle,
  Pill,
  FileText,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  Video
} from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/SidebarContext";

const Patients = () => {
  const { setActiveEHRDrawer, setActiveRxModal, setActiveTeleconsultation, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCohort, setFilterCohort] = useState("all"); // 'all', 'high-risk', 'diabetes', 'cardio'

  const [patients, setPatients] = useState([
    {
      id: "P001",
      name: "Alice Brown",
      age: 45,
      gender: "Female",
      bloodGroup: "A+",
      contact: "+1 234-567-8901",
      lastVisit: "05 Oct 2026",
      condition: "Hypertension Stage 2",
      risk: "high",
      status: "Active",
      allergies: ["Penicillin", "Sulfa"],
      medications: 3,
    },
    {
      id: "P002",
      name: "Bob Wilson",
      age: 32,
      gender: "Male",
      bloodGroup: "O+",
      contact: "+1 234-567-8902",
      lastVisit: "03 Oct 2026",
      condition: "Type 2 Diabetes Mellitus",
      risk: "medium",
      status: "Active",
      allergies: ["None known"],
      medications: 2,
    },
    {
      id: "P003",
      name: "Kamalesh Patel",
      age: 32,
      gender: "Male",
      bloodGroup: "B+",
      contact: "+1 234-567-8903",
      lastVisit: "Today (Queued)",
      condition: "Diabetes & Glycemic Instability",
      risk: "high",
      status: "Active",
      allergies: ["Penicillin"],
      medications: 2,
    },
    {
      id: "P004",
      name: "David Chen",
      age: 58,
      gender: "Male",
      bloodGroup: "AB+",
      contact: "+1 234-567-8904",
      lastVisit: "28 Sep 2026",
      condition: "Coronary Artery Disease (Stent)",
      risk: "high",
      status: "Active",
      allergies: ["Aspirin sensitivity"],
      medications: 4,
    },
    {
      id: "P005",
      name: "Emma Davis",
      age: 29,
      gender: "Female",
      bloodGroup: "O-",
      contact: "+1 234-567-8905",
      lastVisit: "15 Sep 2026",
      condition: "Hypothyroidism & Fatigue",
      risk: "low",
      status: "Active",
      allergies: ["None known"],
      medications: 1,
    },
    {
      id: "P006",
      name: "Robert Fox",
      age: 64,
      gender: "Male",
      bloodGroup: "A-",
      contact: "+1 234-567-8906",
      lastVisit: "Today (Prioritized)",
      condition: "Angina Pectoris / Chest Tightness",
      risk: "critical",
      status: "Active",
      allergies: ["Iodine Contrast"],
      medications: 5,
    },
  ]);

  const filteredPatients = patients.filter((pt) => {
    const matchesSearch =
      pt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.contact.includes(searchQuery);

    if (!matchesSearch) return false;
    if (filterCohort === "high-risk") return pt.risk === "high" || pt.risk === "critical";
    if (filterCohort === "diabetes") return pt.condition.toLowerCase().includes("diabetes");
    if (filterCohort === "cardio")
      return pt.condition.toLowerCase().includes("hypertension") || pt.condition.toLowerCase().includes("artery") || pt.condition.toLowerCase().includes("angina");
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Electronic Health Records (EHR) & Patient Roster
          </h1>
          <p className="text-xs text-[#8E99A8] mt-1">
            Centralized clinical history, allergy safeguards, active pharmacotherapy, and longitudinal vitals
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => showToast("New Patient Registration form opened.")}
          className="px-4 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs shadow-lime-sm flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Register New Patient</span>
        </motion.button>
      </div>

      {/* Cohort Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-4 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-xl hover:border-[#D4FF00]/40 transition-colors"
        >
          <div className="text-xs text-[#8E99A8]">Total Enrolled Patients</div>
          <div className="text-2xl font-bold font-mono text-[#D4FF00] mt-1">1,248</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">+34 new this month</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-4 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-xl hover:border-[#FF6384]/40 transition-colors"
        >
          <div className="text-xs text-[#8E99A8]">High-Risk / Telemetry Cohort</div>
          <div className="text-2xl font-bold font-mono text-[#FF6384] mt-1">42</div>
          <div className="text-[10px] text-rose-400 mt-0.5">Continuous bio-monitoring</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-4 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-xl hover:border-amber-400/40 transition-colors"
        >
          <div className="text-xs text-[#8E99A8]">Chronic Care Management</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">318</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Diabetic & Hypertensive</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-4 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-xl hover:border-[#38BDF8]/40 transition-colors"
        >
          <div className="text-xs text-[#8E99A8]">Telehealth Compliance</div>
          <div className="text-2xl font-bold font-mono text-[#38BDF8] mt-1">94.6%</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Active remote check-ins</div>
        </motion.div>
      </div>

      {/* Main Patient Directory Card */}
      <div className="p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl">
        {/* Search & Cohort Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-1.5 bg-[#0D111A] p-1 rounded-full border border-[#1C2436] relative">
            {[
              { id: "all", label: "All Patients" },
              { id: "high-risk", label: "High Risk / Critical" },
              { id: "cardio", label: "Cardiovascular" },
              { id: "diabetes", label: "Diabetes Mellitus" },
            ].map((f) => {
              const isActive = filterCohort === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilterCohort(f.id)}
                  className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors z-10 block"
                >
                  {isActive && (
                    <motion.div
                      layoutId="patient-cohort-pill"
                      className="absolute inset-0 bg-[#D4FF00] rounded-full shadow-lime-sm -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? "text-black font-bold" : "text-[#8E99A8] hover:text-white"}>
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, ID, diagnosis, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#0D111A] border border-[#1C2436] text-xs focus:outline-none focus:border-[#D4FF00] text-white placeholder-[#8E99A8]"
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1C2436] text-[#8E99A8] text-[11px] uppercase font-mono">
                <th className="py-3 px-3">Patient & Demographics</th>
                <th className="py-3 px-3">Primary Diagnosis</th>
                <th className="py-3 px-3">Allergy Warnings</th>
                <th className="py-3 px-3">Contact & Last Visit</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3 text-right">EHR Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2436]/60">
              {filteredPatients.map((patient) => (
                <motion.tr
                  key={patient.id}
                  whileHover={{ backgroundColor: "rgba(24, 31, 46, 0.45)" }}
                  className="transition-colors group cursor-pointer"
                  onClick={() => setActiveEHRDrawer(patient)}
                >
                  {/* Name & MRN */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0D111A] border border-[#1C2436] group-hover:border-[#D4FF00]/50 text-[#D4FF00] flex items-center justify-center font-extrabold text-xs shadow-sm transition-colors">
                        {patient.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-[#D4FF00] transition-colors">
                          {patient.name}
                        </div>
                        <div className="text-[10px] text-[#8E99A8] font-mono">
                          {patient.id} • {patient.age}y, {patient.gender} • Blood {patient.bloodGroup}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Primary Diagnosis */}
                  <td className="py-3.5 px-3">
                    <div className="font-medium text-slate-200">
                      {patient.condition}
                    </div>
                    <div className="text-[10px] text-[#D4FF00] mt-0.5">
                      {patient.medications} Active Prescriptions
                    </div>
                  </td>

                  {/* Allergy Warnings */}
                  <td className="py-3.5 px-3">
                    {patient.allergies[0] === "None known" ? (
                      <span className="text-[10px] text-[#8E99A8] font-mono">No known allergies (NKDA)</span>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[#FF6384] font-medium">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                        <span className="text-[11px] font-semibold">{patient.allergies.join(", ")}</span>
                      </div>
                    )}
                  </td>

                  {/* Contact & Last Visit */}
                  <td className="py-3.5 px-3">
                    <div className="font-mono text-slate-300 text-[11px]">
                      {patient.contact}
                    </div>
                    <div className="text-[10px] text-[#8E99A8]">
                      Last visit: {patient.lastVisit}
                    </div>
                  </td>

                  {/* Risk Level */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                        patient.risk === "critical"
                          ? "bg-[#FF6384] text-black font-extrabold shadow-sm"
                          : patient.risk === "high"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      }`}
                    >
                      {patient.risk}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveTeleconsultation(patient)}
                        className="p-2 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#D4FF00] border border-[#232D42] transition-colors"
                        title="Start Telehealth Session"
                      >
                        <Video className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActiveRxModal(patient)}
                        className="p-2 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#38BDF8] border border-[#232D42] transition-colors"
                        title="Issue Prescription"
                      >
                        <Pill className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveEHRDrawer(patient)}
                        className="px-3.5 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-1 shadow-lime-sm transition-all"
                      >
                        <span>EHR Chart</span>
                        <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Patients;