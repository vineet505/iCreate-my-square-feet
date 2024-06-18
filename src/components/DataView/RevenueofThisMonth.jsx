"use client";
import React from "react";
import ViewAllButton from "../Buttons/ViewAllButton";
import { Progress } from "@nextui-org/react";
import { GetRevenueData } from "@/lib/Dashboard/DashboardRequestHandler";
import { GetRevenueOverviewDataUrl } from "@/static/ApiEndpoints";
import { SERVER_FAILURE } from "@/static/Static";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";

const RevenueItem = ({ title, total, value, color, isLoading, revenueData }) => {
  return (
    <li className="p-2">
      <p className="text-[12px] py-2 text-gray-400">{title}</p>
      {isLoading ? (
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-4 w-3/5 rounded-lg" />
          <Skeleton className="h-4 w-4/5 rounded-lg" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between pb-1">
            <span>₹ {total}</span>
          </div>
          <Progress
            isStriped
            aria-label="Loading..."
            color={color}
            value={value}
            size="md"
            className="max-w-md"
          />
        </div>
      )}
    </li>
  );
};

const RevenueofThisMonth = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [revenueData, setRevenueData] = useState({
    total_buy: 0,
    total_deposits: 0,
    total_sell: 0,
    total_withdrawals: 0,
  });

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      setIsLoading(true);
      let response = await GetRevenueData(
        GetRevenueOverviewDataUrl,
        session?.jwt
      );
      if (response.type == SERVER_FAILURE) {
        setIsLoading(false);
        return;
      }
      let data = response.data;
      setRevenueData(data);
      setIsLoading(false);
    }, 10);
  }, [status, session]);

  return (
    <div className="bg-white dark:bg-[#15171C] rounded-md">
      <div className="flex items-center justify-between px-2 h-[50px] border-b-1 border-b-gray-200 dark:border-b-gray-900">
        <span className="font-light ml-2 text-[12px] uppercase">
          Total Revenue
        </span>
        <ViewAllButton />
      </div>
      <div className="h-[420px] overflow-auto  px-4">
        <ul className="pt-4">
          <RevenueItem
            title="Total Deposits"
            color="secondary"
            isLoading={isLoading}
            revenueData={revenueData}
            total = {revenueData.total_deposits}
            value={
              (revenueData.total_deposits /
                (revenueData.total_deposits + revenueData.total_withdrawals)) *
              100
            }
          />
          <RevenueItem
            title="Total Withdrawal"
            color="danger"
            isLoading={isLoading}
            revenueData={revenueData}
            total = {revenueData.total_withdrawals}
            value={
              (revenueData.total_withdrawals /
                (revenueData.total_deposits + revenueData.total_withdrawals)) *
              100
            }
          />

          <RevenueItem
            title="Total Buy"
            color="success"
            isLoading={isLoading}
            revenueData={revenueData}
            total = {revenueData.total_buy}
            value={
              (revenueData.total_buy /
                (revenueData.total_buy + revenueData.total_sell)) *
              100
            }
          />
          <RevenueItem
            title="Total Sell"
            color="warning"
            isLoading={isLoading}
            revenueData={revenueData}
            total = {revenueData.total_sell}
            value={
              (revenueData.total_sell /
                (revenueData.total_buy + revenueData.total_sell)) *
              100
            }
          />
        </ul>
      </div>
    </div>
  );
};

export default RevenueofThisMonth;
