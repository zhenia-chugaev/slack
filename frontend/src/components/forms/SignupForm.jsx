import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useSignupMutation } from '#store/apiSlice';
import { mapStatusCodeToMessage } from '#utils';
import { routes, storage } from '#constants';

const SignupForm = () => {
  const [signup, { error }] = useSignupMutation();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
    passwordCheck: '',
  };

  const validationSchema = object({
    username: string()
      .trim()
      .required("Поле 'никнейм' является обязательным")
      .min(3, "'Никнейм': от 3 до 20 символов")
      .max(20, "'Никнейм': от 3 до 20 символов"),
    password: string()
      .trim()
      .required("Поле 'пароль' является обязательным")
      .min(6, "'Пароль': не менее 6 символов"),
    passwordCheck: string()
      .trim()
      .test({
        test: (value, { parent }) => value === parent.password,
        message: 'Пароли должны совпадать',
      }),
  });

  const onSubmit = async ({ passwordCheck, ...credentials }) => {
    const data = await signup(credentials).unwrap();
    localStorage.setItem(storage.auth(), JSON.stringify(data));
    navigate(routes.root());
  };

  const statusCode = error?.originalStatus || error?.status;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <FormikForm className="d-grid gap-2" noValidate>
          <FloatingLabel controlId="username" label="Имя пользователя">
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
          <FloatingLabel controlId="passwordCheck" label="Подтвердите пароль">
            <Form.Control
              as={Field}
              type="password"
              name="passwordCheck"
              placeholder="pass"
              isInvalid={touched.passwordCheck && errors.passwordCheck}
            />
          </FloatingLabel>
          <Button type="submit" variant="outline-primary" size="lg" disabled={isSubmitting}>
            Зарегистрироваться
          </Button>
          <div className="position-relative pb-5">
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

export default SignupForm;
