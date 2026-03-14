import "./LiveQueueCard.css";

const LiveQueueCard = ({
  queueNumber,
  doctorName,
  waitingCount,
  status,
  roomNo,
  onCancelClick,
}) => {
  const isCalling = status === "calling";
  const statusText = isCalling ? "เชิญเข้าห้องตรวจ" : "รอเรียกคิว";
  const statusColor = isCalling ? "status-calling" : "status-waiting";

  const AVG_TIME_PER_PATIENT = 15;
  const estWaitTime = waitingCount * AVG_TIME_PER_PATIENT;

  return (
    <div className="queue-card">
      <div className={`queue-header ${statusColor}`}>{statusText}</div>
      <div className="queue-body">
        <p>หมายเลขคิว</p>
        <div className="queue-number">{queueNumber}</div>
        <div className="doctor-badge">
          <span>{doctorName}</span>
        </div>

        {status === "waiting" && (
          <div
            className="time-estimation"
            style={{ color: "#6b7280", marginTop: "10px" }}
          >
            <small>
              ⏱️ เวลาโดยประมาณ:{" "}
              <strong>
                {estWaitTime} - {estWaitTime + 5} นาที
              </strong>
            </small>
          </div>
        )}

        {status === "calling" && (
          <div
            className="queue-wait-count"
            style={{ color: "#dc2626", fontWeight: "bold", marginTop: "10px" }}
          >
            <p>กรุณาเข้าห้องตรวจทันที</p>

            <div
              style={{
                fontSize: "1.2em",
                background: "#fee2e2",
                padding: "8px",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            >
              📍 ห้องตรวจ: {roomNo || "กำลังระบุ..."}
            </div>
          </div>
        )}

        {status === "waiting" && (
          <button
            onClick={onCancelClick}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              backgroundColor: "#fff",
              color: "#ef4444", 
              border: "1px solid #ef4444",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ยกเลิกคิว
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveQueueCard;
