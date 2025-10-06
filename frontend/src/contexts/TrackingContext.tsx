import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ParcelDetails {
  description: string;
  weight: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  value: number;
  instructions: string;
  photo?: string;
}

export type TrackingData = {
  id: string;
  sender: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  receiver: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  parcelDetails: ParcelDetails;
  status: 'pending' | 'picked-up' | 'in-transit' | 'at-hub' | 'out-for-delivery' | 'delivered';
  mode: 'auto' | 'manual';
  history: Array<{
    status: string;
    timestamp: string;
    location: string;
    notes?: string;
  }>;
  route: Array<{
    lat: number;
    lng: number;
    label?: string;
  }>;
  currentPosition?: {
    lat: number;
    lng: number;
  };
  eta: string;
  createdAt: string;
  estimatedCost?: number;
  progress: number;
}

interface TrackingContextType {
  trackingData: TrackingData | null;
  setTrackingData: (data: TrackingData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  searchHistory: string[];
  addToSearchHistory: (id: string) => void;
  simulateMovement: (data: TrackingData) => void;
  trackingError: string | null;
  setTrackingError: (error: string | null) => void;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const useTracking = (): TrackingContextType => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};

export const TrackingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('swiftify-search-history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  const addToSearchHistory = (id: string) => {
    const updated = [id, ...searchHistory.filter(item => item !== id)].slice(0, 10);
    setSearchHistory(updated);
    localStorage.setItem('swiftify-search-history', JSON.stringify(updated));
  };

  const simulateMovement = (data: TrackingData) => {
    if (data.mode === 'auto' && data.status === 'in-transit' && data.route.length > 1) {
      // Simulate movement along the route
      let currentIndex = Math.floor(data.progress * (data.route.length - 1) / 100);
      const interval = setInterval(() => {
        if (currentIndex < data.route.length - 1) {
          currentIndex++;
          const progress = (currentIndex / (data.route.length - 1)) * 100;
          setTrackingData(prev => prev ? {
            ...prev,
            currentPosition: data.route[currentIndex],
            progress: Math.min(progress, 100)
          } : null);
        } else {
          clearInterval(interval);
        }
      }, 10000); // Update every 10 seconds for demo

      return () => clearInterval(interval);
    }
  };

  return (
    <TrackingContext.Provider
      value={{
        trackingData,
        setTrackingData,
        isLoading,
        setIsLoading,
        searchHistory,
        addToSearchHistory,
        simulateMovement,
        trackingError,
        setTrackingError,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};