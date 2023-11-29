import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCcmAVjay5hD3WKibnjmgWjx7bseUSycO0",
   authDomain: "coderhoouse-ecommerce.firebaseapp.com",
   projectId: "coderhoouse-ecommerce",
   storageBucket: "coderhoouse-ecommerce.appspot.com",
   messagingSenderId: "80957213195",
   appId: "1:80957213195:web:d9be03a2a71ad0c7a4950e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
