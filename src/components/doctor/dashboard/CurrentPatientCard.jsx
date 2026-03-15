import "./CurrentPatientCard.css";

const CurrentPatientCard = ({ patient, onComplete }) => {
  if (!patient) {
    return (
      <div className="empty-state">
        <h3>ยังไม่มีคนไข้ในห้องตรวจ</h3>
        <p>รอพยาบาลเรียกคิวถัดไปเข้าห้อง...</p>
      </div>
    );
  }

  return (
    <div className="patient-card">
      <div className="patient-card-content">
        <div>
          <h2 className="queue-title">คิว: {patient.queue_no}</h2>
          <h3 className="patient-name">
            {patient.first_name} {patient.last_name}
          </h3>

          <div className="symptoms-box">
            <strong>อาการเบื้องต้น:</strong>
            <p>{patient.symptoms_initial}</p>
          </div>
        </div>

        <button
          className="btn-complete"
          onClick={() => onComplete(patient.queue_id)}
        >
          ✅ ตรวจเสร็จสิ้น
        </button>
      </div>
    </div>
  );
};
export default CurrentPatientCard;
