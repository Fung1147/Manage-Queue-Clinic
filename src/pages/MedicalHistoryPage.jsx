import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MedicalHistoryPage.css"; 

const MedicalHistoryPage = () => {
  const navigate = useNavigate();

  const [historyData] = useState([
    {
      record_id: 100221,
      queue_id: 250,
      doctor_id: 201, 
      doctor_name: "นพ. รักษา ยาดี",
      patient_id: 1,
      diagnosis: "ไข้หวัดใหญ่สายพันธุ์ A (Influenza A)",
      treatment_plan: "พักผ่อนให้เพียงพอ ดื่มน้ำเกลือแร่ หากไข้ไม่ลดให้เช็ดตัว",
      prescription: "1. Paracetamol 500mg (ลดไข้)\n2. Oseltamivir 75mg (ยาต้านไวรัส)",
      doctor_note: "คนไข้มีอาการไข้สูง 39 องศา ไอแห้ง ปวดเมื่อยตามตัว แนะนำให้แยกตัวจากครอบครัว 5 วัน",
      created_at: "2026-02-20T10:30:00",
    },
    {
      record_id: 100101,
      queue_id: 112,
      doctor_id: 202, 
      doctor_name: "พญ. ใจดี มีเมตตา",
      patient_id: 1,
      diagnosis: "โรคกระเพาะอาหารอักเสบ (Gastritis)",
      treatment_plan: "ปรับเปลี่ยนพฤติกรรมการกิน ทานอาหารให้ตรงเวลา งดอาหารรสจัด",
      prescription: "1. Omeprazole 20mg (ยาลดกรด)\n2. Domperidone 10mg (ยาแก้คลื่นไส้)",
      doctor_note: "มีอาการปวดแสบท้องบริเวณลิ้นปี่ คลื่นไส้หลังทานอาหารรสจัด",
      created_at: "2025-11-15T14:15:00",
    }
  ]);

  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('th-TH', options) + ' น.';
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <button className="back-btn" onClick={() => navigate("/patient")}>
          ⬅ ย้อนกลับ
        </button>
        <h2>📋 ประวัติการรักษา</h2>
        <p>ผู้ป่วย: สมหญิง ใจดีมาก</p>
      </div>

      <div className="history-list">
        {historyData.length === 0 ? (
          <p className="no-data">ยังไม่มีประวัติการรักษา</p>
        ) : (
          historyData.map((record) => (
            <div className="history-card" key={record.record_id}>
              <div className="card-header">
                <span className="date-badge">📅 {formatDateTime(record.created_at)}</span>
                <span className="record-id">Ref No: {record.record_id}</span>
              </div>
              
              <div className="card-body">

                <div className="data-row">
                  <span className="label">👨‍⚕️ แพทย์ผู้ตรวจ:</span>
                  <span className="value" style={{ fontWeight: "bold", color: "#0369a1" }}>
                    {record.doctor_name}
                  </span>
                </div>
                
                <div className="data-row">
                  <span className="label">🩺 คำวินิจฉัย (Diagnosis):</span>
                  <span className="value highlight">{record.diagnosis}</span>
                </div>
                
                <div className="data-row">
                  <span className="label">💊 ใบสั่งยา (Prescription):</span>
                  <span className="value pre-line">{record.prescription}</span>
                </div>
                
                <div className="data-row">
                  <span className="label">📝 แผนการรักษา (Treatment Plan):</span>
                  <span className="value">{record.treatment_plan}</span>
                </div>

                <div className="data-row">
                  <span className="label">👨‍⚕️ บันทึกจากแพทย์ (Doctor Note):</span>
                  <span className="value note">{record.doctor_note}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryPage;