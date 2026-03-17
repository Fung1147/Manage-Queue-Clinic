import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css"; 

const RegisterPage = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    sex: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      formData.username && formData.password && 
      formData.firstName && formData.lastName && 
      formData.sex && formData.email && formData.phone
    ) {
      console.log("Data to send to API:", formData);
      alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
      navigate("/login"); 
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>📝 สมัครสมาชิก</h2>
          <p>ลงทะเบียนเพื่อใช้งานระบบจองคิว</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
 
          <div className="form-group">
            <label>ชื่อผู้ใช้งาน (Username)</label>
            <input
              type="text"
              name="username"
              placeholder="ตั้งชื่อผู้ใช้งาน"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>รหัสผ่าน (Password)</label>
            <input
              type="password"
              name="password"
              placeholder="ตั้งรหัสผ่านอย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <hr className="divider" />

          <div className="form-row">
            <div className="form-group half">
              <label>ชื่อ</label>
              <input
                type="text"
                name="firstName"
                placeholder=""
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half">
              <label>นามสกุล</label>
              <input
                type="text"
                name="lastName"
                placeholder=""
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>เพศ</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <option value="" disabled>เลือกเพศ</option>
                <option value="Male">ชาย</option>
                <option value="Female">หญิง</option>
              </select>
            </div>
            <div className="form-group half">
              <label>เบอร์โทรศัพท์</label>
              <input
                type="tel"
                name="phone"
                placeholder=""
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>อีเมล</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">ลงทะเบียน</button>
        </form>

        <p className="auth-footer">
          มีบัญชีอยู่แล้ว? <span onClick={() => navigate("/login")} className="auth-link">เข้าสู่ระบบที่นี่</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;