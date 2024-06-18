import React from "react";
import {  Chip,User } from "@nextui-org/react";
import { columns } from "./staticdata";
import CustomTableComponent from "../CustomTable/CustomTableComponent";
import { GetAllFiatTransactions } from "@/lib/Transactions/TransactionRequestHandler";
import { GetAllFiatTransactionsUrl } from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useState, useEffect } from "react";
import { transactionsFormatter } from "./transactionsFormatter";
import CustomPagination from "../CustomPagination/CustomPagination";
const statusColorMap = {
  DEPOSIT: "success",
  WITHDRAW: "danger",
};

export default function TransactionTable() {
  const { data: session, status } = useSession();
  const [data, setData] = React.useState([]);
  const rowsPerPage = 10;
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const renderCell = (transaction, columnKey) => {
    const cellValue = transaction[columnKey];
    switch (columnKey) {
      case "user_name":
        return (
          <div className="flex items-center">
            <User
              name={transaction.user_name}
              avatarProps={{
                src: transaction.profile_picture_url,
                alt: transaction.user_name,
              }}
              size="small"
            />
          </div>
        );
      case "transaction_type":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[transaction.transaction_type]}
            size="sm"
            variant="dot"
          >
            {
              transaction.transaction_type == "DEPOSIT" ? "Deposit" : "Withdraw"

            }
          </Chip>
        );
      default:
        return cellValue;
    }
  };

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      let response = await GetAllFiatTransactions(
        GetAllFiatTransactionsUrl,
        page,
        rowsPerPage,
        "ALL",
        {
          "min_date":0,
          "max_date":0,
        },
        session?.jwt
      );
      if (response.type == SERVER_FAILURE) {
        toastHandler(response.data.message);
        return;
      }
      let data = response.data;
      let total_pages = Math.floor(
        (data.total_documents + rowsPerPage - 1) / rowsPerPage
      );
      setPages(total_pages);
      let response_data = transactionsFormatter(data.transactions);
      setData(response_data);
    }, 10);
  }, [page, status, session, refresh]);


  const bottomContent = React.useMemo(() => {
    return <CustomPagination page={page} pages={pages} setPage={setPage} />;
  }, [page, pages]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <>
      <CustomTableComponent
        columns={columns}
        data={data}
        renderCell={renderCell}
        bottomContent={bottomContent}
      />
    </>
  );
}
