import firebaseApp from "@/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const db = getFirestore(firebaseApp);

export const GET = async (
  req: NextRequest,
  { params }: { params: { username: string } }
) => {
  try {
    const { username } = params;

    const usersCollectionRef = collection(db, "Users");
    const q = query(usersCollectionRef, where("username", "==", username));
    const usersSnapshot = await getDocs(q);

    if (usersSnapshot.empty) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, statusText: "Not Found" }
      );
    }

    const user = usersSnapshot.docs[0].data();

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
