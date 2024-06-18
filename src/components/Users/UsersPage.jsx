"use client";
import React from "react";
import PageHeader from "../Headers/PageHeader";
import UsersTable from "./UsersTable";
import FooterComponent from "../Footer/FooterComponent";

const UsersPage = () => {
  return (
    <div className=" pt-[10px]">
      <PageHeader title={"Users"}  />
        <UsersTable />
      <FooterComponent />
    </div>
  );
};

export default UsersPage;
