import "./DoctorCard.css";

const DoctorCard = ({ doctor, onSelect }) => {
  // เช็คเพศเพื่อแสดงไอคอน
  const icon = doctor.sex === "ชาย" ? "👨‍⚕️" : "👩‍⚕️";

  return (
    <div className="doctor-card" onClick={() => onSelect(doctor)}>
      <div className="doctor-icon">{icon}</div>
      <div className="doctor-info">
        <h4>{doctor.first_name} {doctor.last_name}</h4>
        <p className="specialty-badge">{doctor.position}</p>
      </div>
    </div>
  );
};

export default DoctorCard;