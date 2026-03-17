import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.username && formData.password) {
      console.log("Login Data:", formData);
      alert(`ยินดีต้อนรับคุณ ${formData.username}!`);
      navigate("/patient");
    } else {
      alert("กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านให้ครบถ้วน");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>🏥 เข้าสู่ระบบ</h2>
          <p>ระบบจองคิวออนไลน์ คลินิก รักษาดี</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>ชื่อผู้ใช้งาน (Username)</label>

            <input
              type="text"
              name="username"
              placeholder=""
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label>รหัสผ่าน (Password)</label>
              <span
                onClick={() => navigate("/forgot-password")}
                className="forgot-password-link"
              >
                ลืมรหัสผ่าน?
              </span>
            </div>

            <input
              type="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            เข้าสู่ระบบ
          </button>
        </form>

        <p className="auth-footer">
          ยังไม่มีบัญชีใช่หรือไม่?{" "}
          <span onClick={() => navigate("/register")} className="auth-link">
            สมัครสมาชิก
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
