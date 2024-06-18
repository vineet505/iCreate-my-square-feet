
function timeStamptoLocalDate(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }
  
  function decimalFormatter(number) {
    return number.toFixed(2).toString();
  }

function transactionsFormatter(usersTransactions) {
  let data = [];
  usersTransactions.forEach((transaction) => {
    let transactionData = {};
    transactionData["id"] = transaction._id;
    transactionData["user_name"] = transaction.user_name;
    transactionData["transaction_date"] = timeStamptoLocalDate(transaction.transaction_date);
    transactionData["transaction_type"] = transaction.transaction_type;
    transactionData["transaction_amount"] = decimalFormatter(transaction.transaction_amount);
    transactionData["transaction_id"] = transaction.transaction_id;
    transactionData["status"] = transaction.transaction_status;
    transactionData["transaction_status"] = transaction.transaction_status;
    transactionData["profile_picture_url"] = transaction.profile_picture_url_key;
    data.push(transactionData);
  });
  return data;
}

export { timeStamptoLocalDate, decimalFormatter, transactionsFormatter };