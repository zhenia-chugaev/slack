import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useLoginMutation } from '#store/apiSlice';
import { routes, storage } from '#constants';

const errorMessages = {
  401: 'Неверный никнейм и/или пароль',
};

const mapStatusCodeToMessage = (statusCode) => {
  const defaultMessage = 'Произошла ошибка. Попробуйте снова';
  return errorMessages[statusCode] || defaultMessage;
};

const LoginForm = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = object({
    username: string()
      .trim()
      .required("Поле 'никнейм' является обязательным"),
    password: string()
      .trim()
      .required("Поле 'пароль' является обязательным"),
  });

  const onSubmit = async (credentials, { setStatus }) => {
    try {
      const data = await login(credentials).unwrap();
      localStorage.setItem(storage.auth(), JSON.stringify(data));
      navigate(routes.root());
    } catch (err) {
      const code = err.originalStatus || err.status;
      setStatus({ code });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{}}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, status }) => (
        <FormikForm className="d-grid gap-2" noValidate>
          <FloatingLabel controlId="username" label="Ваш ник">
            <Form.Control
              as={Field}
              type="text"
              name="username"
              placeholder="bob"
              isInvalid={touched.username && errors.username}
              autoFocus
            />
          </FloatingLabel>
          <FloatingLabel controlId="password" label="Пароль">
            <Form.Control
              as={Field}
              type="password"
              name="password"
              placeholder="pass"
              isInvalid={touched.password && errors.password}
            />
          </FloatingLabel>
          <Button type="submit" variant="outline-primary" size="lg" disabled={isSubmitting}>
            Войти
          </Button>
          <div className="position-relative">
            <div className="position-absolute small text-danger">
              {status.code && (
                <p className="m-0">{mapStatusCodeToMessage(status.code)}</p>
              )}
              {Object.keys(errors).map((name) => (
                <ErrorMessage className="m-0" component="p" name={name} key={name} />
              ))}
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default LoginForm;
