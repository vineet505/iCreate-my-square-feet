"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const DashBoardSalesOverViewCharts = ({chartData}) => {

  const [data, setData] = useState({"x": [], "y": []});

  useEffect(() => {
    let x = [];
    let y = [];
    chartData?.map((item) => {
      x.push(item._id);
      y.push(item.count);
    });
    setData({"x": x, "y": y});
  }, [chartData]);


  const { theme } = useTheme();
  const series = [
    {
      name: "Count",
      data: data.y,
    },
  ];

  const options = {
    chart: {
      height: 50,
      type: "line",
      background: "transparent",
      parentHeightOffset: 0,
      offsetX: 0,
      offsetY: 0,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "stepline",
      width: 2,
      colors: ["#FFFFF7"],
    },
    fill: {
      colors: ["#1A73E8"],
      type: "solid",
      opacity: 0,
    },
    xaxis: {
      type: "datetime",
      categories: data.x,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    theme: {
      mode: theme,
    },
  };

  return (
    <div className=" overflow-hidden">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={100}
      />
    </div>
  );
};

export default DashBoardSalesOverViewCharts;
