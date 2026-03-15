import { useState, useEffect } from "react";
import "./ActiveScreeningCard.css";

const ActiveScreeningCard = ({ patient, onSubmitTriage }) => {
  // 1. State สำหรับ Class Triage
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pulse, setPulse] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [emergencyLevel, setEmergencyLevel] = useState("Yellow");

  // 2. ล้างค่าฟอร์มเมื่อเปลี่ยนคนไข้
  useEffect(() => {
    if (patient) {
      setWeight(""); setHeight(""); setTemperature("");
      setPulse(""); setBloodPressure(""); setEmergencyLevel("Yellow");
    }
  }, [patient]);

  // 3. Method: calculateBMI
  const calculateBMI = () => {
    if (weight && height) {
      const hInMeters = parseFloat(height) / 100;
      const bmi = parseFloat(weight) / (hInMeters * hInMeters);
      return bmi.toFixed(2);
    }
    return "-";
  };

  const handleSaveTriage = () => {
    const triageData = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      temperature: parseFloat(temperature),
      pulse: parseInt(pulse),
      blood_pressure: bloodPressure,
      emergency_level: emergencyLevel
    };
    
    onSubmitTriage(patient.queue_id, triageData);
  };

  if (!patient) {
    return (
      <div className="empty-screening">
        <h3>จุดซักประวัติว่าง</h3>
        <p>กรุณาเรียกคิวถัดไปจากตารางด้านล่าง...</p>
      </div>
    );
  }

  return (
    <div className="screening-card">
      <div className="screening-content">
        <div className="patient-info" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>คิว: {patient.queue_no}</h2>
            <h3 style={{ color: "#0d9488" }}>{patient.doctor_name}</h3>
          </div>
          <h3>{patient.first_name} {patient.last_name}</h3>
          <p style={{ color: "#64748b", marginBottom: "15px" }}><strong>อาการเบื้องต้น:</strong> {patient.symptoms_initial}</p>

          <hr style={{ border: "0.5px solid #e2e8f0", marginBottom: "15px" }} />

          {/* ฟอร์มบันทึกสัญญาณชีพ */}
          <h4 style={{ margin: "0 0 10px 0" }}>📋 บันทึกสัญญาณชีพ</h4>
          <div className="vitals-grid">
            <div className="vital-input-group">
              <label>น้ำหนัก (kg)</label>
              <input type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} />
            </div>
            <div className="vital-input-group">
              <label>ส่วนสูง (cm)</label>
              <input type="number" step="0.1" value={height} onChange={e => setHeight(e.target.value)} />
            </div>
            <div className="vital-input-group">
              <label>อุณหภูมิ (°C)</label>
              <input type="number" step="0.1" value={temperature} onChange={e => setTemperature(e.target.value)} />
            </div>
            <div className="vital-input-group">
              <label>ชีพจร (bpm)</label>
              <input type="number" value={pulse} onChange={e => setPulse(e.target.value)} />
            </div>
            <div className="vital-input-group">
              <label>ความดัน (mmHg)</label>
              <input type="text" placeholder="เช่น 120/80" value={bloodPressure} onChange={e => setBloodPressure(e.target.value)} />
            </div>
            <div className="vital-input-group">
              <label>BMI</label>
              <div style={{ padding: "8px", backgroundColor: "#e2e8f0", borderRadius: "4px", fontWeight: "bold" }}>
                {calculateBMI()}
              </div>
            </div>
          </div>

          {/* ประเมินระดับความฉุกเฉิน (Assess Triage) */}
          <div className={`emergency-section ${emergencyLevel === "Yellow" ? "emergency-yellow" : "emergency-red"}`}>
            <h4 style={{ margin: "0 0 10px 0" }}>⚠️ ประเมินระดับความฉุกเฉิน</h4>
            <div>
              <label style={{ marginRight: "20px", cursor: "pointer" }}>
                <input type="radio" value="Yellow" checked={emergencyLevel === "Yellow"} onChange={() => setEmergencyLevel("Yellow")} />
                🟡 สีเหลือง (รอพบแพทย์ตามคิว)
              </label>
              <label style={{ cursor: "pointer", color: "#dc2626", fontWeight: "bold" }}>
                <input type="radio" value="Red" checked={emergencyLevel === "Red"} onChange={() => setEmergencyLevel("Red")} />
                🔴 สีแดง (ฉุกเฉิน)
              </label>
            </div>
          </div>

          {/* ปุ่ม Action แยกตามระดับความฉุกเฉิน */}
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
            {emergencyLevel === "Yellow" ? (
              <button className="btn-send-doctor" onClick={handleSaveTriage}>
                ➡️ บันทึก Triage & ส่งรอพบแพทย์ (Pending)
              </button>
            ) : (
              <button className="btn-er" onClick={handleSaveTriage}>
                🚨 บันทึก Triage & ส่งเข้าห้องฉุกเฉิน (Emergency)
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActiveScreeningCard;