// Select the form and message elements
const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

// Add event listener to the form
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from refreshing the page

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    // Simulate login success (you can add your logic here)
    messageBox.textContent = "Login successful! Redirecting...";
    messageBox.style.color = "#22c55e"; // Green for success

    // Simulate redirection after 2 seconds
    setTimeout(() => {
      window.location.href = "/dashboard.html"; // Replace with actual dashboard URL
    }, 2000);
  } else {
    messageBox.textContent = "Please fill out all fields.";
    messageBox.style.color = "#f87171"; // Red for error
  }
  
});
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Validate Login (For demonstration purposes, we'll skip validation)
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
      // Redirect to the main page on successful login
      window.location.href = "main.html"; // Change "main.html" to the actual filename
    } else {
      document.getElementById('loginMessage').textContent = "Please enter valid credentials.";
    }
  });

// JavaScript for toggling between forms
document.addEventListener("DOMContentLoaded", () => {
    const loginToggle = document.getElementById("loginToggle");
    const signUpToggle = document.getElementById("signUpToggle");
    const loginForm = document.getElementById("loginForm");
    const signUpForm = document.getElementById("signUpForm");
  
    // Toggle to Login Form
    loginToggle.addEventListener("click", () => {
      loginToggle.classList.add("active");
      signUpToggle.classList.remove("active");
      loginForm.classList.add("active");
      signUpForm.classList.remove("active");
    });
  
    // Toggle to Sign-Up Form
    signUpToggle.addEventListener("click", () => {
      signUpToggle.classList.add("active");
      loginToggle.classList.remove("active");
      signUpForm.classList.add("active");
      loginForm.classList.remove("active");
    });
  });
  