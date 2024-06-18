"use client";
import React from "react";
import { useState } from "react";
import { Divider, Button } from "@nextui-org/react";
import TransactionsHistoryTable from "./TransactionsHistoryTable";
import TabsTile from "./TabsTile";
import BuySellDropDownComponent from "../CustomDropdowns/TransactionFiltersComponent";
import { toastHandler } from "../Toaster/ToasterHandler";
import { ExportUsersTransactionToExcel } from "@/lib/Users/UserHandler";
import { useSession } from "next-auth/react";
import { ExportUsersTransactionToExcelUrl } from "@/static/ApiEndpoints";

const UsersTab = ({ userid }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [body, setBody] = useState({
    min_date: 0 ,
    max_date: new Date().toISOString().split("T")[0],
  });
  const tabLabels = ["Buy", "Sell", "Deposit", "Withdraw"];
  const { data: session, status } = useSession();


  const tables = tabLabels.map((label, index) => ({
    key: label.toLowerCase(),
    component: (
      <TransactionsHistoryTable
      body={body}
        userid={userid}
        type={label.toUpperCase()}
        activeTab={activeTab}
      />
    ),
  }));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleExportToExcel = async () => {
    const response = await ExportUsersTransactionToExcel(ExportUsersTransactionToExcelUrl, userid, session?.jwt);
    if(response.type==="error"){
      toastHandler(response.message);
      return;
    }
    toastHandler("Transaction Exported via Email!");
  }

  if (status === "loading") return null;

  return (
    <>
      <div className="md:flex justify-between items-center">
        <div className="flex w-full md:w-[20%] justify-start items-center rounded-lg">
          {tabLabels.map((label, index) => (
            <TabsTile
              key={index}
              index={index}
              label={label}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
          ))}
        </div>
        <div className="flex justify-start mt-2 md:mt-0 md:justify-end items-center  w-full md:w-[80%]">
          <BuySellDropDownComponent setBody={setBody} />
          <Button
            radius="sm"
            size="small"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white "
            onClick={handleExportToExcel}
          >
            Export to Excel
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <Divider />
        {tables[activeTab].component}
      </div>
    </>
  );
};

export default UsersTab;
