import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcfy1FC4FX7Lsxs3nWHHuJcLStoJ1tv_o",
  authDomain: "csci-5408-w21-305209.firebaseapp.com",
  projectId: "csci-5408-w21-305209",
  storageBucket: "csci-5408-w21-305209.appspot.com",
  messagingSenderId: "740816403991",
  appId: "1:740816403991:web:d2e80e115df5a8f511e652",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
