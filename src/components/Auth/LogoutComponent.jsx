"use client";
import React from "react";
import { signOut } from "next-auth/react";


const LogoutComponent = () => {
  return (
    <>
      <button onClick={() => signOut()} className="">
        Logout
      </button>
    </>
  );
};

export default LogoutComponent;
