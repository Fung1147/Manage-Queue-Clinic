import "./UserFooter.css"

const UserFooter = () => {
  return (
    <div className="footer-container">
        <h3 className="head-footer">บริการอื่นๆ</h3>
        <div className="footer-content">
            <div className="item-1">
                <span>📅</span>
                <span>นัดหมายล่วงหน้า</span>
            </div>
            <div className="item-2">
                <span>💊</span>
                <span>ประวัติการรักษา</span>
            </div>
        </div>
    </div>
  )
}
export default UserFooter