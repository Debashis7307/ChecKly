// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA33f7w2opImu5bk52ZZ8AqDV4BYc2W8F4",
  authDomain: "checkly-96176.firebaseapp.com",
  projectId: "checkly-96176",
  storageBucket: "checkly-96176.firebasestorage.app",
  messagingSenderId: "197508024260",
  appId: "1:197508024260:web:78e7754b936d109692c691",
  measurementId: "G-CF7RWB02ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth }; 