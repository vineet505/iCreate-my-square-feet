export const GetCustomerPicksByRegion = async (api_url, rowsPerPage, page, region, token) => {
  api_url = api_url + "?per_page=" + rowsPerPage + "&page_number=" + page + "&region_id=" + region;
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

export const GetListofPropertyToRecommend = async (api_url, type, region_id) => {
  api_url = api_url + "?type=" + type + "&region_id=" + region_id;
  let response = await fetch(api_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export const SetRecommendedProperties = async (api_url, property_id, region_id, token) => {
  let response = await fetch(api_url, {
    method: "POST",
    body: JSON.stringify({
      property_id: property_id,
      region_id: region_id,
    }),
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
}

export const DeleteRecommendedProperties = async (api_url, property_id, region_id, token) => {
  let response = await fetch(api_url, {
    method: "DELETE",
    body: JSON.stringify({
      property_id: property_id,
      region_id: region_id,
    }),
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
}
