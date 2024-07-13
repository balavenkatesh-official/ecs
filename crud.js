const apiUrl = 'http://54.90.90.90:3000/users';

async function fetchUsers() {
    try {
        const response = await axios.get(apiUrl);
        const users = response.data;
        const userTable = document.getElementById('userTable');
        userTable.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.id}</td>
                <td><input type="text" value="${user.name}" id="name-${user.id}" class="form-control"></td>
                <td><input type="email" value="${user.email}" id="email-${user.id}" class="form-control"></td>
                <td>
                    <button class="btn btn-success" onclick="updateUser(${user.id})">Update</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;

            userTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function createUser() {
    try {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        await axios.post(apiUrl, { name, email });
        fetchUsers();
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

async function updateUser(id) {
    try {
        const name = document.getElementById(`name-${id}`).value;
        const email = document.getElementById(`email-${id}`).value;

        await axios.put(`${apiUrl}/${id}`, { name, email });
        fetchUsers();
    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
    }
}

async function deleteUser(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchUsers();
    } catch (error) {
        console.error(`Error deleting user ${id}:`, error);
    }
}

// Fetch users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);
