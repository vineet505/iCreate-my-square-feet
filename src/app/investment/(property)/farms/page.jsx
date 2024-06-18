import React from "react";
import PageHeader from "@/components/Headers/PageHeader";
import { FarmLandForm } from "@/components/Investment/property/FarmLandForm";
const Page = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Farms"} />

      <FarmLandForm />

    </div>
  );
};

export default Page;
