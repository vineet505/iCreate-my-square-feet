import React from "react";
import DashBoardSalesOverViewCharts from "./DashBoardSalesOverViewCharts";

export const DashBoardOverViewCard = ({ heading, count, chartData, bgColor, growth }) => {
  return (
    <div className="h-[130px] flex-auto w-full md:w-[30%] lg:w-[20%] ">
      <div className={"flex h-full rounded-md w-full p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] " + bgColor}>
        <div className="w-[50%] h-full flex items-center">
          <div>
            <div className="text-white text-[14px]">{heading}</div>
            <div className="text-white text-[28px] font-bold leading-10">{Math.round(count)}</div>
            <div className="text-white text-[11px]">{Math.round(growth)}% Change since last Month.</div>
          </div>
        </div>
        <div className="w-[50%] ">
          <DashBoardSalesOverViewCharts chartData={chartData} />
        </div>
      </div>
    </div>
  );
};