import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TrackingData } from './TrackingContext';
import { apiClient } from '../lib/api';
import toast from 'react-hot-toast';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (key: string) => Promise<boolean>;
  logout: () => void;
  parcels: TrackingData[];
  refreshParcels: () => Promise<void>;
  updateParcel: (id: string, updates: Partial<TrackingData>) => Promise<void>;
  deleteParcel: (id: string) => Promise<void>;
  createOrder: (data: any) => Promise<string | null>;
  settings: {
    location_address: string;
    live_chat_code: string;
    phone_number: string;
  };
  updateSettings: (updates: Partial<{ location_address: string; live_chat_code: string; phone_number: string }>) => Promise<void>;
  sendEmail: (data: { email: string; subject: string; message: string }) => Promise<boolean>;
  stats: {
    totalParcels: number;
    delivered: number;
    inTransit: number;
    pending: number;
    onTimeDelivery: number;
  };
  token: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [parcels, setParcels] = useState<TrackingData[]>([]);
  const [settings, setSettings] = useState({
    location_address: '',
    live_chat_code: '',
    phone_number: ''
  });
  const [token, setToken] = useState<string | null>(null);

  const login = async (key: string): Promise<boolean> => {
    const response = await apiClient.adminLogin(key);
    if (response.success && response.data) {
      setToken(response.data.token);
      setIsAuthenticated(true);
      await refreshParcels();
      await loadSettings();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setParcels([]);
    setSettings({ location_address: '', live_chat_code: '', phone_number: '' });
  };

  const refreshParcels = async () => {
    if (!token) return;
    const response = await apiClient.getAllParcels(token);
    if (response.success && response.data) {
      setParcels(response.data);
    }
  };

  const updateParcel = async (id: string, updates: Partial<TrackingData>) => {
    if (!token) return;
    const response = await apiClient.updateParcel(id, updates, token);
    if (response.success) {
      await refreshParcels();
      toast.success('Parcel updated successfully');
    } else {
      toast.error('Failed to update parcel');
    }
  };

  const deleteParcel = async (id: string) => {
    if (!token) return;
    const response = await apiClient.deleteParcel(id, token);
    if (response.success) {
      await refreshParcels();
      toast.success('Parcel deleted successfully');
    } else {
      toast.error('Failed to delete parcel');
    }
  };

  const createOrder = async (data: any): Promise<string | null> => {
    if (!token) return null;
    const response = await apiClient.createOrderAdmin(data, token);
    if (response.success && response.data) {
      await refreshParcels();
      toast.success('Order created successfully');
      return response.data.trackingId;
    } else {
      toast.error('Failed to create order');
      return null;
    }
  };

  const loadSettings = async () => {
    if (!token) return;
    const response = await apiClient.getSettings(token);
    if (response.success && response.data) {
      setSettings(response.data);
    }
  };

  const updateSettings = async (updates: Partial<{ location_address: string; live_chat_code: string; phone_number: string }>) => {
    if (!token) return;
    const response = await apiClient.updateSettings(updates, token);
    if (response.success) {
      setSettings(prev => ({ ...prev, ...updates }));
      toast.success('Settings updated successfully');
    } else {
      toast.error('Failed to update settings');
    }
  };

  const sendEmail = async (data: { email: string; subject: string; message: string }): Promise<boolean> => {
    if (!token) return false;
    const response = await apiClient.sendEmail(data, token);
    if (response.success && response.data?.success) {
      toast.success('Email sent successfully');
      return true;
    } else {
      toast.error('Failed to send email');
      return false;
    }
  };

  const stats = {
    totalParcels: parcels.length,
    delivered: parcels.filter(p => p.status === 'delivered').length,
    inTransit: parcels.filter(p => p.status === 'in-transit' || p.status === 'out-for-delivery').length,
    pending: parcels.filter(p => p.status === 'pending').length,
    onTimeDelivery: 98.5,
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        parcels,
        refreshParcels,
        updateParcel,
        deleteParcel,
        createOrder,
        settings,
        updateSettings,
        sendEmail,
        stats,
        token,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
