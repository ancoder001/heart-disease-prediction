const form = document.getElementById("heartForm");

const loadingCard = document.getElementById("loadingCard");
const resultCard = document.getElementById("resultCard");

const resultIcon = document.getElementById("resultIcon");
const predictionTitle = document.getElementById("predictionTitle");
const confidenceText = document.getElementById("confidenceText");
const recommendation = document.getElementById("recommendation");
const progressBar = document.getElementById("progressBar");

function showError(message) {
    alert(message);
}

function validate(data) {

    if (data.age < 1 || data.age > 120) {
        showError("Age must be between 1 and 120.");
        return false;
    }

    if (data.trestbps < 80 || data.trestbps > 250) {
        showError("Resting Blood Pressure must be between 80 and 250 mmHg.");
        return false;
    }

    if (data.chol < 100 || data.chol > 600) {
        showError("Cholesterol must be between 100 and 600 mg/dL.");
        return false;
    }

    if (data.thalach < 60 || data.thalach > 220) {
        showError("Maximum Heart Rate must be between 60 and 220.");
        return false;
    }

    if (data.oldpeak < 0 || data.oldpeak > 10) {
        showError("Oldpeak must be between 0 and 10.");
        return false;
    }

    return true;
}

function showLoading() {
    loadingCard.classList.remove("hidden");
    resultCard.classList.add("hidden");
}

function hideLoading() {
    loadingCard.classList.add("hidden");
}

function showResult(data) {

    resultCard.classList.remove("hidden");

    resultCard.classList.remove("success");
    resultCard.classList.remove("danger");

    const confidence = Math.round(data.confidence * 100);

    confidenceText.innerHTML = `Confidence : <strong>${confidence}%</strong>`;

    progressBar.style.width = confidence + "%";

    if (data.prediction === 1) {

        resultCard.classList.add("danger");

        resultIcon.innerHTML = "❤️";

        predictionTitle.innerHTML = "High Risk";

        recommendation.innerHTML =
            "Our model indicates a higher likelihood of heart disease. Please consult a cardiologist for a comprehensive medical evaluation.";

        progressBar.style.background =
            "linear-gradient(90deg,#ef4444,#dc2626)";

    } else {

        resultCard.classList.add("success");

        resultIcon.innerHTML = "💚";

        predictionTitle.innerHTML = "Low Risk";

        recommendation.innerHTML =
            "The prediction indicates a lower likelihood of heart disease. Continue maintaining a healthy lifestyle and schedule regular health check-ups.";

        progressBar.style.background =
            "linear-gradient(90deg,#10b981,#16a34a)";
    }
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        age: Number(document.getElementById("age").value),
        sex: Number(document.getElementById("sex").value),
        cp: Number(document.getElementById("cp").value),

        trestbps: Number(document.getElementById("trestbps").value),

        chol: Number(document.getElementById("chol").value),

        fbs: Number(document.getElementById("fbs").value),

        restecg: Number(document.getElementById("restecg").value),

        thalach: Number(document.getElementById("thalach").value),

        exang: Number(document.getElementById("exang").value),

        oldpeak: Number(document.getElementById("oldpeak").value),

        slope: Number(document.getElementById("slope").value),

        ca: Number(document.getElementById("ca").value),

        thal: Number(document.getElementById("thal").value)

    };

    if (!validate(data))
        return;

    showLoading();

    try {

        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const result = await response.json();

        hideLoading();

        showResult(result);

    }

    catch (error) {

        hideLoading();

        console.error(error);

        alert("Unable to connect to the server.");

    }

});