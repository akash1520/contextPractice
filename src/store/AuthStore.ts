import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  User,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { create } from "zustand";
import firebaseApp from "@/firebase";
import { FirebaseError } from "firebase/app";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Define function types
type LoginFunction = (selectProvider: number) => Promise<boolean>;
type LogoutFunction = () => Promise<void>;
type SignupFunction = (selectProvider: number) => Promise<void>;

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
  logout: LogoutFunction;
  signup: SignupFunction;
}

// Create the Zustand store
export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  token: null,
  login: async (selectProvider) => {
    if (selectProvider === selectPro.Google) {
      try {
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
      }
    } else if (selectProvider === selectPro.Twitter) {
      try {
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
      }
    }
    return false;
  },
  logout: async () => {
    // Logout using Firebase Auth
    await signOut(auth);
  },
  signup: async (selectProvider) => {
    // Signup using the selected provider (Google or Twitter)
    if (selectProvider === selectPro.Google) {
      await signInWithPopup(auth, googleProvider);
    } else if (selectProvider === selectPro.Twitter) {
      await signInWithPopup(auth, twitterProvider);
    }
  },
}));
