let usersData = []; // Store users globally for sorting

function showTab(tabId) {
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  document
    .querySelector(`.tab[onclick="showTab('${tabId}')"]`)
    .classList.add("active");
  document.getElementById(tabId).classList.add("active");
}

async function submitUser() {
  const form = document.getElementById("userForm");
  const formData = new FormData(form);
  const registerButton = form.querySelector("button");

  // Save original button text
  const originalText = registerButton.textContent;

  // Set button to "processing" state
  registerButton.textContent = "Processing...";
  registerButton.disabled = true;

  try {
    const response = await fetch("http://localhost:3000/app/userRegister", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("User registered successfully");
      form.reset();
      loadUsers();
    } else {
      const error = await response.json();
      alert(`Failed to register user: ${error.message}`);
    }
  } catch (error) {
    alert(`An error occurred: ${error.message}`);
  } finally {
    // Restore original button state
    registerButton.textContent = originalText;
    registerButton.disabled = false;
  }
}


async function loadUsers() {
  try {
    const response = await fetch("http://localhost:3000/app/userList");
    const data = await response.json();

    const noDataMessage = document.getElementById("noDataMessage");
    usersData = data.message || []; // Store users

    if (usersData.length === 0) {
      noDataMessage.style.display = "block";
    } else {
      noDataMessage.style.display = "none";
      renderUsers(usersData);
    }
  } catch (error) {
    console.error("Failed to load users:", error.message);
  }
}

function showProfilePopup(event, profileImage) {
  // Create the popup element
  const popup = document.createElement("div");
  popup.className = "profile-popup";

  // Add the content
  popup.innerHTML = `
    <img src="${profileImage || 'default-profile.png'}" alt="Profile" class="popup-profile-pic">
  `;

  // Append the popup to the body
  document.body.appendChild(popup);

  // Calculate position
  const popupWidth = 200; // Width of the popup
  const popupHeight = 200; // Height of the popup
  const offset = 10; // Distance from the cursor

  let left = event.pageX + offset;
  let top = event.pageY + offset;

  // Adjust position if the popup goes off the screen
  if (left + popupWidth > window.innerWidth) {
    left = event.pageX - popupWidth - offset;
  }
  if (top + popupHeight > window.innerHeight) {
    top = event.pageY - popupHeight - offset;
  }

  // Apply calculated position
  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;
}

function hideProfilePopup() {
  const popup = document.querySelector(".profile-popup");
  if (popup) {
    popup.remove();
  }
}

// Updated renderUsers to include hover events
function renderUsers(users) {
  const userTableBody = document.getElementById("userList");
  userTableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name} ${user.surname}</td>
      <td>${new Date(user.birthDate).toLocaleDateString()}</td>
      <td>${user.email}</td>
      <td>
        <img 
          src="${user.profileImage || 'default-profile.png'}" 
          alt="Profile" 
          class="profile-pic"
          onmouseover="showProfilePopup(event, '${user.profileImage || 'default-profile.png'}')"
          onmouseout="hideProfilePopup()"
        >
      </td>
      <td>
        <button onclick="deleteUser('${user._id}')">Delete</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });
}

async function deleteUser(userId) {
  const deleteButton = document.querySelector(`button[onclick="deleteUser('${userId}')"]`);
  if (!deleteButton) return;

  // Save original button text
  const originalText = deleteButton.textContent;

  // Change button text and disable the button
  deleteButton.textContent = "Deleting...";
  deleteButton.disabled = true;

  try {
    const response = await fetch(`http://localhost:3000/app/userDelete/${userId}`, {
      method: "DELETE",
    });

    console.log(response)


    if (response.ok) {
      // Remove the deleted user from the `usersData` array
      usersData = usersData.filter((user) => user._id !== userId);

      // Re-render the user list
      renderUsers(usersData);

      // Optionally reload the users from the server
      await loadUsers(); // Uncomment if you want to reload from the backend
    } else {
      alert("Failed to delete user");
    }
  } catch (error) {
    console.error("Error while deleting user:", error.message);
    alert("An error occurred while deleting the user.");
  } finally {
    // Restore original button state
    deleteButton.textContent = originalText;
    deleteButton.disabled = false;
  }
}

// Load users initially
loadUsers();
