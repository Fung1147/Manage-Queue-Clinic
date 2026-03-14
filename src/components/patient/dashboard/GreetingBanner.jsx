import "./GreetingBanner.css";

const GreetingBanner = ({onBookClick}) => {
  return (
    <div className="greeting-card">
      <div className="greeting-content">
        <div className="icon-wrapper">🏥</div>
        <h3 className="greeting-title">เริ่มต้นการรักษา</h3>
        <p className="greeting-subtitle">
          ยังไม่มีรายการจองคิวในขณะนี้ <br />
          คุณสามารถจองคิวตรวจกับแพทย์ได้ทันที
        </p>

        <button className="book-btn" onClick={onBookClick}>
          + จองคิวตรวจใหม่
        </button>
      </div>
    </div>
  );
};
export default GreetingBanner;
