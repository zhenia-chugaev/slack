import { ErrorBoundary as RollbarErrorBoundary } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { EmojiDizzy } from 'react-bootstrap-icons';

const FallbackUI = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <EmojiDizzy className="mb-2 text-danger" size={55} />
      <p className="fs-4 fw-light">
        {t('warnings.general')}
      </p>
      <Button href="/" variant="outline-secondary">
        {t('buttons.goHome')}
      </Button>
    </div>
  );
};

const ErrorBoundary = ({ children }) => (
  <RollbarErrorBoundary fallbackUI={FallbackUI}>
    {children}
  </RollbarErrorBoundary>
);

export default ErrorBoundary;
