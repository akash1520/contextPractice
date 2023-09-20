import { create, useStore } from "zustand";
import { useAuthStore } from "./AuthStore";
import { db } from "@/firebase";
import {  collection, doc, getDoc, getDocs, query, where, writeBatch } from "firebase/firestore";

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
  profileImgUrl: string;
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
  profileImgUrl: string;
}

interface MentorStore {
  mentor: Mentor | null;
  mentorId: string | null;
  isLoading: boolean;
  saveData: (data: MentorData) => Promise<boolean>;
  getMentorData: () => Promise<void>;
  checkUsernameAvailability: (username:string)=> Promise<boolean>;
}

export const useMentorStore = create<MentorStore>((set, get) => ({
  mentor: null,
  mentorId: null,
  isLoading: false,
  saveData: async (data: MentorData) => {
    try {
        const user = useAuthStore.getState().user;
        const { uid } = user!;

        const batch = writeBatch(db);

        // Query to check if a mentor with the same UID exists
        const mentorRef = doc(db, "Mentors", uid);
        const mentorSnapshot = await getDoc(mentorRef);

        if (mentorSnapshot.exists()) {
            // If a mentor with the same UID exists, update the data
            batch.update(mentorRef, {...data});
        } else {
            // If no mentor with the same UID exists, create a new document with the user's UID
            batch.set(mentorRef, data);
        }

        // Delete the user document
        const userRef = doc(db, "Users", uid);
        batch.delete(userRef);

        await batch.commit();

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
  },
  checkUsernameAvailability: async (username: string) => {
    try {
        const user = useAuthStore.getState().user;
        const { uid } = user!;

        // Query to check if a mentor with the same username exists
        const mentorByUsernameQuery = query(collection(db, "Mentors"), where("username", "==", username));
        const mentorByUsernameSnapshot = await getDocs(mentorByUsernameQuery);

        if (!mentorByUsernameSnapshot.empty) {
            const mentorUid = mentorByUsernameSnapshot.docs[0].data().uid; // Assuming the document has a field named 'uid'

            // If the uid of the mentor with the same username matches the current user's uid, return true
            if (mentorUid === uid) {
                return true;
            }

            // If the uid is different but the username is the same, return false
            return false;
        }

        // If no mentor with the same username exists, return true (indicating the username is available)
        return true;
    } catch (err) {
        console.error(err);
        return false; // Return false in case of any error
    }
}
}));