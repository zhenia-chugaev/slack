import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useGetMessagesQuery } from '../store/apiSlice';

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

  const { messages } = useGetMessagesQuery(null, {
    selectFromResult: (result) => ({
      ...result,
      messages: selectMessagesByChannel(result, channel.id),
    }),
  });

  const messagesCount = `${messages.length} ${getMessagesNoun(messages.length)}`;

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
        <Form className="py-3 px-5">
          <Form.Group controlId="message">
            <Form.Label className="visually-hidden">Новое сообщение</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                name="message"
                placeholder="Введите сообщение..."
                autoFocus
              />
              <Button
                className="d-flex align-items-center bg-light"
                type="submit"
                variant="outline-secondary"
                disabled
              >
                <ArrowRightSquare color="black" size={20} />
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
