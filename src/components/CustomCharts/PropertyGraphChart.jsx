import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "next-themes";
import { getDateFromTimestamp } from "@/utility/utils";


const PropertyGraphChart = ({ candles, refresh }) => {
  const { theme } = useTheme();

  const dates = candles.map((candle) => {
    return { x: getDateFromTimestamp(candle.time), y: candle.price };
  });

  const series = [
    {
      name: "Property Price",
      data: dates,
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 400,
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    title: {
      text: "Property Price",
      align: "left",
      style: {
        fontSize: "14px",
        fontWeight: "thin",
        color: theme === "dark" ? "#fff" : "#373d3f",
      },
    },
    colors: ["#7d69d0", "#60ccfa"],
    legends: {
      show: true,
      markers: {
        width: 12,
        height: 12,
        strokeColor: "#fff",
        radius: 25,
      },
    },

    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val ;
        },
      },
    },
    theme: {
      mode: theme,
    },
  };

  return (
    <div className="p-4 mb-10 h-[400px] dark:bg-[#15171C] rounded-lg ">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={400}
      />
    </div>
  );
};

export default PropertyGraphChart;
