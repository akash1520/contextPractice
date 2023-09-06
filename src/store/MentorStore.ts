import { GetState, SetState, State, create, useStore } from "zustand";
import { useAuthStore } from "./AuthStore";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

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

type CustomSetState = SetState<MentorStore>;
type CustomGetState = GetState<MentorStore>;

export const useMentorStore = create<MentorStore>((set: CustomSetState, get: CustomGetState) => ({
  mentor: null,
  mentorId: null,
  isLoading: false,
  saveData: async (data: MentorData) => {
    try {
      const authState = useAuthStore.getState();
  
      await authState.getCurrentUser();
      await authState.getCurrentUserData();
  
      const { userData } = authState;
      data = { ...data, ...userData };
  
      const mentorRef = collection(db, "Mentors");
      try {
        const docRef = await addDoc(mentorRef, data);
        const updatedMentorData: Mentor = { ...data, mentorId: docRef.id };
        set(() => ({
          mentorId: docRef.id,
          mentor: updatedMentorData
        }));

        // TODO: delete from user only when mentor is verified by admin
        // await authState.destroyUserData();
      } catch (innerErr) {
        const err = innerErr as Error;
        console.error(err.message);
      }
      // console.log("Mentor data saved successfully");
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