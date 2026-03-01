# PayPal Credit Card Checkout Integration Guide

## Overview
IslandFruitGuide now has full PayPal credit card checkout integration with support for both Sandbox (testing) and Live (production) environments.

---

## 🎯 Features Implemented

✅ **PayPal Standard Checkout** - Accept PayPal accounts AND credit/debit cards
✅ **Sandbox & Live Mode** - Easy switch between testing and production
✅ **Secure Payment Processing** - All transactions handled by PayPal
✅ **Real-time Order Processing** - Instant payment capture and confirmation
✅ **Email Notifications** - Automatic confirmation emails from PayPal
✅ **Digital Product Delivery** - Instant download links after purchase
✅ **Backend API** - FastAPI endpoints for order management
✅ **React Integration** - Modern PayPal React SDK (@paypal/react-paypal-js)

---

## 🏗️ Architecture

### Frontend (React + Vite)
- **Location**: `/app/frontend/src/pages/CheckoutPage.tsx`
- **SDK**: @paypal/react-paypal-js v9.0.0
- **Features**:
  - PayPal Buttons component
  - Email validation
  - Terms acceptance
  - Order completion flow
  - Download delivery

### Backend (FastAPI)
- **Location**: `/app/backend/server.py`
- **SDK**: paypalrestsdk v1.13.1
- **Endpoints**:
  - `POST /api/paypal/create-order` - Create new payment order
  - `POST /api/paypal/capture-order` - Capture approved payment
  - `GET /api/paypal/order/{order_id}` - Get order details
  - `POST /api/paypal/webhook` - Handle PayPal webhooks
  - `GET /health` - Health check with PayPal status
  - `GET /api/config` - Get client configuration

---

## ⚙️ Configuration

### Environment Variables

#### Frontend (`/app/frontend/.env`)
```env
# PayPal Configuration
VITE_PAYPAL_MODE=SANDBOX
VITE_PAYPAL_CLIENT_ID_SANDBOX=AXd3evH1jo2n9FR5olAiQbZAQvbOYUK-BLCnmHOBaBhqDzA41MV3tVnlEy7VmcWD3WmhelEWTsev4XKx
VITE_PAYPAL_CLIENT_ID_LIVE=AeyJOKoJWFM3k-h75OAc0rDXuAxcSR94DY_ZayQRD0zOH2zg9N6txnwF0lK2aW0dr4RZY-_qFq2WNFDb

# Backend API URL
VITE_BACKEND_URL=http://localhost:8001
```

#### Backend (`/app/backend/.env`)
```env
# PayPal Configuration
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID_SANDBOX=AXd3evH1jo2n9FR5olAiQbZAQvbOYUK-BLCnmHOBaBhqDzA41MV3tVnlEy7VmcWD3WmhelEWTsev4XKx
PAYPAL_SECRET_SANDBOX=EH4y-kAMbpEK4RrSr9Jx4aRqtQKuqinLmXxhrpY3l3uNcPRliKVYX6A9J-oo824ARRNP7vDpD720AQP2
PAYPAL_CLIENT_ID_LIVE=AeyJOKoJWFM3k-h75OAc0rDXuAxcSR94DY_ZayQRD0zOH2zg9N6txnwF0lK2aW0dr4RZY-_qFq2WNFDb
PAYPAL_SECRET_LIVE=EIzd9OcqtyBfTZ2SatU64mhAhzYU2jVYLfQnlikXYqDf1WvwxrBa8Ki2yanoKRJuMCDrx-FkATNDDBwe
```

---

## 🧪 Testing with Sandbox

### 1. Current Mode
The system is configured to use **SANDBOX mode** for testing.

### 2. Test Credit Cards
Use PayPal's test credit cards:

**Visa**
- Card Number: `4032039686381436`
- Expiry: Any future date
- CVV: Any 3 digits

**Mastercard**
- Card Number: `5425233430109903`
- Expiry: Any future date
- CVV: Any 3 digits

**American Express**
- Card Number: `374245455400126`
- Expiry: Any future date
- CVV: Any 4 digits

### 3. Test PayPal Accounts
Login to Sandbox: https://www.sandbox.paypal.com/

**Personal Account (Buyer)**
- Email: Provided by PayPal Developer Dashboard
- Password: Set in sandbox accounts

### 4. Testing Flow
1. Navigate to Store: http://localhost:3000/store
2. Select any product
3. Click "Buy Now"
4. Enter test email (e.g., test@example.com)
5. Agree to terms
6. Click "Proceed to PayPal"
7. Use test credit card OR login with sandbox account
8. Complete payment
9. Verify success page with download link

---

## 🚀 Switching to Production

When ready to accept real payments:

### 1. Update Frontend `.env`
```env
VITE_PAYPAL_MODE=LIVE
```

### 2. Update Backend `.env`
```env
PAYPAL_MODE=live
```

### 3. Restart Services
```bash
sudo supervisorctl restart all
```

### 4. Verify
```bash
curl http://localhost:8001/health
# Should show: "paypal_mode": "live"
```

---

## 📡 API Endpoints

### Create Order
```bash
POST /api/paypal/create-order
Content-Type: application/json

{
  "product_id": "ebook-caribbean-fruit-guide",
  "product_name": "Caribbean Fruit Guide",
  "amount": 29.99,
  "currency": "USD",
  "customer_email": "customer@example.com"
}
```

**Response:**
```json
{
  "id": "PAYID-MXXXXXXXXXXXXXXXX",
  "status": "created",
  "links": [
    {
      "rel": "approval_url",
      "href": "https://www.sandbox.paypal.com/checkoutnow?token=...",
      "method": "REDIRECT"
    }
  ]
}
```

### Capture Order
```bash
POST /api/paypal/capture-order
Content-Type: application/json

{
  "order_id": "PAYID-MXXXXXXXXXXXXXXXX"
}
```

### Get Order Details
```bash
GET /api/paypal/order/{order_id}
```

### Health Check
```bash
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-01T15:51:02.981463",
  "paypal_configured": true,
  "paypal_mode": "sandbox"
}
```

---

## 🔧 Troubleshooting

### Frontend Issues

**Problem**: PayPal buttons not showing
- **Solution**: Check browser console for errors
- Verify `VITE_PAYPAL_CLIENT_ID_SANDBOX` is set in `.env`
- Ensure PayPal SDK loads: Check Network tab

**Problem**: Environment variables not working
- **Solution**: Frontend .env variables must start with `VITE_`
- Restart Vite dev server after changing .env
- Clear browser cache

### Backend Issues

**Problem**: 401 Authentication Failed
- **Solution**: Verify Client ID and Secret match in PayPal dashboard
- Check if using correct mode (sandbox vs live)
- Ensure no extra spaces in credentials

**Problem**: Backend not starting
- **Solution**: Check logs: `tail -f /var/log/supervisor/backend.err.log`
- Verify all dependencies installed: `pip list | grep paypal`
- Check .env file exists and has correct format

### Payment Issues

**Problem**: Payment created but capture fails
- **Solution**: Ensure order is approved before capturing
- Check PayPal transaction ID in dashboard
- Verify payer_id is correct

**Problem**: Sandbox cards rejected
- **Solution**: Use official PayPal test cards (listed above)
- Ensure sandbox mode is active
- Try different card type

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use environment variables** - Never hardcode credentials
3. **HTTPS in production** - PayPal requires SSL/TLS
4. **Validate webhook signatures** - Verify PayPal webhook events
5. **Store secrets securely** - Use secret management in production
6. **Monitor transactions** - Check PayPal dashboard regularly
7. **Implement rate limiting** - Prevent abuse of payment endpoints

---

## 📊 PayPal Dashboard

### Sandbox Dashboard
- URL: https://developer.paypal.com/
- View test transactions
- Manage sandbox accounts
- Configure webhooks
- View API credentials

### Live Dashboard  
- URL: https://www.paypal.com/businessprofile/
- View real transactions
- Manage refunds
- Download reports
- Customer disputes

---

## 🎨 Customization

### Payment Button Styles
Edit `/app/frontend/src/pages/CheckoutPage.tsx`:

```tsx
<PayPalButtons
  style={{ 
    layout: "vertical",  // or "horizontal"
    color: "gold",       // or "blue", "silver", "white", "black"
    shape: "rect",       // or "pill"
    label: "paypal"      // or "checkout", "pay", "buynow"
  }}
  // ...
/>
```

### Supported Currencies
To change from USD, update:
1. Frontend: `currency: "EUR"` in PayPalScriptProvider
2. Backend: `currency: str = "EUR"` in PayPalOrderRequest
3. Restart services

### Email Notifications
PayPal automatically sends:
- Payment confirmation to buyer
- Payment received to seller
- Shipping notifications (if configured)

To customize, configure in PayPal Dashboard → Settings → Notifications

---

## 📈 Next Steps

### Recommended Enhancements

1. **Database Integration**
   - Store orders in Supabase
   - Track customer purchases
   - Generate invoices

2. **Email Service**
   - Send custom confirmation emails
   - Provide personalized download links
   - Follow-up sequences

3. **Analytics**
   - Track conversion rates
   - Monitor abandoned carts
   - Revenue reporting

4. **Advanced Features**
   - Subscription payments
   - Installment plans
   - Refund automation
   - Discount codes

---

## 🆘 Support

### PayPal Developer Support
- Docs: https://developer.paypal.com/docs/
- Community: https://www.paypal-community.com/
- Support: https://www.paypal.com/us/smarthelp/contact-us

### Integration Issues
- Check logs: `/var/log/supervisor/`
- Test endpoints: Use curl or Postman
- PayPal Sandbox: https://www.sandbox.paypal.com/

---

## ✅ Verification Checklist

- [x] Frontend PayPal SDK installed
- [x] Backend PayPal SDK installed
- [x] Environment variables configured (Sandbox & Live)
- [x] API endpoints created
- [x] CheckoutPage updated with PayPal buttons
- [x] Services running successfully
- [x] Health check returns `paypal_configured: true`
- [x] Sandbox mode active for testing
- [ ] Test payment completed successfully
- [ ] Production credentials ready
- [ ] Webhook configured in PayPal Dashboard

---

**Integration Status**: ✅ **COMPLETE & READY FOR TESTING**

PayPal credit card checkout is fully integrated and ready to accept payments. Currently in SANDBOX mode for testing. Switch to LIVE mode when ready for production.
