import { create, useStore } from "zustand";
import { useAuthStore } from "./AuthStore";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, setDoc, writeBatch } from "firebase/firestore";

interface Mentor {
  firstName?: string;
  lastName?: string;
  username: string;
  shortHeading: string;
  gender: string;
  age: string;
  about?: string;
  mobile?: string;
  organization: string;
  role: string;
  experience: number;
  languages: string[];
  socials: string[];
  mentorId?:string;
}

interface MentorData {
  firstName: string;
  lastName: string;
  username: string;
  shortHeading: string;
  mobile: string;
  gender: string;
  age: string;
  about: string;
  organization: string;
  role: string;
  experience: number;
  languages: string[];
  socials: string[];
}

interface MentorStore {
  mentor: Mentor | null;
  mentorId: string | null;
  isLoading: boolean;
  saveData: (data: MentorData) => Promise<boolean>;
  getMentorData: () => Promise<void>;
}

export const useMentorStore = create<MentorStore>((set, get) => ({
  mentor: null,
  mentorId: null,
  isLoading: false,
  saveData: async (data: MentorData) => {
    try {
      const user = useAuthStore.getState().user;
      const { uid } = user!;
  
      try {
        const batch = writeBatch(db);
        
        // create a new mentor document with the same uid
        const mentorRef = doc(db, "Mentors", uid);
        batch.set(mentorRef, data)
        
        // delete the user document
        const userRef = doc(db, "Users", uid);
        batch.delete(userRef);

        await batch.commit();
      } catch (innerErr) {
        const err = innerErr as Error;
        console.error(err.message);
      }
      return true;
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      return false;
    }
  },
  getMentorData: async () => {
    // get the current user id
    const mentorId = get().mentorId || get().mentor?.mentorId;
  
    // fetch the current user data
    if (mentorId) {
      const userRef = doc(db, "Mentors", mentorId);
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data() as Mentor;
        const updatedMentorData: Mentor = { ...data, mentorId }; // Add the mentorId to the data
        set(() => ({ mentor: updatedMentorData }));
        // console.log(get().mentor);
      } else {
        set(() => ({ mentor: null }));
      }
    }
  }
}));