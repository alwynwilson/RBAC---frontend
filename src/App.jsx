import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterAdmin from "./pages/RegisterAdmin";
import DashboardLayout from "./layout/DashboardLayout";
import StudentsPage from "./pages/StudentsPage";
import StaffPage from "./pages/StaffPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Navigate } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register-admin" element={<RegisterAdmin />} />

      <Route element={<ProtectedRoute allowedRoles={["superadmin", "staff"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<StudentsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/staff" element={<StaffPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
