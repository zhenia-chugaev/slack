import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm, Field } from 'formik';
import { object, string } from 'yup';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useAddMessageMutation } from '#store/apiSlice';
import { selectAuthData } from '#store/authSlice';
import { filter } from '#helpers';

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
  const [addMessage] = useAddMessageMutation();
  const { username } = useSelector(selectAuthData);
  const { t } = useTranslation();

  const initialValues = {
    message: '',
  };

  const validationSchema = object({
    message: string().trim().required(),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const message = { channelId, username, body: filter.clean(values.message) };
      await addMessage(message).unwrap();
      resetForm();
    } catch (err) {
      const code = err.originalStatus || err.status;
      const message = t([`errors.${code}`, 'errors.default']);
      toast.error(message);
    }
  };

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
                <span className="visually-hidden">{t('forms.chat.submit')}</span>
                {isSubmitting ? <LoadingIndicator /> : <ArrowRightSquare color="black" size={20} />}
              </Button>
            </InputGroup>
          </Form.Group>
        </FormikForm>
      )}
    </Formik>
  );
};

export default NewMessageForm;
