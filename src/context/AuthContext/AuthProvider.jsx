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
  import {AuthContext} from "./AuthContext";

// Creating a Google auth provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Create a new user with email and password
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error.code, error.message);
    } finally {
      //  loading state is reset
      setLoading(false);
    }
  };

  // SignIn user
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.log(error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  // SignIn with Google
  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.log(error.code, error.message);
    } finally {
      // googleLoading state is reset
      setGoogleLoading(false);
    }
  };

  // Logout A User
  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.code, error.message);
    } finally {
      setLoading(false);
    }
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
