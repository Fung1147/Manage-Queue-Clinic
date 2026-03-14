import { useState } from "react";
import { MOCK_SCHEDULES, MOCK_USERS } from "../services/mockData";
import "../css/BookingPage.css";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();

  const currentUser = MOCK_USERS.find((u) => u.user_id === 2);

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleConfirmBooking = () => {
    if (selectedSchedule) return;

    const isConfirm = window.confirm(
      `ยืนยันการจองคิว\nแพทย์: ${selectedSchedule.doctor_name}\nเวลา": ${selectedSchedule.start_time} - ${selectedSchedule.end_time} น.`,
    );

    if (isConfirm) {
      alert("จองคิวสำเร็จ");
      navigate("/patient");
    }
  };

  return (
    <div className="booking-container">
      <button
        onClick={() => navigate("/patient")}
        style={{
          marginBottom: "15px",
          padding: "8px 15px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "1px solid #ccc",
          background: "#fff",
        }}
      >
        ⬅️ ย้อนกลับไปหน้าหลัก
      </button>
      <h2 className="booking-title">📅 เลือกเวลาจองคิวตรวจ</h2>
      <p className="patient-info">
        ผู้ป่วย: {currentUser?.first_name} {currentUser?.last_name}
      </p>

      <div className="schedule-list">
        {MOCK_SCHEDULES.map((schedule) => {
          // ลอจิกเช็คสถานะ
          const isFull = schedule.current_count >= schedule.max_patients;
          const isClosed = !schedule.is_available;
          const isDisabled = isFull || isClosed;
          const isSelected =
            selectedSchedule?.schedule_id === schedule.schedule_id;

          // ✅ จัดการเรื่อง Class ตามเงื่อนไข (Conditional Class Names)
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
                  
                  {/* แสดงสถานะคิว */}
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
        className={`confirm-btn ${selectedSchedule ? "active" : ""}`}
        onClick={handleConfirmBooking}
        disabled={!selectedSchedule}
      >
        ยืนยันการจองเวลาที่เลือก
      </button>
    </div>
  );
};
export default BookingPage;
