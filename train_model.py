import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

MODEL_PATH = "model/heart_model.pkl"
DATA_PATH = "data/heart.csv"


def train_and_save_model():
    os.makedirs("model", exist_ok=True)

    heart_data = pd.read_csv(DATA_PATH)

    X = heart_data.drop("target", axis=1)
    y = heart_data["target"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        stratify=y,
        random_state=30
    )

    model = RandomForestClassifier(
        n_estimators=300,
        max_depth=6,
        random_state=30
    )

    model.fit(X_train, y_train)

    joblib.dump(model, MODEL_PATH)

    print("Model trained and saved successfully.")

    return model