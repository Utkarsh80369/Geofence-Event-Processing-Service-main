import React from 'react';

const ControlPanel = ({ vehicleId, setVehicleId, lat, setLat, lng, setLng, onUpdate }) => {
  const inputStyle = { padding: '8px', width: '100%', boxSizing: 'border-box', backgroundColor: '#444', color: 'white', border: '1px solid #666', marginBottom: '10px' };

  return (
    <div style={{ border: '1px solid #555', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#333' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Vehicle ID:</label>
        <input value={vehicleId} onChange={e => setVehicleId(e.target.value)} style={inputStyle} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Latitude:</label>
        <input type="number" value={lat} onChange={e => setLat(e.target.value)} style={inputStyle} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>Longitude:</label>
        <input type="number" value={lng} onChange={e => setLng(e.target.value)} style={inputStyle} />
      </div>
      <button onClick={onUpdate} style={{ padding: '12px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
        Send GPS Update
      </button>
    </div>
  );
};

export default ControlPanel;