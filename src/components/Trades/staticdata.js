const columns = [
  { name: "Transaction ID", uid: "transaction_id" },
  { name: "User Name", uid: "user_name" },
  { name: " Property", uid: "property" },
  { name: " Quantity", uid: "transaction_quantity" },
  { name: " Avg. Price", uid: "transaction_avg_price" },
  { name: " Type", uid: "transaction_type" },
  { name: " Amount", uid: "transaction_amount" },
  { name: " Status", uid: "transaction_status" },
  { name: " Date", uid: "transaction_date" },
];

const statusOptions = [
  { name: "BUY", uid: "active" },
  { name: "SELL", uid: "inactive" },
];

export { columns, statusOptions };
