import React from "react";
import dynamic from "next/dynamic";

const PolicyPage = dynamic(() => import("@/components/Settings/SettingsPage"), {
  ssr: false,
});

const Page = () => {
  return <PolicyPage/>
};

export default Page;
