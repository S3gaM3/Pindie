export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка получения данных');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const isResponseOk = (response) => {
  return !(response instanceof Error);
};

const normalizeDataObject = (obj) => {
  let str = JSON.stringify(obj)
  str = str.replaceAll('_id', 'id');
  const newObj = JSON.parse(str)
  const result = { ...newObj, category: newObj.categories }
  return result;
}
export const normalizeData = (data) => {
  return data.map((item) => normalizeDataObject(item));
};

export const getNormalizedGameDataById = async (url, id) => {
  const data = await getData(`${url}/${id}`);
  return isResponseOk(data) ? normalizeDataObject(data) : data;
};

export const getNormalizedGamesDataByCategory = async (url, category) => {
  try {
    const data = await getData(`${url}?categories.name=${category}`);
    return data.length > 0 ? (isResponseOk(data) ? normalizeData(data) : data) : []; // Если массив не пустой, выполнить нормализацию данных, иначе вернуть пустой массив
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return []; // В случае ошибки также возвращаем пустой массив
  }
};

export const authorize = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Ошибка авторизации');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const setJWT = (jwt) => {
  document.cookie = `jwt=${jwt}; path=/;`;
  localStorage.setItem('jwt', jwt);
};

export const getJWT = () => {
  const jwtCookie = document.cookie.split('; ').find((row) => row.startsWith('jwt='));
  return jwtCookie ? jwtCookie.split('=')[1] : localStorage.getItem('jwt');
};

export const removeJWT = () => {
  document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  localStorage.removeItem('jwt');
};

export const getMe = async (url, jwt) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (!response.ok) {
      throw new Error('Ошибка получения данных');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const checkIfUserVoted = (game, userId) => {
  return game.users.some((user) => user.id === userId);
};

export const vote = async (url, jwt, usersArray) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ users: usersArray })
    });
    if (!response.ok) {
      throw new Error('Ошибка голосования');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};
