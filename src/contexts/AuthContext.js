import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification ,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  reauthenticateWithCredential ,
  RecaptchaVerifier ,
  signOut,
} from "firebase/auth";
import React, { useState, useEffect, useContext } from "react";
import { auth } from "../components/firebase/config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState()
  const [loading, setLoading] = useState(true);

  function ReCaptchaVerification (id){
    window.recaptchaVerifier = new RecaptchaVerifier(id, {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("Verified!")
      }
    }, auth);
  }

  function login(auth, email, password, ) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signin(auth, email, password,Name) {

      setName(Name)

    return createUserWithEmailAndPassword(auth, email, password)
  }
  function signout(auth) {
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  function sendVerificationEmail (auth){
    return sendEmailVerification(auth.currentUser)
  }
  function resetPassword (auth, email){
    return sendPasswordResetEmail(auth, email)
  }
  function SignUpWithGoogle (){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
  }
  function SignUpWithGithub (){
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider)
  }
  function SignUpWithTwitter (){
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider)
  }
  function ReAuthUser(credential){
    const user = auth.currentUser;
    return reauthenticateWithCredential(user, credential)
  }
  const value = {
    currentUser,
    login,
    signin,
    signout,
    sendVerificationEmail,
    SignUpWithGoogle,
    SignUpWithGithub,
    SignUpWithTwitter,
    ReAuthUser,
    resetPassword,
    ReCaptchaVerification,
    setName, name  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
