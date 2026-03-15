import { useState } from "react";
import { MOCK_QUEUES } from "../services/mockData";
import NurseHeader from "../components/nurse/NurseHeader";
import ActiveScreeningCard from "../components/nurse/ActiveScreeningCard";
import WaitingQueueList from "../components/nurse/WaitingQueueList";

const NurseDashboardPage = () => {
  const NURSE_NAME = "พยาบาล สมหญิง มือเบา";

  const [queues, setQueues] = useState(MOCK_QUEUES);

  const activeScreening = queues.find((q) => q.status === "screening");

  const waitingPatient = queues.filter((q) => q.status === "waiting");

  const handleCallPatient = (queueId) => {
    if (activeScreening) {
      alert("กรุณาซักประวัติคิวปัจจุบันให้เสร็จก่อนเรียกคิวถัดไป!");
      return;
    }

    const updatedQueues = queues.map((q) =>
      q.queue_id === queueId ? { ...q, status: "screening" } : q,
    );

    setQueues(updatedQueues);
  };

  const handleSaveScreening = (queueId, triageData) => {
    // ประเมิน Status ถัดไปจากระดับความฉุกเฉิน (สีเหลือง/สีแดง)
    const nextStatus =
      triageData.emergency_level === "Red" ? "Emergency" : "pending_doctor";

    const updatedQueues = queues.map((q) => {
      if (q.queue_id === queueId) {
        return {
          ...q,
          status: nextStatus,
          triage_record: triageData, // เก็บข้อมูลสัญญาณชีพ
        };
      }
      return q;
    });

    setQueues(updatedQueues);

    if (nextStatus === "Emergency") {
      alert("🚨 บันทึกข้อมูลสำเร็จ ส่งตัวเข้าห้องฉุกเฉินทันที!");
    } else {
      alert(
        "✅ บันทึกข้อมูลสำเร็จ ส่งคิวไปรอหน้าห้องแพทย์ (Pending_Doctor) เรียบร้อย!",
      );
    }
  };

  return (
    <div className="nurse-dashboard-container">
      <NurseHeader nurseName={NURSE_NAME} />

      <h3 className="nurse-section-title">
        🟢 กำลังซักประวัติ (Active Screening)
      </h3>
      <ActiveScreeningCard
        patient={activeScreening}
        onSubmitTriage={handleSaveScreening}
      />

      <h3 className="nurse-section-title">
        🟡 คิวรอเรียกซักประวัติ ({waitingPatient.length} คน)
      </h3>
      <WaitingQueueList patients={waitingPatient} onCall={handleCallPatient} />
    </div>
  );
};
export default NurseDashboardPage;
