import { useEffect, useState } from "react";
import CurrentQueueSection from "../components/patient/dashboard/CurrentQueueSection";
import UserHeader from "../components/patient/dashboard/UserHeader";
import UserFooter from "../components/patient/dashboard/UserFooter";
import "../css/PatientDashboard.css";
import { MOCK_QUEUES, MOCK_SCHEDULES, MOCK_USERS } from "../services/mockData";
import { useNavigate } from "react-router-dom";

const PatientDashboardPage = () => {

  const navigate = useNavigate();

  const currentUser = MOCK_USERS.find((u) => u.user_id === 2);

  const [user, setUser] = useState({
    name: currentUser
      ? `${currentUser.first_name} ${currentUser.last_name}`
      : "Not found",
  });

  const [activeQueue, setActiveQueue] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const myQueue = MOCK_QUEUES.find(
      (q) => q.user_id === currentUser.user_id && q.status !== "completed",
    );

    if (myQueue) {

      const mySchedule = MOCK_SCHEDULES.find(
        (s) => s.schedule_id === myQueue.schedule_id,
      );

      setActiveQueue({
        number: myQueue.queue_no,
        doctor: myQueue.doctor_name,
        waitingCount: myQueue.waiting_count,
        status: myQueue.status,
        // ตาราง Schedule
        roomNo: mySchedule ? mySchedule.room_no : "ไม่ระบุ",
      });
    } else {
      setActiveQueue(null);
    }
  }, [currentUser]);

  const handleBookClick = () => {
    navigate("/patient/booking")
  };

  const handleCancelClick = () => {
    const isConfirm = window.confirm("ต้องการยกเลิก?");
    if (isConfirm) {
      alert("ยกเลิกคิวสำเร็จ!");
      setActiveQueue(null)
    }
  }

  return (
    <div className="patient-container">
      <UserHeader name={user.name} />

      <main className="patient-main">
        <CurrentQueueSection
          activeQueue={activeQueue}
          onBookClick={handleBookClick}
          onCancelClick={handleCancelClick}
        />
      </main>

      <UserFooter />
    </div>
  );
};
export default PatientDashboardPage;
