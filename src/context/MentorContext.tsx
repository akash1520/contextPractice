"use client"
import React, { createContext, useContext, useState, FC } from 'react';
import { db } from "@/firebase";
import { doc, getDoc, getDocs, collection, query, where, writeBatch } from "firebase/firestore";
import { useAuthStore } from '@/store/AuthStore';

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
  mentorId?: string;
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

interface MentorContextProps {
  mentor: Mentor | null;
  mentorId: string | null;
  isLoading: boolean;
  saveData: (data: MentorData) => Promise<boolean>;
  getMentorData: () => Promise<void>;
  checkUsernameAvailability: (username: string, uid: string) => Promise<boolean>;
}

const MentorContext = createContext<MentorContextProps | undefined>(undefined);

type MentorProviderProps = {
    children: React.ReactNode;
  };

export const MentorProvider: React.FC<MentorProviderProps> = ({ children }) => {

    const [mentor, setMentor] = useState<Mentor | null>(null);
  const [mentorId, setMentorId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore(); // Assuming you have an AuthContext
  
  const saveData = async (data: MentorData): Promise<boolean> => {
    try {
      if (user) {
        const { uid } = user;
        const batch = writeBatch(db);
        const mentorRef = doc(db, "Mentors", uid);
        const mentorSnapshot = await getDoc(mentorRef);

        if (mentorSnapshot.exists()) {
          batch.update(mentorRef, {...data});
        } else {
          batch.set(mentorRef, data);
        }

        const userRef = doc(db, "Users", uid);
        batch.delete(userRef);

        await batch.commit();
        return true;
      } else {
        console.error("User is not authenticated");
        return false;
      }
    } catch (error) {
        const err = error as Error;
      console.error(err.message);
      return false;
    }
  };
  
  const getMentorData = async () => {
    const id = mentorId || mentor?.mentorId;
    if (id) {
      const userRef = doc(db, "Mentors", id);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as Mentor; // Type assertion here
        setMentor({ ...data, mentorId: id });
      } else {
        setMentor(null);
      }
    }
  };
  
  
  const checkUsernameAvailability = async (username: string, uid: string): Promise<boolean> => {
    try {
      const mentorByUsernameQuery = query(collection(db, "Mentors"), where("username", "==", username));
      const mentorByUsernameSnapshot = await getDocs(mentorByUsernameQuery);
  
      if (!mentorByUsernameSnapshot.empty) {
        const mentorUid = mentorByUsernameSnapshot.docs[0].data().uid;
        return mentorUid === uid;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  
  const value = {
    mentor,
    mentorId,
    isLoading,
    saveData,
    getMentorData,
    checkUsernameAvailability,
  };
  
  return (
    <MentorContext.Provider value={value}>
      {children}
    </MentorContext.Provider>
  );
};

export const useMentor = (): MentorContextProps => {
    const context = useContext(MentorContext);
    if (!context) {
      throw new Error('useMentor must be used within a MentorProvider');
    }
    return context;
  };