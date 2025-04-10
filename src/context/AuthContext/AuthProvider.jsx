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
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Create a new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      // This ensures loading state is reset even if there's an error
      setLoading(false);
    });
  };

  // SignIn user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      // This ensures loading state is reset even if there's an error
      setLoading(false);
    });
  };

  // SignIn with Google
  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.log(error.code, error.message);
      throw error; // Re-throw to allow caller to handle the error
    } finally {
      // This ensures googleLoading state is reset regardless of success or failure
      setGoogleLoading(false);
    }
  };

  // Logout A User
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      setLoading(false);
    });
  };

  // Observe the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
      setUser(currenUser);
      console.log("Current user:", currenUser);
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
    googleLoading,
    signInWithGoogle,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
