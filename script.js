// ---------- SELECT ----------
const form = document.getElementById("myForm");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const confirmBox = document.getElementById("confirm");
const overlay = document.getElementById("overlay");
const summaryList = document.getElementById("summaryList");

// ---------- REMEMBER ----------
let submittedReports = [];   // every report sent in this visit


// ---------- LISTEN ----------

// Submit stays disabled until the box is ticked
confirmBox.addEventListener("change", function () {
  submitBtn.disabled = !confirmBox.checked;
});

// Reset button
resetBtn.addEventListener("click", function () {
  form.reset();
  clearErrors();
  resetExtras();
});

// Pop-up: OK, x, and a click on the dark area close it
document.getElementById("okBtn").addEventListener("click", function () {
  overlay.classList.remove("show");
});

document.getElementById("closeBtn").addEventListener("click", function () {
  overlay.classList.remove("show");
});

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    overlay.classList.remove("show");
  }
});


// ---------- CHANGE: validate on submit ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();   // stops page reload on submit
  clearErrors();

  let itemName = document.getElementById("itemName");
  let category = document.getElementById("category");
  let description = document.getElementById("description");
  let area = document.getElementById("area");
  let locationDetail = document.getElementById("locationDetail");
  let dateFound = document.getElementById("dateFound");
  let reporterName = document.getElementById("reporterName");
  let reporterId = document.getElementById("reporterId");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");

  let currentLocation = document.querySelector('input[name="currentLocation"]:checked');
  let role = document.querySelector('input[name="role"]:checked');

  let valid = true;

  // Item name
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

  // Category
  if (category.value === "") {
    showError(category, "categoryError", "Please select a category.");
    valid = false;
  } else {
    showSuccess(category);
  }

  // Description
  if (description.value.trim() === "") {
    showError(description, "descriptionError", "Description is required.");
    valid = false;
  } else if (description.value.trim().length < 10) {
    showError(description, "descriptionError", "Description must be at least 10 characters.");
    valid = false;
  } else {
    showSuccess(description);
  }

  // Campus area
  if (area.value === "") {
    showError(area, "areaError", "Please select the campus area.");
    valid = false;
  } else {
    showSuccess(area);
  }

  // Exact location
  if (locationDetail.value.trim() === "") {
    showError(locationDetail, "locationDetailError", "Exact location is required.");
    valid = false;
  } else if (locationDetail.value.trim().length < 3) {
    showError(locationDetail, "locationDetailError", "Please describe the location in more detail.");
    valid = false;
  } else {
    showSuccess(locationDetail);
  }

  // Date found
  if (dateFound.value === "") {
    showError(dateFound, "dateError", "Date found is required.");
    valid = false;
  } else {
    showSuccess(dateFound);
  }

  // Where is the item now (radio)
  if (currentLocation === null) {
    document.getElementById("currentError").innerHTML =
      "Please tell us where the item is now.";
    valid = false;
  }

  // Role (radio)
  if (role === null) {
    document.getElementById("roleError").innerHTML =
      "Please select Student or Faculty / Staff.";
    valid = false;
  }

  // Full name
  if (reporterName.value.trim() === "") {
    showError(reporterName, "reporterNameError", "Name is required.");
    valid = false;
  } else if (!/^[A-Za-z ]+$/.test(reporterName.value.trim())) {
    showError(reporterName, "reporterNameError", "Only letters and spaces are allowed.");
    valid = false;
  } else {
    showSuccess(reporterName);
  }

  // University ID
  if (reporterId.value.trim() === "") {
    showError(reporterId, "reporterIdError", "University ID is required.");
    valid = false;
  } else if (reporterId.value.trim().length < 4) {
    showError(reporterId, "reporterIdError", "ID must be at least 4 characters.");
    valid = false;
  } else {
    showSuccess(reporterId);
  }

  // Email
  if (email.value.trim() === "") {
    showError(email, "emailError", "Email is required.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, "emailError", "Invalid email address.");
    valid = false;
  } else {
    showSuccess(email);
  }

  // Phone
  if (phone.value.trim() === "") {
    showError(phone, "phoneError", "Phone number is required.");
    valid = false;
  } else if (!/^01[0-9]{9}$/.test(phone.value.trim())) {
    showError(phone, "phoneError", "Enter 11 digits starting with 01.");
    valid = false;
  } else {
    showSuccess(phone);
  }

  // Confirmation checkbox
  if (!confirmBox.checked) {
    document.getElementById("confirmError").innerHTML =
      "You must confirm before submitting.";
    valid = false;
  }

  // Duplicate check (same item, place and date already reported)
  if (valid) {
    submittedReports.forEach(function (report) {
      if (
        report.item === itemName.value.trim() &&
        report.location === locationDetail.value.trim() &&
        report.date === dateFound.value
      ) {
        showError(itemName, "itemNameError", "You already reported this item.");
        valid = false;
      }
    });
  }

  // Success
  if (valid) {
    let report = {
      id: "FND-" + (Math.floor(Math.random() * 9000) + 1000),
      item: itemName.value.trim(),
      category: category.value,
      area: area.value,
      location: locationDetail.value.trim(),
      date: dateFound.value,
      itemNow: currentLocation.value,
      reporter: reporterName.value.trim() + " (" + role.value + ")",
      status: "Pending verification"
    };

    submittedReports.push(report);
    showSummary(report);

    form.reset();
    clearErrors();
    resetExtras();
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

// Submit button back to the disabled starting state
function resetExtras() {
  submitBtn.disabled = true;
}

// Fill the pop-up and open it
function showSummary(report) {
  let lines = [
    "Report ID: " + report.id,
    "Item: " + report.item,
    "Category: " + report.category,
    "Found at: " + report.area + ", " + report.location,
    "Date found: " + report.date,
    "Item is now: " + report.itemNow,
    "Reported by: " + report.reporter,
    "Status: " + report.status
  ];

  summaryList.innerHTML = "";

  lines.forEach(function (text) {
    let li = document.createElement("li");
    li.textContent = text;
    summaryList.appendChild(li);
  });

  overlay.classList.add("show");
}