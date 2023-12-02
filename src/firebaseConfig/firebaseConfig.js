import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';  // Add this line to import auth

// Your web app's Firebase configuration
export const firebaseConfig = {
   apiKey: "AIzaSyCcmAVjay5hD3WKibnjmgWjx7bseUSycO0",
   authDomain: "coderhoouse-ecommerce.firebaseapp.com",
   projectId: "coderhoouse-ecommerce",
   storageBucket: "coderhoouse-ecommerce.appspot.com",
   messagingSenderId: "80957213195",
   appId: "1:80957213195:web:d9be03a2a71ad0c7a4950e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

export { db, auth };  // Export auth along with db