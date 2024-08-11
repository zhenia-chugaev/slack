const errorMessages = {
  401: 'Неверный никнейм и/или пароль',
  409: 'Такой пользователь уже существует',
};

const mapStatusCodeToMessage = (statusCode) => {
  const defaultMessage = 'Произошла ошибка. Попробуйте снова';
  return errorMessages[statusCode] || defaultMessage;
};

export default mapStatusCodeToMessage;
