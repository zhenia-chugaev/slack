import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { XCircleFill } from 'react-bootstrap-icons';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <XCircleFill className="mb-2 text-danger" size={55} />
      <p className="fs-4 fw-light">
        {t('warnings.doesNotExist')}
      </p>
      <Button as={Link} to={-1} variant="outline-secondary">
        {t('buttons.goBack')}
      </Button>
    </div>
  );
};

export default NotFound;
