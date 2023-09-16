import React from "react";
import SessionCard from "./SessionCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

interface Session {
  title: string;
  price: number;
  duration: number;
}

const fetchSessionData = async (mentorId: string) => {
  const sessionsCollectionRef = collection(db, "Sessions");
  const q = query(sessionsCollectionRef, where("mentorId", "==", mentorId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  const sessions = querySnapshot.docs.map((doc) => doc.data());

  return sessions;
};

const MentorViewRightPanel = async ({ mentorId }: { mentorId: string }) => {
  const sessions = (await fetchSessionData(mentorId)) as Session[];

  return (
    <div className="w-full md:w-[30%] mt-8">
      <h3 className="text-3xl font-bold font-gothic tracking-wider mb-2">
        Sessions
      </h3>
      {sessions.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {sessions.map((session, index) => (
            <SessionCard key={index} {...session} />
          ))}
        </div>
      ) : (
        <span className="text-xl font-semibold">No sessions are available currently</span>
      )}
    </div>
  );
};

export default MentorViewRightPanel;
