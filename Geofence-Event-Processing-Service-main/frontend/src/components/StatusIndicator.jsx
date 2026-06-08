import React from 'react';

const StatusIndicator = ({ status }) => {
  const getColor = () => status.includes('INSIDE') ? '#0f0' : '#f00'; // Green if inside, Red if outside

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Current Status: <span style={{ color: getColor() }}>{status}</span></h3>
    </div>
  );
};

export default StatusIndicator;