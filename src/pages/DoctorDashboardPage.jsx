import { useEffect, useState } from "react";
import { MOCK_DOCTOR, MOCK_QUEUES, MOCK_USERS, MOCK_TRIAGES } from "../services/mockData";
import DoctorHeader from "../components/doctor/dashboard/DoctorHeader";
import CurrentPatientCard from "../components/doctor/dashboard/CurrentPatientCard";
import WaitingPatientList from "../components/doctor/dashboard/WaitingPatientList";
import "../css/DoctorDashboardPage.css";

const DoctorDashboardPage = () => {
  const loggedInDoctorId = 201;

  const doctorInfo = MOCK_DOCTOR.find(
    (doc) => doc.doctor_id === loggedInDoctorId
  );

  const doctorFullName = doctorInfo
    ? `${doctorInfo.first_name} ${doctorInfo.last_name}`
    : "ไม่พบข้อมูลแพทย์";

  const [currentPatient, setCurrentPatient] = useState(null);
  const [waitingPatient, setWaitingPatient] = useState([]);

  const getFullPatientData = (queueData) => {
    // หาข้อมูลผู้ป่วยจาก MOCK_USERS โดยเทียบ user_id
    const patientData = MOCK_USERS.find((u) => u.user_id === queueData.user_id) || {};
    
    // หาผลซักประวัติจาก MOCK_TRIAGES โดยเทียบ queue_id
    const triageData = MOCK_TRIAGES.find((t) => t.queue_id === queueData.queue_id) || {};

    // รวมร่างข้อมูลทั้งหมดเป็นก้อนเดียวเพื่อส่งให้ Component ลูกนำไปแสดงผล
    return {
      ...queueData,
      ...patientData,
      ...triageData,
    };
  };

  useEffect(() => {
    // 2. ดึงคิวที่ "กำลังตรวจอยู่" (ถ้ามี)
    const activeQueue = MOCK_QUEUES.find(
      (q) => q.doctor_id === loggedInDoctorId && q.status === "in_progress"
    );
    if (activeQueue) {
      setCurrentPatient(getFullPatientData(activeQueue));
    } else {
      setCurrentPatient(null);
    }

    // 3. ดึงคิวที่ "รอตรวจหน้าห้อง"
    const waitingQueues = MOCK_QUEUES.filter(
      (q) => q.doctor_id === loggedInDoctorId && q.status === "pending_doctor"
    );
    
    // 🟢 นำคิวรอทั้งหมดมาผ่านฟังก์ชัน Join ข้อมูล เพื่อให้รายชื่อด้านล่างมีชื่อ-นามสกุลมาโชว์ด้วย
    const waitingWithFullData = waitingQueues.map(getFullPatientData);
    setWaitingPatient(waitingWithFullData);
  }, []);

  // 4. ฟังก์ชันเมื่อกด "เสร็จสิ้น" การตรวจ
  const handleComplete = (queueID) => {
    const isConfirm = window.confirm(
      "บันทึกผลการรักษาและเสร็จสิ้นคิวนี้ใช่หรือไม่?"
    );
    
    if (isConfirm) {
      alert("✅ บันทึกข้อมูลสำเร็จ! ห้องตรวจว่างแล้ว สามารถเรียกคิวต่อไปได้");
      setCurrentPatient(null);
    }
  };


  const handleCallQueue = (queueId) => {

    const patientToCall = waitingPatient.find((p) => p.queue_id === queueId);
    
    if (patientToCall) {

      setCurrentPatient({ ...patientToCall, status: "in_progress" });
      
      setWaitingPatient(waitingPatient.filter((p) => p.queue_id !== queueId));
    }
  };

  return (
    <div className="doctor-dashboard-container">
      <DoctorHeader doctorName={doctorFullName} />

      <h3 className="section-title">🩺 กำลังตรวจ (Current Patient)</h3>
      <CurrentPatientCard
        patient={currentPatient}
        onComplete={handleComplete}
      />

      <h3 className="section-title">
        📋 คิวรอตรวจหน้าห้อง ({waitingPatient.length} คน)
      </h3>

      <WaitingPatientList 
        patients={waitingPatient} 
        onCallQueue={handleCallQueue} 
        isRoomEmpty={!currentPatient}
      />
    </div>
  );
};

export default DoctorDashboardPage;