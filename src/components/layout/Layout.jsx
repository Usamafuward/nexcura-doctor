import PropTypes from "prop-types";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useSidebar } from "@/context/SidebarContext";

const Layout = ({ children }) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-[#E7EFF9]">
      <Sidebar />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div
          className={`fixed top-0 right-0 z-10 transition-all duration-300 ${
            isSidebarOpen ? "left-64" : "left-20"
          }`}
        >
          <Navbar />
        </div>

        <div className="h-full overflow-y-auto pt-[80px]">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
