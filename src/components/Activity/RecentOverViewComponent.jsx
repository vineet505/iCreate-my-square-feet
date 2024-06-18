"use client";
import React from "react";
import { GetOverviewData } from "@/lib/Dashboard/DashboardRequestHandler";
import { GetOverviewDataUrl } from "@/static/ApiEndpoints";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import RecentOverviewLoading from "./RecentOverviewLoading";
import { DashBoardOverViewCard } from "../CustomCharts/DashBoardOverViewCard";

export const RecentOverViewComponent = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      setIsLoading(true);
      let response = await GetOverviewData(GetOverviewDataUrl, session?.jwt);
      if (response.type == SERVER_FAILURE) {
        setIsLoading(false);
        return;
      }
      setOverviewData(response.data);
      setIsLoading(false);
    }, 10);
  }, [status, session]);

  return (
    <>
      <div className="flex flex-wrap gap-5 mb-4">
        {isLoading ? (
          <RecentOverviewLoading />
        ) : overviewData.length == 0 ? null : (
          <>
            <DashBoardOverViewCard
              count={overviewData?.property?.count}
              chartData={overviewData?.property?.data}
              growth={overviewData?.property?.growth}
              heading={"Active Property"}
              bgColor={"bg-gradient-to-r from-[#664dc9] to-[#664dc999]"}
            />
            <DashBoardOverViewCard
              count={overviewData?.sales_count?.count}
              chartData={overviewData?.sales_count?.data}
              growth={overviewData?.sales_count?.growth}
              heading={"Total Sales"}
              bgColor={"bg-gradient-to-r from-[#1d976c] to-[#2fd38a]"}
            />
            <DashBoardOverViewCard
              count={overviewData?.user_count?.count}
              chartData={overviewData?.user_count?.data}
              growth={overviewData?.user_count?.growth}
              heading={"Total Users"}
              bgColor={"bg-gradient-to-r from-[#fa5420] to-[#f6a800]"}
            />
            <DashBoardOverViewCard
              count={overviewData?.leads_count?.count}
              chartData={overviewData?.leads_count?.data}
              growth={overviewData?.leads_count?.growth}
              heading={"Total Leads"}
              bgColor={"bg-gradient-to-r from-[#5b73e8] to-[#44c4fa]"}
            />
          </>
        )}
      </div>
    </>
  );
}; // Add the closing curly brace here
