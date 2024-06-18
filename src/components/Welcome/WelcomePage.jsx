"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import FooterComponent from "../Footer/FooterComponent";
import WelcomeTable from "./WelcomeTableComponent";

export const WelcomePage = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Welcome Cards"}  />
      <WelcomeTable />
      <FooterComponent />
    </div>
  );
};

