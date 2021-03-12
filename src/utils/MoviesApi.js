export const getAllMovies = () => {
  return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data)
}

export const getMyMovies = () => {
  return fetch(`http://localhost:3001/movies`, {
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

export const saveMovies = (data) => {
  return fetch(`http://localhost:3001/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nameRU: data.nameRU !== null ? data.nameRU : data.nameEN,
      nameEN: data.nameEN === null ? data.nameRU : data.nameEN,
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image !== null ? `https://api.nomoreparties.co${data.image.url}` : 'https://api.nomoreparties.co/uploads/750x485_28d08c49c4.jpeg',
      trailer: data.trailerLink,
      thumbnail: data.image !== null ? `https://api.nomoreparties.co${data.image.formats.thumbnail.url}` : 'https://api.nomoreparties.co/uploads/750x485_28d08c49c4.jpeg',
      movieId: data.id,
    }),
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

export const unsaveMovies = (id) => {
  return fetch(`http://localhost:3001/movies/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      if (res.ok && res.status !== 204) {
        return res.json()
      } else {
        return Promise.reject(
          new ErrorApiCodeHandler(res.status, `Ошибка: ${res.status} (${res.statusText})`),
        )
      }
    })
}
