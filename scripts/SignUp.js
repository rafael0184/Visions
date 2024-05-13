import { db, auth } from './FirebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import {
  setDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import { checkAuthState } from './authCheckDisplay.js';

document.addEventListener('DOMContentLoaded', function () {
  const signupButton = document.getElementById('signup-button');

  signupButton.addEventListener('click', async function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // User signup successful
      if (userCredential) {
        const user = userCredential.user;
        // Adding to firebase firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: email,
          uid: user.uid,
          name: '',
          username: '',
          userimage: '',
          gender: '',
          age: '',
        });
        await auth.signInWithEmailAndPassword(email, password);

        alert('Account created successfully!');

        // Redirect to index.html after successful signup
        window.location.href = 'index.html';
      }
    } catch (error) {
      console.error('Error creating account:', error.message);
      alert('Failed to create account. Please try again.');
      clearForm();
    }
  });
});

function clearForm() {
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirm-password').value = '';
}

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    window.location.href = 'index.html';
  } else {
    // User is not signed in
  }
});

function displayErrorMessage(message) {
  // You can implement this function to show error messages in the UI
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.style.color = 'red';
}
