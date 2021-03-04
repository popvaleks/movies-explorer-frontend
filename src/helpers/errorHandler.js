const errorHandler = (err) => {
  let errMsg = '';
  switch (err) {
    case 409:
      errMsg = 'Email уже зарегестрирован'
      break
    case 500:
      errMsg = 'Не сервере произошла ошибка'
      break
    case 401:
      errMsg = 'Ошибка авторизации'
      break
    case 404:
      errMsg = 'Ресурс не найден'
      break
    case 403:
      errMsg = 'Отказано в доступе'
      break
    case 400:
      errMsg = 'Не верный Email или пароль'
  }
  return errMsg;
}

export default errorHandler;
