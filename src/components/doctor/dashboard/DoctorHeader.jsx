import { useNavigate } from "react-router-dom";
import "./DoctorHeader.css";

const DoctorHeader = ({ doctorName }) => {

  const navigate = useNavigate()

  const today = new Date().toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleManageSchedule = () => {
    navigate("/doctor/schedule")
    alert("🚀 กำลังนำท่านไปยังหน้า... 'จัดการตารางเวรแพทย์' (Schedule Management)");
  };

  return (
    <div className="doctor-header">
      <div className="header-info">
        <h2>👨‍⚕️ ยินดีต้อนรับ, {doctorName}</h2>
        <p>ห้องตรวจ: 1 | ประจำวันที่: {today}</p>
      </div>
      
      <div className="header-actions">
        <div className="status-badge">🟢 กำลังออกตรวจ</div>
        
        <button 
          className="calendar-icon-btn" 
          onClick={handleManageSchedule}
          title="จัดการตารางเวร" 
        >
          {/* ใช้ SVG Icon รูปปฏิทิน */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="calendar-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DoctorHeader;