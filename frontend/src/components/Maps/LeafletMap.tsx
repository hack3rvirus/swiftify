import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createLeafletMap, createCustomIcon } from '../../lib/maps';

interface LeafletMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title?: string;
    color?: string;
  }>;
  route?: Array<{ lat: number; lng: number }>;
  onMapClick?: (lat: number, lng: number) => void;
  className?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  center = { lat: 39.8283, lng: -98.5795 },
  zoom = 4,
  markers = [],
  route = [],
  onMapClick,
  className = "w-full h-96"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const routeRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    mapInstanceRef.current = createLeafletMap(mapRef.current.id, center, zoom);

    // Add click handler
    if (onMapClick) {
      mapInstanceRef.current.on('click', (e: L.LeafletMouseEvent) => {
        onMapClick(e.latlng.lat, e.latlng.lng);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    markers.forEach(({ position, title, color = '#007BFF' }) => {
      const marker = L.marker([position.lat, position.lng], {
        icon: createCustomIcon(color)
      });

      if (title) {
        marker.bindPopup(title);
      }

      marker.addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });
  }, [markers]);

  // Update route
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing route
    if (routeRef.current) {
      mapInstanceRef.current.removeLayer(routeRef.current);
    }

    // Add new route
    if (route.length > 1) {
      const latlngs = route.map(point => [point.lat, point.lng] as [number, number]);
      routeRef.current = L.polyline(latlngs, {
        color: '#007BFF',
        weight: 4,
        opacity: 0.7
      });

      routeRef.current.addTo(mapInstanceRef.current);

      // Fit map to route bounds
      const bounds = routeRef.current.getBounds();
      mapInstanceRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [route]);

  // Update center and zoom
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([center.lat, center.lng], zoom);
  }, [center, zoom]);

  return (
    <div 
      ref={mapRef} 
      id={`leaflet-map-${Math.random().toString(36).substr(2, 9)}`}
      className={className}
      style={{ minHeight: '300px' }}
    />
  );
};

export default LeafletMap;