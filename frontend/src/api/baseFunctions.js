export const getRequest = async (url, queryParam = null) => {
  // TODO: add support for multiple query params
  if (queryParam?.name && queryParam?.value) {
    url += `?${queryParam.name}=${queryParam.value}`;
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json();
};

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return response.json().then((errorObject) => {
      if (errorObject && errorObject.errors) {
        const errorMessageKey = Object.keys(errorObject.errors).find(
          (errorKey) => errorObject.errors[errorKey]
        );
        throw new Error(errorObject.errors[errorMessageKey]);
      }
    });
  }

  return response.json();
};

export const deleteRequest = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  if (response.status === 204) {
    console.log("Resource deleted successfully, no content returned.");
    return null;
  }
};
