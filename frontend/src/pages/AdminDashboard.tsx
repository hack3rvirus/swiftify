import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, TrendingUp, Users, Clock, MapPin, Edit3, Eye, LogOut, Search, Filter, Download, Plus, BarChart3, Settings, Mail, Trash2, Save, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { TrackingData } from '../contexts/TrackingContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout, parcels, refreshParcels, updateParcel, deleteParcel, createOrder, settings, updateSettings, sendEmail, stats } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedParcel, setSelectedParcel] = useState<TrackingData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [routeStops, setRouteStops] = useState<any[]>([]);

  const { register: registerCreate, handleSubmit: handleSubmitCreate, reset: resetCreate, formState: { errors: errorsCreate } } = useForm();
  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, setValue: setValueEdit, formState: { errors: errorsEdit } } = useForm();
  const { register: registerSettings, handleSubmit: handleSubmitSettings, setValue: setValueSettings } = useForm();
  const { register: registerEmail, handleSubmit: handleSubmitEmail, reset: resetEmail } = useForm();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    refreshParcels();
  }, [isAuthenticated, navigate, refreshParcels]);

  useEffect(() => {
    setValueSettings('location_address', settings.location_address);
    setValueSettings('live_chat_code', settings.live_chat_code);
    setValueSettings('phone_number', settings.phone_number);
  }, [settings, setValueSettings]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.receiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.parcelDetails.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditParcel = (parcel: TrackingData) => {
    setSelectedParcel(parcel);
    setValueEdit('status', parcel.status);
    setValueEdit('tracking_number', parcel.id);
    setValueEdit('parcel_name', parcel.parcelDetails.description);
    setValueEdit('sender_name', parcel.sender.name);
    setValueEdit('sender_email', parcel.sender.email);
    setValueEdit('sender_address', parcel.sender.address);
    setValueEdit('receiver_name', parcel.receiver.name);
    setValueEdit('receiver_email', parcel.receiver.email);
    setValueEdit('receiver_address', parcel.receiver.address);
    setValueEdit('amount', parcel.estimatedCost || 0);
    setValueEdit('date', new Date(parcel.createdAt).toISOString().split('T')[0]);
    setRouteStops(parcel.route || []);
    setShowEditModal(true);
  };

  const onSubmitCreate = async (data: any) => {
    const orderData = {
      sender: {
        name: data.sender_name,
        email: data.sender_email,
        phone: data.sender_phone,
        address: data.sender_address
      },
      receiver: {
        name: data.receiver_name,
        email: data.receiver_email,
        phone: data.receiver_phone,
        address: data.receiver_address
      },
      parcelDetails: {
        description: data.parcel_name,
        weight: data.weight,
        dimensions: {
          length: parseFloat(data.length),
          width: parseFloat(data.width),
          height: parseFloat(data.height)
        },
        value: parseFloat(data.value),
        instructions: data.instructions
      }
    };
    await createOrder(orderData);
    setShowCreateModal(false);
    resetCreate();
  };

  const onSubmitEdit = async (data: any) => {
    if (!selectedParcel) return;
    const updates: any = {
      status: data.status,
      parcelDetails: {
        ...selectedParcel.parcelDetails,
        description: data.parcel_name
      },
      sender: {
        ...selectedParcel.sender,
        name: data.sender_name,
        email: data.sender_email,
        address: data.sender_address
      },
      receiver: {
        ...selectedParcel.receiver,
        name: data.receiver_name,
        email: data.receiver_email,
        address: data.receiver_address
      },
      estimatedCost: parseFloat(data.amount)
    };
    await updateParcel(selectedParcel.id, updates);
    setShowEditModal(false);
    setSelectedParcel(null);
  };

  const onSubmitSettings = async (data: any) => {
    await updateSettings(data);
  };

  const onSubmitEmail = async (data: any) => {
    await sendEmail(data);
    resetEmail();
  };

  const addStop = () => {
    setRouteStops([...routeStops, { lat: 0, lng: 0, label: '' }]);
  };

  const updateStop = (index: number, field: string, value: any) => {
    const newStops = [...routeStops];
    newStops[index] = { ...newStops[index], [field]: value };
    setRouteStops(newStops);
  };

  const removeStop = (index: number) => {
    setRouteStops(routeStops.filter((_, i) => i !== index));
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Swiftify Admin
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Logistics Management Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'create-order', name: 'Create Order', icon: Plus },
              { id: 'orders', name: 'Orders', icon: Package },
              { id: 'settings', name: 'Settings', icon: Settings },
              { id: 'email', name: 'Email', icon: Mail }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Parcels</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalParcels}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
                    <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">In Transit</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.inTransit}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Recent Orders
              </h3>
              <div className="space-y-4">
                {parcels.slice(0, 5).map((parcel) => (
                  <div key={parcel.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Package className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{parcel.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {parcel.parcelDetails.description}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(parcel.status)}`}>
                      {parcel.status.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Create Order Tab */}
        {activeTab === 'create-order' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Create New Order
            </h3>
            <form onSubmit={handleSubmitCreate(onSubmitCreate)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Parcel Name *
                  </label>
                  <input
                    {...registerCreate('parcel_name', { required: 'Parcel name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter the name of the Parcel"
                  />
                  {errorsCreate.parcel_name && <p className="text-red-500 text-sm mt-1">{errorsCreate.parcel_name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount ($) *
                  </label>
                  <input
                    {...registerCreate('value', { required: 'Amount is required' })}
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Total Cost of the Parcel"
                  />
                  {errorsCreate.value && <p className="text-red-500 text-sm mt-1">{errorsCreate.value.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sender's Name *
                  </label>
                  <input
                    {...registerCreate('sender_name', { required: 'Sender name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter the name of the sender"
                  />
                  {errorsCreate.sender_name && <p className="text-red-500 text-sm mt-1">{errorsCreate.sender_name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sender's Email *
                  </label>
                  <input
                    {...registerCreate('sender_email', { required: 'Sender email is required' })}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter the Sender's email"
                  />
                  {errorsCreate.sender_email && <p className="text-red-500 text-sm mt-1">{errorsCreate.sender_email.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sender's Address *
                  </label>
                  <textarea
                    {...registerCreate('sender_address', { required: 'Sender address is required' })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter the Sender's address"
                  />
                  {errorsCreate.sender_address && <p className="text-red-500 text-sm mt-1">{errorsCreate.sender_address.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Receiver Name *
                  </label>
                  <input
                    {...registerCreate('receiver_name', { required: 'Receiver name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter the Receiver Name"
                  />
                  {errorsCreate.receiver_name && <p className="text-red-500 text-sm mt-1">{errorsCreate.receiver_name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Receiver's Email *
                  </label>
                  <input
                    {...registerCreate('receiver_email', { required: 'Receiver email is required' })}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter the Receiver's email"
                  />
                  {errorsCreate.receiver_email && <p className="text-red-500 text-sm mt-1">{errorsCreate.receiver_email.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Receiver Address *
                  </label>
                  <textarea
                    {...registerCreate('receiver_address', { required: 'Receiver address is required' })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter the Receiver's Address"
                  />
                  {errorsCreate.receiver_address && <p className="text-red-500 text-sm mt-1">{errorsCreate.receiver_address.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight *
                  </label>
                  <select
                    {...registerCreate('weight', { required: 'Weight is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select weight</option>
                    <option value="<1kg">Under 1kg</option>
                    <option value="1-5kg">1-5kg</option>
                    <option value="5-10kg">5-10kg</option>
                    <option value="10-20kg">10-20kg</option>
                    <option value="20kg+">Over 20kg</option>
                  </select>
                  {errorsCreate.weight && <p className="text-red-500 text-sm mt-1">{errorsCreate.weight.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone (Sender) *
                  </label>
                  <input
                    {...registerCreate('sender_phone', { required: 'Sender phone is required' })}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errorsCreate.sender_phone && <p className="text-red-500 text-sm mt-1">{errorsCreate.sender_phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone (Receiver) *
                  </label>
                  <input
                    {...registerCreate('receiver_phone', { required: 'Receiver phone is required' })}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="+1 (555) 987-6543"
                  />
                  {errorsCreate.receiver_phone && <p className="text-red-500 text-sm mt-1">{errorsCreate.receiver_phone.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    {...registerCreate('instructions')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Handle with care, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Length (cm)
                  </label>
                  <input
                    {...registerCreate('length')}
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Length"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Width (cm)
                  </label>
                  <input
                    {...registerCreate('width')}
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Width"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (cm)
                  </label>
                  <input
                    {...registerCreate('height')}
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Height"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => resetCreate()}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by tracking ID, sender, receiver, or parcel name..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="picked-up">Picked Up</option>
                      <option value="in-transit">In Transit</option>
                      <option value="at-hub">At Hub</option>
                      <option value="out-for-delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>

                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tracking Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Parcel Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredParcels.map((parcel) => (
                      <tr key={parcel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {parcel.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(parcel.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{parcel.parcelDetails.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(parcel.status)}`}>
                            {parcel.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/track?id=${parcel.id}`)}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                              title="View Tracking"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEditParcel(parcel)}
                              className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                              title="Edit Order"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteParcel(parcel.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                              title="Delete Order"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Settings
            </h3>
            <form onSubmit={handleSubmitSettings(onSubmitSettings)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location Address
                </label>
                <textarea
                  {...registerSettings('location_address')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your business address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Live Chat Code
                </label>
                <textarea
                  {...registerSettings('live_chat_code')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter live chat embed code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  {...registerSettings('phone_number')}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Email Tab */}
        {activeTab === 'email' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Send Email
            </h3>
            <form onSubmit={handleSubmitEmail(onSubmitEmail)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recipient Email *
                </label>
                <input
                  {...registerEmail('email', { required: 'Email is required' })}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="recipient@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  {...registerEmail('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Email subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  {...registerEmail('message', { required: 'Message is required' })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your message here..."
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => resetEmail()}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Send Email
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Order: {selectedParcel.id}
              </h3>
            </div>

            <div className="p-6 space-y-6">
              <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      {...registerEdit('status')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="picked-up">Picked Up</option>
                      <option value="in-transit">In Transit</option>
                      <option value="at-hub">At Hub</option>
                      <option value="out-for-delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tracking Number
                    </label>
                    <input
                      {...registerEdit('tracking_number')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Parcel Name
                    </label>
                    <input
                      {...registerEdit('parcel_name')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amount ($)
                    </label>
                    <input
                      {...registerEdit('amount')}
                      type="number"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      {...registerEdit('date')}
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sender Name
                    </label>
                    <input
                      {...registerEdit('sender_name')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sender Email
                    </label>
                    <input
                      {...registerEdit('sender_email')}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sender Address
                    </label>
                    <textarea
                      {...registerEdit('sender_address')}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Receiver Name
                    </label>
                    <input
                      {...registerEdit('receiver_name')}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Receiver Email
                    </label>
                    <input
                      {...registerEdit('receiver_email')}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Receiver Address
                    </label>
                    <textarea
                      {...registerEdit('receiver_address')}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Delivery Route
                  </label>
                  <div className="space-y-3">
                    {routeStops.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8">
                          {index === 0 ? 'FROM' : index === routeStops.length - 1 ? 'TO' : `Stop ${index}`}
                        </span>
                        <input
                          type="number"
                          step="any"
                          placeholder="Lat"
                          value={stop.lat}
                          onChange={(e) => updateStop(index, 'lat', parseFloat(e.target.value))}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                        />
                        <input
                          type="number"
                          step="any"
                          placeholder="Lng"
                          value={stop.lng}
                          onChange={(e) => updateStop(index, 'lng', parseFloat(e.target.value))}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                        />
                        <input
                          placeholder="Label"
                          value={stop.label}
                          onChange={(e) => updateStop(index, 'label', e.target.value)}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                        />
                        {routeStops.length > 2 && index !== 0 && index !== routeStops.length - 1 && (
                          <button
                            type="button"
                            onClick={() => removeStop(index)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addStop}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Stop</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
