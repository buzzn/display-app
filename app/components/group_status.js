import React from 'react';

const GroupStatus = ({ value, text }) => (
  <div style={{ position: 'absolute', left: '30%', top: '40px' }}>
    <div style={{ margin: 'auto', width: '184px', height: '184px', borderRadius: '10px', backgroundColor: '#e0e0e0' }}>
      <div style={{ textAlign: 'center', paddingTop: '20px', fontSize: '70px' }}>
        { value ? `${Math.round(value * 100)}%` : 'n.a' }
      </div>
      <div style={{ textAlign: 'center', fontSize: '20px' }}>
        { text }
      </div>
    </div>
  </div>
);

export default GroupStatus;