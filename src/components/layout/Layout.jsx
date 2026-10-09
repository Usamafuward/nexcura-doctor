import PropTypes from "prop-types";
import Navbar from "@/components/layout/Navbar";
import TeleconsultationModal from "@/components/modals/TeleconsultationModal";
import EHRDrawer from "@/components/modals/EHRDrawer";
import QuickRxModal from "@/components/modals/QuickRxModal";
import CommandPalette from "@/components/modals/CommandPalette";
import NewAppointmentModal from "@/components/modals/NewAppointmentModal";
import ToastContainer from "@/components/ui/ToastContainer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#080B11] text-white flex flex-col relative selection:bg-[#D4FF00] selection:text-black">
      {/* Background Soft Radial Lime Glow matching video's header ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[340px] bg-gradient-to-b from-[#D4FF00]/10 via-[#D4FF00]/2 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Top Nav Bar matching video */}
      <Navbar />

      {/* Main Board Container with reduced top gap */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-5 relative z-10">
        {children}
      </main>

      {/* Floating Rounded App Footer matching Header design */}
      <footer className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2 relative z-10 mt-auto">
        <div className="px-5 py-2.5 rounded-2xl sm:rounded-full bg-[#121722]/90 backdrop-blur-xl border border-[#1C2436] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8E99A8] font-mono hover:border-[#28354E] transition-all">
          {/* Left: Brand + Status Pill */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#0D111A] border border-[#1C2436] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-lime-sm animate-pulse" />
            </div>
            <span className="text-white font-extrabold tracking-wide">Nexcura Pro</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">NextGen Physician Intelligence</span>
          </div>

          {/* Right: Attribution in Rounded Pill */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-slate-400 text-[11px]">Designed &amp; developed by</span>
            <a
              href="https://usamapuward.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 px-3.5 rounded-full bg-[#0D111A] hover:bg-[#181F2E] border border-[#1C2436] hover:border-[#D4FF00]/50 text-slate-200 hover:text-[#D4FF00] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm group"
            >
              <span>Usama Puward | AI/ML Engineer &amp; Full-Stack Developer</span>
              <span className="text-[#D4FF00] text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Overlays & Modals */}
      <TeleconsultationModal />
      <EHRDrawer />
      <QuickRxModal />
      <CommandPalette />
      <NewAppointmentModal />
      <ToastContainer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
