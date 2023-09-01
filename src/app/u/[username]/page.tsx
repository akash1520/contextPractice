import apiEndpoint from "@/utils/apiEndpoint";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    username: string;
  };
}

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  age?: number;
  gender?: string;
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
    }
  }

  return {
    title: `${user.username} @ Mentea`,
  };
}

const getUserData = async (username: string) => {
  const response = await fetch(`${apiEndpoint}/u/${username}`);

  if (!response.ok) {
    return undefined;
  }

  const user = (await response.json()) as UserData;

  return user;
};

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = params;

  const user = await getUserData(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h2>User Profile</h2>

      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Username: {user.username}</p>
      {user.age && <p>Age: {user.age}</p>}
      {user.gender && <p>Gender: {user.gender}</p>}
    </div>
  );
};

export default UserPage;
