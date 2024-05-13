import { auth } from './FirebaseConfig.js';
import { checkAuthState } from './authCheckDisplay.js';

document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('logout-button');

  // Check authentication state
  checkAuthState();

  // Add event listener for logout button
  logoutButton.addEventListener('click', function () {
    // Sign out the user
    auth
      .signOut()
      .then(() => {
        // Redirect to index.html after successful logout
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
        // Handle sign-out error if needed
      });
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      displayUserInfo();
    } else {
      // User is not signed in
      window.location.href = 'signin.html'; // Redirect to sign-in page
    }
  });
});

function displayUserInfo() {
  // This function can be used to display user information dynamically on the page
  const userInfoContainer = document.querySelector('.Miko');

  // Example: Fetch user data and populate the user info container
  const user = auth.currentUser;
  if (user) {
    // Use user data to populate HTML elements
    const userEmailElement = document.createElement('span');
    userEmailElement.textContent = `Email: ${user.email}`;
    userInfoContainer.appendChild(userEmailElement);

    // You can display additional user information here based on your requirements
  } else {
    // User not signed in, handle accordingly
    userInfoContainer.textContent = 'User not signed in';
  }
}
