const LoginUser = async (api_url, email, password) => {
  const data = {
    email_id: email,
    password: password,
  };
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

const RequestRestPasswordLink = async (api_url, email) => {
  api_url = api_url + "?email_id=" + email ;
  let response = await fetch(api_url, {
    method: "POST",
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

const VerifyResetPassword = async (api_url, email_id,  token, new_password) => {
  api_url = api_url + "?email_id=" + email_id + "&token=" + token + "&new_password=" + new_password;
  let response = await fetch(api_url, {
    method: "PUT",
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

export { LoginUser, RequestRestPasswordLink, VerifyResetPassword };
