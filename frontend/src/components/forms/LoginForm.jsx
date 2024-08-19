import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useLoginMutation } from '#store/apiSlice';
import { routes, storage } from '#constants';

const LoginForm = () => {
  const [login, { error }] = useLoginMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = object({
    username: string()
      .trim()
      .required('forms.logIn.fields.name.errors.required'),
    password: string()
      .trim()
      .required('forms.logIn.fields.pass.errors.required'),
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
          <FloatingLabel controlId="username" label={t('forms.logIn.fields.name.label')}>
            <Form.Control
              as={Field}
              type="text"
              name="username"
              placeholder="bob"
              isInvalid={touched.username && errors.username}
              autoFocus
            />
          </FloatingLabel>
          <FloatingLabel controlId="password" label={t('forms.logIn.fields.pass.label')}>
            <Form.Control
              as={Field}
              type="password"
              name="password"
              placeholder="pass"
              isInvalid={touched.password && errors.password}
            />
          </FloatingLabel>
          <Button type="submit" variant="outline-primary" size="lg" disabled={isSubmitting}>
            {t('forms.logIn.submit')}
          </Button>
          <div className="position-relative">
            <div className="position-absolute small text-danger">
              {statusCode && (
                <p className="m-0">{t([`errors.${statusCode}`, 'errors.default'])}</p>
              )}
              {Object.keys(errors).map((name) => (
                <ErrorMessage name={name} key={name}>
                  {(key) => <p className="m-0">{t(key)}</p>}
                </ErrorMessage>
              ))}
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default LoginForm;
