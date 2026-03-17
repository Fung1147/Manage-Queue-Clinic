import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_SCHEDULES, MOCK_USERS, MOCK_DOCTOR } from "../services/mockData";
import "../css/BookingPage.css";
import DoctorCard from "../components/booking/DoctorCard";
import ScheduleCard from "../components/booking/ScheduleCard";

const BookingPage = () => {
  const navigate = useNavigate();
  const currentUser = MOCK_USERS.find((u) => u.user_id === 2);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [symptoms, setSymptoms] = useState("");

  const handleBackToDoctorSelection = () => {
    setSelectedDoctor(null);
    setSelectedSchedule(null);
    setSymptoms("");
  };

  const formatDateTH = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleConfirmBooking = () => {
    if (!selectedSchedule) return;

    if (!symptoms.trim()) {
      alert("กรุณาระบุอาการเบื้องต้นก่อนยืนยันการจองคิว");
      return;
    }

    const isConfirm = window.confirm(
      `ยืนยันการจองคิว\nแพทย์: ${selectedSchedule.doctor_name}\nวันที่: ${formatDateTH(selectedSchedule.date)}\nเวลา: ${selectedSchedule.start_time} - ${selectedSchedule.end_time} น.\nอาการเบื้องต้น: ${symptoms}`,
    );

    if (isConfirm) {
      alert("จองคิวสำเร็จ");
      navigate("/patient");
    }
  };

  return (
    <div className="booking-container">
      {/* ส่วนหัวของหน้า (แสดงตลอด) */}
      <button onClick={() => navigate("/patient")} className="btn-back">
        ⬅️ ย้อนกลับไปหน้าหลัก
      </button>

      <h2 className="booking-title">📅 เลือกเวลาจองคิวตรวจ</h2>
      <p className="patient-info">
        ผู้ป่วย: {currentUser?.first_name} {currentUser?.last_name}
      </p>

      {!selectedDoctor ? (
        
        /* หน้าเลือกแพทย์ */
        <div className="step-section">
          <h3>1. เลือกแพทย์ที่ต้องการเข้าตรวจ</h3>
          <div className="doctor-cards-grid">
            {MOCK_DOCTOR.map((doc) => (
              <DoctorCard
                key={doc.doctor_id} 
                doctor={doc} 
                onSelect={setSelectedDoctor} 
              />
            ))}
          </div>
        </div>

      ) : (

        /* หน้าเลือกเวลาและอาการ */
        <div className="step-section">
          <button className="btn-back-step" onClick={handleBackToDoctorSelection}>
            ⬅️ เปลี่ยนแพทย์
          </button>
          
          <h3 style={{ marginTop: "10px" }}>
            2. เลือกเวลาตรวจของ {selectedDoctor.first_name} {selectedDoctor.last_name}
          </h3>

          <div className="symptoms-section">
            <label className="symptoms-label">
              📝 ระบุอาการเบื้องต้น (บังคับ):
            </label>
            <textarea
              className="symptoms-input"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="เช่น ปวดหัว มีไข้สูง ไอแห้ง..."
            />
          </div>

          <div className="schedule-list">
            {MOCK_SCHEDULES
              .filter((s) => s.doctor_id === selectedDoctor.doctor_id)
              .map((schedule) => (
                <ScheduleCard
                  key={schedule.schedule_id}
                  schedule={schedule}
                  isSelected={selectedSchedule?.schedule_id === schedule.schedule_id}
                  onSelect={setSelectedSchedule}
                  formatDateTH={formatDateTH}
                />
            ))}
            
            {/* กรณีหมอไม่มีคิวว่างเลย */}
            {MOCK_SCHEDULES.filter((s) => s.doctor_id === selectedDoctor.doctor_id).length === 0 && (
              <p style={{ color: "red", textAlign: "center", width: "100%" }}>
                ไม่มีตารางเวรสำหรับแพทย์ท่านนี้
              </p>
            )}
          </div>

          <button
            className={`confirm-btn ${selectedSchedule && symptoms.trim() ? "active" : ""}`}
            onClick={handleConfirmBooking}
            disabled={!selectedSchedule || !symptoms.trim()}
          >
            ยืนยันการจองเวลาที่เลือก
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;