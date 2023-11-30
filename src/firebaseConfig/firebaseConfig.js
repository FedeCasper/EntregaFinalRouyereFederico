import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCcmAVjay5hD3WKibnjmgWjx7bseUSycO0",
   authDomain: "coderhoouse-ecommerce.firebaseapp.com",
   projectId: "coderhoouse-ecommerce",
   storageBucket: "coderhoouse-ecommerce.appspot.com",
   messagingSenderId: "80957213195",
   appId: "1:80957213195:web:d9be03a2a71ad0c7a4950e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db