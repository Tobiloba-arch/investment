let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const user = {
      username,
      password,
      wallet: 100000,
      investments: [],
      approved: false,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered! Wait for admin approval.");
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const found = users.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.LoginEmail === email
    );
    if (found) {
      if (!found.approved) {
        alert("Account not approved yet.");
        return;
      }
      localStorage.setItem("currentUser", JSON.stringify(found));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  });
}

// DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
  if (!currentUser) {
    alert("Please login first");
    window.location.href = "login.html";
  } else {
    document.getElementById("userName").innerText = currentUser.username;
    document.getElementById("walletBalance").innerText = currentUser.wallet;

    const investmentList = document.getElementById("investmentList");
    currentUser.investments.forEach((inv) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <strong>${inv.plan}</strong> - 
            Amount: $${inv.amount} - 
            Return: ${inv.returnPercent}% - 
            Days: ${inv.days}
        `;
      investmentList.appendChild(li);
    });
  }
}

// INVEST
function invest(plan, amount, returnPercent, days) {
  if (!currentUser) return;
  if (currentUser.wallet < amount) {
    alert("Insufficient wallet");
    return;
  }
  const investment = { plan, amount, returnPercent, days };
  currentUser.wallet -= amount;
  currentUser.investments.push(investment);

  users = users.map((u) =>
    u.username === currentUser.username ? currentUser : u
  );

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  alert("Investment successful!");
  location.reload();
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ADMIN PAGE
if (window.location.pathname.includes("admin.html")) {
  const list = document.getElementById("adminUserList");
  users.forEach((u) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${u.username}</strong> - 
      Approved: ${u.approved} 
      <button onclick="approve('${u.username}')">Approve</button>
    `;
    list.appendChild(li);
  });
}

function approve(username) {
  users = users.map((u) => {
    if (u.username === username) {
      u.approved = true;

      // EMAIL notification
      emailjs.send("service_usdldhr", "template_f1f3mkp", {
        to_name: u.username,
        message: "Your account has been approved!",
      });
    }
    return u;
  });
  localStorage.setItem("users", JSON.stringify(users));
  alert(`Approved ${username}`);
  location.reload();
}
