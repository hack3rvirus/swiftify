from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
import uuid
import hashlib
import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests
import asyncio
import json
from supabase import create_client, Client

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Swiftify Logistics API",
    description="Backend API for Swiftify logistics and parcel tracking platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://swiftifydel.netlify.app", "http://localhost:5173", "http://127.0.0.1:5173"],  # Add your frontend URLs and localhost for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY", "SwiftifyLogistics2025!@#$%^&*()_+SecureAdminKey789XYZ")
# Read admin key from environment with proper fallback
admin_key_env = os.getenv("ADMIN_KEY")
if admin_key_env:
    ADMIN_KEY_HASH = hashlib.sha256(admin_key_env.encode()).hexdigest()
    print(f"DEBUG: Using ADMIN_KEY from environment: '{admin_key_env[:10]}...' (hash: {ADMIN_KEY_HASH[:16]}...)")
else:
    default_key = "SwiftifyAdmin2025!ComplexSecureKey#$%789XYZLogistics"
    ADMIN_KEY_HASH = hashlib.sha256(default_key.encode()).hexdigest()
    print(f"DEBUG: Using default ADMIN_KEY (hash: {ADMIN_KEY_HASH[:16]}...)")

# Optional services configuration
ENABLE_EMAIL = os.getenv("ENABLE_EMAIL_NOTIFICATIONS", "false").lower() == "true"
ENABLE_SMS = os.getenv("ENABLE_SMS_NOTIFICATIONS", "false").lower() == "true"
ENABLE_GOOGLE_MAPS = os.getenv("ENABLE_GOOGLE_MAPS", "false").lower() == "true"

# Supabase configuration (optional)
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Optional[Client] = None

if supabase_url and supabase_key:
    try:
        supabase = create_client(supabase_url, supabase_key)
        print("Supabase connected successfully")
    except Exception as e:
        print(f"Supabase connection failed: {e}")
        supabase = None

# In-memory storage (replace with database in production)
parcels_db: Dict[str, Dict] = {}
contact_messages: List[Dict] = []

# Pydantic models
class Address(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: str

class ParcelDetails(BaseModel):
    description: str
    weight: str
    dimensions: Dict[str, float]
    value: float
    instructions: Optional[str] = ""
    photo: Optional[str] = None

class ScheduleRequest(BaseModel):
    sender: Address
    receiver: Address
    parcelDetails: ParcelDetails

class TrackingHistory(BaseModel):
    status: str
    timestamp: str
    location: str
    notes: Optional[str] = None

class RoutePoint(BaseModel):
    lat: float
    lng: float
    label: Optional[str] = None

class TrackingResponse(BaseModel):
    id: str
    sender: Address
    receiver: Address
    parcelDetails: ParcelDetails
    status: str
    mode: str
    history: List[TrackingHistory]
    route: List[RoutePoint]
    currentPosition: Optional[RoutePoint] = None
    eta: str
    createdAt: str
    estimatedCost: Optional[float] = None
    progress: float

class AdminLoginRequest(BaseModel):
    key: str

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

class ParcelUpdateRequest(BaseModel):
    status: Optional[str] = None
    mode: Optional[str] = None
    notes: Optional[str] = None
    currentPosition: Optional[RoutePoint] = None

# Helper functions
def generate_tracking_id() -> str:
    """Generate a unique tracking ID"""
    timestamp = str(int(datetime.utcnow().timestamp()))[-6:]
    random_part = str(uuid.uuid4()).replace('-', '')[:6].upper()
    return f"SWIFT-{timestamp}{random_part}"

def send_email_notification(to_email: str, subject: str, body: str) -> bool:
    """Send email notification if SMTP is configured"""
    if not ENABLE_EMAIL:
        return False
        
    try:
        smtp_host = os.getenv("SMTP_HOST")
        smtp_port = int(os.getenv("SMTP_PORT", "587"))
        smtp_user = os.getenv("SMTP_USER")
        smtp_password = os.getenv("SMTP_PASSWORD")
        
        if not all([smtp_host, smtp_user, smtp_password]):
            return False
            
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'html'))
        
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Email notification failed: {e}")
        return False

def send_sms_notification(to_phone: str, message: str) -> bool:
    """Send SMS notification via Twilio if configured"""
    if not ENABLE_SMS:
        return False
        
    try:
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        from_phone = os.getenv("TWILIO_PHONE_NUMBER")
        
        if not all([account_sid, auth_token, from_phone]):
            return False
            
        # Twilio API call would go here
        # For demo purposes, just log the attempt
        print(f"SMS would be sent to {to_phone}: {message}")
        return True
    except Exception as e:
        print(f"SMS notification failed: {e}")
        return False

async def save_to_database(collection: str, data: Dict) -> bool:
    """Save data to Supabase if available, otherwise use in-memory storage"""
    try:
        if supabase:
            result = supabase.table(collection).insert(data).execute()
            return True
        else:
            # Fallback to in-memory storage
            if collection == "parcels":
                parcels_db[data["id"]] = data
            elif collection == "contact_messages":
                contact_messages.append(data)
            return True
    except Exception as e:
        print(f"Database save failed: {e}")
        # Always fallback to in-memory
        if collection == "parcels":
            parcels_db[data["id"]] = data
        elif collection == "contact_messages":
            contact_messages.append(data)
        return True

async def get_from_database(collection: str, id: str = None) -> Optional[Dict]:
    """Get data from Supabase if available, otherwise use in-memory storage"""
    try:
        if supabase and id:
            result = supabase.table(collection).select("*").eq("id", id).execute()
            return result.data[0] if result.data else None
        elif supabase:
            result = supabase.table(collection).select("*").execute()
            return result.data
        else:
            # Fallback to in-memory storage
            if collection == "parcels":
                return parcels_db.get(id) if id else list(parcels_db.values())
            elif collection == "contact_messages":
                return contact_messages
            return None
    except Exception as e:
        print(f"Database get failed: {e}")
        # Always fallback to in-memory
        if collection == "parcels":
            return parcels_db.get(id) if id else list(parcels_db.values())
        elif collection == "contact_messages":
            return contact_messages
        return None

def create_jwt_token(data: dict) -> str:
    """Create JWT token"""
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Verify JWT token"""
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired"
        )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

def create_demo_route(sender_address: str, receiver_address: str) -> List[RoutePoint]:
    """Create a demo route between two addresses"""
    # In a real implementation, you'd use Google Maps API or similar
    demo_routes = {
        "san_francisco_to_los_angeles": [
            RoutePoint(lat=37.7749, lng=-122.4194, label="San Francisco, CA"),
            RoutePoint(lat=37.3382, lng=-121.8863, label="San Jose, CA"),
            RoutePoint(lat=36.7783, lng=-119.4179, label="Fresno, CA"),
            RoutePoint(lat=35.3733, lng=-119.0187, label="Bakersfield, CA"),
            RoutePoint(lat=34.0522, lng=-118.2437, label="Los Angeles, CA")
        ],
        "seattle_to_portland": [
            RoutePoint(lat=47.6062, lng=-122.3321, label="Seattle, WA"),
            RoutePoint(lat=46.7296, lng=-122.4886, label="Centralia, WA"),
            RoutePoint(lat=45.5152, lng=-122.6784, label="Portland, OR")
        ],
        "default": [
            RoutePoint(lat=37.7749, lng=-122.4194, label="Origin"),
            RoutePoint(lat=34.0522, lng=-118.2437, label="Destination")
        ]
    }
    
    # Simple logic to determine route based on addresses
    if "san francisco" in sender_address.lower() and "los angeles" in receiver_address.lower():
        return demo_routes["san_francisco_to_los_angeles"]
    elif "seattle" in sender_address.lower() and "portland" in receiver_address.lower():
        return demo_routes["seattle_to_portland"]
    else:
        return demo_routes["default"]

# API Routes

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Swiftify Logistics API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.post("/api/schedule")
async def schedule_delivery(request: ScheduleRequest):
    """Schedule a new delivery"""
    try:
        tracking_id = generate_tracking_id()
        
        # Create route
        route = create_demo_route(request.sender.address, request.receiver.address)
        
        # Calculate estimated cost (demo logic)
        base_cost = 15.0
        weight_multiplier = {
            "<1kg": 1.0,
            "1-5kg": 1.2,
            "5-10kg": 1.5,
            "10-20kg": 2.0,
            "20kg+": 2.5
        }
        estimated_cost = base_cost * weight_multiplier.get(request.parcelDetails.weight, 1.0)
        
        # Create parcel record
        parcel = {
            "id": tracking_id,
            "sender": request.sender.dict(),
            "receiver": request.receiver.dict(),
            "parcelDetails": request.parcelDetails.dict(),
            "status": "pending",
            "mode": "auto",
            "history": [
                {
                    "status": "Package scheduled",
                    "timestamp": datetime.utcnow().isoformat(),
                    "location": request.sender.address.split(",")[0],
                    "notes": "Package scheduled for pickup"
                }
            ],
            "route": [point.dict() for point in route],
            "currentPosition": route[0].dict() if route else None,
            "eta": (datetime.utcnow() + timedelta(days=2)).isoformat(),
            "createdAt": datetime.utcnow().isoformat(),
            "estimatedCost": round(estimated_cost, 2),
            "progress": 0
        }
        
        parcels_db[tracking_id] = parcel
        
        # Save to database
        await save_to_database("parcels", parcel)
        
        # Send confirmation email if enabled
        if ENABLE_EMAIL:
            email_subject = f"Swiftify Delivery Scheduled - {tracking_id}"
            email_body = f"""
            <h2>Your delivery has been scheduled!</h2>
            <p><strong>Tracking ID:</strong> {tracking_id}</p>
            <p><strong>From:</strong> {request.sender.name}</p>
            <p><strong>To:</strong> {request.receiver.name}</p>
            <p><strong>Estimated Cost:</strong> ${estimated_cost}</p>
            <p>Track your package at: <a href="https://swiftifydel.netlify.app/track?id={tracking_id}">Track Now</a></p>
            """
            send_email_notification(request.sender.email, email_subject, email_body)
        
        return {"trackingId": tracking_id}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to schedule delivery: {str(e)}"
        )

# New admin-only endpoints

from fastapi import Request

@app.post("/api/admin/orders")
async def admin_create_order(request: Request, payload: dict = Depends(verify_jwt_token)):
    """Admin creates a new order"""
    if not payload.get("admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    data = await request.json()
    try:
        schedule_request = ScheduleRequest(**data)
        tracking_id = generate_tracking_id()
        route = create_demo_route(schedule_request.sender.address, schedule_request.receiver.address)
        base_cost = 15.0
        weight_multiplier = {
            "<1kg": 1.0,
            "1-5kg": 1.2,
            "5-10kg": 1.5,
            "10-20kg": 2.0,
            "20kg+": 2.5
        }
        estimated_cost = base_cost * weight_multiplier.get(schedule_request.parcelDetails.weight, 1.0)
        parcel = {
            "id": tracking_id,
            "sender": schedule_request.sender.dict(),
            "receiver": schedule_request.receiver.dict(),
            "parcelDetails": schedule_request.parcelDetails.dict(),
            "status": "pending",
            "mode": "auto",
            "history": [
                {
                    "status": "Package scheduled",
                    "timestamp": datetime.utcnow().isoformat(),
                    "location": schedule_request.sender.address.split(",")[0],
                    "notes": "Package scheduled for pickup"
                }
            ],
            "route": [point.dict() for point in route],
            "currentPosition": route[0].dict() if route else None,
            "eta": (datetime.utcnow() + timedelta(days=2)).isoformat(),
            "createdAt": datetime.utcnow().isoformat(),
            "estimatedCost": round(estimated_cost, 2),
            "progress": 0
        }
        parcels_db[tracking_id] = parcel
        await save_to_database("parcels", parcel)
        return {"trackingId": tracking_id}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid data: {str(e)}")

@app.delete("/api/admin/parcel/{tracking_id}")
async def admin_delete_parcel(tracking_id: str, payload: dict = Depends(verify_jwt_token)):
    """Admin deletes a parcel"""
    if not payload.get("admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    if tracking_id in parcels_db:
        del parcels_db[tracking_id]
        # Also delete from supabase if applicable
        if supabase:
            try:
                supabase.table("parcels").delete().eq("id", tracking_id).execute()
            except Exception as e:
                print(f"Failed to delete parcel from database: {e}")
        return {"detail": "Parcel deleted"}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Parcel not found")

# Settings storage (in-memory for now)
settings_store = {
    "location_address": "",
    "live_chat_code": "",
    "phone_number": ""
}

@app.get("/api/admin/settings")
async def get_settings(payload: dict = Depends(verify_jwt_token)):
    if not payload.get("admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return settings_store

@app.put("/api/admin/settings")
async def update_settings(data: dict, payload: dict = Depends(verify_jwt_token)):
    if not payload.get("admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    for key in ["location_address", "live_chat_code", "phone_number"]:
        if key in data:
            settings_store[key] = data[key]
    return settings_store

@app.post("/api/admin/email")
async def send_custom_email(data: dict, payload: dict = Depends(verify_jwt_token)):
    if not payload.get("admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    to_email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")
    if not to_email or not subject or not message:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing email, subject or message")
    success = send_email_notification(to_email, subject, message)
    return {"success": success}

@app.patch("/api/admin/parcel/{tracking_id}/route")
async def update_delivery_route(tracking_id: str, data: dict, payload: dict = Depends(verify_jwt_token)):
    if not payload.get("admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    parcel = await get_from_database("parcels", tracking_id)
    if not parcel:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Parcel not found")
    # Expect data to contain route list
    route = data.get("route")
    if not route or not isinstance(route, list):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid route data")
    parcel["route"] = route
    await save_to_database("parcels", parcel)
    return parcel

@app.get("/api/track/{tracking_id}")
async def track_parcel(tracking_id: str):
    """Track a parcel by ID"""
    parcel = await get_from_database("parcels", tracking_id)
    if not parcel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tracking ID not found"
        )
    
    return parcel

@app.post("/api/admin/login")
async def admin_login(request: AdminLoginRequest):
    """Admin login"""
    key = request.key.strip()
    key_hash = hashlib.sha256(key.encode()).hexdigest()

    if key_hash != ADMIN_KEY_HASH:
        print(f"DEBUG: Received key hash: {key_hash[:16]}... Expected: {ADMIN_KEY_HASH[:16]}...")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin key"
        )

    token = create_jwt_token({"admin": True})
    return {"token": token}

@app.get("/api/admin/parcels")
async def get_all_parcels(payload: dict = Depends(verify_jwt_token)):
    """Get all parcels (admin only)"""
    if not payload.get("admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    parcels = await get_from_database("parcels")
    return parcels if isinstance(parcels, list) else list(parcels_db.values())

@app.patch("/api/admin/parcel/{tracking_id}")
async def update_parcel(
    tracking_id: str, 
    updates: ParcelUpdateRequest,
    payload: dict = Depends(verify_jwt_token)
):
    """Update a parcel (admin only)"""
    if not payload.get("admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    parcel = await get_from_database("parcels", tracking_id)
    if not parcel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tracking ID not found"
        )
    
    # Update fields
    if updates.status:
        parcel["status"] = updates.status
        # Add to history
        parcel["history"].append({
            "status": updates.status,
            "timestamp": datetime.utcnow().isoformat(),
            "location": parcel["currentPosition"]["label"] if parcel.get("currentPosition") else "Unknown",
            "notes": updates.notes or f"Status updated to {updates.status}"
        })
        
        # Update progress based on status
        status_progress = {
            "pending": 0,
            "picked-up": 20,
            "in-transit": 60,
            "at-hub": 80,
            "out-for-delivery": 90,
            "delivered": 100
        }
        parcel["progress"] = status_progress.get(updates.status, parcel["progress"])
    
    if updates.mode:
        parcel["mode"] = updates.mode
    
    if updates.currentPosition:
        parcel["currentPosition"] = updates.currentPosition.dict()
    
    # Save updated parcel
    await save_to_database("parcels", parcel)
    
    # Send notification if status changed to delivered
    if updates.status == "delivered" and ENABLE_EMAIL:
        email_subject = f"Package Delivered - {tracking_id}"
        email_body = f"""
        <h2>Your package has been delivered!</h2>
        <p><strong>Tracking ID:</strong> {tracking_id}</p>
        <p><strong>Delivered to:</strong> {parcel['receiver']['name']}</p>
        <p>Thank you for choosing Swiftify!</p>
        """
        send_email_notification(parcel['receiver']['email'], email_subject, email_body)
    
    return parcel

@app.post("/api/contact")
async def submit_contact(request: ContactRequest):
    """Submit contact form"""
    try:
        message = {
            "id": str(uuid.uuid4()),
            "name": request.name,
            "email": request.email,
            "message": request.message,
            "timestamp": datetime.utcnow().isoformat(),
            "status": "new"
        }
        
        contact_messages.append(message)
        
        # Save to database
        await save_to_database("contact_messages", message)
        
        # Send confirmation email if enabled
        if ENABLE_EMAIL:
            email_subject = "Thank you for contacting Swiftify"
            email_body = f"""
            <h2>Thank you for your message!</h2>
            <p>Hi {request.name},</p>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <p><strong>Your message:</strong></p>
            <p>{request.message}</p>
            <p>Best regards,<br>The Swiftify Team</p>
            """
            send_email_notification(request.email, email_subject, email_body)
        
        return {"success": True, "message": "Contact form submitted successfully"}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit contact form: {str(e)}"
        )

@app.get("/api/admin/contacts")
async def get_contact_messages(payload: dict = Depends(verify_jwt_token)):
    """Get all contact messages (admin only)"""
    if not payload.get("admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    messages = await get_from_database("contact_messages")
    return messages if isinstance(messages, list) else contact_messages

@app.post("/api/notifications/email")
async def send_email_endpoint(request: dict):
    """Send email notification endpoint"""
    try:
        success = send_email_notification(
            request.get("email"),
            request.get("title"),
            request.get("message")
        )
        return {"success": success}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(e)}"
        )

@app.post("/api/notifications/sms")
async def send_sms_endpoint(request: dict):
    """Send SMS notification endpoint"""
    try:
        success = send_sms_notification(
            request.get("phone"),
            request.get("message")
        )
        return {"success": success}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send SMS: {str(e)}"
        )

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "parcels_count": len(parcels_db),
        "messages_count": len(contact_messages),
        "services": {
            "email": ENABLE_EMAIL,
            "sms": ENABLE_SMS,
            "google_maps": ENABLE_GOOGLE_MAPS,
            "database": supabase is not None
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)