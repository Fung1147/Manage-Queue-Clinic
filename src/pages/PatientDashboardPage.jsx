import { useState } from "react";
import CurrentQueueSection from "../components/patient/dashboard/CurrentQueueSection";
import UserHeader from "../components/patient/dashboard/UserHeader";
import UserFooter from "../components/patient/dashboard/UserFooter";
import "../css/PatientDashboard.css"

const PatientDashboardPage = () => {
  const user = {
    name: "ธนธรณ์ ธนภาสภากร",
    imageUrl: "https://i.pravatar.cc/150?img=11",
  };

  const [activeQueue, setActiveQueue] = useState({
    number: "A102",
    doctor: "นพ.รักษา ยาดี",
    waitingCount: 3,
    status: "wating"
  })

  return (
    <div className="container">
      <UserHeader imageUrl={user.imageUrl} name={user.name}/>

      <main>
        <CurrentQueueSection activeQueue={activeQueue} />
      </main>
      
      <UserFooter />
    </div>
  );
};
export default PatientDashboardPage;
