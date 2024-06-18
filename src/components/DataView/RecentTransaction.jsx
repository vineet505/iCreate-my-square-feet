"use client";
import React from "react";
import ViewAllButton from "../Buttons/ViewAllButton";
import TransactionListComponent from "./TransactionListComponent";
import { useState, useEffect } from "react";
import { GetAllFiatTransactions } from "@/lib/Transactions/TransactionRequestHandler";
import { GetAllFiatTransactionsUrl } from "@/static/ApiEndpoints";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { transactionsFormatter } from "../Transactions/transactionsFormatter";
import { useSession } from "next-auth/react";
import { RecentTransactionFormatter } from "../Dashboard/DashboardFormatter";
import { useRouter } from "next/navigation";
import RecentTransactionLoading from "./RecentTransactionLoading";

const RecentTransaction = () => {
  const { data: session, status } = useSession();
  const [recentTransaction, setRecentTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const rowsPerPage = 6;

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      setIsLoading(true);
      let response = await GetAllFiatTransactions(
        GetAllFiatTransactionsUrl,
        1,
        rowsPerPage,
        "ALL",
        {
          min_date: 0,
          max_date: 0,
        },
        session?.jwt
      );
      if (response.type == SERVER_FAILURE) {
        toastHandler(response.data.message);
        setIsLoading(false);
        return;
      }
      let data = response.data;
      let response_data = RecentTransactionFormatter(
        transactionsFormatter(data.transactions)
      );
      setRecentTransaction(response_data);
      setIsLoading(false);
    }, 10);
  }, [status, session]);

  return (
    <div className="bg-white dark:bg-[#15171C] overflow-auto rounded-md">
      <div className="flex items-center justify-between px-2 h-[50px] border-b-1 border-b-gray-200 dark:border-b-gray-900">
        <span className="font-light ml-2 text-[12px] uppercase">
          Recent Fiat Transactions
        </span>
        <span onClick={() => router.push("/transactions")}>
          <ViewAllButton />
        </span>
      </div>
      <div className="h-[420px] px-4">
        <ul className="pt-2">
          {isLoading ? (
            <RecentTransactionLoading />
          ) : (
            recentTransaction.map((el) => (
              <TransactionListComponent
                key={el.id}
                sno={el.sno}
                headline={el.headline}
                subheadline={el.subheadline}
                amount={el.amount}
                color={el.color}
                type={el.type}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecentTransaction;
