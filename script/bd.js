
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"; // Certifique-se de importar getDatabase
  

  const firebaseConfig = {
    apiKey: "AIzaSyA36fWmsys0JzvJOWdjIXapTes3qzWOvQQ",
    authDomain: "base-d08d7.firebaseapp.com",
    databaseURL: "https://base-d08d7-default-rtdb.firebaseio.com",
    projectId: "base-d08d7",
    storageBucket: "base-d08d7.appspot.com",
    messagingSenderId: "1065127824453",
    appId: "1:1065127824453:web:34570728f646117b75e72c",
    measurementId: "G-BE2MXQZQFJ"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const analytics = getAnalytics(app);
  
  
  export { app, db, analytics };