import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { XCircleFill } from 'react-bootstrap-icons';

const NotFound = () => (
  <div className="d-flex flex-column align-items-center justify-content-center h-100">
    <XCircleFill className="mb-2 text-danger" size={55} />
    <p className="fs-4 fw-light">Такой страницы не существует</p>
    <Button as={Link} to={-1} variant="outline-secondary">Назад</Button>
  </div>
);

export default NotFound;
