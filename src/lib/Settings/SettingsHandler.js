const GetTermsorPolicy = async (api_url, type) => {
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
};

const UploadTermsorPolicy = async (api_url, html_text, token) => {
  const headers = {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  
  const formData = new URLSearchParams();
  formData.append('html_text', html_text);
  let response = await fetch(api_url, {
    method: "POST",
    headers: headers,
    body: formData
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


export { GetTermsorPolicy, UploadTermsorPolicy}