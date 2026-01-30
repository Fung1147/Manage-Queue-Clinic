import LiveQueueCard from "./LiveQueueCard";
import "./CurrentQueueSection.css"

const CurrentQueueSection = ({ activeQueue }) => {
  if (activeQueue) {
    return (
      <div className="main-container">
        <div className="status-info">
          <h3>สถานะปัจจุบัน</h3>
          <span>รายละเอียด...</span>
        </div>
        <LiveQueueCard 
          queueNumber={activeQueue.number} 
          doctorName={activeQueue.doctor}
          waitingCount={activeQueue.waitingCount}
          status={activeQueue.status}/>
      </div>
    );
  }

  return (
    <div>
      <></>
    </div>
  );
};
export default CurrentQueueSection;
