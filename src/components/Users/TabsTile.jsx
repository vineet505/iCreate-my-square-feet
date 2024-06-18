import React from "react";

const TabsTile = ({ index, label, activeTab, handleTabChange }) => (
  <div
    className={`w-[100%] py-2 px-4 text-center  cursor-pointer  ${
      activeTab === index
        ? "bg-[#101218] text-white dark:bg-white dark:text-black"
        : ""
    } ${index === 0 ? "rounded-l-lg" : index === 3 ? "rounded-r-lg" : ""}`}
    onClick={() => handleTabChange(index)}
  >
    {label}
  </div>
);

export default TabsTile;
