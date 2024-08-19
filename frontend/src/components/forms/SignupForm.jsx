import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useSignupMutation } from '#store/apiSlice';
import { routes, storage } from '#constants';

const SignupForm = () => {
  const [signup, { error }] = useSignupMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues = {
    username: '',
    password: '',
    passwordCheck: '',
  };

  const validationSchema = object({
    username: string()
      .trim()
      .required('forms.signUp.fields.name.errors.required')
      .min(3, 'forms.signUp.fields.name.errors.min')
      .max(20, 'forms.signUp.fields.name.errors.max'),
    password: string()
      .trim()
      .required('forms.signUp.fields.pass.errors.required')
      .min(6, 'forms.signUp.fields.pass.errors.min'),
    passwordCheck: string()
      .trim()
      .test({
        test: (value, { parent }) => value === parent.password,
        message: 'forms.signUp.fields.passCheck.errors.notEqual',
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
          <FloatingLabel controlId="username" label={t('forms.signUp.fields.name.label')}>
            <Form.Control
              as={Field}
              type="text"
              name="username"
              placeholder="bob"
              isInvalid={touched.username && errors.username}
              autoFocus
            />
          </FloatingLabel>
          <FloatingLabel controlId="password" label={t('forms.signUp.fields.pass.label')}>
            <Form.Control
              as={Field}
              type="password"
              name="password"
              placeholder="pass"
              isInvalid={touched.password && errors.password}
            />
          </FloatingLabel>
          <FloatingLabel controlId="passwordCheck" label={t('forms.signUp.fields.passCheck.label')}>
            <Form.Control
              as={Field}
              type="password"
              name="passwordCheck"
              placeholder="pass"
              isInvalid={touched.passwordCheck && errors.passwordCheck}
            />
          </FloatingLabel>
          <Button type="submit" variant="outline-primary" size="lg" disabled={isSubmitting}>
            {t('forms.signUp.submit')}
          </Button>
          <div className="position-relative pb-5">
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

export default SignupForm;
