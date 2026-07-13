from fastapi import FastAPI
from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import numpy as np
import joblib
import os

from train_model import train_and_save_model

app = FastAPI()

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

MODEL_PATH = "model/heart_model.pkl"

if not os.path.exists(MODEL_PATH):
    print("Model not found. Training a new model...")
    model = train_and_save_model()
else:
    print("Loading existing model...")
    model = joblib.load(MODEL_PATH)


class HeartData(BaseModel):
    age: float
    sex: int
    cp: int
    trestbps: float
    chol: float
    fbs: int
    restecg: int
    thalach: float
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int



@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )

@app.get("/predict", response_class=HTMLResponse)
def _predict(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="predict.html"
    )

@app.post("/api/predict")
def predict(data: HeartData):

    features = np.array([
        data.age,
        data.sex,
        data.cp,
        data.trestbps,
        data.chol,
        data.fbs,
        data.restecg,
        data.thalach,
        data.exang,
        data.oldpeak,
        data.slope,
        data.ca,
        data.thal
    ]).reshape(1, -1)

    prediction = model.predict(features)[0]

    probabilities = model.predict_proba(features)[0]

    confidence = probabilities[prediction]

    if prediction == 1:
        result = "Heart Disease Detected"
    else:
        result = "No Heart Disease"

    return {
        "prediction": int(prediction),
        "result": result,
        "confidence": round(float(confidence), 4)
    }
