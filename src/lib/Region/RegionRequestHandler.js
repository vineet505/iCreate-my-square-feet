const GetAllRegions = async (api_url, rowsPerPage, page,body, token) => {
  api_url = api_url + "?per_page=" + rowsPerPage + "&page_number=" + page + "&region=" + body.region + "&status=" + body.status;
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

const ChangeRegionStatus = async (api_url, region_id , token) => {
  api_url = api_url + "/" + "?region_id=" + region_id;
  let response = await fetch(api_url, {
    method: "PUT",
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

const AddRegionRequest = async (api_url, body, token) => {
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

const GetRegionDetails = async (api_url, region_id, token) => {
  api_url = api_url + "/" + "?region_id=" + region_id;
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

const UpdateRegionRequest = async (api_url, body, token) => {
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

export const GetRegionListRequest = async(api_url) => {
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



export { GetAllRegions, ChangeRegionStatus, AddRegionRequest, GetRegionDetails, UpdateRegionRequest };
