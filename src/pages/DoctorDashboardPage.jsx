import { useEffect, useState } from "react";
import { MOCK_DOCTOR, MOCK_QUEUES } from "../services/mockData";
import DoctorHeader from "../components/doctor/dashboard/DoctorHeader";
import CurrentPatientCard from "../components/doctor/dashboard/CurrentPatientCard";
import WaitingPatientList from "../components/doctor/dashboard/WaitingPatientList";

const DoctorDashboardPage = () => {
  const loggedInDoctorId = 201;

  const doctorInfo = MOCK_DOCTOR.find(
    (doc) => doc.doctor_id === loggedInDoctorId,
  );

  const doctorFullName = doctorInfo
    ? `${doctorInfo.first_name} ${doctorInfo.last_name} (${doctorInfo.position})`
    : "ไม่พบข้อมูลแพทย์";

  const [currentPatient, setCurrentPatient] = useState(null);
  const [waitingPatient, setWaitingPatient] = useState([]);

  useEffect(() => {
    const active = MOCK_QUEUES.find(
      (q) => q.doctor_id === loggedInDoctorId && q.status === "examining",
    );
    setCurrentPatient(active || null);

    const waiting = MOCK_QUEUES.filter(
      (q) => q.doctor_id === loggedInDoctorId && q.status === "screened",
    );
    setWaitingPatient(waiting);
  }, []);

  const handleComplete = (queueID) => {
    const isConfirm = window.confirm(
      "บันทึกผลการรักษาและเสร็จสิ้นคิวนี้ใช่หรือไม่?",
    );
    if (isConfirm) {
      alert("✅ บันทึกข้อมูลสำเร็จ! รอพยาบาลส่งคนไข้คิวต่อไปเข้าห้อง");
      setCurrentPatient(null);
    }
  };

  return (
    <div>
      <DoctorHeader doctorName={doctorFullName} />

      <h3 className="section-title">🩺 กำลังตรวจ (Current Patient)</h3>
      <CurrentPatientCard
        patient={currentPatient}
        onComplete={handleComplete}
      />

      <h3 className="section-title">
        📋 คิวรอตรวจหน้าห้อง ({waitingPatient.length} คน)
      </h3>

      <WaitingPatientList patient={waitingPatient} />
    </div>
  );
};
export default DoctorDashboardPage;
