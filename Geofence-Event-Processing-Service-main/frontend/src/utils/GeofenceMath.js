// 1. Configuration: Define the zones
export const ZONES = [
  { id: 'zone_downtown', name: 'Downtown', lat: 40.7128, lng: -74.0060, radius: 1000 },
  { id: 'zone_airport', name: 'Airport', lat: 40.6413, lng: -73.7781, radius: 2000 }
];

// 2. Math: Calculate distance between two points in meters
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
};