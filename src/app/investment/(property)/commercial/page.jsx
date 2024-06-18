import React from "react";
import PageHeader from "@/components/Headers/PageHeader";
import { CommercialPropertyForm } from "@/components/Investment/property/CommericalPropertyForm";
const Page = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Commercial Property"} />
        <CommercialPropertyForm />
    </div>
  );
};

export default Page;
