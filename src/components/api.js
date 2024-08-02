const config = {
  baseUrl: `https://nomoreparties.co/v1/pwff-cohort-1`,
  headers: {
      authorization: '1cd05b7a-8262-4bcd-abd0-86239a45f8a2',
      'Content-Type': 'application/json',
  }
}

// export const getUserInfo = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: {
//       authorization: config.headers.authorization,
//       'Content-Type': config.headers['Content-Type'],
//     },
//     method: 'GET',
//   })

//   .then ((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     else {
//       return console.log(`Ошибка запроса к серверу:`, res.status)
//     }
//   })
//   .then ((result) => {
//     return result
//   })
// }

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    method: 'GET',
  })

  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return console.log('Ошибка запроса к серверу:', res.status);
    }
  })
  .then((result) => {
    return result;
  });
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    method: 'GET',
  })
  
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return console.log('Ошибка запроса к серверу:', res.status);
    }
  })
  .then((result) => {
    return result;
  });
}

export const postUserProfile = (inputName, inputDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      name: `${inputName}`,
      about: `${inputDescription}`,
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return console.log('Ошибка запроса к серверу:', res.status);
    }
  })
  .then((result) => {
    return result;
  });
}

export const postUserCard = (inputCardName, inputCardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      name: `${inputCardName}`,
      link: `${inputCardLink}`,
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return console.log('Ошибка запроса к серверу:', res.status);
    }
  })
  .then((result) => {
    return result;
  });
}