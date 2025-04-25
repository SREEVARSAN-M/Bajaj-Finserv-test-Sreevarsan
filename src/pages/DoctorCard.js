import React from 'react';
import '../DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  const {
    photo,
    name,
    specialities,
    clinic,
    fees,
    experience,
  } = doctor;

  return (
    <div className="doctor-card">
      {/* Doctor Image */}
      <img
        src={photo || 'https://via.placeholder.com/80'} // fallback image
        alt={name}
      />

      {/* Doctor Details */}
      <div className="doctor-details">
        <h2>{name}</h2>
        <p>{specialities?.map(s => s.name).join(', ')}</p>
        <p>{experience} years of experience</p>
        <p className="fees">₹ {fees}</p>
        <p className="clinic-name">{clinic?.name}, {clinic?.address?.locality}</p>
      </div>

      {/* Book Button */}
      <button className="book-button">
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;