/** @format */

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.jsx";
import Login from "./pages/Admin/Login/Login.jsx";
import Residents from "./pages/Admin/Residents/Residents.jsx";
import Request from "./pages/Admin/Requests/Requests.jsx";
import Reports from "./pages/Admin/Reports/Reports.jsx";
import AdminNavbar from "./components/AdminNavbar";
import Approvals from "./pages/Admin/Approvals/Approvals.jsx";
import Events from "./pages/Admin/Events/Events.jsx";
import "./App.css";

// Admin layout with persistent navbar
const AdminLayout = () => (
  <div className="min-h-screen dotted-bg p-6">
    <AdminNavbar />
    <Outlet />
  </div>
);

const AnimatedRoutes = ({ loading }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="residents" element={<Residents />} />
          <Route path="requests" element={<Request />} />
          <Route path="reports" element={<Reports />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="events" element={<Events />} />
        </Route>
        <Route path="admin/login" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading (e.g., fetching user/session)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatedRoutes loading={loading} />
    </Router>
  );
};

export default App;
