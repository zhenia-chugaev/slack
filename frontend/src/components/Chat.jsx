import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useGetMessagesQuery } from '#store/apiSlice';
import { NewMessageForm } from '#components/forms';

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
        <NewMessageForm channelId={channel.id} />
      </div>
    </div>
  );
};

export default Chat;
