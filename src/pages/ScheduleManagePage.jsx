import { useState } from "react";
import "../css/ScheduleManagePage.css";

// 🟢 1. ข้อมูลเดิมที่มีอยู่ (ใส่กลับเข้ามาแล้ว)
const INITIAL_MOCK = [
  { schedule_id: 501, doctor_id: 201, doctor_name: "นพ.รักษา ยาดี", date: "2026-03-15", start_time: "09:00", end_time: "10:00", room_no: "1", max_patients: 5, current_count: 5, is_available: true },
  { schedule_id: 502, doctor_id: 201, doctor_name: "นพ.รักษา ยาดี", date: "2026-03-15", start_time: "10:00", end_time: "11:00", max_patients: 5, current_count: 4, is_available: true },
  { schedule_id: 503, doctor_id: 201, doctor_name: "นพ.รักษา ยาดี", date: "2026-03-15", start_time: "11:00", end_time: "12:00", max_patients: 5, current_count: 0, is_available: false },
  { schedule_id: 504, doctor_id: 201, doctor_name: "นพ.รักษา ยาดี", date: "2026-03-15", start_time: "12:00", end_time: "13:00", max_patients: 5, current_count: 1, is_available: true },
  { schedule_id: 505, doctor_id: 201, doctor_name: "นพ.รักษา ยาดี", date: "2026-03-15", start_time: "13:00", end_time: "14:00", max_patients: 5, current_count: 2, is_available: true },
  { schedule_id: 506, doctor_id: 201, doctor_name: "นพ.รักษา ยาดี", date: "2026-03-15", start_time: "14:00", end_time: "15:00", max_patients: 5, current_count: 0, is_available: true },
];

const ScheduleManagePage = () => {
  const [schedules, setSchedules] = useState(INITIAL_MOCK);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({ 
    date: "", 
    start_time: "09:00", 
    end_time: "17:00", 
    max_patients: 5,
    room_no: "1", 
  });

  const handleGenerateDaySchedule = (e) => {
    e.preventDefault();
    const startHour = parseInt(formData.start_time.split(":")[0]);
    const endHour = parseInt(formData.end_time.split(":")[0]);
    const newSlots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      newSlots.push({
        schedule_id: Math.random(),
        date: formData.date,
        start_time: `${hour.toString().padStart(2, '0')}:00`,
        end_time: `${(hour + 1).toString().padStart(2, '0')}:00`,
        room_no: formData.room_no,
        max_patients: formData.max_patients, 
        current_count: 0,
        is_available: true
      });
    }
    setSchedules([...schedules, ...newSlots]);
    setShowForm(false);
  };

  const handleDeleteDay = (date) => {
    const hasPatients = schedules.some(sch => sch.date === date && sch.current_count > 0);
    if (hasPatients) return alert("❌ ไม่สามารถลบได้: มีผู้ป่วยจองคิวในวันนี้แล้ว");
    if (window.confirm(`🗑️ ยืนยันการลบตารางทั้งหมดของวันที่ ${date}?`)) {
      setSchedules(schedules.filter(sch => sch.date !== date));
    }
  };

  const toggleSlot = (id) => {
    const target = schedules.find(s => s.schedule_id === id);
    if (target.is_available && target.current_count > 0) {
      alert(`❌ ไม่สามารถปิดได้: มีผู้ป่วยจองแล้ว ${target.current_count} ท่าน`);
      return;
    }
    setSchedules(schedules.map(sch => sch.schedule_id === id ? { ...sch, is_available: !sch.is_available } : sch));
  };

  const grouped = schedules.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  return (
    <div className="schedule-container">
      <div className="header-section">
        <h2>📅 จัดการตารางเวรแพทย์</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ สร้างตารางใหม่</button>
      </div>

      {showForm && (
        <form className="gen-form" onSubmit={handleGenerateDaySchedule}>
          <h3>สร้าง Slot อัตโนมัติ</h3>
          <div className="form-grid">
            <div className="input-group">
              <label>วันที่</label>
              <input type="date" required onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            <div className="input-group">
              <label>ห้องตรวจ</label>
              <input type="text" value={formData.room_no} placeholder="เลขห้อง" onChange={e => setFormData({...formData, room_no: e.target.value})} />
            </div>
            <div className="input-group">
              <label>คนไข้/Slot</label>
              <input type="number" value={formData.max_patients} onChange={e => setFormData({...formData, max_patients: e.target.value})} />
            </div>
            <div className="input-group">
              <label>ช่วงเวลา</label>
              <div className="time-range-inputs">
                <input type="time" value={formData.start_time} onChange={e => setFormData({...formData, start_time: e.target.value})} />
                <span>-</span>
                <input type="time" value={formData.end_time} onChange={e => setFormData({...formData, end_time: e.target.value})} />
              </div>
            </div>
            <div className="form-btns">
              <button type="submit" className="btn-confirm">สร้าง</button>
              <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>ยกเลิก</button>
            </div>
          </div>
        </form>
      )}

      <div className="day-list">
        {Object.keys(grouped).sort().map(date => (
          <div key={date} className="day-group">
            <div className="day-header">
              <div className="day-title">
                <h4>🗓️ วันที่: {date}</h4>
                {/* 🟢 แสดง Room No ที่หัวข้อวัน (อิงจาก Slot แรกของวัน) */}
                <span className="room-badge">ห้องตรวจ: {grouped[date][0]?.room_no || "ไม่ระบุ"}</span>
              </div>
              <button className="btn-delete-day" onClick={() => handleDeleteDay(date)}>ลบทั้งหมด</button>
            </div>
            <div className="slots-wrapper">
              {grouped[date].map(slot => (
                <div key={slot.schedule_id} className={`slot-item ${!slot.is_available ? 'off' : ''}`}>
                  <div className="slot-text">
                    <strong>{slot.start_time} - {slot.end_time}</strong>
                    <span className="count-tag">👥 {slot.current_count} / {slot.max_patients} คน</span>
                  </div>
                  <button 
                    className={`btn-toggle ${slot.is_available ? 'active' : 'inactive'}`}
                    onClick={() => toggleSlot(slot.schedule_id)}
                  >
                    {slot.is_available ? "เปิดอยู่" : "ปิดอยู่"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleManagePage;