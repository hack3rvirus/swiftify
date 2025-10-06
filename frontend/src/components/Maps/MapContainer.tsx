import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Zap } from 'lucide-react';
import LeafletMap from './LeafletMap';
import { isGoogleMapsAvailable } from '../../lib/maps';

interface MapContainerProps {
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
  showControls?: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({
  center = { lat: 39.8283, lng: -98.5795 },
  zoom = 4,
  markers = [],
  route = [],
  onMapClick,
  className = "w-full h-96",
  showControls = true
}) => {
  const [mapProvider, setMapProvider] = useState<'google' | 'leaflet'>('leaflet');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check which map provider to use
    const provider = isGoogleMapsAvailable() ? 'google' : 'leaflet';
    setMapProvider(provider);
    setIsLoading(false);
  }, []);

  const handleProviderSwitch = () => {
    setMapProvider(prev => prev === 'google' ? 'leaflet' : 'google');
  };

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Map Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
            <button
              onClick={handleProviderSwitch}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              title={`Switch to ${mapProvider === 'google' ? 'OpenStreetMap' : 'Google Maps'}`}
            >
              {mapProvider === 'google' ? (
                <>
                  <Navigation className="h-4 w-4" />
                  <span>Google</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  <span>OSM</span>
                </>
              )}
            </button>
          </div>
          
          {route.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
              <div className="flex items-center space-x-2 px-3 py-2 text-sm">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Live Route</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Map Provider Info */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-gray-600 dark:text-gray-400">
          {mapProvider === 'google' ? 'Google Maps' : 'OpenStreetMap'} • Free
        </div>
      </div>

      {/* Render Map */}
      {mapProvider === 'google' ? (
        // Google Maps would go here if API key is available
        <div className={`${className} bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg flex items-center justify-center`}>
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Google Maps integration ready
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Add VITE_GOOGLE_MAPS_API_KEY to enable
            </p>
          </div>
        </div>
      ) : (
        <LeafletMap
          center={center}
          zoom={zoom}
          markers={markers}
          route={route}
          onMapClick={onMapClick}
          className={className}
        />
      )}
    </div>
  );
};

export default MapContainer;