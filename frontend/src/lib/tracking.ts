import { v4 as uuidv4 } from 'uuid';

// Generate unique tracking ID
export const generateTrackingId = (): string => {
  const prefix = 'SWIFT';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
};

// Validate tracking ID format
export const isValidTrackingId = (id: string): boolean => {
  const pattern = /^SWIFT-[A-Z0-9]{8,12}$/;
  return pattern.test(id);
};

// Generate route coordinates
export const generateRouteCoordinates = (start: { lat: number; lng: number }, end: { lat: number; lng: number }, waypoints: number = 5) => {
  const route = [start];
  
  for (let i = 1; i < waypoints; i++) {
    const progress = i / waypoints;
    const lat = start.lat + (end.lat - start.lat) * progress;
    const lng = start.lng + (end.lng - start.lng) * progress;
    
    // Add some randomness to make route more realistic
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    
    route.push({
      lat: lat + latOffset,
      lng: lng + lngOffset
    });
  }
  
  route.push(end);
  return route;
};

// Calculate distance between two points (Haversine formula)
export const calculateDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Estimate delivery time based on distance
export const estimateDeliveryTime = (distance: number): Date => {
  const baseTime = 2; // Base delivery time in hours
  const speedKmh = 50; // Average speed in km/h
  const additionalTime = distance / speedKmh;
  
  const deliveryTime = new Date();
  deliveryTime.setHours(deliveryTime.getHours() + baseTime + additionalTime);
  
  return deliveryTime;
};

// Calculate shipping cost
export const calculateShippingCost = (weight: string, distance: number): number => {
  const baseCost = 15;
  const weightMultipliers = {
    '<1kg': 1.0,
    '1-5kg': 1.2,
    '5-10kg': 1.5,
    '10-20kg': 2.0,
    '20kg+': 2.5
  };
  
  const weightMultiplier = weightMultipliers[weight as keyof typeof weightMultipliers] || 1.0;
  const distanceMultiplier = Math.max(1, distance / 100); // $1 per 100km
  
  return Math.round(baseCost * weightMultiplier * distanceMultiplier * 100) / 100;
};

// Simulate parcel movement along route
export class ParcelSimulator {
  private route: { lat: number; lng: number }[];
  private currentIndex: number = 0;
  private isRunning: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;
  private onUpdate: (position: { lat: number; lng: number }, progress: number) => void;

  constructor(route: { lat: number; lng: number }[], onUpdate: (position: { lat: number; lng: number }, progress: number) => void) {
    this.route = route;
    this.onUpdate = onUpdate;
  }

  start(intervalMs: number = 10000) { // Update every 10 seconds
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      if (this.currentIndex < this.route.length - 1) {
        this.currentIndex++;
        const progress = (this.currentIndex / (this.route.length - 1)) * 100;
        this.onUpdate(this.route[this.currentIndex], progress);
      } else {
        this.stop();
      }
    }, intervalMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  getCurrentPosition() {
    return this.route[this.currentIndex];
  }

  getProgress() {
    return (this.currentIndex / (this.route.length - 1)) * 100;
  }
}