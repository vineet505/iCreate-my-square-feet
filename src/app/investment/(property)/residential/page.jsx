import React from "react";
import PageHeader from "@/components/Headers/PageHeader";
import {ResidentialPropertyForm} from "@/components/Investment/property/ResidentialPropertyForm";
const Page = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Residential Property"} />
        <ResidentialPropertyForm />
    </div>
  );
};

export default Page;
