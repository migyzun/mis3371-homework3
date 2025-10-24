/*
Program name: homework3.js
Name: Jose Miguel Zuniga
Date Created: 10/20/25
Date Last Edited: 10/24/2025
Version: 2.0
Description: Homework 3 JS - ON-THE-FLY VALIDATION
*/

// Display today's date
const currentDateElement = document.getElementById("currentDate");
const currentDate = new Date().toLocaleDateString();
currentDateElement.innerHTML = currentDate;

// Set date range dynamically for Date of Birth
const today = new Date();
const maxDate = today.toISOString().split('T')[0];
const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 120);
const minDateStr = minDate.toISOString().split('T')[0];

document.getElementById("dateOfBirth").setAttribute('min', minDateStr);
document.getElementById("dateOfBirth").setAttribute('max', maxDate);

// Update pain level display
document.getElementById("slider").addEventListener("input", function() {
    const painLevel = this.value;
    document.getElementById("painValue").textContent = painLevel;
});

// Update pain level function
function updatePainLevel(value) {
    document.getElementById("painValue").textContent = value;
}

// Validate user ID
function validateUserID() {
    var userIDInput = document.getElementById("userID");
    var userID = userIDInput.value.toLowerCase();
    var userIDError = document.getElementById("userIDError");
    userIDError.textContent = "";

    if (userID.length < 5 || userID.length > 20) {
        userIDError.textContent = "ERROR: Username must be between 5 and 20 characters.";
        return false;
    }
    if (!isNaN(userID.charAt(0))) {
        userIDError.textContent = "ERROR: Username cannot start with a number.";
        return false;
    }
    var userIDPattern = /^[a-z0-9_-]+$/;
    if (!userIDPattern.test(userID)) {
        userIDError.textContent = "ERROR: Username can only contain letters, numbers, underscores, or dashes.";
        return false;
    }
    userIDInput.value = userID.toLowerCase();

    return true;
}


// Validate Password
function validatePassword() {
    var password = document.getElementById("password").value;
    var passwordError = document.getElementById("passwordError");
    var userID = document.getElementById("userID").value.toLowerCase();
    var firstName = document.getElementById("firstName").value.toLowerCase();
    var lastName = document.getElementById("lastName").value.toLowerCase();

    passwordError.textContent = ""; // Clear previous error message
    var isValid = true;  // Initialize validation flag

    // Pattern to check for at least one lowercase, one uppercase, one digit, and one special character
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_+=\\/><.,`~])/;

    // Check if the password meets the minimum length requirement
    if (password.length < 8 || password.length > 30) {
        passwordError.textContent = "ERROR: Password must be between 8 and 30 characters long.";
        isValid = false;
    } 
    // Check if the password contains at least one lowercase, one uppercase, one digit, and one special character
    else if (!passwordPattern.test(password)) {
        passwordError.textContent = "ERROR: Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
        isValid = false;
    }
    // Check if password contains double quotes (not allowed)
    else if (password.includes('"')) {
        passwordError.textContent = "ERROR: Password cannot contain double quotes.";
        isValid = false;
    }
    // Check if the password is the same as the Username (case-insensitive)
    else if (password.toLowerCase() === userID) {
        passwordError.textContent = "ERROR: Password cannot be the same as the Username.";
        isValid = false;
    }
    // Check if password contains part of username
    else if (userID.length > 0 && password.toLowerCase().includes(userID)) {
        passwordError.textContent = "ERROR: Password cannot contain your username.";
        isValid = false;
    }
    // Check if password contains first or last name
    else if (firstName.length > 0 && password.toLowerCase().includes(firstName)) {
        passwordError.textContent = "ERROR: Password cannot contain your first name.";
        isValid = false;
    }
    else if (lastName.length > 0 && password.toLowerCase().includes(lastName)) {
        passwordError.textContent = "ERROR: Password cannot contain your last name.";
        isValid = false;
    }

    return isValid;  // Return the validation result
}


// Validate Password Match
function validatePasswordMatch() {
    var password = document.getElementById("password").value;
    var reEnteredPassword = document.getElementById("re_password").value;
    var passwordMatchError = document.getElementById("passwordMatchError");

    passwordMatchError.textContent = ""; // Clear previous error message
    var isValid = true;  // Initialize validation flag

    // Check if the two passwords match
    if (password !== reEnteredPassword) {
        passwordMatchError.textContent = "ERROR: Passwords do not match.";
        isValid = false;
    }

    return isValid;  // Return the validation result
}

// Validate first name
function validateFirstName() {
    var firstName = document.getElementById("firstName").value;
    var firstNameError = document.getElementById("firstNameError");
    firstNameError.textContent = "";
    var namePattern = /^[A-Za-z'-]+$/;

    if (firstName.length < 1 || firstName.length > 30) {
        firstNameError.textContent = "ERROR: First name must be 1 to 30 characters.";
        return false;
    }
    if (!namePattern.test(firstName)) {
        firstNameError.textContent = "ERROR: Please enter a valid first name (letters, apostrophes, and dashes only).";
        return false;
    }
    return true;
}

// Validate Middle Initial
function validateMiddleInitial() {
     var middleInitial = document.getElementById("middleInitial").value;
    var middleInitialError = document.getElementById("middleInitialError");
    middleInitialError.textContent = "";

    if (middleInitial && !/^[A-Za-z]$/.test(middleInitial)) {
        middleInitialError.textContent = "ERROR: Middle initial must be a single letter.";
        return false;
    }
    return true;
}

// Validate last name
function validateLastName() {
    var lastName = document.getElementById("lastName").value;
    var lastNameError = document.getElementById("lastNameError");
    lastNameError.textContent = "";
    var lastNamePattern = /^[A-Za-z' -]{1,30}$/;

    if (!lastNamePattern.test(lastName)) {
        lastNameError.textContent = "ERROR: Please enter a valid last name (1 to 30 characters, letters, apostrophes, dashes only).";
        return false;
    }
    return true;
}

// Validate date of birth
function dobValidation() {
    const dob = document.getElementById("dateOfBirth").value;
    const date = new Date(dob);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 120);
    const error = document.getElementById("dob-error");
    error.textContent = "";

    if (date > new Date()) {
        error.textContent = "ERROR: Date cannot be in the future.";
        return false;
    } else if (date < maxDate) {
        error.textContent = "ERROR: Date cannot be more than 120 years ago.";
        return false;
    }

    return true;
}

// SSN Format Function
function formatSSN() {
    var ssnInput = document.getElementById("ssn");
    var ssnError = document.getElementById("ssnError");
    var input = ssnInput.value.replace(/\D/g, "").slice(0, 9);
    ssnInput.value = input.length > 0 ? input.slice(0, 3) + (input.length > 3 ? "-" + input.slice(3, 5) : "") + (input.length > 5 ? "-" + input.slice(5, 9) : "") : "";

    ssnError.textContent = input.length === 9 && !/^\d{3}-\d{2}-\d{4}$/.test(ssnInput.value) 
        ? "ERROR: Please enter a valid SSN in the format XXX-XX-XXXX." 
        : "";
}

// SSN Validation Function
function validateSSN() {
    var ssnInput = document.getElementById("ssn");
    var ssnError = document.getElementById("ssnError");
    var valid = ssnInput.value.replace(/\D/g, "").length === 9;
    ssnError.textContent = valid ? "" : "ERROR: Enter exactly 9 digits for a valid SSN.";
    return valid;
}

// Validate the address 1
function validateAddress() {
    var addressInput = document.getElementById("address1");
    var addressError = document.getElementById("addressError");
    var address = addressInput.value.trim();
   
    if (address.length < 2 || address.length > 30) {
        addressError.textContent = "ERROR: Address must be between 2 and 30 characters.";
        addressInput.setCustomValidity("Address must be between 2 and 30 characters.");
        return false;
    } else {
        addressError.textContent = ""; 
        addressInput.setCustomValidity(""); 
    }
    return true;
}

// Validate Address 2 length (optional field)
function validateAddress2() {
    var address2Input = document.getElementById("address2");
    var address2Error = document.getElementById("address2Error");
    var address2 = address2Input.value.trim();

    if (address2.length > 0 && (address2.length < 2 || address2.length > 30)) {
        address2Error.textContent = "ERROR: Address 2 must be between 2 and 30 characters.";
        address2Input.setCustomValidity("Address 2 must be between 2 and 30 characters.");
        return false;
    } else {
        address2Error.textContent = ""; 
        address2Input.setCustomValidity(""); 
    }
    return true;
}

// Validate City 
function validateCity() {
    var cityInput = document.getElementById("city");
    var cityError = document.getElementById("cityError");
    var city = cityInput.value.trim();

    if (city.length < 2 || city.length > 30) {
        cityError.textContent = "ERROR: City must be between 2 and 30 characters.";
        cityInput.setCustomValidity("City must be between 2 and 30 characters.");
        return false;
    } else {
        cityError.textContent = ""; 
        cityInput.setCustomValidity(""); 
    }
    return true;
}

// Validate State (NEW for HW3)
function validateState() {
    var state = document.getElementById("state").value;
    var stateError = document.getElementById("stateError");
    stateError.textContent = "";

    if (state === "") {
        stateError.textContent = "ERROR: Please select a state.";
        return false;
    }
    return true;
}

// Validate Zip Code
function validateZipCode() {
    var zipCode = document.getElementById("zipCode").value.trim();
    var zipCodeError = document.getElementById("zipCodeError");
    zipCodeError.textContent = ""; 

    // Accept 5 digits or zip+4 format (12345-6789)
    if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
        zipCodeError.textContent = "ERROR: Please enter a valid 5-digit Zip Code.";
        return false;
    }

    // Truncate to 5 digits if longer
    if (zipCode.length > 5) {
        document.getElementById("zipCode").value = zipCode.substring(0, 5);
    }

    return true;
}

// Validate Email
function validateEmail() {
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    emailError.textContent = "";
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "ERROR: Please enter a valid email address (name@domain.tld).";
        return false;
    }

    return true;
}

document.getElementById('email').addEventListener('input', function() {
    this.value = this.value.toLowerCase();
});

// Format the phone number as xxx-xxx-xxxx
function formatPhoneNumber() {
    var phoneInput = document.getElementById("phoneNumber");
    var input = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    phoneInput.value = input.length > 0 ? input.slice(0, 3) + (input.length > 3 ? "-" + input.slice(3, 6) : "") + (input.length > 6 ? "-" + input.slice(6, 10) : "") : "";
}

// Validate phone number
function validatePhoneNumber() {
    var phoneInput = document.getElementById("phoneNumber");
    var phoneError = document.getElementById("phoneError");
    var valid = phoneInput.value.replace(/\D/g, "").length === 10;
    phoneError.textContent = valid ? "" : "ERROR: Please enter a valid 10-digit phone number.";
    return valid;
}

// Validate Gender (NEW for HW3)
function validateGender() {
    var gender = document.querySelector('input[name="msex"]:checked');
    var genderError = document.getElementById("genderError");
    genderError.textContent = "";

    if (!gender) {
        genderError.textContent = "ERROR: Please select a gender.";
        return false;
    }
    return true;
}

// Validate Description/Textarea (NEW for HW3)
function validateDescription() {
    var description = document.getElementById("description").value;
    var descriptionError = document.getElementById("descriptionError");
    descriptionError.textContent = "";

    // Check for double quotes
    if (description.includes('"')) {
        descriptionError.textContent = "ERROR: Please avoid using double quotes.";
        return false;
    }
    return true;
}

// NEW FOR HW3: Validate entire form and show/hide submit button
function validateForm() {
    let isValid = true;
    let errorMessages = [];

    // Run all validations
    if (!validateUserID()) { isValid = false; errorMessages.push("Username"); }
    if (!validatePassword()) { isValid = false; errorMessages.push("Password"); }
    if (!validatePasswordMatch()) { isValid = false; errorMessages.push("Password Match"); }
    if (!validateFirstName()) { isValid = false; errorMessages.push("First Name"); }
    if (!validateMiddleInitial()) { isValid = false; errorMessages.push("Middle Initial"); }
    if (!validateLastName()) { isValid = false; errorMessages.push("Last Name"); }
    if (!dobValidation()) { isValid = false; errorMessages.push("Date of Birth"); }
    if (!validateSSN()) { isValid = false; errorMessages.push("SSN"); }
    if (!validateAddress()) { isValid = false; errorMessages.push("Address 1"); }
    if (!validateAddress2()) { isValid = false; errorMessages.push("Address 2"); }
    if (!validateCity()) { isValid = false; errorMessages.push("City"); }
    if (!validateState()) { isValid = false; errorMessages.push("State"); }
    if (!validateZipCode()) { isValid = false; errorMessages.push("Zip Code"); }
    if (!validateEmail()) { isValid = false; errorMessages.push("Email"); }
    if (!validatePhoneNumber()) { isValid = false; errorMessages.push("Phone Number"); }
    if (!validateGender()) { isValid = false; errorMessages.push("Gender"); }
    if (!validateDescription()) { isValid = false; errorMessages.push("Description"); }

    // Show or hide submit button based on validation
    var submitButton = document.getElementById("submitButton");
    var validationSummary = document.getElementById("validationSummary");

    if (isValid) {
        submitButton.style.display = "inline-block";
        validationSummary.innerHTML = "<p style='color: green; font-weight: bold; margin-top: 20px;'>✓ All fields are valid! You may now submit the form.</p>";
    } else {
        submitButton.style.display = "none";
        validationSummary.innerHTML = "<p style='color: red; font-weight: bold; margin-top: 20px;'>✗ Please correct the following fields: " + errorMessages.join(", ") + "</p>";
    }

    return isValid;
}

// NEW FOR HW3: Clear all errors when reset is clicked
function clearAllErrors() {
    document.getElementById("userIDError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("passwordMatchError").textContent = "";
    document.getElementById("firstNameError").textContent = "";
    document.getElementById("middleInitialError").textContent = "";
    document.getElementById("lastNameError").textContent = "";
    document.getElementById("dob-error").textContent = "";
    document.getElementById("ssnError").textContent = "";
    document.getElementById("addressError").textContent = "";
    document.getElementById("address2Error").textContent = "";
    document.getElementById("cityError").textContent = "";
    document.getElementById("stateError").textContent = "";
    document.getElementById("zipCodeError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("genderError").textContent = "";
    document.getElementById("descriptionError").textContent = "";
    document.getElementById("validationSummary").innerHTML = "";
    document.getElementById("submitButton").style.display = "none";
}
