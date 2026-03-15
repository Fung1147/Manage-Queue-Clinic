import "./WaitingPatientList.css";

const WaitingPatientList = ({ patient }) => {
  if (patient.length === 0) {
    return <p className="empty-waiting">ไม่มีคิวรอหน้าห้อง</p>;
  }

  return (
    <table className="waiting-table">
      <thead>
        <tr>
          <th>หมายเลขคิว</th>
          <th>ชื่อคนไข้</th>
          <th>อาการเบื้องต้น</th>
        </tr>
      </thead>
      <tbody>
        {patient.map((patient) => (
          <tr key={patient.queue_id}>
            <td className="waiting-queue-no">{patient.queue_no}</td>
            <td>
              {patient.first_name} {patient.last_name}
            </td>
            <td className="waiting-symptoms">{patient.symptoms_initial}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default WaitingPatientList;
