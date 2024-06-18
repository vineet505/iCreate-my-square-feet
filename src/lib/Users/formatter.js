function timeStamptoLocalDate(timestamp) {
  let date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

function decimalFormatter(number) {
  return number.toFixed(2).toString();
}

function transactionHistoryFormatter(transactions) {
  let user_transactions = [];
  transactions.forEach((element) => {
    user_transactions.push({
      key: element.transaction_id,
      transactionId: element.transaction_id,
      projectName: element.property_title,
      quantity: decimalFormatter(element.transaction_quantity),
      amount: decimalFormatter(element.transaction_amount),
      status: element.transaction_status,
      averagePrice: decimalFormatter(element.transaction_avg_price),
      transactionDate: timeStamptoLocalDate(element.transaction_date),
    });
  });

  return user_transactions;
}

function fiatTransactionHistoryFormatter(transactions) {
  let user_transactions = [];
  transactions.forEach((element) => {
    user_transactions.push({
      key: element.transaction_id,
      transactionId: element.transaction_id,
      amount: element.transaction_amount,
      status: element.transaction_status,
      transactionDate: timeStamptoLocalDate(element.transaction_date),
    });
  });

  return user_transactions;
}

function UserListFormatter(users) {
  let userList = [];
  users.forEach((element) => {
    userList.push({
      key: element.id,
      id: element.id,
      name: element.legal_name,
      contact: element.email_id,
      mobile: element.mobile_number,
      status: element.is_active,
      last_login_at: element.last_login_at,
      kyc_verified: element.kyc_verified,
      secure_pin_set: element.secure_pin_set,
      created_at: timeStamptoLocalDate(element.created_at),
      updated_at: timeStamptoLocalDate(element.updated_at),
      avatar: element.profile_picture_uploaded
        ? element.avatar
        : "https://i.pravatar.cc/150",
    });
  });
  return userList;
}

export {
  transactionHistoryFormatter,
  timeStamptoLocalDate,
  decimalFormatter,
  fiatTransactionHistoryFormatter,
  UserListFormatter,
};
