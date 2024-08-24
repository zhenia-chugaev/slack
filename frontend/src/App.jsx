import {
  BrowserRouter, Routes, Route, Link, Navigate, Outlet,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { selectAuthData, clearAuthData } from '#store/authSlice';
import { Main, Login, Signup, NotFound } from '#pages';
import { ToastBox } from '#components';
import { routes, storage } from '#constants';
import ErrorBoundary from './ErrorBoundary';

const Private = ({ token }) => (token ? <Outlet /> : <Navigate to={routes.login()} />);
const Protected = ({ token }) => (token ? <Navigate to={routes.root()} /> : <Outlet />);

const App = () => {
  const { token } = useSelector(selectAuthData);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const logOut = () => {
    localStorage.removeItem(storage.auth());
    dispatch(clearAuthData());
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="d-flex flex-column vh-100">
          <header className="z-1 shadow-sm">
            <Container>
              <Navbar>
                <Navbar.Brand as={Link} to={routes.root()}>
                  <h1 style={{ all: 'unset' }}>{t('brandName')}</h1>
                </Navbar.Brand>
                {token && (
                  <Button className="ms-auto" onClick={logOut}>
                    {t('buttons.logOut')}
                  </Button>
                )}
              </Navbar>
            </Container>
          </header>
          <main className="flex-grow-1 bg-light overflow-y-hidden">
            <Container className="h-100">
              <ErrorBoundary>
                <Routes>
                  <Route element={<Private token={token} />}>
                    <Route path={routes.root()} element={<Main />} />
                  </Route>

                  <Route element={<Protected token={token} />}>
                    <Route path={routes.login()} element={<Login />} />
                    <Route path={routes.signup()} element={<Signup />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </Container>
          </main>
          <ToastBox />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
