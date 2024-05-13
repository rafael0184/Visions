import { db, auth } from './FirebaseConfig.js';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const querySnapshot = await getDocs(collection(db, 'incidents'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const incidentData = doc.data();
      displayAllIncidents(incidentData);
    });
  } catch (error) {
    console.error('Error fetching user incidents:', error);
  }
});

async function displayAllIncidents(incident) {
  let userImageUrl, userName;

  const timestampDate = new Date(incident.timestamp.seconds * 1000);
  const formattedTimestamp = timestampDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // Creating incident HTML element using template literals
  const incidentContainer = document.getElementById('started');
  const incidentTemplate = `
  <section class="Specific"  >
    <img class="accidentt" src="${incident.imageUrl}" alt="">
    <div class="Post_details">
        <div class="user">
            <img class="user_pic" src="${
              userImageUrl || '../assets/img/anon.jpeg'
            }" alt="">
            <div class="user_inner">
                <h3>${incident.name || 'Anonymous'}</h3>
                <span>${formattedTimestamp}</span>
            </div>
        </div>
        <p>${incident.description}</p>
    </div>
  </section>
  `;
  console.log(formattedTimestamp);
  console.log(incidentTemplate);
  // Creating a temporary element to hold the incident HTML
  incidentContainer.insertAdjacentHTML('beforeend', incidentTemplate);
  incidentContainer.style.display = 'block';
}
