import React, { useEffect, useState } from 'react';

function Filters({ searchParams, setSearchParams }) {
  const [specialties, setSpecialties] = useState([]);
  const current = Object.fromEntries(searchParams);

  // Fetch doctor data to get the available specialties
  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => res.json())
      .then(data => {
        // Extract unique specialties from the doctor data
        const availableSpecialties = [
          ...new Set(
            data.flatMap(doc => doc.specialities?.map(spec => spec.name).filter(Boolean))
          ),
        ];
        setSpecialties(availableSpecialties);
      });
  }, []);

  const updateParam = (key, value, multi = false) => {
    const newParams = new URLSearchParams(searchParams);
    if (multi) {
      newParams.append(key, value);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const toggleSpecialty = (specialty) => {
    const all = searchParams.getAll('specialty');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('specialty');
    if (all.includes(specialty)) {
      all.filter(spec => spec !== specialty).forEach(spec => newParams.append('specialty', spec));
    } else {
      all.concat(specialty).forEach(spec => newParams.append('specialty', spec));
    }
    setSearchParams(newParams);
  };

  return (
    <div className="w-1/4 p-4">
      <div data-testid="filter-header-moc" className="mb-4">
        <p className="font-bold">Mode of consultation</p>
        <label>
          <input data-testid="filter-video-consult" type="radio" name="mode" onChange={() => updateParam('mode', 'Video Consult')} checked={current.mode === 'Video Consult'} /> Video Consult
        </label><br/>
        <label>
          <input data-testid="filter-in-clinic" type="radio" name="mode" onChange={() => updateParam('mode', 'In Clinic')} checked={current.mode === 'In Clinic'} /> In Clinic
        </label>
      </div>

      <div data-testid="filter-header-speciality" className="mb-4">
        <p className="font-bold">Specialities</p>
        {specialties.length > 0 ? (
          specialties.map((spec) => (
            <label key={spec}>
              <input
                data-testid={`filter-specialty-${spec.replace(/\s|\//g, '-')}`}
                type="checkbox"
                checked={searchParams.getAll('specialty').includes(spec)}
                onChange={() => toggleSpecialty(spec)}
              /> {spec}
            </label>
          ))
        ) : (
          <p>Loading specialties...</p>
        )}
      </div>

      <div data-testid="filter-header-sort">
        <p className="font-bold">Sort By</p>
        <label>
          <input data-testid="sort-fees" type="radio" name="sort" onChange={() => updateParam('sort', 'fees')} checked={current.sort === 'fees'} /> Price (Low → High)
        </label><br/>
        <label>
          <input data-testid="sort-experience" type="radio" name="sort" onChange={() => updateParam('sort', 'experience')} checked={current.sort === 'experience'} /> Experience (High → Low)
        </label>
      </div>
    </div>
  );
}

export default Filters;