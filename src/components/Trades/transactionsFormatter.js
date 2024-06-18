
function timeStamptoLocalDate(timestamp) {
  let date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

function decimalFormatter(number) {
  return number.toFixed(2).toString();
}

function tradesFormatter(usersTrades) {
let data = [];
usersTrades.forEach((transaction) => {
  let transactionData = {};
  transactionData["id"] = transaction.id;
  transactionData["user_name"] = transaction.user_name;
  transactionData["transaction_date"] = timeStamptoLocalDate(transaction.transaction_date);
  transactionData["transaction_type"] = transaction.transaction_type;
  transactionData["transaction_amount"] = decimalFormatter(transaction.transaction_amount);
  transactionData["transaction_quantity"] = decimalFormatter(transaction.transaction_quantity);
  transactionData["transaction_avg_price"] = decimalFormatter(transaction.transaction_avg_price);
  transactionData["transaction_id"] = transaction.transaction_id;
  transactionData["status"] = transaction.transaction_status;
  transactionData["transaction_status"] = transaction.transaction_status;
  transactionData["profile_picture_url"] = transaction.profile_picture_url;
  transactionData["property_title"] = transaction.property_title;
  transactionData["project_logo"] = transaction.project_logo;
  data.push(transactionData);
});
return data;
}

function tradesByPropertyFormatter(usersTrades) {
  let data = [];
  usersTrades.forEach((transaction) => {
    let transactionData = {};
    transactionData["id"] = transaction.id;
    transactionData["user_name"] = transaction.user_name;
    transactionData["transaction_date"] = timeStamptoLocalDate(transaction.transaction_date);
    transactionData["transaction_type"] = transaction.transaction_type;
    transactionData["transaction_amount"] = decimalFormatter(transaction.transaction_amount);
    transactionData["transaction_quantity"] = decimalFormatter(transaction.transaction_quantity);
    transactionData["transaction_avg_price"] = decimalFormatter(transaction.transaction_avg_price);
    transactionData["transaction_id"] = transaction.transaction_id;
    transactionData["status"] = transaction.transaction_status;
    transactionData["transaction_status"] = transaction.transaction_status;
    transactionData["profile_picture_url"] = transaction.profile_picture_url_key;
    transactionData["property_title"] = transaction.property_title;
    transactionData["project_logo"] = transaction.project_logo;
    data.push(transactionData);
  });
  return data;
}


export { timeStamptoLocalDate, decimalFormatter, tradesFormatter, tradesByPropertyFormatter };