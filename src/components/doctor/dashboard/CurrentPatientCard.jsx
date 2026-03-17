import { useState } from "react";
import "./CurrentPatientCard.css";

const CurrentPatientCard = ({ patient, onComplete }) => {
  const [recordData, setRecordData] = useState({
    diagnosis: "",
    treatment_plan: "",
    prescription: "",
    doctor_note: ""
  });

  const handleChange = (e) => {
    setRecordData({ ...recordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("บันทึกประวัติการรักษา:", recordData);
    onComplete(patient.queue_id);
    setRecordData({ diagnosis: "", treatment_plan: "", prescription: "", doctor_note: "" });
  };

  if (!patient) {
    return (
      <div className="empty-patient-card">
        <div className="empty-icon">☕</div>
        <h4>ยังไม่มีคนไข้ในห้องตรวจ</h4>
        <p>กรุณากดปุ่ม "📢 เรียกคิว" จากรายการรอตรวจด้านล่าง</p>
      </div>
    );
  }

  const calculatedBMI = (patient.weight && patient.height) 
    ? (patient.weight / Math.pow(patient.height / 100, 2)).toFixed(2) 
    : "-";

  return (
    <div className="current-patient-card">
      
      {/* ส่วนที่ 1: ข้อมูลผู้ป่วยและผลซักประวัติ */}
      <div className="patient-info-section">
        <div className="queue-display">
          <span>คิวปัจจุบัน</span>
          <h1>{patient.queue_no}</h1>
        </div>
        
        <div className="patient-details">
          <div className="patient-header">
            <h3>{patient.first_name} {patient.last_name}</h3>
            <span className="hn-badge">ID: {patient.user_id || "000"}</span>
            
            {patient.emergency_level && (
              <span style={{ marginLeft: "8px", padding: "4px 10px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold", background: patient.emergency_level === "Red" ? "#fee2e2" : "#fef3c7", color: patient.emergency_level === "Red" ? "#ef4444" : "#d97706" }}>
                ระดับฉุกเฉิน: {patient.emergency_level}
              </span>
            )}
          </div>

          <div className="info-grid">
            <div className="info-item"><strong>เพศ:</strong> {patient.sex || "-"}</div>
            <div className="info-item"><strong>BMI:</strong> {calculatedBMI}</div>
          </div>

          {/* ข้อมูลสุขภาพที่พยาบาลวัดมา (Vital Signs จาก Triage) */}
          <div className="vital-signs">
            <div className="vital-item">
              <span className="icon">⚖️</span>
              <div>
                <small>น้ำหนัก/ส่วนสูง</small>
                <p>{patient.weight || "-"} kg / {patient.height || "-"} cm</p>
              </div>
            </div>
            <div className="vital-item">
              <span className="icon">🌡️</span>
              <div>
                <small>อุณหภูมิ / ชีพจร</small>
                <p className={patient.temperature > 37.5 ? "text-danger" : ""}>
                  {patient.temperature || "-"} °C / {patient.pulse || "-"} bpm
                </p>
              </div>
            </div>
            <div className="vital-item">
              <span className="icon">🩸</span>
              <div>
                <small>ความดันโลหิต</small>
                <p>{patient.blood_pressure || "-"}</p>
              </div>
            </div>
          </div>

          <div className="symptoms-box">
            <p><strong>🩺 อาการเบื้องต้น:</strong> {patient.symptoms_initial || "-"}</p>
            <p className="allergy-text"><strong>⚠️ ประวัติแพ้ยา:</strong> {patient.allergy || "ไม่มีประวัติแพ้ยา"}</p>
          </div>
        </div>
      </div>

      {/* ส่วนที่ 2: ฟอร์มบันทึกการรักษาของแพทย์ */}
      <div className="medical-record-form">
        <h4>📝 บันทึกผลการรักษา</h4>
        
        <div className="form-group">
          <label>🩺 คำวินิจฉัยโรค (Diagnosis) <span className="required">*</span></label>
          <input 
            type="text" 
            name="diagnosis" 
            value={recordData.diagnosis} 
            onChange={handleChange} 
            placeholder="ระบุโรคหรืออาการที่วินิจฉัย" 
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>💊 ใบสั่งยา (Prescription)</label>
            <textarea 
              name="prescription" 
              rows="4" 
              value={recordData.prescription} 
              onChange={handleChange} 
              placeholder="1. Paracetamol 500mg 1 เม็ด..."
            ></textarea>
          </div>
          <div className="form-group half">
            <label>📋 แผนการรักษา (Treatment Plan)</label>
            <textarea 
              name="treatment_plan" 
              rows="4" 
              value={recordData.treatment_plan} 
              onChange={handleChange} 
              placeholder="คำแนะนำการปฏิบัติตัว, นัดติดตามอาการ..."
            ></textarea>
          </div>
        </div>

        <div className="form-group">
          <label>💬 บันทึกเพิ่มเติม (Doctor Note)</label>
          <input 
            type="text" 
            name="doctor_note" 
            value={recordData.doctor_note} 
            onChange={handleChange} 
            placeholder="บันทึกข้อสังเกตเพิ่มเติมสำหรับแพทย์..." 
          />
        </div>

        <button 
          className="complete-btn" 
          onClick={handleSubmit}
          disabled={!recordData.diagnosis}
        >
          ✅ บันทึกผลและเสร็จสิ้นการตรวจ
        </button>
      </div>
    </div>
  );
};

export default CurrentPatientCard;