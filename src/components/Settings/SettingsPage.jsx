import React from "react";
import dynamic from "next/dynamic";
const PolicyComponent = dynamic(() => import("../PolicyandTerms/PolicyComponent"), { ssr: false });
const TermsComponent = dynamic(() => import("../PolicyandTerms/TermsComponent"), { ssr: false });
import FooterComponent from "../Footer/FooterComponent";
const PolicyPage = () => {

  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <div className="flex flex-wrap">
        <div className="flex-auto w-full xl:w-[48%] rounded-md">
          <PolicyComponent />
        </div>

        <div className=" flex-auto w-full xl:w-[48%] rounded-md">
          <TermsComponent />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default PolicyPage;
