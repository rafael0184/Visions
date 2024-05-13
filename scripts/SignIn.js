import { db, auth } from './FirebaseConfig.js';
import { checkAuthState } from './authCheckDisplay.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', function () {
  const signInButton = document.querySelector('.submit');

  signInButton.addEventListener('click', async function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // User sign-in successful
      const user = userCredential.user;
      console.log('Sign-in successful!');

      // Redirect to the main page (index.html) after successful sign-in
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error signing in:', error.message);
      // Display error message to user
      displayErrorMessage(
        'Failed to sign in. Please check your email or password and try again.'
      );
      clearForm();
    }
  });
});

function clearForm() {
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
}

function displayErrorMessage(message) {
  // You can implement this function to show error messages in the UI
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.style.color = 'red';
}

// Check if user is already signed in on page load
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, redirect to main page
    window.location.href = 'index.html';
  }
});

checkAuthState();
