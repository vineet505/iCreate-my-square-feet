"use client";
import React from "react";
import Image from "next/image";
import { Divider } from "antd";
import ListTile from "./ListTile";
import { useEntityStorage } from "@/store/GlobalStore";
import { usePathname } from "next/navigation";
import {
  BarChartOutlined,
  GroupAddRounded,
  PersonAddAlt1Rounded,
  Settings,
  CardGiftcardOutlined,
  TravelExploreOutlined,
  RecommendOutlined,
  AdsClickOutlined,
  LayersOutlined,
  LaunchOutlined,
  PaidOutlined,
  ShowChartOutlined
} from "@mui/icons-material";
// Import other dependencies

const SidebarComponent = () => {
  const pathname = usePathname();
  const toggle = useEntityStorage((state) => state.toggle);

  const sidebarWidth = toggle ? "90px" : "280px";
  const logoVisibility = toggle ? "hidden" : "";
  const item2Padding = toggle ? "px-[25px]" : "px-[25px]";
  const item2FontSize = toggle ? "text-[14px]" : "text-[12px]";

  const appsData = [
    { url: "/dashboard", name: "Dashboard", icon: <LayersOutlined /> },
    { url: "/investment", name: "Projects", icon: <BarChartOutlined /> },
    { url: "/users", name: "Users", icon: <PersonAddAlt1Rounded  /> },
    {url: "/trade", name: "Trade", icon: <ShowChartOutlined />},
    { url: "/transactions", name: "Transaction History", icon: <PaidOutlined  />},
    { url: "/region", name: "Region", icon: <TravelExploreOutlined  /> },
    { url: "/recommend", name: "Recommendations", icon: <RecommendOutlined /> },
    { url: "/ads", name: "Ads", icon: <AdsClickOutlined  /> },
    { url: "/welcome", name: "Welcome", icon: <CardGiftcardOutlined  /> },
    { url: "/cta", name: "Click to Action", icon: <LaunchOutlined  /> },
    { url: "/staff", name: "Staff", icon: <GroupAddRounded   /> },
    { url: "/policies", name: "Policies", icon: <Settings /> },
  ];

  return (
    <div
      id="logo-sidebar"
      className={`flex flex-col h-full overflow-hidden bg-[#101218] dark:bg-[#0D0E13] text-white border-r-1 border-r-[#dbdfe9] dark:border-r-gray-800  transition-all md:w-[${sidebarWidth}]`}
    >
      {/* Item 1 */}
      <div
        className={`${toggle ? "hidden" : ""} flex items-center justify-between w-full pt-[26px] px-[25px] pb-[6.5px]`}
      >
        <div className={`flex h-[34px] py-1 ${logoVisibility}`}>
          <Image
            className={logoVisibility}
            height={30}
            width={140}
            src="https://preview.keenthemes.com/metronic8/demo38/assets/media/logos/demo38-dark.svg"
            alt="Logo"
            onError={(e) => {
              e.target.id = "https://i.pravatar.cc/300";
              e.target.srcset = "https://i.pravatar.cc/300";
            }}
          />
        </div>
      </div>
      {/* Item 2 */}
      <div className={`flex flex-col h-full py-6 ${item2Padding}`}>
        <div className={`${item2FontSize} font-semibold px-2`}>APPS</div>
        <Divider className="border-gray-300" />
        <ul className="space-y-2 font-medium overflow-auto">
          {appsData.map((app) => (
            <ListTile
              key={app.url}
              active={String(pathname).startsWith(app.url)}
              url={app.url}
              name={app.name}
              toggle={toggle}
              icon={app.icon}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;
