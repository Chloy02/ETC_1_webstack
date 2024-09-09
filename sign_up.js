// Live validation for each field
document.getElementById('signUpForm').addEventListener('input', function (e) {
    const input = e.target;

    // If input is not valid, show invalid feedback
    if (input.checkValidity() === false) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
});

// Form submit validation
document.getElementById('signUpForm').addEventListener('submit', function (e) {
    e.preventDefault(); 
    // Prevent form from submitting

    if (this.checkValidity() === false) {
        e.stopPropagation();
    } else {
        alert("Sign-up successful! You can now view the news.");
        window.location.href = "main.html";
    }

    this.classList.add('was-validated'); 
    // bootstrap validation class to display error messages
});
