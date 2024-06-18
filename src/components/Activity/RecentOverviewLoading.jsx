import React from "react";
import { Skeleton } from "@nextui-org/react";

const RecentOverviewLoading = () => {
  return (
    <>
      <div className="h-[140px]  flex-auto w-full md:w-[20%] ">
        <div className={"flex h-full rounded-md w-full py-2 px-4 gap-3"}>
          {[1, 2, 3, 4].map((item, index) => {
            return <Skeleton className=" w-1/2 h-full rounded-lg" key={"custom-recent-loader" + index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default RecentOverviewLoading;
