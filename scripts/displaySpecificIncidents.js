import { db, auth } from './FirebaseConfig.js';
import {
  doc,
  getDoc,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const incidentId = urlParams.get('id');

    if (incidentId) {
      const incidentRef = doc(db, 'incidents', incidentId);
      const incidentsSnapshot = await getDoc(incidentRef);

      if (incidentsSnapshot.exists()) {
        const incidentData = incidentsSnapshot.data();

        let userImage = '../assets/img/anon.jpeg';
        let userEmail = '';
        let incidentUserName = incidentData.name || 'Anonymous';
        let formattedTimestamp = '';

        if (incidentData.userId) {
          const userDoc = await getDoc(doc(db, 'users', incidentData.userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            userEmail = userData.email;
            userImage = userData.imageUrl || '../assets/img/anon.jpeg';
          }
        }

        const timestampDate = new Date(incidentData.timestamp.seconds * 1000);
        formattedTimestamp = timestampDate.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        const incidentContainer = document.getElementById('started');
        incidentContainer.innerHTML = '';

        const incidentTemplate = `
          <img class="accidentt" src="${incidentData.imageUrl}" alt="Incident Image">
          <div class="Post_details">
              <div class="user">
                  <img class="user_pic" src="${userImage}" alt="">
                  <div class="user_inner">
                      <h3>${incidentUserName}</h3>
                      <span>${formattedTimestamp}</span>
                  </div>
              </div>
              <p>${incidentData.description}</p>
          </div>
        `;

        incidentContainer.insertAdjacentHTML('beforeend', incidentTemplate);
        incidentContainer.style.display = 'flex';
      } else {
        console.error('Incident not found');
      }
    }
  } catch (error) {
    console.error('Error fetching incident data:', error);
  }
});
