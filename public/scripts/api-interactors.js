const getJWTFromCookie = () => {
  const cookie = document.cookie
    .split(";")
    .find(cookie => cookie.trim().startsWith("jwt="));
  return cookie ? cookie.split("=")[1] : null;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Что-то пошло не так");
  }
  return response.json();
};

const getData = async (url) => {
  try {
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const postData = async (url, data) => {
  const jwt = getJWTFromCookie();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt && `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const putData = async (url, data) => {
  const jwt = getJWTFromCookie();
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt && `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async (url) => {
  const jwt = getJWTFromCookie();
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: jwt && `Bearer ${jwt}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(error);
  }
};

export { getData, postData, putData, deleteData };
