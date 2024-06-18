
export const GetAdsList = async (api_url, page_number, per_pagem, token) => {
    api_url = api_url + "?page_number=" + page_number + "&per_page=" + per_pagem;
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
  }
  
export const SetAdsRequest = async (api_url, body, token) => {
    let response = await fetch(api_url, {
      method: "POST",
      body: JSON.stringify(body),
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

  export const UpdateAdsRequest = async (api_url, body, token) => {
    let response = await fetch(api_url, {
      method: "PUT",
      body: JSON.stringify(body),
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


  export const DeleteAdsRequest = async (api_url,ads_id, token) => {
    api_url = api_url + "?card_id=" + ads_id;
    let response = await fetch(api_url, {
      method: "DELETE",
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
    
    