function loginUser() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errorBox = document.getElementById("loginError");

  const userData = JSON.parse(localStorage.getItem(username));

  if (!userData) {
    errorBox.textContent = "User not found.";
    return;
  }

  if (userData.password !== password) {
    errorBox.textContent = "Incorrect password.";
    return;
  }

  if (!userData.approved) {
    errorBox.textContent = "Your account is not yet approved.";
    return;
  }

  // Save session
  localStorage.setItem("loggedInUser", username);
  window.location.href = "das.html";
}
