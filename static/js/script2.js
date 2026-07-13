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

function showResult(data){

    const modal=document.getElementById("resultModal");

    const title=document.getElementById("modalTitle");

    const icon=document.getElementById("modalIcon");

    const confidence=document.getElementById("modalConfidence");

    const recommendation=document.getElementById("modalRecommendation");

    const progress=document.getElementById("modalProgress");

    const percent=Math.round(data.confidence*100);

    confidence.innerHTML=`Estimated Probability: <b>${percent}%</b>`;

    progress.style.width=percent+"%";

    if(data.prediction===1){

        icon.innerHTML="❤️";

        title.innerHTML="High Risk";

        recommendation.innerHTML="Please consult a cardiologist.";

        progress.style.background="#ef4444";

    }else{

        icon.innerHTML="💚";

        title.innerHTML="Low Risk";

        recommendation.innerHTML="Maintain a healthy lifestyle.";

        progress.style.background="#10b981";

    }

    modal.classList.remove("hidden");

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

        const response = await fetch("/api/predict", {

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

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("resultModal");
    const closeBtn = document.getElementById("closeModal");
    const okBtn = document.getElementById("okBtn");

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    okBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

});