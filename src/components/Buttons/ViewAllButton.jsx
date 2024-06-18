import React from "react";

const ViewAllButton = ({text="View All"}) => {
  return (
    <button className="bg-gradient-to-tr from-pink-500 to-[#08b8ea] text-white shadow-lg text-[12px] px-2 py-1  rounded-md">
      {text}
    </button>
  );
};

export default ViewAllButton;
