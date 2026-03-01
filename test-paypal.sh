#!/bin/bash
# PayPal Integration Test Script

echo "========================================="
echo "PayPal Integration Test"
echo "========================================="
echo ""

# Test 1: Backend Health Check
echo "1️⃣  Testing Backend Health..."
HEALTH=$(curl -s http://localhost:8001/health)
if echo "$HEALTH" | grep -q "healthy"; then
    echo "   ✅ Backend is healthy"
    echo "   📊 PayPal Mode: $(echo $HEALTH | python3 -c "import sys, json; print(json.load(sys.stdin)['paypal_mode'])")"
    echo "   🔧 PayPal Configured: $(echo $HEALTH | python3 -c "import sys, json; print(json.load(sys.stdin)['paypal_configured'])")"
else
    echo "   ❌ Backend health check failed"
fi
echo ""

# Test 2: API Root
echo "2️⃣  Testing API Root..."
API_ROOT=$(curl -s http://localhost:8001/)
if echo "$API_ROOT" | grep -q "IslandFruitGuide"; then
    echo "   ✅ API is responding"
    echo "   📦 Available endpoints:"
    echo "      - POST /api/paypal/create-order"
    echo "      - POST /api/paypal/capture-order"
    echo "      - GET /api/paypal/order/{order_id}"
    echo "      - POST /api/paypal/webhook"
else
    echo "   ❌ API root check failed"
fi
echo ""

# Test 3: Frontend
echo "3️⃣  Testing Frontend..."
FRONTEND=$(curl -s http://localhost:3000)
if echo "$FRONTEND" | grep -q "IslandFruitGuide"; then
    echo "   ✅ Frontend is running"
    echo "   🌐 Access at: http://localhost:3000"
else
    echo "   ❌ Frontend check failed"
fi
echo ""

# Test 4: Environment Variables
echo "4️⃣  Checking Environment Variables..."
if [ -f /app/backend/.env ]; then
    echo "   ✅ Backend .env exists"
    if grep -q "PAYPAL_CLIENT_ID_SANDBOX" /app/backend/.env; then
        echo "   ✅ Sandbox credentials configured"
    fi
    if grep -q "PAYPAL_CLIENT_ID_LIVE" /app/backend/.env; then
        echo "   ✅ Live credentials configured"
    fi
else
    echo "   ❌ Backend .env not found"
fi

if [ -f /app/frontend/.env ]; then
    echo "   ✅ Frontend .env exists"
else
    echo "   ❌ Frontend .env not found"
fi
echo ""

# Test 5: Services Status
echo "5️⃣  Checking Services..."
BACKEND_STATUS=$(sudo supervisorctl status backend | grep RUNNING)
FRONTEND_STATUS=$(sudo supervisorctl status frontend | grep RUNNING)

if [ -n "$BACKEND_STATUS" ]; then
    echo "   ✅ Backend service is RUNNING"
else
    echo "   ❌ Backend service is NOT running"
fi

if [ -n "$FRONTEND_STATUS" ]; then
    echo "   ✅ Frontend service is RUNNING"
else
    echo "   ❌ Frontend service is NOT running"
fi
echo ""

# Summary
echo "========================================="
echo "✨ Summary"
echo "========================================="
echo ""
echo "📝 To test PayPal checkout:"
echo "   1. Open: http://localhost:3000/store"
echo "   2. Select any product"
echo "   3. Click 'Buy Now'"
echo "   4. Complete checkout with test card"
echo ""
echo "💳 Test Cards (Sandbox):"
echo "   Visa: 4032039686381436"
echo "   Mastercard: 5425233430109903"
echo "   Expiry: Any future date"
echo "   CVV: Any 3 digits"
echo ""
echo "📚 Documentation:"
echo "   - Full guide: /app/PAYPAL_INTEGRATION.md"
echo "   - API docs: http://localhost:8001/"
echo ""
echo "========================================="
