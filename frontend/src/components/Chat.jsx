import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Formik, Form as FormikForm, Field } from 'formik';
import { object, string } from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useGetMessagesQuery, useAddMessageMutation } from '#store/apiSlice';
import { selectAuthData } from '#store/authSlice';
import { mapStatusCodeToMessage } from '#utils';

const getMessagesNoun = (count) => {
  switch (![11, 12, 13, 14].includes(count % 100) && count % 10) {
    case 1:
      return 'сообщение';
    case 2:
    case 3:
    case 4:
      return 'сообщения';
    default:
      return 'сообщений';
  }
};

const Chat = ({ channel }) => {
  const selectMessagesByChannel = useMemo(() => createSelector(
    (result) => result.data,
    (messages, channelId) => channelId,
    (messages, channelId) => messages?.filter((msg) => msg.channelId === channelId) || [],
  ), []);

  const { messages } = useGetMessagesQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      messages: selectMessagesByChannel(result, channel.id),
    }),
  });

  const messagesCount = `${messages.length} ${getMessagesNoun(messages.length)}`;

  const [addMessage] = useAddMessageMutation();
  const { username } = useSelector(selectAuthData);

  const initialValues = {
    message: '',
  };

  const validationSchema = object({
    message: string().trim().required(),
  });

  const onSubmit = async (values, { resetForm, setStatus }) => {
    try {
      await addMessage({ body: values.message, channelId: channel.id, username }).unwrap();
      resetForm();
    } catch (err) {
      const code = err.originalStatus || err.status;
      setStatus({ code });
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="p-3 bg-light border-bottom">
        <h3 className="m-0 small fw-bold">{`# ${channel.name}`}</h3>
        <span className="small text-muted">{messagesCount}</span>
      </div>
      <div className="flex-grow-1 d-flex flex-column pt-3 overflow-y-hidden">
        <div className="flex-grow-1 ps-5 overflow-y-auto">
          {messages.map((msg) => (
            <blockquote className="mb-2" key={msg.id}>
              <cite className="fw-bold fst-normal">{msg.username}</cite>
              {': '}
              <p className="d-inline m-0">{msg.body}</p>
            </blockquote>
          ))}
        </div>
        <Formik
          initialValues={initialValues}
          initialStatus={{}}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ dirty, isValid, isSubmitting, status }) => (
            <FormikForm className="py-3 px-5">
              <Form.Group controlId="message">
                <Form.Label className="visually-hidden">Новое сообщение</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    as={Field}
                    type="text"
                    name="message"
                    placeholder="Введите сообщение..."
                    autoFocus
                  />
                  <Button
                    className="d-flex align-items-center bg-light"
                    type="submit"
                    variant="outline-secondary"
                    disabled={!dirty || !isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner
                        as="span"
                        animation="border"
                        variant="secondary"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      >
                        <span className="visually-hidden">Загрузка...</span>
                      </Spinner>
                    ) : <ArrowRightSquare color="black" size={20} />}
                  </Button>
                </InputGroup>
                {status.code && (
                  <div className="position-relative">
                    <div className="position-absolute small text-danger">
                      <p className="m-0">{mapStatusCodeToMessage(status.code)}</p>
                    </div>
                  </div>
                )}
              </Form.Group>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Chat;
