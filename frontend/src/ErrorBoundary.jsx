import React from 'react';
import { withTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { EmojiDizzy } from 'react-bootstrap-icons';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  static getFallbackUi(t) {
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
  }

  render() {
    const { children, t } = this.props;
    const { hasError } = this.state;
    const { getFallbackUi } = this.constructor;
    return hasError ? getFallbackUi(t) : children;
  }
}

export default withTranslation()(ErrorBoundary);
