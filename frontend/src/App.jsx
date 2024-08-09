import {
  BrowserRouter, Routes, Route, Link, Navigate, Outlet,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { selectAuthData, clearAuthData } from '#store/authSlice';
import { Main, Login, NotFound } from '#pages';
import { routes, storage } from '#constants';
import ErrorBoundary from './ErrorBoundary';

const Private = ({ token }) => (token ? <Outlet /> : <Navigate to={routes.login()} />);
const Protected = ({ token }) => (token ? <Navigate to={routes.root()} /> : <Outlet />);

const App = () => {
  const { token } = useSelector(selectAuthData);
  const dispatch = useDispatch();

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
                  <h1 style={{ all: 'unset' }}>Slack</h1>
                </Navbar.Brand>
                {token && <Button className="ms-auto" onClick={logOut}>Выйти</Button>}
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
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </Container>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
