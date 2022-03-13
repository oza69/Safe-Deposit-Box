import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [cookie, setCookie, removeCookie] = useCookies(["box_id"]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function setBox(box) {
    let expire = new Date();
    expire.setTime(expire.getTime() + 60 * 60 * 2 * 1000);
    setCookie("box_id", box, { path: "/", expire });
  }

  function getBox() {
    return cookie.box_id;
  }

  function removeBox() {
    return removeCookie("box_id");
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setBox,
    getBox,
    removeBox,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
