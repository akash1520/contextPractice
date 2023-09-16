import { collection, getDocs, query, where } from "firebase/firestore";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/firebase";
import MentorView from "./components/MentorView";

interface MentorPageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params,
}: MentorPageProps): Promise<Metadata> {
  // read route params
  const { username } = params;
  const mentor = await getMentorData(username);

  if (!mentor) {
    return {
      title: "Mentor Not Found",
    };
  }

  return {
    title: `Book a session with ${mentor.firstName} ${mentor.lastName} @ Mentea`,
  };
}

const getMentorData = async (username: string) => {
  const mentorsCollectionRef = collection(db, "Mentors");
  const q = query(mentorsCollectionRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return undefined;
  }

  const mentor = {
    ...querySnapshot.docs[0].data(),
    id: querySnapshot.docs[0].id,
  } as MentorWithId;

  return mentor;
};

const MentorPage = async ({ params }: MentorPageProps) => {
  const { username } = params;

  const mentor = await getMentorData(username);

  if (!mentor) {
    notFound();
  }

  return <MentorView mentor={mentor} />;
};

export default MentorPage;
