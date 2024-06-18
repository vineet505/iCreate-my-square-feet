const columns = [
  { name: "User Name", uid: "user_name" },
  { name: "Transaction ID", uid: "transaction_id" },
  { name: "Transaction Type", uid: "transaction_type" },
  { name: "Transaction Amount", uid: "transaction_amount" },
  { name: "Transaction Status", uid: "transaction_status" },
  { name: "Transaction Date", uid: "transaction_date" },
];

const statusOptions = [
  { name: "DEPOSIT", uid: "active" },
  { name: "WITHDRAW", uid: "inactive" },
  { name: "BUY", uid: "active" },
  { name: "SELL", uid: "inactive" },
];

export { columns, statusOptions };
