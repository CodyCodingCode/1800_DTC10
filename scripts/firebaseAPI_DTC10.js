var firebaseConfig = {
  apiKey: "AIzaSyCiozT5t3hKu2nLWrGA1DDxrCKnStRSEZg",
  authDomain: "dtc-10-comp1800.firebaseapp.com",
  databaseURL: "https://dtc-10-comp1800-default-rtdb.firebaseio.com",
  projectId: "dtc-10-comp1800",
  storageBucket: "dtc-10-comp1800.appspot.com",
  messagingSenderId: "707900311043",
  appId: "1:707900311043:web:f69d56437bb835d1187036",
  measurementId: "G-208SFQJ3DX"
};
  

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();