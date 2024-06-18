"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import RegionTable from "./RegionTable";
import FooterComponent from "../Footer/FooterComponent";

export const RegionPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Regions"}  />
      <RegionTable />
      <FooterComponent />
    </div>
  );
};

