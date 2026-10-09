import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import ScrollToTop from "@/components/common/ScrollToTop";
import Dashboard from "@/pages/Dashboard";
import Appointments from "@/pages/Appointments";
import Patients from "@/pages/Patients";
import Records from "@/pages/Records";
import Settings from "@/pages/Settings";
import Layout from "@/components/layout/Layout";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/records" element={<Records />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Layout>
      </AppProvider>
    </Router>
  );
};

export default App;
