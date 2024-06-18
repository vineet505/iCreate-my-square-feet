"use client";
import React from "react";
import dynamic from "next/dynamic";

const LoginCardComponent = dynamic(
  () => import("@/components/Auth/LoginCardComponent"),
  { ssr: false }
);
const ResetPasswordComponent = dynamic(
  () => import("@/components/Auth/ResetPasswordComponent"),
  { ssr: false }
);
const Page = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center p-4  bg-[#f8f8fc] dark:bg-black">
        <div className="flex h-[392px] w-[960px]">
          <LoginCardComponent />
          <ResetPasswordComponent />
        </div>
      </div>
    </>
  );
};

export default Page;
