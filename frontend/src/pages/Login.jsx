import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field } from 'formik';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { routes, storage } from '../constants';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (credentials) => {
    const { data } = await axios.post('/api/v1/login', credentials);
    localStorage.setItem(storage.auth(), JSON.stringify(data));
    navigate(routes.root());
  };

  return (
    <Row className="h-100 justify-content-center align-content-center">
      <Col as="section" className="border border-secondary-subtle rounded-2 shadow-sm bg-white" lg={6}>
        <Row className="gap-3 align-items-center">
          <Col className="p-5 pe-0" lg={5}>
            <Image src="/assets/logo.png" roundedCircle fluid />
          </Col>
          <Col className="p-5">
            <h2 className="mb-3 h1 text-center">Войти</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <FormikForm className="d-grid gap-2">
                <FloatingLabel controlId="username" label="Ваш ник">
                  <Form.Control
                    as={Field}
                    type="text"
                    name="username"
                    placeholder="bob"
                    autoFocus
                    required
                  />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Пароль">
                  <Form.Control
                    as={Field}
                    type="password"
                    name="password"
                    placeholder="pass"
                    required
                  />
                </FloatingLabel>
                <Button type="submit" variant="outline-primary" size="lg">Войти</Button>
              </FormikForm>
            </Formik>
          </Col>
          <Col className="border-top border-secondary-subtle bg-secondary bg-opacity-10" lg={12}>
            <div className="p-4">
              <p className="m-0 text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to={routes.signup()}>Регистрация</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
