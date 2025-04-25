import React, { useState } from 'react';

function Autocomplete({ searchParams, setSearchParams, doctors }) {
  const [input, setInput] = useState(searchParams.get('search') || '');

  const handleSelect = (name) => {
    setSearchParams({ ...Object.fromEntries(searchParams), search: name });
  };

  const suggestions = input
    ? doctors
        .filter(doc => doc.name.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 3)
    : [];

  return (
    <div className="mb-4">
      <input
        data-testid="autocomplete-input"
        type="text"
        className="border p-2 w-full"
        placeholder="Search Symptoms, Doctors, Specialities, Clinics"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSelect(input)}
      />
      {suggestions.length > 0 && (
        <div className="border bg-white shadow">
          {suggestions.map((doc, idx) => (
            <div
              data-testid="suggestion-item"
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(doc.name)}
            >
              {doc.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
