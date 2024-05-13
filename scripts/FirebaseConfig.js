import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCcPTgxSi3sfX3MwI_mDOuOZWPHgvgsYNk',
  authDomain: 'visioneers-d90f2.firebaseapp.com',
  projectId: 'visioneers-d90f2',
  storageBucket: 'visioneers-d90f2.appspot.com',
  messagingSenderId: '606310910098',
  appId: '1:606310910098:web:67af7bca3a76128c803e4b',
  measurementId: 'G-J5VFHEFJBW',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
