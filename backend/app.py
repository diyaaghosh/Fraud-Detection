import warnings
warnings.filterwarnings("ignore", category=UserWarning)

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # ✅ REQUIRED for Vercel frontend

# Load model
model = joblib.load("backend/model.pkl")

FEATURE_COLUMNS = [
    'Transaction_Amount', 'Account_Balance', 'IP_Address_Flag',
    'Previous_Fraudulent_Activity', 'Daily_Transaction_Count', 'Risk_Score',
    'Is_Weekend', 'avg_trans_amount', 'std_trans_amount', 'max_trans_amount',
    'total_transactions', 'avg_daily_transactions', 'amount_deviation',
    'user_transaction_count', 'high_activity_user',
    'Merchant_Category_Clothing', 'Merchant_Category_Electronics',
    'Merchant_Category_Groceries', 'Merchant_Category_Restaurants',
    'Merchant_Category_Travel',
    'Device_Type_Laptop', 'Device_Type_Mobile', 'Device_Type_Tablet',
    'Transaction_Type_ATM Withdrawal', 'Transaction_Type_Bank Transfer',
    'Transaction_Type_Online', 'Transaction_Type_POS',
    'Card_Type_Amex', 'Card_Type_Discover', 'Card_Type_Mastercard',
    'Card_Type_Visa',
    'card_age_very_new', 'card_age_new', 'card_age_established',
    'card_age_veteran',
    'Avg_Transaction_Amount_7d_Scaled', 'User_Transaction_Deviation',
    'User_Transaction_Deviation_Scaled', 'account_balanced_scaled',
    'balance_to_avg_transaction', 'High_Balance_Flag', 'Low_Balance_Flag',
    'Auth_Method_Biometric', 'Auth_Method_OTP', 'Auth_Method_PIN',
    'Auth_Method_Password',
    'Location_London', 'Location_Mumbai', 'Location_New York',
    'Location_Sydney', 'Location_Tokyo', 'Location_TargetEnc',
    'Transaction_Distance_Scaled', 'high_distance_transaction',
    'Distance_Deviation',
    'transaction_hour', 'day_of_week', 'day', 'month',
    'time_diff_b/w_two_cons_transaction_per_user',
    'time_diff_b/w_two_cons_transaction_per_userscaled',
    'is_night'
]

# ✅ API-only route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Initialize all features to 0
    features = {col: 0 for col in FEATURE_COLUMNS}

    # Raw inputs
    raw_amount = float(data['amount'])
    raw_risk = float(data['risk'])
    raw_daily_tx = int(data['daily_tx'])
    raw_prev_fraud = int(data['prev_fraud'])
    hour = int(data['hour'])

    # Feature engineering
    features['Transaction_Amount'] = 1 if raw_amount > 30000 else 0
    features['Risk_Score'] = 1 if raw_risk > 0.7 else 0
    features['Daily_Transaction_Count'] = 1 if raw_daily_tx > 15 else 0
    features['Previous_Fraudulent_Activity'] = raw_prev_fraud
    features['Is_Weekend'] = int(data['weekend'])

    features['transaction_hour'] = 1 if hour >= 22 or hour <= 5 else 0
    features['is_night'] = features['transaction_hour']

    # One-hot fields
    features[f"Device_Type_{data['device']}"] = 1
    features[f"Location_{data['location']}"] = 1

    # Heuristic flags
    features['high_activity_user'] = 1 if raw_daily_tx > 20 else 0
    features['High_Balance_Flag'] = 1
    features['Low_Balance_Flag'] = 0

    # Model input
    X = np.array([[features[col] for col in FEATURE_COLUMNS]])

    # Prediction
    pred = int(model.predict(X)[0])
    prob = float(model.predict_proba(X)[0][1])

    # Rule-based override (business logic)
    if features['Risk_Score'] == 1 and features['Previous_Fraudulent_Activity'] == 1:
        pred = 1
        prob = 0.99

    # Explanation
    reasons = []
    if raw_amount > 30000:
        reasons.append("Unusually high transaction amount")
    if raw_prev_fraud == 1:
        reasons.append("User has previous fraudulent activity")
    if raw_daily_tx > 20:
        reasons.append("High number of transactions in short time")
    if hour >= 22 or hour <= 5:
        reasons.append("Transaction occurred at night")

    return jsonify({
        "fraud": bool(pred),
        "confidence": round(prob, 3),
        "reasons": reasons
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

