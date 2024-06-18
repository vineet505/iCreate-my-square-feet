const dateModify = (date,type) => {
  let addedUrl = ""
  date = new Date(date);
  let timestamp = date.getTime();
  addedUrl = addedUrl + "&" + type +"=" + timestamp / 1000;
  return addedUrl
}

export const GetAllFiatTransactions = async (
    apiUrl,
    pageNumber,
    perPage,
    transactionType,
    body,
    authToken
  ) => {
    let url = `${apiUrl}?page_number=${pageNumber}&per_page=${perPage}&transaction_type=${transactionType}`;
    url = url + dateModify(body.min_date,"min_date");
    url = url + dateModify(body.max_date,"max_date");
  
    let response = fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed");
        }
      })
      .then((responseData) => responseData)
      .catch((error) => error);
  
    return response;
  };