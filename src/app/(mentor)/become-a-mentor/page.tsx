"use client";

import MentorForm from "./components/MentorForm";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useAuthStore } from "@/store/AuthStore";

const BecomeMentorPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser, getCurrentUserData] = useAuthStore((state) => [state.user, state.setUser, state.getCurrentUserData]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else {
        getCurrentUserData()
      }
    }
  }, [isLoading, user, router, getCurrentUserData]);

  return (
    <>
      {isLoading || !user ? (
        <div className="w-screen h-screen bg-white z-50 flex justify-center items-center">
          <CircularProgress size={40} style={{ color: "#191817" }} />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto py-20 px-5">
          <div className="">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#191817] text-center mb-16 font-gothic">
              BECOME A <span className="underline">MENTOR</span>
            </h3>
            <div className="max-w-5xl mx-auto">
              <MentorForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BecomeMentorPage;
