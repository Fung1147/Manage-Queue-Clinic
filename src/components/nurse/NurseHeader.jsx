import "./NurseHeader.css";

const NurseHeader = ({ nurseName }) => {
  return (
    <div className="nurse-header">
      <h2>👩‍⚕️ จุดซักประวัติและคัดกรอง (Screening)</h2>
      <div className="nurse-header-info">
        ผู้ปฏิบัติงาน: <strong>{nurseName}</strong>
      </div>
    </div>
  );
};

export default NurseHeader;