import L from 'leaflet';

// Map configuration and utilities
export const DEFAULT_CENTER = { lat: 39.8283, lng: -98.5795 }; // Center of USA
export const DEFAULT_ZOOM = 4;

// Check if Google Maps is available
export const isGoogleMapsAvailable = () => {
  return !!(import.meta.env.VITE_GOOGLE_MAPS_API_KEY && import.meta.env.VITE_ENABLE_GOOGLE_MAPS === 'true');
};

// Generate route between two points
export const generateRoute = async (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
  try {
    if (isGoogleMapsAvailable()) {
      // Use Google Maps Directions API
      return await generateGoogleRoute(start, end);
    } else {
      // Use OSRM (free routing service)
      return await generateOSRMRoute(start, end);
    }
  } catch (error) {
    console.warn('Route generation failed, using direct line');
    return generateDirectRoute(start, end);
  }
};

// Google Maps routing
const generateGoogleRoute = async (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
  // In a real implementation, this would call Google Directions API
  // For now, return a demo route
  return generateDirectRoute(start, end);
};

// OSRM routing (free alternative)
const generateOSRMRoute = async (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
    );
    
    if (!response.ok) throw new Error('OSRM request failed');
    
    const data = await response.json();
    const coordinates = data.routes[0].geometry.coordinates;
    
    return coordinates.map(([lng, lat]: [number, number]) => ({ lat, lng }));
  } catch (error) {
    console.warn('OSRM routing failed, using direct route');
    return generateDirectRoute(start, end);
  }
};

// Fallback direct route
const generateDirectRoute = (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
  const steps = 10;
  const route = [];
  
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const lat = start.lat + (end.lat - start.lat) * progress;
    const lng = start.lng + (end.lng - start.lng) * progress;
    route.push({ lat, lng });
  }
  
  return route;
};

// Geocoding utilities
export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    if (isGoogleMapsAvailable()) {
      return await geocodeWithGoogle(address);
    } else {
      return await geocodeWithNominatim(address);
    }
  } catch (error) {
    console.warn('Geocoding failed:', error);
    return null;
  }
};

// Google Geocoding
const geocodeWithGoogle = async (address: string) => {
  // In a real implementation, this would use Google Geocoding API
  // For now, return demo coordinates
  return { lat: 37.7749, lng: -122.4194 }; // San Francisco
};

// Nominatim geocoding (free alternative)
const geocodeWithNominatim = async (address: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
    );
    
    if (!response.ok) throw new Error('Nominatim request failed');
    
    const data = await response.json();
    if (data.length === 0) return null;
    
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  } catch (error) {
    console.warn('Nominatim geocoding failed:', error);
    return null;
  }
};

// Leaflet map configuration
export const createLeafletMap = (containerId: string, center = DEFAULT_CENTER, zoom = DEFAULT_ZOOM) => {
  const map = L.map(containerId).setView([center.lat, center.lng], zoom);
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  return map;
};

// Custom marker icons
export const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};