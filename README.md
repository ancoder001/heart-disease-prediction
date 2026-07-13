# 🫀 Heart Disease Prediction System

An AI-powered web application that predicts the likelihood of heart disease using a **Random Forest Classifier**. The application is built with **FastAPI** for the backend and **HTML, CSS, and JavaScript** for the frontend, providing a modern, responsive healthcare dashboard.

> **Disclaimer:** This project is intended for educational and demonstration purposes only. It is **not** a substitute for professional medical diagnosis or advice.

---

# 📌 Features

* Modern and responsive healthcare dashboard
* Heart disease prediction using Machine Learning
* Random Forest Classifier
* FastAPI backend
* HTML, CSS & JavaScript frontend
* Automatic model training if the saved model does not exist
* Prediction probability (estimated confidence)
* Input validation
* Responsive UI for desktop and mobile
* Clean project structure

---

# 🏗️ Tech Stack

## Backend

* Python 3.x
* FastAPI
* Uvicorn
* Scikit-learn
* Pandas
* NumPy
* Joblib
* Jinja2

## Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)

## Machine Learning

* Random Forest Classifier
* Scikit-learn

---

# 📂 Project Structure

```text
heart-disease-prediction/
│
├── app.py
├── train_model.py
├── requirements.txt
│
├── data/
│   └── heart.csv
│
├── model/
│   └── heart_model.pkl
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
└── README.md
```

---

# 📊 Dataset

The dataset contains medical attributes commonly used for heart disease prediction.

| Feature  | Description                       |
| -------- | --------------------------------- |
| Age      | Age of the patient                |
| Sex      | Male/Female                       |
| CP       | Chest Pain Type                   |
| Trestbps | Resting Blood Pressure            |
| Chol     | Cholesterol                       |
| FBS      | Fasting Blood Sugar               |
| RestECG  | Resting ECG Results               |
| Thalach  | Maximum Heart Rate Achieved       |
| Exang    | Exercise Induced Angina           |
| Oldpeak  | ST Depression                     |
| Slope    | Slope of Peak Exercise ST Segment |
| CA       | Number of Major Vessels           |
| Thal     | Thalassemia                       |
| Target   | Heart Disease (0 = No, 1 = Yes)   |

---

# ⚙️ Installation

## Clone the repository

```bash
git clone <repository-url>
cd heart-disease-prediction
```

## Create a virtual environment

### Windows

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### Linux / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

# 📦 Install Dependencies

```bash
pip install -r requirements.txt
```

---

# ▶️ Running the Application

Start the FastAPI server:

```bash
uvicorn app:app --reload
```

Open your browser:

```
http://127.0.0.1:8000
```

---

# 🤖 Automatic Model Training

The application automatically checks for the trained model:

```
model/
    heart_model.pkl
```

If the model file is not found:

1. The dataset is loaded.
2. A Random Forest model is trained.
3. The trained model is saved.
4. The application loads the newly created model.

This means you do **not** need to manually train the model after cloning the project.

---

# 🧠 Machine Learning Workflow

```
Dataset
    │
    ▼
Preprocessing
    │
    ▼
Train-Test Split
    │
    ▼
Random Forest Classifier
    │
    ▼
Model Training
    │
    ▼
Save Model (.pkl)
    │
    ▼
FastAPI loads model
    │
    ▼
Prediction API
```

---

# 📡 API Endpoints

## Home Page

```
GET /
```

Returns the web interface.

---

## Predict Heart Disease

```
POST /predict
```

### Request Body

```json
{
  "age": 45,
  "sex": 1,
  "cp": 2,
  "trestbps": 130,
  "chol": 230,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.5,
  "slope": 2,
  "ca": 0,
  "thal": 2
}
```

### Response

```json
{
  "prediction": 1,
  "result": "Heart Disease Detected",
  "confidence": 0.92
}
```

---

# 🎨 User Interface

The application includes:

* Responsive layout
* Modern healthcare theme
* Interactive forms
* Client-side validation
* Loading animation
* Prediction result card
* Estimated prediction probability
* Risk indicator

---

# 📈 Model

Algorithm used:

* Random Forest Classifier

Current parameters:

```python
RandomForestClassifier(
    n_estimators=300,
    max_depth=6,
    random_state=30
)
```

---

# 🚀 Future Improvements

* User authentication
* Patient history
* Admin dashboard
* Prediction reports (PDF)
* Database integration
* Model comparison
* Feature importance visualization
* Dark mode
* Docker support
* Deployment to cloud platforms

---

# 📜 License

This project is available for educational and personal use. Review and update the license as needed before public distribution.

---

# 👨‍💻 Author

Developed as a machine learning and FastAPI web application project using Python, Scikit-learn, FastAPI, HTML, CSS, and JavaScript.
