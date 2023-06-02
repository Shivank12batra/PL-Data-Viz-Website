import dotenv from 'dotenv';
dotenv.config();

import data from './shots.js';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

console.log(VITE_FIREBASE_API_KEY)

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
  };
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
const db = getFirestore(app);

const teams = ['Arsenal', 'Manchester City', 'Manchester United',
               'Chelsea', 'Liverpool', 'Tottenham']

const seedShotsData = async() => {
        // const shotsRef = doc(db, 'teamShotsData', 'CuqzRQKzWetc4k89iWan');
        // console.log(shotsRef)
        // setDoc(shotsRef, {shotsData: data[team]})
        // .then(() => console.log(`document successfully created for team ${team}`))
        // .catch(error => console.error('Error writing document:', error))

    const shotsRef = collection(db, 'teamShotsData')
    getDocs(shotsRef)
    .then((snapshot) => {
        console.log(snapshot.docs)
    }) 
}

seedShotsData();