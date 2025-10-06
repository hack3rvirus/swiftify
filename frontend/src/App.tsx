import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TrackingProvider } from './contexts/TrackingContext';
import { AdminProvider } from './contexts/AdminContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Track from './pages/Track';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import CreateParcel from './pages/CreateParcel';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <TrackingProvider>
        <AdminProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/track" element={<Track />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/create-parcel" element={<CreateParcel />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </div>
          </Router>
        </AdminProvider>
      </TrackingProvider>
    </ThemeProvider>
  );
}

export default App;
