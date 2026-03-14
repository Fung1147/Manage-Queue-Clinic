import "./UserHeader.css";

const UserHeader = ({ name }) => {
  return (
    <header className="user-header-container">
      {/* 1. โลโก้ หรือ ชื่อแอป */}
      <div className="logo">
        <span className="logo-icon">🏥</span> MyClinic
      </div>

      {/* (Optional) โหมด Developer ใส่ Badge เล็กๆ ไว้ */}
      {/* <div className="mode-badge">Dev Mode</div> */}

      {/* 2. ข้อมูลผู้ใช้ */}
      <div className="info-user">
        <div className="text-container">
          <span className="welcome-text">ยินดีต้อนรับ,</span>
          <span className="user-name">{name}</span>
        </div>
      </div>
    </header>
  );
};
export default UserHeader;
