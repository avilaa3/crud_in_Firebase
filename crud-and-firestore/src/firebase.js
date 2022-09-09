import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtDC5rqJTOiN5U4Jpk3gsdu2FkhJmoqno",
    authDomain: "crud-react-avila.firebaseapp.com",
    projectId: "crud-react-avila",
    storageBucket: "crud-react-avila.appspot.com",
    messagingSenderId: "686938404018",
    appId: "1:686938404018:web:30d266fa0f3ae0e4e905ab"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export{firebase}