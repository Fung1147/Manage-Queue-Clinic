import { useState } from "react";
import { MOCK_SCHEDULES, MOCK_USERS } from "../services/mockData";
import "../css/BookingPage.css";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();

  const currentUser = MOCK_USERS.find((u) => u.user_id === 2);

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [symptoms, setSymptoms] = useState("");

  const handleConfirmBooking = () => {
    if (!selectedSchedule) return;

    if (!symptoms.trim()) {
      alert("กรุณาระบุอาการเบื้องต้นก่อนยืนยันการจองคิว");
      return;
    }

    const isConfirm = window.confirm(
      `ยืนยันการจองคิว\nแพทย์: ${selectedSchedule.doctor_name}\nเวลา: ${selectedSchedule.start_time} - ${selectedSchedule.end_time} น.\nอาการเบื้องต้น: ${symptoms}`,
    );

    if (isConfirm) {
      alert("จองคิวสำเร็จ");
      navigate("/patient");
    }
  };

  return (
    <div className="booking-container">
      <button onClick={() => navigate("/patient")} className="btn-back">
        ⬅️ ย้อนกลับไปหน้าหลัก
      </button>

      <h2 className="booking-title">📅 เลือกเวลาจองคิวตรวจ</h2>
      <p className="patient-info">
        ผู้ป่วย: {currentUser?.first_name} {currentUser?.last_name}
      </p>

      {/* ✅ 2. เพิ่มกล่องสำหรับกรอกอาการเบื้องต้น */}
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
        {MOCK_SCHEDULES.map((schedule) => {
          const isFull = schedule.current_count >= schedule.max_patients;
          const isClosed = !schedule.is_available;
          const isDisabled = isFull || isClosed;
          const isSelected =
            selectedSchedule?.schedule_id === schedule.schedule_id;
          const cardClass = `schedule-card ${isDisabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`;

          return (
            <div
              key={schedule.schedule_id}
              className={cardClass.trim()}
              onClick={() => !isDisabled && setSelectedSchedule(schedule)}
            >
              <div className="card-content">
                <div>
                  <h3 className="time-title">
                    ⏰ {schedule.start_time} - {schedule.end_time} น.
                  </h3>
                  <p className="doctor-info">
                    👨‍⚕️ {schedule.doctor_name} (ห้อง {schedule.room_no})
                  </p>
                </div>

                <div className="status-section">
                  {isClosed ? (
                    <span className="status-text closed">ปิดรับคิว</span>
                  ) : isFull ? (
                    <span className="status-text full">คิวเต็ม</span>
                  ) : (
                    <span className="status-text available">
                      ว่าง ({schedule.max_patients - schedule.current_count}{" "}
                      ที่)
                    </span>
                  )}
                  <div className="count-info">
                    รับแล้ว: {schedule.current_count}/{schedule.max_patients}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        // ✅ ปุ่มจะกดได้ก็ต่อเมื่อ เลือกเวลาแล้ว และ พิมพ์อาการแล้ว
        className={`confirm-btn ${selectedSchedule && symptoms.trim() ? "active" : ""}`}
        onClick={handleConfirmBooking}
        disabled={!selectedSchedule || !symptoms.trim()}
      >
        ยืนยันการจองเวลาที่เลือก
      </button>
    </div>
  );
};
export default BookingPage;
