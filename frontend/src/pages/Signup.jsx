import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { SignupForm } from '#components/forms';

const Signup = () => {
  const { t } = useTranslation();

  return (
    <Row className="h-100 justify-content-center align-content-center">
      <Col as="section" className="border border-secondary-subtle rounded-2 shadow-sm bg-white" lg={6}>
        <Row className="gap-3 align-items-center">
          <Col className="p-5 pe-0" lg={5}>
            <Image src="/assets/logo.png" roundedCircle fluid />
          </Col>
          <Col className="p-5">
            <h2 className="mb-3 h1 text-center">{t('forms.signUp.title')}</h2>
            <SignupForm />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Signup;
