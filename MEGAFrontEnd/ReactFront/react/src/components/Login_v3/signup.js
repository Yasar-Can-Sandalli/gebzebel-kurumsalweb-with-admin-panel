document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const button = document.getElementById("submitButton");
    const inputs = form.querySelectorAll("input");

    function checkInputs() {
        const allFilled = [...inputs].every(input => input.value.trim() !== "");
        button.disabled = !allFilled;
    }

    inputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });
});