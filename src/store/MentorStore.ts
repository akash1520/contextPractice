import { create, useStore } from "zustand";
import { useAuthStore } from "./AuthStore";
import { db } from "@/firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";

interface Mentor {
  firstName: string;
  lastName: string;
  username: string;
  shortHeading: string;
  gender: string;
  age: string;
  about?: string;
  organization: string;
  role: string;
  experience: number;
  languages: string[];
  socials: string[];
}

interface MentorData {
  username: string;
  shortHeading: string;
  gender: string;
  age: string;
  about: string;
  organization: string;
  role: string;
  experience: number;
  languages: string[];
  socials: string[];
}

type saveData = (data: MentorData) => Promise<boolean>;

interface MentorStore {
  mentor: Mentor | null;
  saveData: saveData;
}

export const useMentorStore = create<MentorStore>()((set, get) => ({
  mentor: null,
  saveData: async (data) => {
    try {
        const authState = useAuthStore.getState();
        
        await authState.getCurrentUser();
        await authState.getCurrentUserData();
    
        const { userData } = authState;
        data = { ...data, ...userData };
    
        const mentorRef = collection(db, "Mentors");
        await addDoc(mentorRef, data);
        
        console.log("Mentor data saved successfully");
        return true;
    } catch (err) {
        const error = err as Error;
        console.error(error.message);
        return false;
    }  
  },
}));
