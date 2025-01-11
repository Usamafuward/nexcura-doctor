import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/context/SidebarContext";
import Dashboard from "@/pages/Dashboard";
import Appointments from "@/pages/Appointments";
import Patients from "@/pages/Patients";
import Records from "@/pages/Records";
import Settings from "@/pages/Settings";
import Layout from "@/components/layout/Layout";

const App = () => {
  return (
    <Router>
      <SidebarProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/records" element={<Records />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </SidebarProvider>
    </Router>
  );
};

export default App;

// import Layout from "@/components/layout/Layout";
// import DashboardContent from "@/pages/Dashboard";

// import PropTypes from 'prop-types';

// const Dashboard = ({ isSidebarOpen, setSidebarOpen }) => {
//   return (
//     <Layout isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen}>
//       <DashboardContent
//         isSidebarOpen={isSidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />
//     </Layout>
//   );
// };

// Dashboard.propTypes = {
//   isSidebarOpen: PropTypes.bool.isRequired,
//   setSidebarOpen: PropTypes.func.isRequired,
// };

// export default Dashboard;
