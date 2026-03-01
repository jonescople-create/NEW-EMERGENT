def capture_paypal_order(payment):
    # Extract payer_id from the payment object
    payer_id = payment.payer.payer_info.email  # or use payment.id for payer_id

    # ... other logic ...

from flask_cors import CORS

# Example CORS configuration
CORS(app, resources={"*": {"origins": FRONTEND_URL}})
