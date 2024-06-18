import React from "react";
import ListComponent from "../DataView/ListComponent";
import ViewAllButton from "../Buttons/ViewAllButton";
import RecentActivityLoading from "./RecentActivityLoading";
import { useState, useEffect } from "react";
import { GetAllCustomersRecentActivityUrl } from "@/static/ApiEndpoints";
import { GetAllCustomersRecentActivityRequest } from "@/lib/Dashboard/DashboardRequestHandler";
import { RecentPropertyTransactionFormatter } from "../Dashboard/DashboardFormatter";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


const RecentActivityComponent = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [recentTransaction, setRecentTransaction] = useState([]);
  const router = useRouter();

  const rowsPerPage = 6;

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      setIsLoading(true);
      let response = await GetAllCustomersRecentActivityRequest(
        GetAllCustomersRecentActivityUrl,
        1,
        rowsPerPage,
        session?.jwt
      );
      toastHandler(response.data.message);
      if (response.type == SERVER_FAILURE) {
        setIsLoading(false);
        return;
      }
      let data = response.data;
      let response_data = RecentPropertyTransactionFormatter(data.transactions);
      setRecentTransaction(response_data);
      setIsLoading(false);
    }, 10);
  }, [status, session]);

  return (
    <div className="bg-white dark:bg-[#15171C]   rounded-md">
      <div className="flex items-center justify-between px-4 h-[50px] border-b-1 border-b-gray-200 dark:border-b-gray-900">
        <span className="font-light text-[12px] uppercase">
          Recent Activity
        </span>
        <span onClick={() => router.push("/investment")}>
          <ViewAllButton />
        </span>
      </div>
      <div className="h-[450px] overflow-auto ">
        <ul className="pt-4">
          {isLoading ? (
            <RecentActivityLoading />
          ) : (
            recentTransaction.map((el) => (
              <ListComponent
                key={el.id}
                sno={el.project_logo}
                headline={el.title}
                subheadline={el.body}
                time={el.date}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivityComponent;
