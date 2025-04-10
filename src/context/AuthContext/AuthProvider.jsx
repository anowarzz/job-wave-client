import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebase/firebase.init";
import AuthContext from "./AuthContext";

// Creating a Google auth provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();

  // Create a new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SignIn user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // SignIn with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      // Reset loading state on error or cancellation
      setLoading(false);
      console.log(error.code, error.message);
      
    }
  };

  // Logout A User
  const signOutUser = () => {
    setLoading(true);
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
    signInWithGoogle,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
