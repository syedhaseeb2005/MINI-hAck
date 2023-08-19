import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getStorage,ref,uploadBytesResumable,getDownloadURL} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getFirestore,setDoc,doc,getDoc,addDoc,collection,getDocs,query,orderBy,updateDoc,deleteDoc,} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyChZ2dW6m7e7WsZ-lOHvuiYZUdDKbSR28k",
  authDomain: "social-media-hackathon.firebaseapp.com",
  projectId: "social-media-hackathon",
  storageBucket: "social-media-hackathon.appspot.com",
  messagingSenderId: "2032467161",
  appId: "1:2032467161:web:c34310d0bac6f94c7792c8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app)
export{
  createUserWithEmailAndPassword,
  auth,
  setDoc,
  doc,
  db,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getDoc,
  signOut,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  updateDoc
  
}