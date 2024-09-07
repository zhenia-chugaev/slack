import { useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery } from '#store/apiSlice';
import { NewMessageForm } from '#components/forms';

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

  const { t } = useTranslation();

  const messagesCount = t('messages.count', { count: messages.length });

  return (
    <div className="d-flex flex-column h-100">
      <div className="p-3 bg-light border-bottom">
        <h3 className="m-0 small fw-bold">{`# ${channel.name}`}</h3>
        <span className="small text-muted">{messagesCount}</span>
      </div>
      <div className="flex-grow-1 d-flex flex-column pt-3 pb-2 overflow-y-hidden">
        <div className="flex-grow-1 px-5 overflow-y-auto">
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
