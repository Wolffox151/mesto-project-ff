const config = {
  baseUrl: `https://nomoreparties.co/v1/pwff-cohort-1`,
  headers: {
      authorization: '1cd05b7a-8262-4bcd-abd0-86239a45f8a2',
      'Content-Type': 'application/json',
  }
}

const getResponseData = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    Promise.reject(`Ошибка запроса к серверу: ${res.status}`);
  }
}

export const getUserInfo = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'GET',
  })
  .then((res) => getResponseData(res))
};

export const getCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'GET',
  })

  .then((res) => getResponseData(res))
}

export const getInitialInfo = () => {
  return Promise.all([getUserInfo(), getCards()])
}

export const postUserProfile = async (inputName, inputDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${inputName}`,
      about: `${inputDescription}`,
    })
  })

  .then((res) => getResponseData(res))
}

export const postUserCard = async (inputCardName, inputCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${inputCardName}`,
      link: `${inputCardLink}`,
    })
  })

  .then((res) => getResponseData(res))
}

export const deleteCardApi = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })

  .then((res) => getResponseData(res))
}

export const addLikeCardApi = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })

  .then((res) => getResponseData(res))
}

export const removeLikeCardApi = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })

  .then((res) => getResponseData(res))
}

export const changeAvatarApi = async (cardId) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
  })

  .then((res) => getResponseData(res))
}