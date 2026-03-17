import "./UserFooter.css";

const UserFooter = () => {
  return (
    <div className="footer-container">
      <h3 className="head-footer">บริการอื่นๆ</h3>

      <div className="footer-content">

        <div className="menu-item item-1">
          <div className="icon">📅</div>
          <span>ประวัติการรักษา</span>
        </div>
      
        <div className="menu-item item-2">
          <div className="icon">📍</div>
          <span>แผนที่คลินิก</span>
        </div>

        <div className="menu-item item-3">
          <div className="icon">📞</div>
          <span>ติดต่อเจ้าหน้าที่</span>
        </div>

        <div className="menu-item item-4">
          <div className="icon">⚙️</div>
          <span>ตั้งค่า</span>
        </div>
      </div>
    </div>
  );
};
export default UserFooter;
