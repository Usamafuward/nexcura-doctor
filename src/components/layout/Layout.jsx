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
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-8 relative z-10">
        {children}
      </main>

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
