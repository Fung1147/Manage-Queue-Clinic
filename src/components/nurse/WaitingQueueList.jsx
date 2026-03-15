import "./WaitingQueueList.css";

const WaitingQueueList = ({ patients, onCall }) => {
  if (patients.length === 0) {
    return <p className="empty-waiting-nurse">ไม่มีคิวรอซักประวัติ</p>;
  }

  return (
    <table className="nurse-waiting-table">
      <thead>
        <tr>
          <th>หมายเลขคิว</th>
          <th>ชื่อคนไข้</th>
          <th>อาการที่แจ้งตอนจอง</th>
          <th style={{ textAlign: "right" }}>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {patients.map(patient => (
          <tr key={patient.queue_id}>
            <td style={{ fontWeight: "bold", color: "#475569" }}>{patient.queue_no}</td>
            <td>{patient.first_name} {patient.last_name}</td>
            <td style={{ color: "#64748b" }}>{patient.symptoms_initial}</td>
            <td style={{ textAlign: "right" }}>
              <button className="btn-call" onClick={() => onCall(patient.queue_id)}>
                📢 เรียกซักประวัติ
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WaitingQueueList;