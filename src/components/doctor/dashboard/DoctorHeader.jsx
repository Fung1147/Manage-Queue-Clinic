const DoctorHeader = ({doctorName}) => {
  return (
    <div className="doctor-header">
        <h2 className="doctor-header-title">👨‍⚕️ หน้าจอแพทย์ (Doctor Dashboard)</h2>
        <p className="doctor-header-subtitle">แพทย์ผู้ตรวจ: {doctorName}</p>
    </div>
  )
}
export default DoctorHeader