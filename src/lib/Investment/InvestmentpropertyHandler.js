export const GetPropertyList = async (
  url,
  perPage = 10,
  pageNumber = 1,
  filterDict = {},
  sortDict = {}
) => {
  url = `${url}?per_page=${perPage}&page_number=${pageNumber}`;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter_dict: filterDict,
      sort_dict: sortDict,
    }),
  };

  let response = await fetch(url, options)
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


export const AddPropertyRequest = async (api_url, body, token) => {
  let response = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
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

export const UpdatePropertyRequest = async (api_url, body, property_id, token) => {
  api_url = `${api_url}?property_id=${property_id}`;
  let response = await fetch(api_url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
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

export const GetPropertyImagesRequest = async (api_url, property_id, token) => {
  api_url = `${api_url}?property_id=${property_id}`;
  let response = await fetch(api_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }
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

export const DeletePropertyImageViaIndexRequest = async (api_url, index, property_id, token) =>{
  api_url = `${api_url}?index=${index}&property_id=${property_id}`;
  let response = await fetch(api_url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }
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


export const GetPropertyCandlesRequest = async (api_url, property_id) => {
  api_url = `${api_url}?property_id=${property_id}`;
  let response = await fetch(api_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
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

export const SetPropertyCandlesRequest = async (api_url, body, token) => {
  let response = await fetch(api_url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
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

export const GetPropertyDetailsRequest = async (api_url, property_id) => {
  api_url = `${api_url}?property_id=${property_id}`;
  let response = await fetch(api_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
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