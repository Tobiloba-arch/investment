document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  if (localStorage.getItem(username)) {
    alert("Username already exists.");
    return;
  }

  const user = {
    username: username,
    email: email,
    password: password,
    approved: false,
    wallet: 0,
    investments: [],
    date: new Date().toLocaleString(),
  };

  localStorage.setItem(username, JSON.stringify(user));
  alert("Signup successful! Please wait for admin approval.");

  document.getElementById("signupForm").reset();
});
