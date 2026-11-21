const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();   // stops page reload on submit
  clearErrors();

  let itemName = document.getElementById("itemName");
  let description = document.getElementById("description");
  let location = document.getElementById("location");
  let dateFound = document.getElementById("dateFound");
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");

  let itemNow = document.querySelector('input[name="itemNow"]:checked');
  let role = document.querySelector('input[name="role"]:checked');
  let confirm = document.querySelectorAll('input[name="confirm"]:checked');

  let valid = true;

  // Item name validation
  if (itemName.value.trim() === "") {
    showError(itemName, "itemNameError", "Item name is required.");
    valid = false;
  } else if (itemName.value.trim().length < 3) {
    showError(itemName, "itemNameError", "Item name must be at least 3 characters.");
    valid = false;
  } else if (!/^[A-Za-z0-9 ]+$/.test(itemName.value.trim())) {
    showError(itemName, "itemNameError", "Only letters, numbers and spaces are allowed.");
    valid = false;
  } else {
    showSuccess(itemName);
  }

  // Description validation
  if (description.value.trim() === "") {
    showError(description, "descriptionError", "Description is required.");
    valid = false;
  } else if (description.value.trim().length < 10) {
    showError(description, "descriptionError", "Description must be at least 10 characters.");
    valid = false;
  } else {
    showSuccess(description);
  }

  // Location validation
  if (location.value.trim() === "") {
    showError(location, "locationError", "Exact location is required.");
    valid = false;
  } else if (location.value.trim().length < 3) {
    showError(location, "locationError", "Location must be at least 3 characters.");
    valid = false;
  } else {
    showSuccess(location);
  }

  // Date validation
  if (dateFound.value === "") {
    showError(dateFound, "dateFoundError", "Date found is required.");
    valid = false;
  } else {
    showSuccess(dateFound);
  }

  // Where is the item now (radio)
  if (itemNow === null) {
    document.getElementById("itemNowError").innerHTML =
      "Please tell us where the item is now.";
    valid = false;
  }

  // Role (radio)
  if (role === null) {
    document.getElementById("roleError").innerHTML =
      "Please select Student or Faculty / Staff.";
    valid = false;
  }

  // Name validation
  if (name.value.trim() === "") {
    showError(name, "nameError", "Name is required.");
    valid = false;
  } else if (!/^[A-Za-z ]+$/.test(name.value.trim())) {
    showError(name, "nameError", "Only letters and spaces are allowed.");
    valid = false;
  } else {
    showSuccess(name);
  }

  // Email validation
  if (email.value.trim() === "") {
    showError(email, "emailError", "Email is required.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, "emailError", "Invalid email address.");
    valid = false;
  } else {
    showSuccess(email);
  }

  // Phone validation
  if (phone.value.trim() === "") {
    showError(phone, "phoneError", "Phone number is required.");
    valid = false;
  } else if (!/^01[0-9]{9}$/.test(phone.value.trim())) {
    showError(phone, "phoneError", "Enter 11 digits starting with 01.");
    valid = false;
  } else {
    showSuccess(phone);
  }

  // Checkbox (confirmation)
  if (confirm.length === 0) {
    document.getElementById("confirmError").innerHTML =
      "You must confirm before submitting.";
    valid = false;
  }

  // Success
  if (valid) {
    alert("Report Submitted Successfully!");
    form.reset();
    clearErrors();
  }
});

// ---------- Functions ----------

// Show error
function showError(input, errorId, message) {
  input.classList.add("errorBorder");
  input.classList.remove("successBorder");
  document.getElementById(errorId).innerHTML = message;
}

// Show success
function showSuccess(input) {
  input.classList.remove("errorBorder");
  input.classList.add("successBorder");
}

// Clear all errors
function clearErrors() {
  let errors = document.querySelectorAll(".error");
  errors.forEach(function (item) {
    item.innerHTML = "";
  });

  let fields = document.querySelectorAll("input, select, textarea");
  fields.forEach(function (field) {
    field.classList.remove("errorBorder");
    field.classList.remove("successBorder");
  });
}
