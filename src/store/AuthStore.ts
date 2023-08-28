import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  User,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { create } from "zustand";
import firebaseApp from "@/firebase";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Define function types
type LoginFunction = (selectProvider: number) => Promise<boolean>;
type LoginWithEPFunction = (data: signupUser) => Promise<boolean>;
type LogoutFunction = () => Promise<void>;
type SignupWithEPFunction = (data: signupUser) => Promise<boolean>;
type GetCurrentUserFunction = () => Promise<void>;
type GetCurrentUserDataFunction = () => void;

// Enumeration for different login providers
enum selectPro {
  Google,
  Twitter,
}

// Interface for the store state
interface AuthStore {
  user: User | null;
  token: string | null;
  userData: UserData | null;
  login: LoginFunction;
  loginEP: LoginWithEPFunction;
  logout: LogoutFunction;
  signupEP: SignupWithEPFunction;
  isLoading: boolean;
  getCurrentUser: GetCurrentUserFunction;
  getCurrentUserData: GetCurrentUserDataFunction;
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

interface UserData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
}

// Create the Zustand store
export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  userData: null,
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
    try {
      set(() => ({ isLoading: true }));

      await signOut(auth);

      set(() => ({ user: null }));
      set(() => ({ token: null }));
      set(() => ({ userData: null }));
    } catch (error) {
      console.error(error);
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  signupEP: async (data) => {
    try {
      set(() => ({ isLoading: true }));

      const { email, password, firstName, lastName, age, gender } = data;

      // Create user using Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);

      // Login user using Firebase Auth
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const token = await user.getIdToken();

      set(() => ({ user: user, token: token }));

      // Store additional user data in Firestore
      const userRef = doc(db, "Users", user.uid);

      const userData = {
        firstName,
        lastName,
        // Only add age and gender if it exists
        ...(age !== null && { age }),
        ...(gender !== null && { gender }),
      };

      await setDoc(userRef, userData);

      return true;
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errorCode = err.code;
        if (errorCode === "auth/email-already-in-use") {
          alert("Email already in use");
        } else if (errorCode === "auth/invalid-email") {
          alert("Invalid email");
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
  getCurrentUser: async () => {
    try {
      set({ isLoading: true });

      await new Promise<void>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();
          
          if (user) {
            set({ user: user });
          } else {
            set({ user: null });
          }

          resolve();
        });
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  getCurrentUserData: async () => {
    // get the current user id
    const uid = get().user?.uid;

    // fetch the current user data
    if (uid) {
      const userRef = doc(db, "Users", uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as UserData;
        set(() => ({ userData: data }));
      } else {
        set(() => ({ userData: null }));
      }
    }
  },
}));
