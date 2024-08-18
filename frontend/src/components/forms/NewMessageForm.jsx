import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm, Field } from 'formik';
import { object, string } from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useAddMessageMutation } from '#store/apiSlice';
import { selectAuthData } from '#store/authSlice';

const LoadingIndicator = () => {
  const { t } = useTranslation();
  return (
    <Spinner
      as="span"
      animation="border"
      variant="secondary"
      size="sm"
      role="status"
      aria-hidden="true"
    >
      <span className="visually-hidden">{t('statuses.loading')}</span>
    </Spinner>
  );
};

const NewMessageForm = ({ channelId }) => {
  const [addMessage, { error }] = useAddMessageMutation();
  const { username } = useSelector(selectAuthData);
  const { t } = useTranslation();

  const initialValues = {
    message: '',
  };

  const validationSchema = object({
    message: string().trim().required(),
  });

  const onSubmit = async (values, { resetForm }) => {
    await addMessage({ channelId, username, body: values.message }).unwrap();
    resetForm();
  };

  const statusCode = error?.originalStatus || error?.status;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ dirty, isValid, isSubmitting }) => (
        <FormikForm className="py-3 px-5">
          <Form.Group controlId="message">
            <Form.Label className="visually-hidden">
              {t('forms.chat.fields.msg.label')}
            </Form.Label>
            <InputGroup className="mb-2">
              <Form.Control
                as={Field}
                type="text"
                name="message"
                placeholder={t('forms.chat.fields.msg.label')}
                autoComplete="off"
                autoFocus
              />
              <Button
                className="d-flex align-items-center bg-light"
                type="submit"
                variant="outline-secondary"
                disabled={!dirty || !isValid || isSubmitting}
              >
                {isSubmitting ? <LoadingIndicator /> : <ArrowRightSquare color="black" size={20} />}
              </Button>
            </InputGroup>
            {statusCode && (
              <div className="position-relative">
                <div className="position-absolute small text-danger">
                  <p className="m-0">{t([`errors.${statusCode}`, 'errors.default'])}</p>
                </div>
              </div>
            )}
          </Form.Group>
        </FormikForm>
      )}
    </Formik>
  );
};

export default NewMessageForm;
