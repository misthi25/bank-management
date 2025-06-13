let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let currentAccountIndex = null;

function saveAccounts() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
  populateAccountDropdown();
}

function createAccount() {
  const name = document.getElementById("name").value.trim();
  const balance = parseFloat(document.getElementById("balance").value);

  if (!name || isNaN(balance) || balance < 0) {
    alert("Enter a valid name and initial deposit.");
    return;
  }

  accounts.push({ name, balance });
  saveAccounts();
  alert("Account created successfully!");
  document.getElementById("name").value = '';
  document.getElementById("balance").value = '';
}

function populateAccountDropdown() {
  const select = document.getElementById("accountSelect");
  select.innerHTML = `<option value="">-- Choose an account --</option>`;

  accounts.forEach((acc, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = `${acc.name} (₹${acc.balance.toFixed(2)})`;
    select.appendChild(option);
  });
}

function loadSelectedAccount() {
  const selectedIndex = document.getElementById("accountSelect").value;

  if (selectedIndex === "") {
    currentAccountIndex = null;
    document.getElementById("accountInfo").innerText = "No account selected.";
    return;
  }

  currentAccountIndex = parseInt(selectedIndex);
  updateAccountInfo();
}

function deposit() {
  const amount = parseFloat(document.getElementById("depositAmount").value);

  if (currentAccountIndex === null) {
    alert("Please select an account first.");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid deposit amount.");
    return;
  }

  accounts[currentAccountIndex].balance += amount;
  saveAccounts();
  updateAccountInfo();
  alert(`₹${amount} deposited.`);
}

function withdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);

  if (currentAccountIndex === null) {
    alert("Please select an account first.");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid withdrawal amount.");
    return;
  }

  if (amount > accounts[currentAccountIndex].balance) {
    alert("Insufficient balance.");
    return;
  }

  accounts[currentAccountIndex].balance -= amount;
  saveAccounts();
  updateAccountInfo();
  alert(`₹${amount} withdrawn.`);
}

function updateAccountInfo() {
  const acc = accounts[currentAccountIndex];
  document.getElementById("accountInfo").innerHTML = `
    <strong>Account Holder:</strong> ${acc.name}<br>
    <strong>Balance:</strong> ₹${acc.balance.toFixed(2)}
  `;
  populateAccountDropdown(); // To update dropdown balances
}

// Initialize on load
window.onload = populateAccountDropdown;
