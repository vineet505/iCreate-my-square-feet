"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import InvestmentTable from "./InvestmentTable";
import FooterComponent from "../Footer/FooterComponent";

export const InvestmentPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Investment"}  />
        <InvestmentTable />
      <FooterComponent />
    </div>
  );
};

