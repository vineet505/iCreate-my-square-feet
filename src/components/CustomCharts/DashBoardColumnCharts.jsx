"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { GetSalesChartDataRequest } from "@/lib/Dashboard/DashboardRequestHandler";
import { GetSalesChartDataUrl } from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import { toastHandler } from "../Toaster/ToasterHandler";
import DashBoardColumnChartLoading from "./DashBoardColumnChartLoading";
const filterList = ["Daily", "Weekly", "Monthly", "Yearly"];

const DashBoardColumnCharts = () => {
  const { theme } = useTheme();
  const { data: session, status } = useSession();
  const [chartDuration, setChartDuration] = useState("weekly");
  const [loading, setLoading] = useState(false);
  const [salesChartData, setSalesChartData] = useState({
    categories: [],
    buy: [],
    sell: [],
    deposit: [],
    withdrawal: [],
  });

  useEffect(() => {
    if (status == "authenticated") {
      setTimeout(async () => {
        setLoading(true);
        const response = await GetSalesChartDataRequest(
          GetSalesChartDataUrl,
          chartDuration,
          session?.jwt
        );
        if (response.type === "success") {
          setSalesChartData({
            categories: response.data.result.categories,
            buy: response.data.result.buy_data,
            sell: response.data.result.sell_data,
            deposit: response.data.result.deposit_data,
            withdrawal: response.data.result.withdraw_data,
          });
        } else {
          toastHandler("Failed to fetch sales data");
        }
        setLoading(false);
      }, 10);
    }
  }, [session, status, chartDuration]);

  const series = [
    {
      name: "Buy",
      data: salesChartData.buy,
    },
    {
      name: "Sell",
      data: salesChartData.sell,
    },
    {
      name: "Deposit",
      data: salesChartData.deposit,
    },
    {
      name: "Withdrawal",
      data: salesChartData.withdrawal,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      background: "transparent",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    title: {
      text: "Sales Activity",
      align: "left",
      style: {
        fontSize: "14px",
        fontWeight: "thin",
        color: theme === "dark" ? "#fff" : "#373d3f",
      },
    },
    colors: ["#7d69d0", "#60ccfa", "#ff9f43", "#f5365c"],
    legends: {
      show: true,
      markers: {
        width: 12,
        height: 12,
        strokeColor: "#fff",
        radius: 25,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
        borderRadius: "5",
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: salesChartData.categories,
    },
    yaxis: {
      title: {
        text: "₹ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val + " thousands";
        },
      },
    },
    theme: {
      mode: theme,
    },
  };

  return (
    <>
      {loading ? (
        <DashBoardColumnChartLoading />
      ) : (
        <div className="p-4 h-[500px] dark:bg-[#15171C] rounded-lg ">
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              {filterList.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setChartDuration(item.toLowerCase())}
                  className={
                    "px-2 py-1 rounded-md text-sm " +
                    (chartDuration === item.toLowerCase()
                      ? "bg-gradient-to-tr from-pink-500 to-[#08b8ea] shadow-lg text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-white")
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={450}
          />
        </div>
      )}
    </>
  );
};

export default DashBoardColumnCharts;
