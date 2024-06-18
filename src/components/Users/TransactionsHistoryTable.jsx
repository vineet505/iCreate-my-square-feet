"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import CustomPagination from "../CustomPagination/CustomPagination";
import { investcolumns, fiatcolumns } from "./data";
import { GetUsersTransactions } from "@/lib/Users/UserHandler";
import {
  GetUsersTransactionsUrl,
  GetUsersFiatTransactionsUrl,
} from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import { SERVER_SUCCESS } from "@/static/Static";
import {
  transactionHistoryFormatter,
  fiatTransactionHistoryFormatter,
} from "@/lib/Users/formatter";

export default function TransactionsHistoryTable({ userid, type, activeTab, body }) {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const rowsPerPage = 5;
  const columns = ["DEPOSIT", "WITHDRAW"].includes(type)
    ? fiatcolumns
    : investcolumns;
  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      const response = await GetUsersTransactions(
        ["DEPOSIT", "WITHDRAW"].includes(type)
          ? GetUsersFiatTransactionsUrl
          : GetUsersTransactionsUrl,
        page,
        rowsPerPage,
        type,
        userid,
        body,
        session.jwt
      );
      if (response.type == SERVER_SUCCESS) {
        const data = response.data;
        let transactions = data.transactions;
        let user_transactions = ["DEPOSIT", "WITHDRAW"].includes(type)
          ? fiatTransactionHistoryFormatter(transactions)
          : transactionHistoryFormatter(transactions);
        let total_pages = Math.floor(
          (data.total_documents + rowsPerPage - 1) / rowsPerPage
        );
        setPages(total_pages);
        setData(user_transactions);
      }
    }, 10);
  }, [session, status, page, activeTab, type, userid, body]);

  return (
    <div className="bg-white dark:bg-[#15171c] px-2 mt-4 rounded-lg">
      <Table
        aria-label="Buy Table"
        removeWrapper
        bottomContent={
          <CustomPagination page={page} pages={pages} setPage={setPage} />
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.title}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
