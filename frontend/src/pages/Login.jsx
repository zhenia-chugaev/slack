import { Formik, Form, Field } from 'formik';

const Login = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => console.log(values);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Field type="text" name="username" required />
        <Field type="password" name="password" required />
        <button type="submit">Войти</button>
      </Form>
    </Formik>
  );
};

export default Login;
