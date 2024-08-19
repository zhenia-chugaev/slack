import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useGetChannelsQuery, useAddChannelMutation } from '#store/apiSlice';

const AddChannelForm = ({ onSuccess, onReset }) => {
  const { data: channels } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();

  const initialValues = {
    name: '',
  };

  const existingChannelNames = useMemo(
    () => channels.map(({ name }) => name),
    [channels],
  );

  const validationSchema = object({
    name: string()
      .trim()
      .required('forms.addChannel.fields.name.errors.required')
      .min(3, 'forms.addChannel.fields.name.errors.min')
      .max(20, 'forms.addChannel.fields.name.errors.max')
      .notOneOf(existingChannelNames, 'forms.addChannel.fields.name.errors.notUnique'),
  });

  const onSubmit = async (channel, { setStatus }) => {
    try {
      const result = await addChannel(channel).unwrap();
      onSuccess(result);
    } catch (err) {
      const code = err.originalStatus || err.status;
      setStatus({ code });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{}}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, status }) => (
        <FormikForm onReset={onReset} noValidate>
          <Form.Group className="mb-2" controlId="channelName">
            <Form.Label className="visually-hidden">
              {t('forms.addChannel.fields.name.label')}
            </Form.Label>
            <Form.Control
              as={Field}
              className="mb-1"
              type="text"
              name="name"
              isInvalid={touched.name && errors.name}
              autoFocus
            />
            <Form.Control.Feedback className="mt-0" type="invalid">
              <ErrorMessage name="name">
                {(key) => <p className="m-0">{t(key)}</p>}
              </ErrorMessage>
            </Form.Control.Feedback>
            {status.code && (
              <div className="small text-danger">
                <p className="m-0">{t([`errors.${status.code}`, 'errors.default'])}</p>
              </div>
            )}
          </Form.Group>
          <div className="d-flex gap-2 justify-content-end">
            <Button type="reset" variant="secondary">
              {t('forms.addChannel.reset')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {t('forms.addChannel.submit')}
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default AddChannelForm;
