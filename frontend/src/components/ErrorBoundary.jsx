import React from 'react';
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

  static getFallbackUi() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <EmojiDizzy className="mb-2 text-danger" size={55} />
        <p className="fs-4 fw-light">Что-то пошло не так...</p>
        <Button href="/" variant="outline-secondary">Вернуться на главную</Button>
      </div>
    );
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    const { getFallbackUi } = this.constructor;
    return hasError ? getFallbackUi() : children;
  }
}

export default ErrorBoundary;
