from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import joblib
app = Flask(__name__)

with open('model.pkl', 'rb') as file:
    model = joblib.load(file)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

      
        transaction_amount = float(data.get('transaction_amount', 0))
        num_txn_24h = float(data.get('num_txn_24h', 0))
        num_txn_7d = float(data.get('num_txn_7d', 0))
        failed_txn_count_7d = float(data.get('failed_txn_count_7d', 0))
        device_trust_score = float(data.get('device_trust_score', 1))
        ip_geo_distance_from_home_km = float(data.get('ip_geo_distance_from_home_km', 0))
        total_fraud_count = float(data.get('total_fraud_count', 0))

       
        location_flag = float(data.get('location_flag', 0))
        device_type_flag = float(data.get('device_type_flag', 0))
        behavior_flag = float(data.get('behavior_flag', 0))
        history_flag = float(data.get('history_flag', 0))

       
        features = np.array([[transaction_amount, num_txn_24h, num_txn_7d,
                              failed_txn_count_7d, device_trust_score,
                              ip_geo_distance_from_home_km, total_fraud_count,
                              location_flag, device_type_flag, behavior_flag, history_flag]])

       
        prediction = int(model.predict(features)[0])

        if hasattr(model, "predict_proba"):
            probability = float(model.predict_proba(features)[0][1])
        else:
            probability = 1.0 if prediction == 1 else 0.0

        reason = []
        if failed_txn_count_7d > 5:
            reason.append("High number of failed transactions recently")
        if device_trust_score < 0.5:
            reason.append("Untrusted or unknown device")
        if ip_geo_distance_from_home_km > 100:
            reason.append("Suspicious location far from usual area")
        if total_fraud_count > 0:
            reason.append("Past fraud history found")
        if transaction_amount > 5000:
            reason.append("Unusually high transaction amount")

        if not reason:
            reason.append("No obvious fraud pattern detected")

        return jsonify({
            'prediction': prediction,
            'probability': probability,
            'reason': ', '.join(reason),
            'features': data
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
