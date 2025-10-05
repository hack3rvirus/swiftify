const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://swiftifyy.onrender.com';

// Check if backend is available
const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      timeout: 5000
    } as any);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ScheduleRequest {
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
  parcelDetails: {
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
  };
}

export interface TrackingResponse {
  id: string;
  sender: any;
  receiver: any;
  parcelDetails: any;
  status: string;
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

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.detail || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async scheduleDelivery(data: ScheduleRequest): Promise<ApiResponse<{ trackingId: string }>> {
    try {
      return await this.request('/api/schedule', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      // Fallback to demo mode if backend is unavailable
      const trackingId = `SWIFT-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      // Store in localStorage for demo
      const parcel = {
        id: trackingId,
        ...data,
        status: 'pending',
        mode: 'auto',
        history: [{
          status: 'Package scheduled',
          timestamp: new Date().toISOString(),
          location: data.sender.address.split(',')[0],
          notes: 'Package scheduled for pickup'
        }],
        route: [
          { lat: 37.7749, lng: -122.4194, label: 'San Francisco, CA' },
          { lat: 34.0522, lng: -118.2437, label: 'Los Angeles, CA' }
        ],
        currentPosition: { lat: 37.7749, lng: -122.4194 },
        eta: new Date(Date.now() + 86400000).toISOString(),
        createdAt: new Date().toISOString(),
        estimatedCost: 24.99,
        progress: 0
      };
      
      localStorage.setItem(`parcel_${trackingId}`, JSON.stringify(parcel));
      
      return {
        success: true,
        data: { trackingId }
      };
    }
  }

  async trackParcel(trackingId: string): Promise<ApiResponse<TrackingResponse>> {
    try {
      return await this.request(`/api/track/${trackingId}`);
    } catch (error) {
      // Fallback to localStorage for demo
      const stored = localStorage.getItem(`parcel_${trackingId}`);
      if (stored) {
        return {
          success: true,
          data: JSON.parse(stored)
        };
      }
      
      // Return demo data for common tracking IDs
      if (['SWIFT-123456', 'SWIFT-789012', 'SWIFT-345678'].includes(trackingId)) {
        const demoData = this.createDemoData(trackingId);
        return {
          success: true,
          data: demoData
        };
      }
      
      return {
        success: false,
        error: 'Tracking ID not found'
      };
    }
  }

  private createDemoData(trackingId: string): TrackingResponse {
    const statuses = ['pending', 'picked-up', 'in-transit', 'at-hub', 'out-for-delivery', 'delivered'];
    const currentStatusIndex = Math.floor(Math.random() * statuses.length);
    const currentStatus = statuses[currentStatusIndex];

    return {
      id: trackingId,
      sender: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, San Francisco, CA 94102'
      },
      receiver: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Avenue, Los Angeles, CA 90210'
      },
      parcelDetails: {
        description: 'Electronics and accessories',
        weight: '2-5kg',
        dimensions: { length: 30, width: 20, height: 15 },
        value: 299.99,
        instructions: 'Handle with care - fragile items'
      },
      status: currentStatus as any,
      mode: 'auto',
      history: [
        {
          status: 'Package scheduled',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          location: 'San Francisco, CA',
          notes: 'Package scheduled for pickup'
        }
      ],
      route: [
        { lat: 37.7749, lng: -122.4194, label: 'San Francisco, CA' },
        { lat: 34.0522, lng: -118.2437, label: 'Los Angeles, CA' }
      ],
      currentPosition: { lat: 37.7749, lng: -122.4194 },
      eta: new Date(Date.now() + 86400000).toISOString(),
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      estimatedCost: 24.99,
      progress: (currentStatusIndex / (statuses.length - 1)) * 100
    };
  }

  async adminLogin(key: string): Promise<ApiResponse<{ token: string }>> {
    return this.request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ key }),
    });
  }

  async updateParcel(
    trackingId: string,
    updates: Partial<TrackingResponse>,
    token: string
  ): Promise<ApiResponse<TrackingResponse>> {
    return this.request(`/api/admin/parcel/${trackingId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  }

  async getAllParcels(token: string): Promise<ApiResponse<TrackingResponse[]>> {
    return this.request('/api/admin/parcels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createOrderAdmin(data: ScheduleRequest, token: string): Promise<ApiResponse<{ trackingId: string }>> {
    return this.request('/api/admin/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async deleteParcel(trackingId: string, token: string): Promise<ApiResponse<{ detail: string }>> {
    return this.request(`/api/admin/parcel/${trackingId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getSettings(token: string): Promise<ApiResponse<{ location_address: string; live_chat_code: string; phone_number: string }>> {
    return this.request('/api/admin/settings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateSettings(data: { location_address?: string; live_chat_code?: string; phone_number?: string }, token: string): Promise<ApiResponse<any>> {
    return this.request('/api/admin/settings', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async sendEmail(data: { email: string; subject: string; message: string }, token: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request('/api/admin/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async updateRoute(trackingId: string, route: any[], token: string): Promise<ApiResponse<TrackingResponse>> {
    return this.request(`/api/admin/parcel/${trackingId}/route`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ route }),
    });
  }

  async submitContact(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<ApiResponse<{ success: boolean }>> {
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();