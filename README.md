# Swiftify - Modern Logistics & Parcel Tracking Platform

**Tagline:** "Speed Meets Intelligence in Every Delivery"

A production-ready, modern logistics and parcel tracking website built with React, TypeScript, and FastAPI. Features real-time tracking, interactive maps, and a comprehensive admin dashboard.

## 🚀 Features

### Frontend
- **Modern React SPA** with TypeScript and Tailwind CSS
- **Real-time Tracking** with interactive maps (OpenStreetMap + Leaflet.js)
- **Multi-step Scheduling** wizard with auto-location detection
- **Admin Dashboard** with comprehensive parcel management
- **Dark/Light Theme** with system preference detection
- **Responsive Design** optimized for all devices
- **Progressive Enhancement** - works without external APIs

### Backend
- **FastAPI** with automatic OpenAPI documentation
- **JWT Authentication** for secure admin access
- **Database Integration** with Supabase (optional)
- **Email Notifications** via SMTP (optional)
- **SMS Notifications** via Twilio (optional)
- **Fallback Systems** - works independently without external services

### Maps & Location
- **Primary:** OpenStreetMap with Leaflet.js (free, no API keys required)
- **Optional:** Google Maps integration with API key
- **Auto-location Detection** using browser geolocation
- **Route Visualization** with real-time tracking simulation
- **Geocoding** with Nominatim (free) or Google Geocoding API

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** FastAPI, Python 3.10+, Pydantic
- **Database:** Supabase (optional), localStorage fallback
- **Maps:** Leaflet.js + OpenStreetMap (primary), Google Maps (optional)
- **Notifications:** SMTP, Twilio SMS (both optional)
- **Deployment:** Vercel (frontend), Render/Railway (backend)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ and pip
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd swiftify
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Start backend server
python main.py
```

### 4. Access Application
- **Frontend:** https://swiftifydel.netlify.app/
- **Backend API:** https://swiftifyy.onrender.com
- **API Documentation:** https://swiftifyy.onrender.com/docs

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```bash
# Optional Services (Platform works without these)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_API_BASE_URL=https://swiftifyy.onrender.com

# Feature Flags
VITE_ENABLE_GOOGLE_MAPS=false
VITE_ENABLE_NOTIFICATIONS=false
VITE_ENABLE_SMS=false
```

#### Backend (backend/.env)
```bash
# Required
SECRET_KEY=SwiftifyLogistics2025!@#$%^&*()_+SecureAdminKey789XYZ
ADMIN_KEY=SwiftifyAdmin2025!ComplexSecureKey#$%789XYZLogistics

# Optional Database
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Optional Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Optional SMS (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Optional APIs
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Feature Flags
ENABLE_EMAIL_NOTIFICATIONS=false
ENABLE_SMS_NOTIFICATIONS=false
ENABLE_GOOGLE_MAPS=false
```

## 🎯 Key Features

### Independent Operation
- **No External Dependencies Required** - Works completely offline
- **Progressive Enhancement** - Features gracefully degrade when services unavailable
- **Fallback Systems** - OpenStreetMap when Google Maps unavailable, localStorage when database unavailable
- **Demo Mode** - Full functionality without any external services

### Admin Dashboard
- **Secure Login** with complex admin key
- **Parcel Management** - View, update, and track all parcels
- **Real-time Updates** - Live parcel status changes
- **Analytics Dashboard** - Delivery statistics and insights
- **Manual/Auto Tracking** - Switch between automated and manual tracking modes

### User Experience
- **Multi-step Forms** with validation and auto-completion
- **Real-time Tracking** with animated route visualization
- **Progress Indicators** with milestone badges
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Dark/Light Theme** with system preference detection
- **Toast Notifications** for user feedback

## 📱 Demo

### Test Tracking IDs
- `SWIFT-123456` - In transit parcel
- `SWIFT-789012` - Delivered parcel  
- `SWIFT-345678` - Pending parcel

### Admin Access
- **Admin Key:** `SwiftifyAdmin2025!ComplexSecureKey#$%789XYZLogistics`
- **Dashboard:** https://swiftifydel.netlify.app/admin/login

## 🚀 Production Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Railway)
1. Connect GitHub repository
2. Set environment variables
3. Use `backend/main.py` as entry point
4. Install dependencies from `backend/requirements.txt`

### Database (Supabase)
1. Create new Supabase project
2. Run SQL migrations for tables:
   - `parcels` - Store parcel information
   - `contact_messages` - Store contact form submissions
3. Add connection details to environment variables

## 🔒 Security Features

- **JWT Authentication** for admin access
- **Bcrypt Password Hashing** for admin keys
- **Input Validation** with Pydantic models
- **CORS Protection** with specific origins
- **Rate Limiting** (configurable)
- **HTTPS Ready** for production deployment

## 🎨 Design System

- **Colors:** Blue (#007BFF) and Green (#28A745) logistics theme
- **Typography:** Clean, readable fonts with proper contrast
- **Icons:** Lucide React icon library
- **Animations:** Smooth transitions and micro-interactions
- **Responsive:** Mobile-first design approach

## 📊 Analytics & Monitoring

- **Health Check Endpoint** - `/api/health`
- **Service Status Monitoring** - Track which services are enabled
- **Error Handling** - Comprehensive error management
- **Logging** - Detailed application logs

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation:** Check `/docs` endpoint for API documentation
- **Issues:** Create GitHub issue for bugs or feature requests
- **Email:** support@swiftify.com (if configured)

---

**Swiftify** - Speed Meets Intelligence in Every Delivery 🚛✨"# swiftify" 
