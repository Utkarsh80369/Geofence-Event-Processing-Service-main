import React from 'react';

const LogConsole = ({ logs }) => {
  return (
    <div>
      <h3>Event Log:</h3>
      <ul style={{ 
          background: '#fff', 
          color: 'black', 
          padding: '15px', 
          borderRadius: '5px', 
          listStyleType: 'none', 
          maxHeight: '200px', 
          overflowY: 'auto' 
      }}>
        {logs.length === 0 ? (
          <li style={{ color: '#888' }}>No events yet...</li>
        ) : (
          logs.map((log, index) => (
            <li key={index} style={{ borderBottom: '1px solid #eee', padding: '5px 0', color: 'black' }}>
              {log}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LogConsole;