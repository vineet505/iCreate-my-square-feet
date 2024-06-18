"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import FooterComponent from "../Footer/FooterComponent";
import TradesTable from "./TradesTableComponent";

export const TradesPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Trades History"}  />
      <TradesTable />
      <FooterComponent />
    </div>
  );
};

