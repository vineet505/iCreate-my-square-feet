"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import FooterComponent from "../Footer/FooterComponent";
import TransactionTable from "./TransactionsTableComponent";

export const TransactionPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Transactions History"}  />
      <TransactionTable />
      <FooterComponent />
    </div>
  );
};

