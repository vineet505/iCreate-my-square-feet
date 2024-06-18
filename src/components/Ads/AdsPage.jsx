"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import FooterComponent from "../Footer/FooterComponent";
import AdsTable from "./AdsTableComponent";

export const AdsPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Advertisements"}  />
      <AdsTable />
      <FooterComponent />
    </div>
  );
};

