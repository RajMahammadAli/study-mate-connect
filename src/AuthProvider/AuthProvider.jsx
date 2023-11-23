import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import auth from "../Components/firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
export default function ({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Set display name and photoURL
        updateProfile(userCredential.user, { displayName, photoURL });
      }
    );
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        axios
          .post(
            "https://online-group-study-server-side-one.vercel.app/jwt",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("token response", res.data);
          });
      } else {
        axios
          .post(
            "https://online-group-study-server-side-one.vercel.app/logout",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
          });
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    googleSignIn,
    createUser,
    userSignIn,
    userLogOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
