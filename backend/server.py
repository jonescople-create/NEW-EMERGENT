"""
IslandFruitGuide Backend API
PayPal Payment Gateway Integration
"""
import os
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import paypalrestsdk
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="IslandFruitGuide API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PayPal Configuration
PAYPAL_MODE = os.getenv("PAYPAL_MODE", "sandbox")
if PAYPAL_MODE == "sandbox":
    PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID_SANDBOX")
    PAYPAL_SECRET = os.getenv("PAYPAL_SECRET_SANDBOX")
else:
    PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID_LIVE")
    PAYPAL_SECRET = os.getenv("PAYPAL_SECRET_LIVE")

paypalrestsdk.configure({
    "mode": PAYPAL_MODE,
    "client_id": PAYPAL_CLIENT_ID,
    "client_secret": PAYPAL_SECRET
})

logger.info(f"PayPal configured in {PAYPAL_MODE} mode")


# ==================== Models ====================

class PayPalOrderRequest(BaseModel):
    product_id: str
    product_name: str
    amount: float
    currency: str = "USD"
    customer_email: Optional[EmailStr] = None


class PayPalCaptureRequest(BaseModel):
    order_id: str


class OrderResponse(BaseModel):
    id: str
    status: str
    links: list


# ==================== PayPal Routes ====================

@app.post("/api/paypal/create-order", response_model=OrderResponse)
async def create_paypal_order(order_request: PayPalOrderRequest):
    """
    Create a PayPal order for checkout
    """
    try:
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/checkout/success",
                "cancel_url": "http://localhost:3000/checkout/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": order_request.product_name,
                        "sku": order_request.product_id,
                        "price": f"{order_request.amount:.2f}",
                        "currency": order_request.currency,
                        "quantity": 1
                    }]
                },
                "amount": {
                    "total": f"{order_request.amount:.2f}",
                    "currency": order_request.currency
                },
                "description": f"Purchase of {order_request.product_name}"
            }]
        })

        if payment.create():
            logger.info(f"Payment created successfully: {payment.id}")
            
            # Extract approval URL
            approval_url = None
            for link in payment.links:
                if link.rel == "approval_url":
                    approval_url = link.href
                    break
            
            return {
                "id": payment.id,
                "status": payment.state,
                "links": [{"rel": link.rel, "href": link.href, "method": link.method} for link in payment.links]
            }
        else:
            logger.error(f"Payment creation failed: {payment.error}")
            raise HTTPException(status_code=400, detail=payment.error)
            
    except Exception as e:
        logger.error(f"Error creating PayPal order: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")


@app.post("/api/paypal/capture-order")
async def capture_paypal_order(capture_request: PayPalCaptureRequest):
    """
    Capture/Execute a PayPal payment after approval
    """
    try:
        payment = paypalrestsdk.Payment.find(capture_request.order_id)
        
        if payment.execute({"payer_id": capture_request.order_id}):
            logger.info(f"Payment executed successfully: {payment.id}")
            return {
                "id": payment.id,
                "state": payment.state,
                "payer": payment.payer,
                "transactions": payment.transactions
            }
        else:
            logger.error(f"Payment execution failed: {payment.error}")
            raise HTTPException(status_code=400, detail=payment.error)
            
    except Exception as e:
        logger.error(f"Error capturing PayPal order: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to capture order: {str(e)}")


@app.get("/api/paypal/order/{order_id}")
async def get_order_details(order_id: str):
    """
    Get PayPal order details
    """
    try:
        payment = paypalrestsdk.Payment.find(order_id)
        return {
            "id": payment.id,
            "state": payment.state,
            "create_time": payment.create_time,
            "update_time": payment.update_time,
            "payer": payment.payer,
            "transactions": payment.transactions
        }
    except Exception as e:
        logger.error(f"Error fetching order details: {str(e)}")
        raise HTTPException(status_code=404, detail=f"Order not found: {str(e)}")


@app.post("/api/paypal/webhook")
async def paypal_webhook(request: Request):
    """
    Handle PayPal webhook events for payment notifications
    """
    try:
        body = await request.json()
        event_type = body.get("event_type")
        
        logger.info(f"Received PayPal webhook: {event_type}")
        
        if event_type == "PAYMENT.SALE.COMPLETED":
            # Handle successful payment
            sale_id = body.get("resource", {}).get("id")
            logger.info(f"Payment completed: {sale_id}")
            # Here you can update your database, send confirmation emails, etc.
            
        elif event_type == "PAYMENT.SALE.REFUNDED":
            # Handle refund
            refund_id = body.get("resource", {}).get("id")
            logger.info(f"Payment refunded: {refund_id}")
            
        return {"status": "success", "message": "Webhook processed"}
        
    except Exception as e:
        logger.error(f"Error processing webhook: {str(e)}")
        return {"status": "error", "message": str(e)}


# ==================== General Routes ====================

@app.get("/")
def read_root():
    """
    API root endpoint
    """
    return {
        "message": "IslandFruitGuide API",
        "version": "1.0.0",
        "paypal_mode": PAYPAL_MODE,
        "endpoints": {
            "health": "/health",
            "create_order": "/api/paypal/create-order",
            "capture_order": "/api/paypal/capture-order",
            "get_order": "/api/paypal/order/{order_id}",
            "webhook": "/api/paypal/webhook"
        }
    }


@app.get("/health")
def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "paypal_configured": bool(PAYPAL_CLIENT_ID and PAYPAL_SECRET),
        "paypal_mode": PAYPAL_MODE
    }


@app.get("/api/config")
def get_config():
    """
    Get client configuration (safe for frontend)
    """
    return {
        "paypal_mode": PAYPAL_MODE,
        "currency": "USD"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
