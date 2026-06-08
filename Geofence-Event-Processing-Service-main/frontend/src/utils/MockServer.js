import { ZONES, calculateDistance } from './GeofenceMath';

export const processMockLocation = (lat, lng, previousZoneId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. Find Current Zone
      let currentZoneId = null;
      for (const zone of ZONES) {
        const distance = calculateDistance(lat, lng, zone.lat, zone.lng);
        if (distance <= zone.radius) {
          currentZoneId = zone.id;
          break;
        }
      }

      // 2. Detect Events
      const events = [];
      
      // EXITED? (Was in a zone, now different or null)
      if (previousZoneId && previousZoneId !== currentZoneId) {
        events.push({ type: 'EXIT', zoneId: previousZoneId });
      }

      // ENTERED? (Now in a zone, different from before)
      if (currentZoneId && currentZoneId !== previousZoneId) {
        events.push({ type: 'ENTER', zoneId: currentZoneId });
      }

      resolve({
        success: true,
        currentZoneId, // Return this so App can save it to memory
        status: currentZoneId ? `INSIDE_${currentZoneId.toUpperCase()}` : 'OUTSIDE_ZONE',
        eventsGenerated: events
      });
    }, 500); // Simulate network delay
  });
};