import { useState } from "react";
import "./App.css";
import UserHeader from "./components/patient/dashboard/UserHeader";
import PatientDashboardPage from "./pages/PatientDashboardPage";

function App() {

  return (
    <>
      <div className="header-container">
        <div>
          <PatientDashboardPage />
        </div>
        <div>
          
        </div>
      </div>
    </>
  );
}

export default App;
