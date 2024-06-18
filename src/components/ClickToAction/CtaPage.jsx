"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import FooterComponent from "../Footer/FooterComponent";
import CtaTable from "./CtaTableComponent";
export const CtaPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Click to Action"} />
      <CtaTable />
      <FooterComponent />
    </div>
  );
};
