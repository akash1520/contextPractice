import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  User,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { create } from "zustand";
import firebaseApp from "@/firebase";
import { FirebaseError } from "firebase/app";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Define function types
type LoginFunction = (selectProvider: number) => Promise<boolean>;
type LoginWithEPFunction = (data: signupUser) => Promise<boolean>;
type LogoutFunction = () => Promise<void>;
type SignupWithEPFunction = (data: signupUser) => Promise<void>;

// Enumeration for different login providers
enum selectPro {
  Google,
  Twitter,
}

// Interface for the store state
interface AuthStore {
  user: User | null;
  token: string | null;
  login: LoginFunction;
  loginEP: LoginWithEPFunction;
  logout: LogoutFunction;
  signupEP: SignupWithEPFunction;
  isLoading: boolean;
}

interface signupUser {
  firstName: string;
  lastName: string;
  // mobileNumber: string
  age: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Create the Zustand store
export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  token: null,
  isLoading: false,
  login: async (selectProvider) => {
    if (selectProvider === selectPro.Google) {
      try {
        set(() => ({ isLoading: true }));

        // Google login using Firebase Auth
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        set(() => ({ user: user, token: token }));
        return true; // Indicate successful login
      } catch (error) {
        // Handle Google login errors
        if (error instanceof FirebaseError) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Google Login Error: ", errorCode, errorMessage);
        } else {
          console.error(error);
        }
        return false;
      } finally {
        set(() => ({ isLoading: false }));
      }
    } else if (selectProvider === selectPro.Twitter) {
      try {
        set(() => ({ isLoading: true }));

        // Twitter login using Firebase Auth
        const result = await signInWithPopup(auth, twitterProvider);
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        set(() => ({ user: user, token: token }));
        // Indicate successful login
        return true;
      } catch (error) {
        // Handle Twitter login errors
        if (error instanceof FirebaseError) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Twitter Login Error: ", errorCode, errorMessage);
        } else {
          console.error(error);
        }
        return false;
      } finally {
        set(() => ({ isLoading: false }));
      }
    }
    return false;
  },
  loginEP: async (data) => {
    try {
      set(() => ({ isLoading: true }));

      const { email, password } = data;
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const token = await user.getIdToken();
      set(() => ({ user: user, token: token }));
      return true;
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errorCode = err.code;
        if (errorCode === "auth/user-not-found") {
          alert("No user found with this email");
        } else if (errorCode === "auth/wrong-password") {
          alert("Wrong password");
        } else {
          console.error(err);
        }
      } else {
        console.error(err);
      }
      return false;
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  logout: async () => {
    // Logout using Firebase Auth
    await signOut(auth);
  },
  signupEP: async (data) => {
    set(() => ({ isLoading: true }));
    const { email, password } = data;
    console.log("data", data);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {})
      .catch((err) => {
        console.error("firebase error: ", err);
      });
    set(() => ({ isLoading: false }));
  },
}));
