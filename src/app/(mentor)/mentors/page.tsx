import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { Balancer } from "react-wrap-balancer";
import MentorCard from "./components/MentorCard";

const getMentorsData = async () => {
  const mentorsCollectionRef = collection(db, "Mentors");
  const querySnapshot = await getDocs(mentorsCollectionRef);

  if (querySnapshot.empty) {
    return [];
  }

  const mentors = querySnapshot.docs.map((doc) => doc.data());

  return mentors;
};

const MentorsPage = async () => {
  const mentors = (await getMentorsData()) as Mentor[];

  if (mentors.length === 0) {
    return <div>No mentors are available currently</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-20 px-5">
        <div className="text-center mb-16">
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#191817] text-center mb-10 font-gothic">
            FEATURED <span className="underline">MENTORS</span>
          </h3>
          <p className="text-2xl text-[#191817]">
            <Balancer>
              Empower the next generation of professionals by sharing your
              insights, expertise, and stories from your own career journey.
            </Balancer>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
          {mentors.map((mentor, index) => (
            <MentorCard mentor={mentor} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
