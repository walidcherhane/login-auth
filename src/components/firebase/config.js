import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDIBiDqCchwUxkdo7olc449TsOtCYdWst4",
  authDomain: "simp-proj.firebaseapp.com",
  projectId: "simp-proj",
  storageBucket: "simp-proj.appspot.com",
  messagingSenderId: "274925553720",
  appId: "1:274925553720:web:0feef60460bd4feb4dbecd",
};
initializeApp(firebaseConfig);
export const auth = getAuth();
