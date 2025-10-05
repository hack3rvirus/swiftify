import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Package, CheckCircle, Truck, AlertCircle, Share2, Bell } from 'lucide-react';
import { useTracking, TrackingData } from '../contexts/TrackingContext';
import { apiClient } from '../lib/api';
import { generateTrackingId, isValidTrackingId } from '../lib/tracking';
import { sendNotification } from '../lib/notifications';
import MapContainer from '../components/Maps/MapContainer';
import toast from 'react-hot-toast';

const Track: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { trackingData, setTrackingData, isLoading, setIsLoading, addToSearchHistory, simulateMovement, trackingError, setTrackingError } = useTracking();
  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const initialId = searchParams.get('id');
    if (initialId) {
      handleTrack(initialId);
    }
  }, []);

  const handleTrack = async (id: string) => {
    if (!id.trim()) {
      toast.error('Please enter a tracking ID');
      return;
    }

    if (!isValidTrackingId(id)) {
      toast.error('Invalid tracking ID format');
      return;
    }

    setIsLoading(true);
    setTrackingError(null);
    setTrackingData(null);

    try {
      const response = await apiClient.trackParcel(id);

      if (response.success && response.data) {
        // Cast the API response to TrackingData type
        const trackingData: TrackingData = {
          ...response.data,
          status: response.data.status as TrackingData['status']
        };
        setTrackingData(trackingData);
        addToSearchHistory(id);
        simulateMovement(trackingData);
        toast.success('Tracking data loaded successfully');
      } else {
        setTrackingError('Tracking ID not found. Please check your tracking number and try again.');
        toast.error('Tracking ID not found');
      }
    } catch (error) {
      console.error('Tracking error:', error);
      setTrackingError('Unable to load tracking data. Please try again later.');
      toast.error('Failed to load tracking data');
    } finally {
      setIsLoading(false);
    }
  };

  const createDemoTrackingData = (id: string) => {
    const statuses = ['pending', 'picked-up', 'in-transit', 'at-hub', 'out-for-delivery', 'delivered'];
    const currentStatusIndex = Math.floor(Math.random() * statuses.length);
    const currentStatus = statuses[currentStatusIndex];

    const route = [
      { lat: 37.7749, lng: -122.4194, label: 'San Francisco, CA' },
      { lat: 37.3382, lng: -121.8863, label: 'San Jose, CA' },
      { lat: 36.7783, lng: -119.4179, label: 'Fresno, CA' },
      { lat: 35.3733, lng: -119.0187, label: 'Bakersfield, CA' },
      { lat: 34.0522, lng: -118.2437, label: 'Los Angeles, CA' }
    ];

    const history = [
      {
        status: 'Package scheduled',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        location: 'San Francisco, CA',
        notes: 'Package scheduled for pickup'
      },
      {
        status: 'Package picked up',
        timestamp: new Date(Date.now() - 72000000).toISOString(),
        location: 'San Francisco, CA',
        notes: 'Package collected from sender'
      },
      {
        status: 'In transit',
        timestamp: new Date(Date.now() - 36000000).toISOString(),
        location: 'San Jose, CA',
        notes: 'Package in transit to destination'
      }
    ];

    if (currentStatusIndex >= 3) {
      history.push({
        status: 'At distribution hub',
        timestamp: new Date(Date.now() - 18000000).toISOString(),
        location: 'Fresno, CA',
        notes: 'Package processed at distribution center'
      });
    }

    if (currentStatusIndex >= 4) {
      history.push({
        status: 'Out for delivery',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        location: 'Los Angeles, CA',
        notes: 'Package out for final delivery'
      });
    }

    if (currentStatusIndex === 5) {
      history.push({
        status: 'Delivered',
        timestamp: new Date().toISOString(),
        location: 'Los Angeles, CA',
        notes: 'Package delivered successfully'
      });
    }

    return {
      id,
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
      mode: 'auto' as const,
      history,
      route,
      currentPosition: route[Math.min(currentStatusIndex, route.length - 1)],
      eta: new Date(Date.now() + 86400000).toISOString(),
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      estimatedCost: 24.99,
      progress: (currentStatusIndex / (statuses.length - 1)) * 100
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack(trackingId);
    navigate(`/track?id=${trackingId}`);
  };

  const shareTracking = () => {
    if (trackingData) {
      const url = `${window.location.origin}/track?id=${trackingData.id}`;
      navigator.clipboard.writeText(url);
      toast.success('Tracking link copied to clipboard!');
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(notificationsEnabled ? 'Notifications disabled' : 'Notifications enabled');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'picked-up':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'in-transit':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'at-hub':
        return <MapPin className="h-5 w-5 text-orange-500" />;
      case 'out-for-delivery':
        return <Truck className="h-5 w-5 text-green-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'picked-up':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'in-transit':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'at-hub':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'out-for-delivery':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Track Your Package
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Enter your tracking ID to see real-time updates
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking ID (e.g., SWIFT-123456)"
                className="w-full px-6 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <MapPin className="h-5 w-5" />
                  <span>Track</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo IDs */}
        {!trackingData && (
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try these demo tracking IDs:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['SWIFT-123456', 'SWIFT-789012', 'SWIFT-345678'].map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setTrackingId(id);
                    handleTrack(id);
                  }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {trackingError && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
                Tracking ID Not Found
              </h3>
              <p className="text-red-600 dark:text-red-400">
                {trackingError}
              </p>
            </div>
          </div>
        )}

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-8">
            {/* Package Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Package #{trackingData.id}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingData.status)}`}>
                      {getStatusIcon(trackingData.status)}
                      <span className="ml-2 capitalize">{trackingData.status.replace('-', ' ')}</span>
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Created {new Date(trackingData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={shareTracking}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Share tracking link"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={toggleNotifications}
                    className={`p-2 transition-colors ${
                      notificationsEnabled 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    title="Toggle notifications"
                  >
                    <Bell className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(trackingData.progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${trackingData.progress}%` }}
                  ></div>
                </div>
                {trackingData.progress >= 50 && trackingData.progress < 100 && (
                  <div className="text-center mt-2">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                      🎉 Halfway There!
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sender & Receiver Info */}
                <div className="lg:col-span-1 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sender</h3>
                    <div className="space-y-2 text-sm">
                      <div className="text-gray-900 dark:text-white font-medium">{trackingData.sender.name}</div>
                      <div className="text-gray-600 dark:text-gray-400">{trackingData.sender.email}</div>
                      <div className="text-gray-600 dark:text-gray-400">{trackingData.sender.phone}</div>
                      <div className="text-gray-600 dark:text-gray-400">{trackingData.sender.address}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Receiver</h3>
                    <div className="space-y-2 text-sm">
                      <div className="text-gray-900 dark:text-white font-medium">{trackingData.receiver.name}</div>
                      <div className="text-gray-600 dark:text-gray-400">{trackingData.receiver.email}</div>
                      <div className="text-gray-600 dark:text-gray-400">{trackingData.receiver.phone}</div>
                      <div className="text-gray-600 dark:text-gray-400">{trackingData.receiver.address}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Package Details</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Description:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">{trackingData.parcelDetails.description}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Weight:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">{trackingData.parcelDetails.weight}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Value:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">${trackingData.parcelDetails.value}</span>
                      </div>
                      {trackingData.parcelDetails.instructions && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Instructions:</span>
                          <span className="ml-2 text-gray-900 dark:text-white">{trackingData.parcelDetails.instructions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Route & Location</h3>
                  <MapContainer
                    center={trackingData.currentPosition || trackingData.route[0]}
                    zoom={8}
                    markers={[
                      {
                        position: trackingData.route[0],
                        title: 'Origin',
                        color: '#28A745'
                      },
                      ...(trackingData.currentPosition ? [{
                        position: trackingData.currentPosition,
                        title: 'Current Location',
                        color: '#007BFF'
                      }] : []),
                      {
                        position: trackingData.route[trackingData.route.length - 1],
                        title: 'Destination',
                        color: '#DC3545'
                      }
                    ]}
                    route={trackingData.route}
                    className="w-full h-80 rounded-xl"
                  />
                  
                  {trackingData.eta && (
                    <div className="mt-4 text-center">
                      <span className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                        <Clock className="h-4 w-4 mr-2" />
                        ETA: {new Date(trackingData.eta).toLocaleDateString()} at {new Date(trackingData.eta).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tracking History</h3>
              
              <div className="space-y-6">
                {trackingData.history.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        {getStatusIcon(event.status)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {event.status}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {event.location}
                      </p>
                      {event.notes && (
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          {event.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;