import { useState } from "react";
import {
  FileText,
  Download,
  Search,
  Filter,
  Eye,
  Plus,
  CheckCircle2,
  FileCheck,
  Printer,
  X,
  ShieldCheck,
  Calendar,
  User,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/SidebarContext";

const Records = () => {
  const { showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all"); // 'all', 'lab', 'imaging', 'rx', 'discharge'
  const [previewRecord, setPreviewRecord] = useState(null);

  const [recordsList, setRecordsList] = useState([
    {
      id: "REC-901",
      patientName: "Kamalesh Patel",
      patientId: "#MED-9042",
      title: "Comprehensive Metabolic Panel & Glycated HbA1c",
      category: "lab",
      date: "08 Oct 2026",
      doctor: "Dr. Ramesh Varma, MD",
      size: "2.4 MB",
      status: "Verified",
      findings: "HbA1c: 7.1% (Improved). Fasting Glucose: 104 mg/dL. eGFR: 88 mL/min (Normal renal function).",
    },
    {
      id: "REC-902",
      patientName: "David Chen",
      patientId: "#MED-7019",
      title: "12-Lead Electrocardiogram (ECG) Report",
      category: "imaging",
      date: "07 Oct 2026",
      doctor: "Dr. Ramesh Varma, MD",
      size: "4.8 MB",
      status: "Verified",
      findings: "Normal Sinus Rhythm at 68 bpm. PR interval 160ms, QTc 415ms. No acute ST-elevation or ischemic changes.",
    },
    {
      id: "REC-903",
      patientName: "Alice Brown",
      patientId: "#MED-8021",
      title: "Echocardiogram 2D Doppler Study",
      category: "imaging",
      date: "05 Oct 2026",
      doctor: "Dr. Ramesh Varma, MD",
      size: "8.1 MB",
      status: "Verified",
      findings: "LVEF 60% preserved. Concentric left ventricular hypertrophy consistent with chronic Stage 2 HTN.",
    },
    {
      id: "REC-904",
      patientName: "Robert Fox",
      patientId: "#MED-5411",
      title: "High-Sensitivity Cardiac Troponin I (Serial 1 & 2)",
      category: "lab",
      date: "Today, 08 Oct 2026",
      doctor: "Dr. Ramesh Varma, MD",
      size: "1.2 MB",
      status: "Critical Flag",
      findings: "Initial: 0.04 ng/mL -> 2hr Serial: 1.80 ng/mL (Significantly Elevated). Immediate cardiology protocol initiated.",
    },
    {
      id: "REC-905",
      patientName: "Emma Davis",
      patientId: "#MED-8002",
      title: "Official Clinical Discharge Summary",
      category: "discharge",
      date: "01 Oct 2026",
      doctor: "Dr. Ramesh Varma, MD",
      size: "1.9 MB",
      status: "Archived",
      findings: "Post-operative follow-up day 7. Surgical incision clean and intact. Discharged in stable condition.",
    },
    {
      id: "REC-906",
      patientName: "Sarah Jenkins",
      patientId: "#MED-6520",
      title: "Brain MRI with & without Contrast",
      category: "imaging",
      date: "28 Sep 2026",
      doctor: "Dr. Ramesh Varma, MD",
      size: "18.5 MB",
      status: "Verified",
      findings: "No acute intracranial hemorrhage or mass effect. Mild microvascular white matter changes, consistent with migraine.",
    },
  ]);

  const filteredRecords = recordsList.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === "all") return true;
    return r.category === activeCategory;
  });

  const handleDownload = (record) => {
    showToast(`Downloading secure encrypted PDF for ${record.title}...`);
  };

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
            Diagnostic Records & Medical Documentation
          </h1>
          <p className="text-xs text-[#8E99A8] mt-1">
            Clinical pathology, cardiology waveforms, radiology imaging, and verified discharge orders
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => showToast("Diagnostic Document Upload Dialog opened.")}
          className="px-4 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs shadow-lime-sm flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Upload New Record</span>
        </motion.button>
      </div>

      {/* Main Records Container */}
      <div className="p-6 rounded-3xl bg-[#121722] border border-[#1C2436] shadow-2xl">
        {/* Controls: Search + Filter Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#1C2436]">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8E99A8] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by test name, patient, or record ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#0D111A] border border-[#1C2436] text-xs text-white placeholder-[#8E99A8] focus:outline-none focus:border-[#D4FF00]"
            />
          </div>

          {/* Filter Pills with sliding layout indicator */}
          <div className="flex items-center gap-1 overflow-x-auto bg-[#0D111A] p-1 rounded-full border border-[#1C2436] text-xs font-mono relative">
            {[
              { id: "all", label: "All Records" },
              { id: "lab", label: "Pathology (Lab)" },
              { id: "imaging", label: "Imaging & ECG" },
              { id: "discharge", label: "Discharge Orders" },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="relative px-3.5 py-1.5 rounded-full text-xs transition-colors z-10 block"
                >
                  {isActive && (
                    <motion.div
                      layoutId="records-cat-indicator"
                      className="absolute inset-0 bg-[#D4FF00] rounded-full shadow-lime-sm -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? "text-black font-bold" : "text-[#8E99A8] hover:text-white"}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Records List */}
        <div className="divide-y divide-[#1C2436]/60 mt-2">
          {filteredRecords.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8E99A8]">
              No clinical records found matching your query.
            </div>
          ) : (
            filteredRecords.map((record) => (
              <motion.div
                key={record.id}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-[#181F2E]/30 px-3 rounded-2xl transition-colors"
              >
                {/* Left Info */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0D111A] border border-[#1C2436] group-hover:border-[#D4FF00]/40 flex items-center justify-center shrink-0 transition-colors">
                    <FileText className="w-5 h-5 text-[#D4FF00]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white group-hover:text-[#D4FF00] transition-colors">
                        {record.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0D111A] text-[#D4FF00] border border-[#1C2436]">
                        {record.id}
                      </span>
                      {record.status === "Critical Flag" ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF6384]/20 text-[#FF6384] border border-[#FF6384]/30 font-bold">
                          Critical Flag
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/30 font-bold">
                          {record.status}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#8E99A8] mt-1 font-mono">
                      <span className="text-white font-sans font-semibold">
                        {record.patientName} ({record.patientId})
                      </span>
                      <span>•</span>
                      <span>{record.date}</span>
                      <span>•</span>
                      <span>{record.size}</span>
                      <span>•</span>
                      <span>{record.doctor}</span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1.5 font-sans line-clamp-1">
                      <strong>Findings:</strong> {record.findings}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPreviewRecord(record)}
                    className="px-3.5 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lime-sm"
                  >
                    <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>View Report</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDownload(record)}
                    className="p-2 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#8E99A8] hover:text-[#D4FF00] border border-[#232D42] transition-colors"
                    title="Download Official PDF"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Report Preview Modal */}
      <AnimatePresence>
        {previewRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="w-full max-w-2xl bg-[#121722] rounded-3xl shadow-2xl border border-[#1C2436] overflow-hidden text-white flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-5 bg-[#0D111A] border-b border-[#1C2436] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/30 px-2.5 py-0.5 rounded-full font-bold">
                    OFFICIAL DIAGNOSTIC REPORT
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">{previewRecord.title}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPreviewRecord(null)}
                  className="w-8 h-8 rounded-full bg-[#181F2E] hover:bg-[#232D42] text-[#8E99A8] hover:text-white border border-[#232D42] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Document Content */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] font-mono">
                  <div>
                    <div className="text-[10px] font-bold text-[#8E99A8]">PATIENT</div>
                    <div className="font-bold text-white mt-0.5">{previewRecord.patientName}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#8E99A8]">PATIENT ID</div>
                    <div className="font-bold text-[#D4FF00] mt-0.5">{previewRecord.patientId}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#8E99A8]">COLLECTION DATE</div>
                    <div className="font-bold text-white mt-0.5">{previewRecord.date}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#8E99A8]">ATTENDING</div>
                    <div className="font-bold text-white mt-0.5">{previewRecord.doctor}</div>
                  </div>
                </div>

                {/* Findings */}
                <div className="p-4 rounded-2xl bg-[#0D111A] border border-[#1C2436] space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#D4FF00] stroke-[2.5]" /> Clinical Diagnostic Findings
                  </h4>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs">
                    {previewRecord.findings}
                  </p>
                </div>

                {/* Doctor Signature Block */}
                <div className="p-4 rounded-2xl border border-dashed border-[#1C2436] bg-[#0D111A] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#D4FF00] font-bold">
                      <ShieldCheck className="w-4 h-4 stroke-[2.5]" /> Cryptographically Verified Digital Signature
                    </div>
                    <p className="text-[10px] text-[#8E99A8] font-mono mt-0.5">
                      Signed by: Dr. Ramesh Varma, MD (NPI: #1892049102) • SHA-256 Validated
                    </p>
                  </div>
                  <div className="font-serif italic text-lg text-[#D4FF00] font-bold">
                    Dr. R. Varma
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#0D111A] border-t border-[#1C2436] flex justify-end gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.print();
                  }}
                  className="px-5 py-2.5 rounded-full border border-[#1C2436] text-xs font-semibold text-[#8E99A8] hover:text-white hover:bg-[#181F2E] flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Copy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleDownload(previewRecord);
                    setPreviewRecord(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#CCFF00] text-black font-bold text-xs shadow-lime-sm flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" /> Download PDF
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Records;