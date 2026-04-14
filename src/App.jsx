import "./App.css";
import PatientDashboardPage from "./pages/PatientDashboardPage";
import NurseDashboardPage from "./pages/NurseDashboardPage";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MedicalHistoryPage from "./pages/MedicalHistoryPage";
import SettingProfilePage from "./pages/SettingProfilePage";
import ScheduleManagePage from "./pages/ScheduleManagePage";

const DevModeBar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#333",
        color: "white",
        padding: "10px",
        display: "flex",
        gap: "10px",
      }}
    >
      <span>Dev</span>
      <button onClick={() => navigate("/login")}>Home</button>
      <button onClick={() => navigate("/patient")}>Patient</button>
      <button onClick={() => navigate("/nurse")}>Nurse</button>
      <button onClick={() => navigate("/doctor")}>Doctor</button>
      <button onClick={() => navigate("/admin")}>Admin</button>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <DevModeBar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* กลุ่มหน้าของ Patient */}
        <Route path="/patient" element={<PatientDashboardPage />} />
        <Route path="/patient/booking" element={<BookingPage />} />
        <Route path="/patient/history" element={<MedicalHistoryPage />} />
        <Route path="/patient/settings" element={<SettingProfilePage />} />

        {/* กลุ่มหน้าของ Role พนักงาน */}
        <Route path="/nurse" element={<NurseDashboardPage />} />
        <Route path="/doctor" element={<DoctorDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/doctor/schedule" element={<ScheduleManagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
