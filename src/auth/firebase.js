import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoHtbRZfGBAjIPQDN1dX-jD6Y_W9t9kUA",
  authDomain: "dts2022-makfi.firebaseapp.com",
  projectId: "dts2022-makfi",
  storageBucket: "dts2022-makfi.appspot.com",
  messagingSenderId: "751989412481",
  appId: "1:751989412481:web:b60e1c7d5b567143fcb380",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerUserWithEmailPassword = async (email, password) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    return {
      status: true,
      user: resp,
    };
  } catch (error) {
    console.error("Register Error code", error.code);
    console.error("Register Error message", error.message);
    return {
      status: false,
      error: error,
    };
  }
};

const loginUserWithEmailPassword = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    return {
      status: true,
      user: resp,
    };
  } catch (error) {
    console.error("Login Error code", error.code);
    console.error("Login Error message", error.message);
    return {
      status: false,
      error: error,
    };
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Reset Password Error code", error.code);
    console.error("Reset Password Error message", error.message);
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error code", error.code);
    console.error("Logout Error message", error.message);
  }
};

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Login Google Error code", error.code);
    console.error("Login Google Error message", error.message);
    return {
      status: false,
      error: error,
    };
  }
};

export {
  auth,
  registerUserWithEmailPassword,
  loginUserWithEmailPassword,
  resetPassword,
  logoutUser,
  loginWithGoogle,
};
