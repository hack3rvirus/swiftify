# Swiftify Backend API

FastAPI backend for the Swiftify logistics and parcel tracking platform.

## Features

- **Parcel Management**: Schedule deliveries, track packages, update status
- **Admin Dashboard**: Secure admin interface with JWT authentication
- **Real-time Updates**: WebSocket support for live tracking
- **Contact System**: Handle customer inquiries
- **Demo Data**: Built-in demo parcels for testing

## Quick Start

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run the Server**
   ```bash
   python main.py
   ```

4. **Access API Documentation**
   - Swagger UI: https://swiftifyy.onrender.com/docs
   - ReDoc: https://swiftifyy.onrender.com/redoc

## API Endpoints

### Public Endpoints
- `POST /api/schedule` - Schedule a new delivery
- `GET /api/track/{tracking_id}` - Track a parcel
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

### Admin Endpoints (Requires Authentication)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/parcels` - Get all parcels
- `PATCH /api/admin/parcel/{tracking_id}` - Update parcel
- `GET /api/admin/contacts` - Get contact messages

## Authentication

The API uses JWT tokens for admin authentication. Default admin key is `admin123` (change in production).

## Demo Data

The API includes demo parcel data for testing. Tracking IDs like `SWIFT-123456` will return sample data.

## Production Deployment

1. **Environment Variables**
   - Set strong `SECRET_KEY` and `ADMIN_KEY`
   - Configure database connection
   - Add external API keys

2. **Database**
   - Replace in-memory storage with PostgreSQL/MongoDB
   - Add proper migrations

3. **Security**
   - Enable HTTPS
   - Add rate limiting
   - Implement proper logging

4. **Monitoring**
   - Add health checks
   - Implement error tracking
   - Set up performance monitoring

## Development

```bash
# Install development dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run tests
pytest

# Format code
black main.py
```

## Docker Deployment

```bash
# Build image
docker build -t swiftify-backend .

# Run container
docker run -p 8000:8000 swiftify-backend
```