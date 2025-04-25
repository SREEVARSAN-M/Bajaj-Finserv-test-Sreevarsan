import React from 'react';
// import './DoctorCard.css';
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
    <div data-testid="doctor-card" className="flex items-start p-4 border rounded-lg shadow-sm bg-white">
      {/* Doctor Image */}
      <img
        src={photo || 'https://via.placeholder.com/80'} // fallback image
        alt={name}
        className="w-20 h-20 object-cover rounded-full mr-4"
      />

      {/* Doctor Details */}
      <div className="flex-1">
        <h2 data-testid="doctor-name" className="text-lg font-semibold">{name}</h2>
        <p data-testid="doctor-specialty" className="text-sm text-gray-500">
          {specialities?.map(s => s.name).join(', ')}
        </p>
        <p data-testid="doctor-experience" className="text-sm text-gray-500">{experience}</p>
        <p data-testid="doctor-fee" className="text-sm text-gray-500">{fees}</p>
        <p className="text-sm text-gray-400">{clinic?.name}, {clinic?.address?.locality}</p>
      </div>

      {/* Book Button */}
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;