"use client";
import React from "react";
import dynamic from "next/dynamic";
import RecentActivityComponent from "../Activity/RecentActivityComponent";
import PageHeader from "../Headers/PageHeader";
import TopProductsComponent from "../DataView/TopProductsComponent";
import RecentTransaction from "../DataView/RecentTransaction";
import RevenueofThisMonth from "../DataView/RevenueofThisMonth";
import FooterComponent from "../Footer/FooterComponent";
import { useEntityStorage } from "@/store/GlobalStore";
import { RecentOverViewComponent } from "../Activity/RecentOverViewComponent";
import TradesTable from "../Trades/TradesTableComponent";

const DashBoardColumnCharts = dynamic(
  () => import("../CustomCharts/DashBoardColumnCharts"),
  { ssr: false }
);

const DashBoardPage = () => {
  const toggle = useEntityStorage((state) => state.toggle);
  return (
    <div className="h-[calc(100vh-100px)] pt-[10px]">
      <PageHeader title={"Dashboard"} />
      <RecentOverViewComponent />

      <div className="flex flex-wrap justify-between gap-2 mt-2">
        <div
          className={
            "flex-auto  rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-4 " +
            (toggle ? "w-full xl:w-[65%]" : "w-full")
          }
        >
          <DashBoardColumnCharts />
        </div>

        <div
          className={
            " flex-auto  rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-4 " +
            (toggle ? "w-full lg:w-[30%]" : "w-full xl:w-[45%]")
          }
        >
          <RecentActivityComponent />
        </div>

        <div
          className={
            "flex-auto  rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-4 " +
            (toggle ? "w-full lg:w-[50%]" : "w-full xl:w-[45%]")
          }
        >
          <TopProductsComponent />
        </div>
        <div
          className={
            " flex-auto  rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-4 " +
            (toggle ? "w-full lg:w-[25%]" : "w-full xl:w-[45%]")
          }
        >
          <RecentTransaction />
        </div>
        <div
          className={
            " flex-auto  rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-4 " +
            (toggle ? "w-full lg:w-[20%]" : "w-full xl:w-[45%]")
          }
        >
          <RevenueofThisMonth />
        </div>
      </div>

      <div
        className={
          " flex-auto  rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-4 "        }
      >
        <div className="flex items-center justify-between px-2 h-[50px] border-b-1 border-b-gray-200 dark:border-b-gray-900">
          <span className="font-light ml-2 text-[12px] uppercase">
            Invoice Summary
          </span>
        </div>
        <TradesTable />
      </div>

      <FooterComponent />
    </div>
  );
};

export default DashBoardPage;
