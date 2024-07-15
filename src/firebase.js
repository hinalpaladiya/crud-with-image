// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh2OeZOKeMxgFZ8qsf9-9A6FKPc8nA0N4",
  authDomain: "crud-f8d79.firebaseapp.com",
  databaseURL: "https://crud-f8d79-default-rtdb.firebaseio.com",
  projectId: "crud-f8d79",
  storageBucket: "crud-f8d79.appspot.com",
  messagingSenderId: "584585583789",
  appId: "1:584585583789:web:51afb5cda2ecec4df33a24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const realTimeDatabase = getDatabase(app)
export const storage = getStorage(app)
export default app;
