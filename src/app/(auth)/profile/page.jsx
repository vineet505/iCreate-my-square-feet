"use client";
import React from "react";
import PageHeader from "@/components/Headers/PageHeader";
import { useSession } from "next-auth/react";
import ImageDropper from "@/components/DropperComponent/ImageDropper";
import UserProfileForm from "@/components/Profile/UserProfileForm";

const Page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHeader title="Profile" />
      <div className="flex flex-wrap items-center  ">
        <div className="flex justify-center items-center  ">
          <ImageDropper />
          <div className="flex flex-col  justify-center ml-4 mr-2">
            <div className="text-sm">
              {session?.user?.user_details?.legal_name}
            </div>
            <div className="text-tiny text-gray-300">
              {session?.user?.user_details?.username}
            </div>
          </div>
        </div>
      <UserProfileForm />
      </div>
    </>
  );
};

export default Page;
