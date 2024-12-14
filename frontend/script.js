const apiUrl = 'http://localhost:4000/users'; // Update this URL based on your backend

// Fetch all users and populate the table
async function fetchUsers() {
  const response = await fetch(apiUrl);
  const users = await response.json();
  const userTable = document.getElementById('userTable');
  userTable.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phoneNum}</td>
      <td>${formatDate(user.createdAt)}</td>
      <td>${formatDate(user.updatedAt)}</td>
      <td class="actions">
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    userTable.appendChild(row);
  });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Add or update a user
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('userId').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phoneNum = document.getElementById('phoneNum').value;

  const payload = { name, email, phoneNum };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${apiUrl}/${id}` : apiUrl;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  document.getElementById('userForm').reset();
  fetchUsers();
});

// Edit a user
async function editUser(id) {
  const response = await fetch(`${apiUrl}/${id}`);
  const user = await response.json();

  document.getElementById('userId').value = user.id;
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('phoneNum').value = user.phoneNum;
}

// Delete a user
async function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchUsers();
  }
}

// Initial fetch
fetchUsers();
