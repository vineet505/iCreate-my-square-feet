"use client";
import React from "react";
import ViewAllButton from "../Buttons/ViewAllButton";
import TableRow from "./TableRow";
import TableHeading from "./TableHeading";
import { useState, useEffect } from "react";
import { GetPropertyList } from "@/lib/Investment/InvestmentpropertyHandler";
import { GetPropertyListUrl } from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import { SERVER_FAILURE } from "@/static/Static";
import { investmentFormatter } from "../Investment/investmentFormatter";
import { ProjectsFormatter } from "../Dashboard/DashboardFormatter";
import { useRouter } from "next/navigation";
import TopProductsLoading from "./TopProductsLoading";

const TopProductsComponent = () => {
  const { data: session, status } = useSession();
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      setIsLoading(true);
      let response = await GetPropertyList(GetPropertyListUrl, 6, 1);
      if (response.type == SERVER_FAILURE) {
        toastHandler(response.data.message);
        setIsLoading(false);
        return;
      }
      let data = response.data;
      let response_data = ProjectsFormatter(
        investmentFormatter(data.properties)
      );
      setProductData(response_data);
      setIsLoading(false);
    }, 10);
  }, [status, session]);

  return (
    <div className="bg-white dark:bg-[#15171C] overflow-auto rounded-md">
      <div className="flex items-center justify-between px-2 h-[50px] border-b-1 border-b-gray-200 dark:border-b-gray-900">
        <span className="font-light ml-2 text-[12px] uppercase">Projects</span>
        <span onClick={() => router.push("/investment")}>
          <ViewAllButton />
        </span>
      </div>
      <div className="h-[420px] ">
        <TableHeading />
        <ul className="">
          {isLoading ? (
            <TopProductsLoading />
          ) : (
            productData.map((el) => (
              <TableRow
                key={Math.random() * 1000 + 1}
                projectLogo={el.projectLogo}
                productCategory={el.productCategory}
                productName={el.productName}
                saleInfo={el.saleInfo}
                saleValue={el.saleValue}
                status={el.status}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TopProductsComponent;
