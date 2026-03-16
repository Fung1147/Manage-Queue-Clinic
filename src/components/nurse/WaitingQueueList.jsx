import { MOCK_SCHEDULES } from "../../services/mockData";
import "./WaitingQueueList.css";

const WaitingQueueList = ({ patients, onCall, onSkip, onInsert }) => {
  
  // เรียงลำดับตาม "หมายเลขคิว" (A1, A2, A10)
  const sortedPatients = [...patients].sort((a, b) => {
    if (!a.queue_no || !b.queue_no) return 0;
    return a.queue_no.localeCompare(b.queue_no, undefined, { numeric: true });
  });

  return (
    <div className="waiting-queue-section">
      <div className="waiting-queue-header">
        <button className="btn-insert-queue" onClick={onInsert}>
          + แทรกคิว
        </button>
      </div>

      {sortedPatients.length === 0 ? (
        <p className="empty-message">🎉 ไม่มีคิวรอในขณะนี้</p>
      ) : (
        <table className="queue-table">
          <thead>
            <tr>
              <th>หมายเลขคิว</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ช่วงเวลาที่นัด</th>
              <th>จัดการคิว</th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients.map((p) => {
              // หาช่วงเวลาจาก MOCK_SCHEDULES ใช้ schedule_id
              const scheduleInfo = MOCK_SCHEDULES.find((s) => s.schedule_id === p.schedule_id);

              const timeSlot = scheduleInfo ? `${scheduleInfo.start_time} - ${scheduleInfo.end_time}` : "-";

              return (
                <tr key={p.queue_id}>
                  <td className="queue-no"><strong>{p.queue_no}</strong></td>
                  <td>{p.first_name} {p.last_name}</td>
                  
                  <td>
                    <span className="time-badge slot-time">
                      ⏰ {timeSlot} น.
                    </span>
                  </td>

                  <td className="action-buttons">
                    <button className="btn-call" onClick={() => onCall(p.queue_id)}>
                      📢 เรียกคิว
                    </button>
                    <button className="btn-skip" onClick={() => onSkip(p.queue_id)}>
                      ⏭️ ข้ามคิว
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WaitingQueueList;