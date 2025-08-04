const username = localStorage.getItem("loggedInUser");

if (!username) {
  alert("Please log in first.");
  window.location.href = "login.html";
}

let user = JSON.parse(localStorage.getItem(username));

if (!user || user.approved !== true) {
  alert("Your account is not approved yet.");
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

document.getElementById("userName").textContent = user.username;
document.getElementById("walletBalance").textContent = user.wallet.toFixed(2);

const investmentList = document.getElementById("investmentList");
investmentList.innerHTML = "";

if (user.investments && user.investments.length > 0) {
  user.investments.forEach((inv) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${inv.plan}</strong> - Amount: $${inv.amount.toFixed(2)}, 
      Return: $${inv.return.toFixed(2)}, Days: ${inv.days}, 
      Date: ${inv.date}
    `;
    investmentList.appendChild(li);
  });
} else {
  investmentList.innerHTML = "<li>No investments yet.</li>";
}

function invest(plan, amount, percent, days) {
  if (user.wallet < amount) {
    alert("Insufficient funds.");
    return;
  }

  const profit = amount + (amount * percent) / 100;
  user.wallet -= amount;

  if (!user.investments) user.investments = [];

  user.investments.push({
    plan,
    amount,
    return: profit,
    days,
    date: new Date().toLocaleDateString(),
  });

  localStorage.setItem(username, JSON.stringify(user));
  alert("Investment successful!");
  location.reload();
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
// ...existing code...

document.getElementById("userName").textContent = user.username;
document.getElementById("walletBalance").textContent = user.wallet.toFixed(2);

// Daily claim logic
const claimBtn = document.getElementById("dailyClaimBtn");
const claimMsg = document.getElementById("claimMsg");
const today = new Date().toLocaleDateString();

if (user.lastClaimDate === today) {
  claimBtn.disabled = true;
  claimMsg.textContent = "You have already claimed your daily bonus today!";
} else {
  claimBtn.disabled = false;
  claimMsg.textContent = "";
}

claimBtn.onclick = function () {
  if (user.lastClaimDate === today) {
    alert("You have already claimed your daily bonus today!");
    return;
  }
  const bonus = 10; // daily bonus amount
  user.wallet += bonus;
  user.lastClaimDate = today;
  localStorage.setItem(username, JSON.stringify(user));
  document.getElementById("walletBalance").textContent = user.wallet.toFixed(2);
  claimBtn.disabled = true;
  claimMsg.textContent = "You have claimed your daily bonus!";
  alert("You have claimed your daily bonus of $" + bonus + "!");
};
