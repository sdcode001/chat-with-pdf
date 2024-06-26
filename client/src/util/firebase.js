import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage'
import {FIREBASE_API_KEY,FIREBASE_AUTH_DOMAIN,FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET,FIREBASE_SENDER_ID,FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID,FIREBASE_STORAGE_PATH} from '../env'



const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app, FIREBASE_STORAGE_PATH)


export default storage


