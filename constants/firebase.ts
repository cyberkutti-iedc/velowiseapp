import firebase from 'firebase/compat/app'; // Import Firebase compat version for v9 and above
import 'firebase/compat/auth'; // Import Firebase auth module
import 'firebase/compat/database'; // Import Firebase database module


const firebaseConfig = {
    apiKey: "AIzaSyB_tiXbSt_BfrKXv3gEIOgGSi2HkK39zEg",
    authDomain: "velowise-2024.firebaseapp.com",
    databaseURL: "https://velowise-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "velowise-2024",
    storageBucket: "velowise-2024.appspot.com",
    messagingSenderId: "963938300990",
    appId: "1:963938300990:web:decd1dcd5afbfefe664d6f"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
