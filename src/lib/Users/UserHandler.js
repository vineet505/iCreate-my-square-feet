const GetUsersDetailsById = async (api_url, token) => {
  let response = await fetch(api_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
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

const dateModify = (date,type) => {
  let addedUrl = ""
  date = new Date(date);
  let timestamp = date.getTime();
  addedUrl = addedUrl + "&" + type +"=" + timestamp / 1000;
  return addedUrl
}

const GetUsersTransactions = async (
  apiUrl,
  pageNumber,
  perPage,
  transactionType,
  userId,
  body,
  authToken
) => {
  let url = `${apiUrl}?page_number=${pageNumber}&per_page=${perPage}&transaction_type=${transactionType}&userid=${userId}`;
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

const UpdateUserDetails = async (api_url, data, token) => {
  let response = await fetch(api_url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
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

const PostUserDetails = async (api_url, data) => {
  let response = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
function GetUsersList(apiUrl, token, pageNumber, perPage, body) {
  const params = new URLSearchParams({
    page_number: pageNumber,
    per_page: perPage,
    user_type: body.user_type,
    search: body.search,
    sort_by: body.sort_by,
    status: body.status,
  });

  // Construct the full URL with query parameters
  const fullUrl = `${apiUrl}?${params.toString()}`;
  // Set up headers
  const headers = new Headers({
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  });

  // Fetch request
  let response = fetch(fullUrl, {
    method: "GET",
    headers: headers,
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
}

export {
  GetUsersDetailsById,
  GetUsersTransactions,
  UpdateUserDetails,
  PostUserDetails,
  GetUsersList,
};

export function ExportUsersTransactionToExcel(api_url, user_id, token ){
  api_url = `${api_url}?user_id=${user_id}`;
  let response = fetch(api_url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
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
}