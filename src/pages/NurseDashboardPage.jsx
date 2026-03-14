import { MOCK_QUEUES } from "../services/mockData";

const NurseDashboardPage = () => {
  const queues = MOCK_QUEUES;

  return (
    <div style={{ padding: "20px" }}>
      <h2>รายการคิวรอรับบริการ (Nurse)</h2>
      <table
        border="1"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th>หมายเลขคิว</th>
            <th>ชื่อคนไข้</th>
            <th>อาการเบื้องต้น</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {queues.map((item) => (
            <tr key={item.queue_id}>
              <td style={{ textAlign: "center" }}>{item.queue_no}</td>
              <td>
                {/* ดึงชื่อจาก user_id */} คนไข้รหัส: {item.user_id}
              </td>
              <td>{item.symptoms_initial}</td>
              <td>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background: item.status === "waiting" ? "#ffcc00" : "#ddd",
                  }}
                >
                  {item.status}
                </span>
              </td>
              <td>
                <button onClick={() => alert("เรียกคิว: " + item.queue_no)}>
                  เรียกคิว
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default NurseDashboardPage;
