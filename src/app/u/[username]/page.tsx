import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import UserProfile from "./components/UserProfile";
import { db } from "@/firebase";

interface UserPageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  // read route params
  const { username } = params;
  const user = await getUserData(username);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.username} @ Mentea`,
  };
}

const getUserData = async (username: string) => {
  const usersCollectionRef = collection(db, "Users");
  const q = query(usersCollectionRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return undefined;
  }

  const user = querySnapshot.docs[0].data() as UserData;

  return user;
};

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = params;

  const user = await getUserData(username);

  if (!user) {
    notFound();
  }

  return <UserProfile user={user} />;
};

export default UserPage;
