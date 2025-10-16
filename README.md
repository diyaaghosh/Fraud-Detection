# AI-Powered Fraud Detection System

## Overview
This project is a **machine learning–based fraud detection system** designed to identify potentially fraudulent financial transactions in real-time. It leverages multiple classifiers and a Flask-integrated web application for frontend interaction.

---

## Features
- Real-time transaction fraud detection with explanations.
- Supports multiple machine learning models for comparison and optimization.
- Frontend built using **HTML, CSS, and JavaScript** for interactive usage.
- Easy-to-deploy **Flask backend** connected to the ML model (`model.pkl`).

---

## Machine Learning Implementation

### Models Used
- Logistic Regression
- Decision Tree Classifier
- Random Forest Classifier
- K-Nearest Neighbors (KNN)
- Support Vector Machine (SVM)
- Naive Bayes Classifier

### Model Optimization
- **Best Model:** Naive Bayes
- **Hyperparameters:** `alpha = 0.1`, `binarize = 1.0`
- **Performance:**
  - **Accuracy:** 79.4%
  - **Precision:** 80% (for fraudulent transactions)
  - **Recall:** 93% (for legitimate transactions)
  - **F1-Score:** 74% (macro average)

### Key Features
- `Risk_Score`
- `Failed_Transaction_Count_7d`
- `Failed_Transaction_Count_7d_Scaled`
- `failurerate_7d`
- `total_fraud`

---

## Web Application
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Flask
- Users can enter transaction details and get **real-time predictions** along with **risk explanations**.
- Provides recommended actions for high-risk transactions.

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/diyaaghosh/Fraud-Detection
   cd fraud-detection-app
