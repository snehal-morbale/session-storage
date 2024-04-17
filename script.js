document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
   
    var username = document.getElementById("registerUsername").value;
    var password = document.getElementById("registerPassword").value;
    var fullName = document.getElementById("registerFullName").value;
    var email = document.getElementById("registerEmail").value;
    var phoneNo = document.getElementById("registerPhoneNo").value;

    // Store user details in an object
    var userDetails = {
        username: username,
        password: password,
        fullName: fullName,
        email: email,
        phoneNo: phoneNo
    };

    // Store user details object in localStorage
    localStorage.setItem(username, JSON.stringify(userDetails));

    alert("Registration successful! Please login.");

    // Hide registration form and show login form
    document.getElementById("registrationContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;
    
    // Check if username exists and password matches in localStorage
    if (localStorage.getItem(username)) {
        var userDetails = JSON.parse(localStorage.getItem(username));
        if (userDetails.password === password) {
            alert("Login successful!");
            displayDashboard();
        } else {
            alert("Incorrect password!");
        }
    } else {
        alert("User not found!");
    }
});

function displayDashboard() {
    document.getElementById("loginErrorMessage").innerText = "";
    document.getElementById("loginForm").reset();

    // Hide login form and display dashboard
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    // Clear previous user details
    var userDetailsBody = document.getElementById("userDetailsBody");
    userDetailsBody.innerHTML = "";

    // Loop through localStorage to retrieve and display user details
    for (var i = 0; i < localStorage.length; i++) {
        var userDetails = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var row = userDetailsBody.insertRow();
        row.insertCell(0).innerText = userDetails.fullName;
        row.insertCell(1).innerText = userDetails.username;
        row.insertCell(2).innerText = userDetails.email;
        row.insertCell(3).innerText = userDetails.phoneNo;
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function() {
            var usernameToDelete = userDetails.username;
            deleteUser(usernameToDelete);
        });
        row.insertCell(4).appendChild(deleteButton);
    }
}

function deleteUser(username) {
    localStorage.removeItem(username);
    displayDashboard(); // Refresh dashboard after deletion
}
