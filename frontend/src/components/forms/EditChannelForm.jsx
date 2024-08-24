import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useGetChannelsQuery, useEditChannelMutation } from '#store/apiSlice';

const EditChannelForm = ({ channel, onSuccess, onReset }) => {
  const { data: channels } = useGetChannelsQuery();
  const [editChannel] = useEditChannelMutation();
  const { t } = useTranslation();
  const inputFieldRef = useRef();

  useEffect(() => inputFieldRef.current.select(), []);

  const initialValues = {
    name: channel.name,
  };

  const existingChannelNames = useMemo(
    () => channels.map(({ name }) => name),
    [channels],
  );

  const validationSchema = object({
    name: string()
      .trim()
      .required('forms.editChannel.fields.name.errors.required')
      .min(3, 'forms.editChannel.fields.name.errors.min')
      .max(20, 'forms.editChannel.fields.name.errors.max')
      .notOneOf(existingChannelNames, 'forms.editChannel.fields.name.errors.notUnique'),
  });

  const onSubmit = async (changes) => {
    try {
      const result = await editChannel({ id: channel.id, changes }).unwrap();
      onSuccess(result);
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
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <FormikForm onReset={onReset} noValidate>
          <Form.Group className="mb-2" controlId="channelName">
            <Form.Label className="visually-hidden">
              {t('forms.editChannel.fields.name.label')}
            </Form.Label>
            <Form.Control
              as={Field}
              className="mb-1"
              type="text"
              name="name"
              isInvalid={touched.name && errors.name}
              innerRef={inputFieldRef}
              autoFocus
            />
            <Form.Control.Feedback className="mt-0" type="invalid">
              <ErrorMessage name="name">
                {(key) => <p className="m-0">{t(key)}</p>}
              </ErrorMessage>
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex gap-2 justify-content-end">
            <Button type="reset" variant="secondary">
              {t('forms.editChannel.reset')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {t('forms.editChannel.submit')}
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default EditChannelForm;
