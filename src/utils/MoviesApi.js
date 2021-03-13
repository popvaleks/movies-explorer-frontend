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
  const defaulImg = 'https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158'
  return fetch(`http://localhost:3001/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nameRU: data.nameRU || data.nameEN || 'Фильм',
      nameEN: data.nameEN || data.nameRU || 'Film',
      country: data.country || 'world',
      director: data.director || 'director',
      duration: data.duration || 66,
      year: data.year || 2000,
      description: data.description || 'description not found',
      image: data.image !== null ? `https://api.nomoreparties.co${data.image.url}` : defaulImg,
      trailer: data.trailerLink || `https://www.youtube.com/results?search_query=${data.nameRU}`,
      thumbnail: data.image !== null ? `https://api.nomoreparties.co${data.image.formats.thumbnail.url}` : defaulImg,
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
