const dateModify = (date,type) => {
    let addedUrl = ""
    date = new Date(date);
    let timestamp = date.getTime();
    addedUrl = addedUrl + "&" + type +"=" + timestamp / 1000;
    return addedUrl
  }
  
  export const GetAllCustomersRecentActivityRequest = async (
      apiUrl,
      pageNumber,
      perPage,
      authToken
    ) => {
      let url = `${apiUrl}?page_number=${pageNumber}&per_page=${perPage}`;
    
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

  export const GetOverviewData = async (apiUrl, authToken) => {
    let url = `${apiUrl}`;
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
  }

  export const GetRevenueData = async (apiUrl, authToken) => {
    let url = `${apiUrl}`;
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
  }

export const GetSalesChartDataRequest = async (apiUrl, duration_type, authToken) => {
  let url = `${apiUrl}?duration_type=${duration_type}`;
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
}