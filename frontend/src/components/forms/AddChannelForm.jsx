import { useMemo } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useGetChannelsQuery, useAddChannelMutation } from '#store/apiSlice';
import { mapStatusCodeToMessage } from '#utils';

const AddChannelForm = ({ switchChannel, closeModal }) => {
  const { data: channels } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();

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
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(existingChannelNames, 'Должно быть уникальным'),
  });

  const onSubmit = async (channel, { setStatus }) => {
    try {
      const { id } = await addChannel(channel).unwrap();
      switchChannel(id);
      closeModal();
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
        <FormikForm onReset={closeModal} noValidate>
          <Form.Group className="mb-2" controlId="channelName">
            <Form.Label className="visually-hidden">Channel name</Form.Label>
            <Form.Control
              as={Field}
              className="mb-1"
              type="text"
              name="name"
              isInvalid={touched.name && errors.name}
              autoFocus
            />
            <Form.Control.Feedback className="mt-0" type="invalid">
              <ErrorMessage className="m-0" component="p" name="name" />
            </Form.Control.Feedback>
            {status.code && (
              <div className="small text-danger">
                <p className="m-0">{mapStatusCodeToMessage(status.code)}</p>
              </div>
            )}
          </Form.Group>
          <div className="d-flex gap-2 justify-content-end">
            <Button type="reset" variant="secondary">Отменить</Button>
            <Button type="submit" disabled={isSubmitting}>Отправить</Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default AddChannelForm;
