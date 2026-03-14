import LiveQueueCard from "./LiveQueueCard";
import "./CurrentQueueSection.css"
import GreetingBanner from "./GreetingBanner";

const CurrentQueueSection = ({ activeQueue, onBookClick, onCancelClick}) => {
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
          status={activeQueue.status}
          roomNo={activeQueue.roomNo}
          onCancelClick={onCancelClick}/>
      </div>
    );
  }

  return (
    <div className="main-container">
      <GreetingBanner onBookClick={onBookClick} />
    </div>
  );
};
export default CurrentQueueSection;
