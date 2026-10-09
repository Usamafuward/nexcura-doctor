import { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Video,
  Search,
  Filter,
  Plus,
  Building2,
  CheckCircle2,
  MoreVertical,
  AlertCircle,
  Phone,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Pagination } from "@/components/common/Pagination";

const Appointments = () => {
  const {
    setActiveTeleconsultation,
    setActiveEHRDrawer,
    setNewAppointmentModalOpen,
    showToast,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'today', 'video', 'in-person'
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [appointmentsList, setAppointmentsList] = useState([
    {
      id: "APT-101",
      patientName: "Kamalesh Patel",
      date: "08 Oct 2026",
      time: "03:00 PM",
      duration: "30 mins",
      type: "Video Call",
      specialty: "Diabetes & Endocrinology",
      status: "Confirmed",
      patientId: "#MED-9042",
      phone: "+1 (555) 234-8901",
    },
    {
      id: "APT-102",
      patientName: "Alice Brown",
      date: "08 Oct 2026",
      time: "03:30 PM",
      duration: "30 mins",
      type: "In-Person",
      specialty: "Cardiology Suite 4B",
      status: "Checked In",
      patientId: "#MED-8021",
      phone: "+1 (555) 345-6789",
    },
    {
      id: "APT-103",
      patientName: "David Chen",
      date: "08 Oct 2026",
      time: "04:00 PM",
      duration: "45 mins",
      type: "Video Call",
      specialty: "Post-PCI Stent Review",
      status: "Confirmed",
      patientId: "#MED-7019",
      phone: "+1 (555) 456-7890",
    },
    {
      id: "APT-104",
      patientName: "Sarah Jenkins",
      date: "08 Oct 2026",
      time: "04:30 PM",
      duration: "30 mins",
      type: "In-Person",
      specialty: "Neurology Evaluation",
      status: "Pending",
      patientId: "#MED-6520",
      phone: "+1 (555) 567-8901",
    },
    {
      id: "APT-105",
      patientName: "Robert Fox",
      date: "09 Oct 2026",
      time: "10:00 AM",
      duration: "30 mins",
      type: "In-Person",
      specialty: "Angina & ECG Stress Test",
      status: "Confirmed",
      patientId: "#MED-5411",
      phone: "+1 (555) 678-9012",
    },
    {
      id: "APT-106",
      patientName: "Elena Rostova",
      date: "09 Oct 2026",
      time: "11:30 AM",
      duration: "30 mins",
      type: "Video Call",
      specialty: "Endocrine Lab Results",
      status: "Confirmed",
      patientId: "#MED-4318",
      phone: "+1 (555) 789-0123",
    },
    {
      id: "APT-107",
      patientName: "Marcus Sterling",
      date: "09 Oct 2026",
      time: "01:15 PM",
      duration: "45 mins",
      type: "In-Person",
      specialty: "Hypertrophic Cardiomyopathy",
      status: "Checked In",
      patientId: "#MED-3891",
      phone: "+1 (555) 890-1234",
    },
    {
      id: "APT-108",
      patientName: "Sophia Martinez",
      date: "09 Oct 2026",
      time: "02:00 PM",
      duration: "30 mins",
      type: "Video Call",
      specialty: "Hypertension Titration",
      status: "Confirmed",
      patientId: "#MED-2764",
      phone: "+1 (555) 901-2345",
    },
    {
      id: "APT-109",
      patientName: "Liam Vance",
      date: "10 Oct 2026",
      time: "09:30 AM",
      duration: "30 mins",
      type: "In-Person",
      specialty: "Atrial Fibrillation Follow-up",
      status: "Pending",
      patientId: "#MED-1829",
      phone: "+1 (555) 012-3456",
    },
    {
      id: "APT-110",
      patientName: "Grace Harper",
      date: "10 Oct 2026",
      time: "11:00 AM",
      duration: "30 mins",
      type: "Video Call",
      specialty: "Preventative Lipid Profile",
      status: "Confirmed",
      patientId: "#MED-9943",
      phone: "+1 (555) 123-7890",
    },
    {
      id: "APT-111",
      patientName: "Noah Henderson",
      date: "10 Oct 2026",
      time: "02:30 PM",
      duration: "45 mins",
      type: "In-Person",
      specialty: "Post-Infarct Cardiac Rehab",
      status: "Confirmed",
      patientId: "#MED-8812",
      phone: "+1 (555) 234-5671",
    },
    {
      id: "APT-112",
      patientName: "Aaliyah Brooks",
      date: "10 Oct 2026",
      time: "03:45 PM",
      duration: "30 mins",
      type: "Video Call",
      specialty: "Heart Failure Remote Vitals",
      status: "Confirmed",
      patientId: "#MED-7734",
      phone: "+1 (555) 345-6712",
    },
  ]);

  // Reset to first page when search or filter criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const filteredAppointments = appointmentsList.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === "today") return apt.date.includes("08 Oct");
    if (activeFilter === "video") return apt.type === "Video Call";
    if (activeFilter === "in-person") return apt.type === "In-Person";
    return true;
  });

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE));
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCancelApt = (id, patient) => {
    setAppointmentsList((prev) => prev.filter((a) => a.id !== id));
    showToast(`Appointment ${id} for ${patient} cancelled.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Appointment Management & Scheduling
          </h1>
          <p className="text-xs text-[#8E99A8] mt-1">
            Real-time calendar coordination, patient triage queue, and tele-room launcher
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setNewAppointmentModalOpen(true)}
          className="px-4 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs shadow-lime-sm flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Book New Appointment</span>
        </motion.button>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-3 sm:p-4 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-xl hover:border-[#D4FF00]/40 transition-colors"
        >
          <div className="text-xs text-[#8E99A8]">Today&apos;s Schedule</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#D4FF00] mt-1">4</div>
          <div className="text-[10px] text-slate-400 mt-0.5">2 Video • 2 In-Clinic</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-3 sm:p-4 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-xl hover:border-white/40 transition-colors"
        >
          <div className="text-xs text-[#8E99A8]">Tomorrow</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">2</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">100% Slot capacity</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-3 sm:p-4 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-xl hover:border-[#38BDF8]/40 transition-colors"
        >
          <div className="text-xs text-[#8E99A8]">Virtual Tele-visits</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#38BDF8] mt-1">68%</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Automated SMS links sent</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-3 sm:p-4 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-xl hover:border-emerald-400/40 transition-colors"
        >
          <div className="text-xs text-[#8E99A8]">Show-up Rate</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">98.2%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Low cancellation rate</div>
        </motion.div>
      </div>

      {/* Main Appointments Card */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          {/* Filter Pills with sliding layout indicator */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 bg-[#0D111A] p-1 rounded-full border border-[#1C2436] relative max-w-full overflow-x-auto">
            {[
              { id: "all", label: "All Appointments" },
              { id: "today", label: "Today (Oct 8)" },
              { id: "video", label: "Video Calls" },
              { id: "in-person", label: "In-Person Clinic" },
            ].map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors z-10 block"
                >
                  {isActive && (
                    <motion.div
                      layoutId="appointments-filter-pill"
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

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by patient, specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#0D111A] border border-[#1C2436] text-xs focus:outline-none focus:border-[#D4FF00] text-white placeholder-[#8E99A8]"
            />
          </div>
        </div>

        {/* Appointment Grid / Cards */}
        <div className="space-y-3">
          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center text-[#8E99A8] text-xs">
              No matching appointments found.
            </div>
          ) : (
            paginatedAppointments.map((apt) => (
              <motion.div
                key={apt.id}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] hover:border-[#D4FF00]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#181F2E] border border-[#232D42] text-[#D4FF00] flex items-center justify-center font-bold text-sm shadow-md">
                    {apt.patientName.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-sm text-white group-hover:text-[#D4FF00] transition-colors">
                        {apt.patientName}
                      </h3>
                      <span className="text-[10px] font-mono bg-[#181F2E] text-slate-400 px-2 py-0.5 rounded-full border border-[#232D42]">
                        {apt.patientId}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                          apt.status === "Confirmed"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : apt.status === "Checked In"
                            ? "bg-[#D4FF00]/20 text-[#D4FF00] border border-[#D4FF00]/40"
                            : "bg-amber-950 text-amber-300 border border-amber-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8E99A8] mt-1 font-mono">
                      <span className="font-medium text-slate-200 font-sans">
                        {apt.specialty}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#D4FF00]" />
                        {apt.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                        {apt.time} ({apt.duration})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2.5 self-start sm:self-end md:self-center flex-wrap">
                  {apt.type === "Video Call" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setActiveTeleconsultation({
                          patientName: apt.patientName,
                          age: 32,
                          problem: apt.specialty,
                        })
                      }
                      className="px-4 py-2 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs shadow-lime-sm flex items-center gap-1.5 transition-all"
                    >
                      <Video className="w-4 h-4 stroke-[2.5]" />
                      <span>Launch Video</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setActiveEHRDrawer({
                          name: apt.patientName,
                          age: 45,
                          problem: apt.specialty,
                        })
                      }
                      className="px-4 py-2 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-white border border-[#232D42] font-semibold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <Building2 className="w-4 h-4 text-[#D4FF00]" />
                      <span>Check-In</span>
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setActiveEHRDrawer({
                        name: apt.patientName,
                        age: 40,
                        problem: apt.specialty,
                      })
                    }
                    className="p-2 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#8E99A8] hover:text-white border border-[#232D42] transition-colors"
                    title="View Patient Chart"
                  >
                    <FileText className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCancelApt(apt.id, apt.patientName)}
                    className="p-2 rounded-full bg-[#181F2E] hover:bg-rose-950/40 text-[#8E99A8] hover:text-rose-400 border border-[#232D42] transition-colors"
                    title="Cancel Appointment"
                  >
                    <AlertCircle className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAppointments.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
          itemName="appointments"
        />
      </div>
    </motion.div>
  );
};

export default Appointments;
