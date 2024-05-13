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
    const incidentsQuery = query(
      collection(db, 'incidents'),
      orderBy('timestamp', 'desc'),
      limit(4)
    );

    const incidentsSnapshot = await getDocs(incidentsQuery);

    // Iterate through each incident document using for...of loop
    for (const incidentDoc of incidentsSnapshot.docs) {
      const incidentData = incidentDoc.data();
      const userId = incidentData.userId;

      let userImage = '../assets/img/anon.jpeg';
      let userName = 'Anonymous';
      let userEmail = 'Anonymous';
      let formattedTimestamp = '';
      let incidentUserName = incidentData.name || 'Anonymous';
      let incidentDescription = incidentData.description || '';
      let incidentImage = incidentData.imageUrl || '';

      if (userId) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          userName = userData.username || 'Anonymous';
          userImage = userData.imageUrl || '../assets/img/anon.jpeg';
          userEmail = userData.email || 'Anonymous';
        }
      }

      const timestampDate = new Date(incidentData.timestamp.seconds * 1000);
      formattedTimestamp = timestampDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      let hiddenString = 'hidden';

      // Check if user is authenticated
      const user = auth.currentUser;
      // Check if incidents have the same user id as the current authenticated user.
      if (user === userId) {
        hiddenString = '';
      }

      const incidentContainer = document.getElementById('started');
      const incidentTemplate = `
          <div class="Report">
            <div class="Report_name">
              <img src="${userImage}" alt="">
              <div class="Report_inner">
                <h3>${incidentUserName}</h3>
                <span>${formattedTimestamp}</span>
              </div>
            </div>
            <p>${incidentDescription}</p>
            <img class="accident_pic" src="${incidentImage}" alt="">
            <a class="Read" href="SpecificReport.html?id=${incidentDoc.id}">Read</a>
          </div>
        `;

      // <button type="button" id="userEditIncident" ${hiddenString}>Edit Text</button>
      // <button type="button" id="userDeleteIncident" ${hiddenString}>Delete</button>

      incidentContainer.insertAdjacentHTML('beforeend', incidentTemplate);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error
  }
});
