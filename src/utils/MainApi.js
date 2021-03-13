// export const BASE_URL = 'http://localhost:3001'
export const BASE_URL = 'https://api.popvaleks.students.nomoreparties.xyz'

class ErrorApiCodeHandler extends Error {
  constructor(code = 500, message = '', ...args) {
    super(message, ...args)
    this.code = code
  }
}

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then((res) => {
      if (res.ok && res.status !== 204) { // no content
        return res.json()
      } else {
        return Promise.reject(
          new ErrorApiCodeHandler(res.status, `Ошибка: ${res.status} (${res.statusText})`),
        )
      }
    })
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok && res.status !== 204) { // no content
        return res.json()
      } else {
        return Promise.reject(
          new ErrorApiCodeHandler(res.status, `Ошибка: ${res.status} (${res.statusText})`),
        )
      }
    })
}

export const editProfile = (email, name) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: email === ''
      ? JSON.stringify({ name })
      : name === ''
        ? JSON.stringify({ email })
        : JSON.stringify({ email, name })
  })
    .then((res) => {
      if (res.ok && res.status !== 204) { // no content
        return res.json()
      } else {
        return Promise.reject(
          new ErrorApiCodeHandler(res.status, `Ошибка: ${res.status} (${res.statusText})`),
        )
      }
    })
}

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data)
}

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data)
}
