import { auth } from './FirebaseConfig.js';

// Function to check if a user is signed in
export function checkAuthState() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      handleUserSignedIn();
    } else {
      // User is not signed in
      handleUserNotSignedIn();
    }
  });
}

// Function to handle UI changes when user is signed in
function handleUserSignedIn() {
  // Hide sign-in and sign-up buttons
  const signInButton = document.querySelector('.login');
  const signUpButton = document.querySelector('.sign');
  if (signInButton) signInButton.style.display = 'none';
  if (signUpButton) signUpButton.style.display = 'none';

  // Show profile link
  const profileLink = document.getElementById('profile-link');
  if (profileLink) profileLink.style.display = 'block';
}

// Function to handle UI changes when user is not signed in
function handleUserNotSignedIn() {
  // Show sign-in and sign-up buttons
  const signInButton = document.querySelector('.login');
  const signUpButton = document.querySelector('.sign');
  if (signInButton) signInButton.style.display = 'block';
  if (signUpButton) signUpButton.style.display = 'block';

  // Hide profile link
  const profileLink = document.getElementById('profile-link');
  if (profileLink) profileLink.style.display = 'none';
}
