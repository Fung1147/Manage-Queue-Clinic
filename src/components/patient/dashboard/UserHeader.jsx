import "./UserHeader.css";

const UserHeader = ({ name, imageUrl }) => {
  return (
    <div>
      <div className="user-header-container">
        <div className="info-user">
          <img className="profile-img" src={imageUrl} />
          <div>
            <p>ยินดีต้อนรับ</p>
            <h2>{name}</h2>
          </div>
        </div>

        <div className="mode">mode</div>
      </div>
    </div>
  );
};
export default UserHeader;
