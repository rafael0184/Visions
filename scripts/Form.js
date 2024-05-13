import { db, storage, auth } from './FirebaseConfig.js';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js';
import { checkAuthState } from './authCheckDisplay.js';

checkAuthState();

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('submit-form');

  submitForm.addEventListener('click', async function () {
    const name = document.getElementById('incident-name').value;
    const location = document.getElementById('incident-location').value;
    const type = document.getElementById('incident-type').value;
    const description = document.getElementById('incident-description').value;
    const imageFile = document.getElementById('incident-img').files[0];

    if (!location || !type || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      let imageUrl = ''; // Initialize imageUrl as empty string

      if (imageFile) {
        // Upload image to Firebase Storage if file is selected
        const storageRef = ref(storage, `incident-images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        const snapshot = await uploadTask;
        imageUrl = await getDownloadURL(snapshot.ref); // Get download URL if image uploaded
      }

      // Check if user is authenticated
      const user = auth.currentUser;
      let userId = null;

      if (user) {
        // User is authenticated, get user ID
        userId = user.uid;
      }

      // Add incident data to Firestore
      const incidentData = {
        name: name,
        location: location,
        type: type,
        description: description,
        imageUrl: imageUrl,
        timestamp: serverTimestamp(), // Include server timestamp
      };

      if (userId) {
        // Add user ID to incident data for authenticated users
        incidentData.userId = userId;
      }

      const docRef = await addDoc(collection(db, 'incidents'), incidentData);

      // Display success message
      alert('Incident submitted successfully!');
      clearForm(); // Clear form inputs
    } catch (error) {
      console.error('Error submitting incident:', error);
      alert('Failed to submit incident. Please try again.');
    }
  });
});

function clearForm() {
  document.getElementById('incident-name').value = '';
  document.getElementById('incident-location').value = '';
  document.getElementById('incident-type').value = '';
  document.getElementById('incident-description').value = '';
  document.getElementById('incident-img').value = '';
}
