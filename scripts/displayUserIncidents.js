import { db, auth } from './FirebaseConfig.js';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

let currentUser;
document.addEventListener('DOMContentLoaded', async function () {
  try {
    auth.onAuthStateChanged((user) => {
      if (user) {
        displayUserIncidents(user.uid);
      } else {
        window.location.href = 'index.html';
      }
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
  }
});

async function displayUserIncidents(userId) {
  try {
    console.log('User ID:', userId);
    const incidentsRef = collection(db, 'incidents');

    const userIncidentsQuery = query(
      incidentsRef,
      where('userId', '==', userId)
    );

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const userIncidentsSnapshot = await getDocs(userIncidentsQuery);

    // Iterate through each incident document and render HTML
    userIncidentsSnapshot.forEach((incidentDoc) => {
      const incidentData = incidentDoc.data();
      const { name, description, imageUrl, timestamp, type, location } =
        incidentData;

      console.log(incidentData);
      // Format timestamp (assuming 'timestamp' is a Firestore Timestamp object)
      const incidentTimestamp = timestamp.toDate().toLocaleString();

      const incidentContainer = document.getElementById('started');

      // Construct HTML template for each incident
      const incidentTemplate = `
        <div class="Report">
          <div class="Report_name">
              <img src="${
                userData.imageUrl || '../assets/img/anon.jpeg'
              }" alt="">
              <div class="Report_inner">
                  <h3>${name || 'Anonymous'}</h3>
                  <span>${incidentTimestamp}</span>
              </div>
          </div>
          <div>
              Type of Accident: ${type}
          </div>
          <div>
              Location: ${location}
          </div>
          <p>${description || ''}</p>
          <img class="accident_pic" src="${imageUrl || ''}" alt="">
          <a class="Read" href="SpecificReport.html?id=${
            incidentDoc.id
          }">Read</a>
        </div>
      `;

      // Append incident template to incidents container
      incidentContainer.insertAdjacentHTML('beforeend', incidentTemplate);
    });
  } catch (error) {
    console.error('Error fetching user incidents:', error);
  }
}
