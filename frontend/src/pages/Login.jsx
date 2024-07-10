import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { selectAuthData } from '../store/authSlice';
import { LoginForm } from '../components';
import { routes } from '../constants';

const Login = () => {
  const { token } = useSelector(selectAuthData);

  return token ? (
    <Navigate to={routes.root()} />
  ) : (
    <Row className="h-100 justify-content-center align-content-center">
      <Col as="section" className="border border-secondary-subtle rounded-2 shadow-sm bg-white" lg={6}>
        <Row className="gap-3 align-items-center">
          <Col className="p-5 pe-0" lg={5}>
            <Image src="/assets/logo.png" roundedCircle fluid />
          </Col>
          <Col className="p-5">
            <h2 className="mb-3 h1 text-center">Войти</h2>
            <LoginForm />
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
