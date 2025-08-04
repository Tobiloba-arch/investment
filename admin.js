const userList = document.getElementById("adminUserList");

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  if (key === "loggedInUser") continue;

  const user = JSON.parse(localStorage.getItem(key));
  if (user && user.username) {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="user-entry">
        <label>
          <input type="checkbox" name="userCheck" value="${user.username}" />
          <strong>${user.username}</strong> - ${
      user.approved ? "✅ Approved" : "⛔ Not Approved"
    } | Registered: ${user.date || "Unknown"}
        </label>
      </div>
    `;
    userList.appendChild(li);
  }
}

function bulkApprove() {
  const checked = document.querySelectorAll('input[name="userCheck"]:checked');
  if (checked.length === 0) return alert("No user selected");

  checked.forEach((input) => {
    const username = input.value;
    const user = JSON.parse(localStorage.getItem(username));
    if (user) {
      user.approved = true;
      localStorage.setItem(username, JSON.stringify(user));
    }
  });

  alert("Selected users approved.");
  location.reload();
}

function bulkReject() {
  const checked = document.querySelectorAll('input[name="userCheck"]:checked');
  if (checked.length === 0) return alert("No user selected");

  checked.forEach((input) => {
    const username = input.value;
    localStorage.removeItem(username);
  });

  alert("Selected users rejected.");
  location.reload();
}
