import React, { useState } from 'react';
import axios from 'axios'; // Import Axios to make real requests
// We keep your UI components
import ControlPanel from './components/ControlPanel';
import StatusIndicator from './components/StatusIndicator';
import LogConsole from './components/LogConsole';

const App = () => {
  // State
  const [vehicleId, setVehicleId] = useState('taxi-001');
  const [lat, setLat] = useState(40.8000); 
  const [lng, setLng] = useState(-74.0000);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('OUTSIDE_ZONE');

  const handleUpdate = async () => {
    try {
      console.log("⚡ Sending to REAL Backend...");

      // 1. Construct the payload expected by your Node.js backend
      const payload = {
        vehicleId: vehicleId,
        latitude: Number(lat),
        longitude: Number(lng)
      };

      // 2. Make the HTTP POST request (Using 127.0.0.1 is safer than localhost)
      const response = await axios.post('http://127.0.0.1:5000/api/location', payload);
      
      const data = response.data;
      console.log("✅ Backend Response:", data);

      // 3. Update Status based on REAL data
      // Backend returns: { currentZone: "Name" or null }
      const newStatus = data.currentZone ? `INSIDE ${data.currentZone}` : 'OUTSIDE_ZONE';
      setStatus(newStatus);

      // 4. Update Logs
      const timestamp = new Date().toLocaleTimeString();
      // Backend returns: { event: "ENTER" or "EXIT" }
      const newLog = `[${timestamp}] ${data.event}: ${newStatus}`;
      
      setLogs(prev => [newLog, ...prev]);

    } catch (err) {
      console.error("❌ Connection Error:", err);
      // Helpful alert for debugging
      if (err.code === "ERR_NETWORK") {
        alert("Cannot connect to Backend! Is 'node server.js' running?");
      } else {
        alert('Error: ' + err.message);
      }
    }
  };

  return (
    // MAIN CONTAINER
    <div style={{ 
      display: 'flex',            
      minHeight: '100vh',         
      width: '100vw',             
      backgroundColor: '#222', 
      color: '#fff', 
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box'
    }}>
      
      {/* CONTENT WRAPPER */}
      <div style={{ 
        margin: 'auto',            
        width: '100%', 
        maxWidth: '500px',        
        textAlign: 'center',       
        padding: '20px'
      }}>
        
        <h1 style={{ marginBottom: '20px' }}>
          🚖 Geofence Controller <br/>
          <span style={{fontSize:'0.5em', color: '#4dff88'}}>(Connected to Backend)</span>
        </h1>

        {/* 1. INPUTS */}
        {/* Pass the handleUpdate function to your ControlPanel button */}
        <ControlPanel 
          vehicleId={vehicleId} setVehicleId={setVehicleId}
          lat={lat} setLat={setLat}
          lng={lng} setLng={setLng}
          onUpdate={handleUpdate}
        />

        {/* 2. STATUS */}
        <StatusIndicator status={status} />

        {/* 3. LOGS */}
        <LogConsole logs={logs} />
        
      </div>
    </div>
  );
};

export default App;