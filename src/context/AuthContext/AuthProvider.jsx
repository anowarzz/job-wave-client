import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebase/firebase.init";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();

  const createUser = (email, password) => {
    setLoading(true);

    // Create a new user with email and password
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SignIn user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout A User
  const signOutUser = () => {
    setLoading(true) ;
    return signOut(auth);

  };

  // Observe the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
      setUser(currenUser);
      console.log("Current user:", currenUser);

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // AuthContext value
  const authInfo = {
    createUser,
    signInUser,
    signOutUser,
    user,
    loading,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
