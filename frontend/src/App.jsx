import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Main, Login, NotFound } from './pages';
import { routes } from './constants';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column vh-100">
      <header className="z-1 shadow-sm">
        <Container>
          <Navbar>
            <Navbar.Brand as={Link} to={routes.root()}>Slack</Navbar.Brand>
          </Navbar>
        </Container>
      </header>
      <main className="flex-grow-1 bg-light">
        <Container className="h-100">
          <Routes>
            <Route path={routes.root()} element={<Main />} />
            <Route path={routes.login()} element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </div>
  </BrowserRouter>
);

export default App;
