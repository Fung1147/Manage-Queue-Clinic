import { useState } from "react";
import "../css/AdminDashboardPage.css";
import { MOCK_DOCTOR, MOCK_NURSE, MOCK_USERS } from "../services/mockData";

const AdminDashboardPage = () => {
  const [activeRole, setActiveRole] = useState(null);
  const [allData, setAllData] = useState({
    Patient: MOCK_USERS,
    Doctor: MOCK_DOCTOR,
    Nurse: MOCK_NURSE,
  });

  const handleDelete = (role, id) => {
    const idKey = role === "Doctor" ? "doctor_id" : role === "Nurse" ? "nurse_id" : "user_id";
    if (window.confirm(`🗑️ ยืนยันการลบข้อมูลนี้หรือไม่?`)) {
      setAllData({
        ...allData,
        [role]: allData[role].filter((item) => item[idKey] !== id),
      });
    }
  };

  // --- หน้าแรก: เลือก Role ---
  if (!activeRole) {
    return (
      <div className="admin-page-bg">
        <div className="hub-container">
          <header className="hub-header">
            <h2 className="hub-title">ระบบจัดการข้อมูลบุคลากร</h2>
            <p className="hub-subtitle">เลือกกลุ่มผู้ใช้งานที่ต้องการจัดการ</p>
          </header>
          
          <div className="role-grid">
            <RoleCard title="แพทย์" eng="Doctor" icon="👨‍⚕️" count={allData.Doctor.length} color="blue" onClick={() => setActiveRole("Doctor")} />
            <RoleCard title="พยาบาล" eng="Nurse" icon="👩‍⚕️" count={allData.Nurse.length} color="pink" onClick={() => setActiveRole("Nurse")} />
            <RoleCard title="คนไข้" eng="Patient" icon="🤕" count={allData.Patient.length} color="orange" onClick={() => setActiveRole("Patient")} />
          </div>
        </div>
      </div>
    );
  }

  // --- หน้าสอง: ตารางข้อมูล ---
  const currentList = allData[activeRole];

  return (
    <div className="admin-page-bg">
      <div className="list-container">
        <header className="list-header">
          <div className="list-header__left">
            <button className="btn-back" onClick={() => setActiveRole(null)}>⬅กลับ</button>
            <h2 className="list-title">จัดการข้อมูล: <span className={`text-${activeRole.toLowerCase()}`}>{activeRole}</span></h2>
          </div>
          <div className="list-header__right">
            <button className="btn-add">+ เพิ่ม {activeRole} ใหม่</button>
          </div>
        </header>

        <div className="table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ชื่อ-นามสกุล</th>
                <th>ติดต่อ</th>
                {activeRole === "Doctor" && <><th>รหัสพนักงาน</th><th>เลขใบประกอบ</th><th>ตำแหน่ง</th></>}
                {activeRole === "Nurse" && <><th>รหัสพนักงาน</th><th>เลขใบอนุญาต</th><th>ตำแหน่ง</th></>}
                {activeRole === "Patient" && <><th>เพศ</th><th>ประวัติแพ้ยา</th></>}
                <th className="text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((item) => {
                const id = item.doctor_id || item.nurse_id || item.user_id;
                return (
                  <tr key={id}>
                    <td><strong>{item.first_name} {item.last_name}</strong></td>
                    <td className="contact-cell"><div>📧 {item.email}</div><div>📞 {item.phone}</div></td>
                    {activeRole === "Doctor" && (
                      <><td>{item.employee_id}</td><td><span className="badge-blue">{item.license_no}</span></td><td>{item.position}</td></>
                    )}
                    {activeRole === "Nurse" && (
                      <><td>{item.employee_id}</td><td><span className="badge-pink">{item.nursing_license}</span></td><td>{item.position}</td></>
                    )}
                    {activeRole === "Patient" && (
                      <><td>{item.sex}</td><td><span className={item.allergy !== "-" ? "warn-text" : ""}>{item.allergy || "-"}</span></td></>
                    )}
                    <td className="action-cell">
                      <button className="btn-icon edit">✏️</button>
                      <button className="btn-icon delete" onClick={() => handleDelete(activeRole, id)}>🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RoleCard = ({ title, eng, icon, count, color, onClick }) => (
  <div className={`card-item card-${color}`} onClick={onClick}>
    <div className="card-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{eng}</p>
    <div className="card-count">รวม {count} รายชื่อ</div>
    <div className="card-arrow">จัดการข้อมูล ➔</div>
  </div>
);

export default AdminDashboardPage;