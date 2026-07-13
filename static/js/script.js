const buttons = document.querySelectorAll(".start-prediction");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        try {

        window.location.href = "/predict";

    }

    catch (error) {

        hideLoading();

        console.error(error);

        alert("Unable to connect to the server.");

    }
    });
});