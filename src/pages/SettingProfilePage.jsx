import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SettingProfilePage.css"; 

const SettingProfilePage = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: "สมหญิง",
    lastName: "ใจดีมาก",
    phone: "089-123-4567",
    allergy: "แพ้ยา Penicillin, อาหารทะเล",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    console.log("ข้อมูลที่เตรียมส่งไปอัปเดต:", profileData);
    
    alert("บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว ");
    navigate("/patient"); 
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        
        <div className="settings-header">
          <button className="back-btn" onClick={() => navigate("/patient")}>
            ⬅ ย้อนกลับ
          </button>
          <h2>⚙️ ตั้งค่าข้อมูลส่วนตัว</h2>
          <p>แก้ไขข้อมูลพื้นฐานและประวัติการแพ้ยา</p>
        </div>

        <form onSubmit={handleSave} className="settings-form">
          
          <div className="form-row">
            <div className="form-group half">
              <label>ชื่อ (First Name)</label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half">
              <label>นามสกุล (Last Name)</label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>เบอร์โทรศัพท์ติดต่อ (Phone Number)</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>⚠️ ประวัติการแพ้ยา / แพ้อาหาร (Allergy)</label>
            <textarea
              name="allergy"
              rows="3"
              value={profileData.allergy}
              onChange={handleChange}
              placeholder="ระบุประวัติการแพ้ยา หากไม่มีให้ขีด -"
              className="allergy-input"
            ></textarea>
            <small className="help-text">ข้อมูลนี้สำคัญมากต่อการจัดยาของแพทย์ กรุณาระบุให้ชัดเจน</small>
          </div>

          <div className="action-buttons">
            <button type="button" className="cancel-btn" onClick={() => navigate("/patient")}>
              ยกเลิก
            </button>
            <button type="submit" className="save-btn">
              💾 บันทึกการเปลี่ยนแปลง
            </button>
          </div>
          
        </form>

      </div>
    </div>
  );
};

export default SettingProfilePage;