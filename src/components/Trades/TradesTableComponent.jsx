import React from "react";
import {  Chip,User, Input } from "@nextui-org/react";
import { columns } from "./staticdata";
import CustomTableComponent from "../CustomTable/CustomTableComponent";
import { GetAllUsersTradesUrl } from "@/static/ApiEndpoints";
import { GetAllUsersTradesRequest } from "@/lib/Trades/TradesRequestHandler";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useState, useEffect } from "react";
import { tradesFormatter } from "./transactionsFormatter";
import CustomPagination from "../CustomPagination/CustomPagination";
import TableLoading from "../CustomTable/TableLoading";
import { SearchIcon } from "@/icons/SearchIcon";

const statusColorMap = {
  BUY: "success",
  SELL: "danger",
};

export default function TradesTable() {
  const { data: session, status } = useSession();
  const [data, setData] = React.useState([]);
  const rowsPerPage = 10;
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const renderCell = (transaction, columnKey) => {
    const cellValue = transaction[columnKey];
    switch (columnKey) {
      case "user_name":
        return (
          <div className="flex items-center capitalize">
            <User
              name={transaction.user_name.split(" ")[0]}
              avatarProps={{
                src: transaction.profile_picture_url,
                alt: transaction.user_name.split(" ")[0].substring(0, 1),
                showFallback: true,
              }}
              size="small"
            />
          </div>
        );
        case "property":
          return (
            <div className="flex items-center">
              <User 
                name={transaction.property_title.split(" ")[0]}
                avatarProps={{
                  src: transaction.project_logo,
                  alt: transaction.property_title.split(" ")[0].substring(0, 1),
                  showFallback: true,
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
              transaction.transaction_type == "BUY" ? "Buy" : "Sell"

            }
          </Chip>
        );
      default:
        return cellValue;
    }
  };

const onSearchChange = React.useCallback((value) => {
  if (value) {
    setSearch(value);
    setPage(1);
  } else {
    setSearch("");
  }
}, []);

  const onClear = React.useCallback(() => {
    setSearch("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            size="sm"
            className="sm:w-[100%] lg:w-[30%]"
            placeholder="Search by Name, Mobile Number, Email or Txn ID"
            startContent={<SearchIcon />}
            value={search}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [search]);

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      setLoading(true);
      let response = await GetAllUsersTradesRequest(
        GetAllUsersTradesUrl,
        page,
        rowsPerPage,
        "ALL",
        {
          "min_date":0,
          "max_date":0,
        },
        search,
        session?.jwt
      );
      if (response.type == SERVER_FAILURE) {
        toastHandler(response.data.message);
        setLoading(false);
        return;
      }
      let data = response.data;
      let total_pages = Math.floor(
        (data.total_documents + rowsPerPage - 1) / rowsPerPage
      );
      setPages(total_pages);
      let response_data = tradesFormatter(data.transactions);
      setData(response_data);
      setLoading(false);
    }, 10);
  }, [page, status, session, refresh, search]);


  const bottomContent = React.useMemo(() => {
    return <CustomPagination page={page} pages={pages} setPage={setPage} />;
  }, [page, pages]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <>
      {loading && !search ? (
        <TableLoading n={10} />
      ) : (
        <CustomTableComponent
         topContent={topContent}
          columns={columns}
          data={data}
          renderCell={renderCell}
          bottomContent={bottomContent}
        />
      )}
    </>
  );
}
