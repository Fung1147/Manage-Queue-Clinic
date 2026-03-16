import "./ScheduleCard.css";

const ScheduleCard = ({ schedule, isSelected, onSelect, formatDateTH }) => {
  const isFull = schedule.current_count >= schedule.max_patients;
  const isClosed = !schedule.is_available;
  const isDisabled = isFull || isClosed;
  const cardClass = `schedule-card ${isDisabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`;

  return (
    <div
      className={cardClass.trim()}
      onClick={() => !isDisabled && onSelect(schedule)}
    >
      <div className="card-content">
        <div>
          {/* แยกวันที่และเวลาให้อยู่คนละบรรทัด */}
          <div className="time-title">
            <div className="schedule-date">
              📅 วันที่ {formatDateTH(schedule.date)}
            </div>
            <div className="schedule-time">
              ⏰ {schedule.start_time} - {schedule.end_time} น.
            </div>
          </div>
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
              ว่าง ({schedule.max_patients - schedule.current_count} ที่)
            </span>
          )}
          <div className="count-info">
            รับแล้ว: {schedule.current_count}/{schedule.max_patients}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
