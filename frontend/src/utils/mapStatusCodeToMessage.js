const errorMessages = {
  401: 'Неверный никнейм и/или пароль',
};

const mapStatusCodeToMessage = (statusCode) => {
  const defaultMessage = 'Произошла ошибка. Попробуйте снова';
  return errorMessages[statusCode] || defaultMessage;
};

export default mapStatusCodeToMessage;
