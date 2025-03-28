import React, { useState } from 'react';
import { Search } from 'lucide-react';

const AboutFund = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', minHeight: '100vh', paddingLeft: '45px', paddingRight: '45px' }}>
      <h1 style={{ textAlign: 'left', fontFamily: "Arial, sans-serif", fontSize: '62px', marginBottom: '20px', marginTop: '0px' }}>
        About Fund
      </h1>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            style={{
              width: '100%',
              padding: '10px 10px 10px 35px', // Adjust padding to make space for the icon
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
            }}
          />
        </div>
      </div>

      {/* Add more content here as needed */}
    </div>
  );
};

export default AboutFund;
