import "./UserHeader.css";

const UserHeader = ({ name }) => {
  return (
    <header className="user-header-container">

      <div className="logo">
        <span className="logo-icon">🏥</span> คลินิค รักษาดี
      </div>
      
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
