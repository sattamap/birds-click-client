import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword, // alias to avoid naming conflicts
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const sendPassResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updatePassword = (newPassword) => {
    if (user) {
      // Use firebaseUpdatePassword instead of updatePassword to avoid naming conflicts
      return firebaseUpdatePassword(user, newPassword);
    } else {
      return Promise.reject(new Error("No user is currently authenticated."));
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user in auth state", currentUser);
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const logOut = () => {
    setLoading(true);
    return signOut(auth).then(() => setUser(null)); // Set user to null after logout
  };

  const authInfo = {
    user,
    setUser,
    signIn,
    logOut,
    loading,
    sendPassResetEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
