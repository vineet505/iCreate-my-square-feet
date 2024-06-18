import React from "react";
import dynamic from "next/dynamic";

const DashBoardPage = dynamic(() => import("@/components/Dashboard/DashBoardPage"), { ssr: false });

const Page = () => {
  return <DashBoardPage/>
};

export default Page;
