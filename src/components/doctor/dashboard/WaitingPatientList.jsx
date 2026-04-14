import "./WaitingPatientList.css";

const WaitingPatientList = ({ patients, onCallQueue, isRoomEmpty }) => {
  
  if (!patients || patients.length === 0) {
    return <div className="no-waiting">🎉 ไม่มีคิวรอตรวจแล้ว เยี่ยมมากครับ!</div>;
  }

  return (
    <div className="waiting-list-container">
      <div className="waiting-list-header">
        <div className="col-queue">หมายเลขคิว</div>
        <div className="col-name">ชื่อ-นามสกุล (อาการเบื้องต้น)</div>
        <div className="col-action">จัดการคิว</div>
      </div>

      {patients.map((p) => (
        <div className="waiting-item" key={p.queue_id}>
          
          {/* คอลัมน์ที่ 1: หมายเลขคิว และระดับฉุกเฉิน */}
          <div className="col-queue">
            <div className="waiting-queue-no">{p.queue_no}</div>
          </div>
          
          {/* คอลัมน์ที่ 2: ข้อมูลผู้ป่วยจากตาราง Patient และอาการจาก Queue */}
          <div className="col-name waiting-info">
            <h4>
              {p.first_name} {p.last_name} 
              <span style={{ fontSize: "0.9rem", color: "#64748b", marginLeft: "8px", fontWeight: "normal" }}>
                ({p.sex || "ไม่ระบุเพศ"})
              </span>
            </h4>
            <p><strong>อาการ:</strong> {p.symptoms_initial || "-"}</p>
            
          </div>
          
          {/* คอลัมน์ที่ 3: ปุ่มจัดการ */}
          <div className="col-action">
            <button 
              className={`call-queue-btn ${!isRoomEmpty ? 'disabled' : ''}`}
              onClick={() => {
                if(isRoomEmpty) {
                  onCallQueue(p.queue_id);
                } else {
                  alert("⚠️ กรุณากดเสร็จสิ้นคิวปัจจุบันก่อนเรียกคิวใหม่ครับ");
                }
              }}
              disabled={!isRoomEmpty} // ปิดปุ่มถ้าห้องตรวจยังไม่ว่าง
            >
              📢 เรียกคิว
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaitingPatientList;