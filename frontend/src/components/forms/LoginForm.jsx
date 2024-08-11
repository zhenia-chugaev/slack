import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useLoginMutation } from '#store/apiSlice';
import { mapStatusCodeToMessage } from '#utils';
import { routes, storage } from '#constants';

const LoginForm = () => {
  const [login, { error }] = useLoginMutation();
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

  const onSubmit = async (credentials) => {
    const data = await login(credentials).unwrap();
    localStorage.setItem(storage.auth(), JSON.stringify(data));
    navigate(routes.root());
  };

  const statusCode = error?.originalStatus || error?.status;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
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
              {statusCode && (
                <p className="m-0">{mapStatusCodeToMessage(statusCode)}</p>
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
