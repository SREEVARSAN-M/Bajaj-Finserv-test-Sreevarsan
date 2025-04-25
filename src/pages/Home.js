import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../Home.css';
import Autocomplete from './components/Autocomplete';
import Filters from './Filters';
import DoctorCard from './DoctorCard';

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const applyFilters = useCallback((allDoctors) => {
    let result = [...allDoctors];

    const search = searchParams.get('search') || '';
    const mode = searchParams.get('mode');
    const specialties = searchParams.getAll('specialty');
    const sort = searchParams.get('sort');

    console.log("FILTER PARAMS:", { search, mode, specialties, sort });

    if (search) {
      result = result.filter(doc =>
        doc.name && doc.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (mode) {
      if (mode === 'Video Consult') {
        result = result.filter(doc => doc.video_consult === true);
      } else if (mode === 'In Clinic') {
        result = result.filter(doc => doc.in_clinic === true);
      }
    }

    if (specialties.length > 0) {
      result = result.filter(doc =>
        Array.isArray(doc.specialities) &&
        specialties.some(spec => doc.specialities.map(s => s.name).includes(spec))
      );
    }

    if (sort === 'fees') {
      result.sort((a, b) => {
        const feeA = parseInt((a.fees || '').replace(/[^\d]/g, '')) || 0;
        const feeB = parseInt((b.fees || '').replace(/[^\d]/g, '')) || 0;
        return feeA - feeB;
      });
    } else if (sort === 'experience') {
      result.sort((a, b) => {
        const expA = parseInt((a.experience || '').replace(/[^\d]/g, '')) || 0;
        const expB = parseInt((b.experience || '').replace(/[^\d]/g, '')) || 0;
        return expB - expA;
      });
    }

    console.log("Filtered result count:", result.length);
    setFilteredDoctors(result);
  }, [searchParams]);

  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => res.json())
      .then(data => {
        console.log("RAW DOCTORS SAMPLE:", data.slice(0, 3));
        setDoctors(data);
        applyFilters(data);
      });
  }, [applyFilters]);

  useEffect(() => {
    if (doctors.length) {
      applyFilters(doctors);
    }
  }, [searchParams, doctors, applyFilters]);

  return (
    <div className="home-container">
      <div className="layout-grid">
        <div className="filters-column">
          <Filters searchParams={searchParams} setSearchParams={setSearchParams} />
        </div>
        <div className="main-column">
          <Autocomplete searchParams={searchParams} setSearchParams={setSearchParams} doctors={doctors} />
          <div className="doctor-cards">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doc => (
                <DoctorCard key={doc.id || doc.name} doctor={doc} />
              ))
            ) : (
              <div className="no-results">No doctors found with the applied filters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
