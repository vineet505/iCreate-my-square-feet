"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import StaffTable from "./StaffTable";
import FooterComponent from "../Footer/FooterComponent";

const UsersPage = () => {
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Staff"}  />
        <StaffTable />
      <FooterComponent />
    </div>
  );
};

export default UsersPage;
