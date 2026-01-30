import "./LiveQueueCard.css";

const LiveQueueCard = ({ queueNumber, doctorName, waitingCount, status }) => {
  const isCalling = status === "calling";
  const statusText = isCalling ? "เชิญเข้าห้องตรวจ" : "รอเรียกคิว";
  const statusColor = isCalling ? "status-calling" : "status-waiting"
  return (
    <div className="queue-card">
      <div className={`queue-header ${statusColor}`}>{statusText}</div>
      <div className="queue-body">
        <p>หมายเลขคิว</p>
        <div className="queue-number">{queueNumber}</div>
        <div className="doctor-badge">
          <span>{doctorName}</span>
        </div>
        <p>มีคิวก่อนหน้า {waitingCount}</p>
      </div>
    </div>
  );
};
export default LiveQueueCard;
