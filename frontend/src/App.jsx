import {
  BrowserRouter, Routes, Route, Link, Navigate, Outlet,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { selectAuthData, clearAuthData } from './store/authSlice';
import { Main, Login, NotFound } from './pages';
import { routes, storage } from './constants';

const Private = () => {
  const { token } = useSelector(selectAuthData);
  return token ? <Outlet /> : <Navigate to={routes.login()} />;
};

const App = () => {
  const { token } = useSelector(selectAuthData);
  const dispatch = useDispatch();

  const logOut = () => {
    localStorage.removeItem(storage.auth());
    dispatch(clearAuthData());
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <header className="z-1 shadow-sm">
          <Container>
            <Navbar>
              <Navbar.Brand as={Link} to={routes.root()}>Slack</Navbar.Brand>
              {token && <Button className="ms-auto" onClick={logOut}>Выйти</Button>}
            </Navbar>
          </Container>
        </header>
        <main className="flex-grow-1 bg-light">
          <Container className="h-100">
            <Routes>
              <Route element={<Private />}>
                <Route path={routes.root()} element={<Main />} />
              </Route>
              <Route path={routes.login()} element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
