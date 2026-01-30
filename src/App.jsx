import { useState } from "react";
import "./App.css";
import PatientDashboardPage from "./pages/PatientDashboardPage";
import NurseDashboardPage from "./pages/NurseDashboardPage";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {

  const [currentRole, setCurrentRole] = useState('')

  return (
    <>
      <div style={{background: '#333', color: 'white', padding: '10px', display: 'flex', gap: '10px'}}>
        <span>🔧 Dev Mode: Switch Role </span>
        <button onClick={()=> setCurrentRole('patient')}>Patient</button>
        <button onClick={()=> setCurrentRole('nurse')}>Nurse</button>
        <button onClick={()=> setCurrentRole('doctor')}>Doctor</button>
        <button onClick={()=> setCurrentRole('admin')}>Admin</button>
      </div>

      {currentRole === 'patient' && <PatientDashboardPage />}

      {currentRole === 'nurse' && <NurseDashboardPage />}

      {currentRole === 'doctor' && <DoctorDashboardPage />}

      {currentRole === 'admin' && <AdminDashboardPage />}
      
    </>
  );
}

export default App;
