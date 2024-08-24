import { isAnyOf } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import apiSlice from '#store/apiSlice';
import i18next from '#i18n';

const { t } = i18next;

const isRejectedQuery = isAnyOf(
  apiSlice.endpoints.getChannels.matchRejected,
  apiSlice.endpoints.getMessages.matchRejected,
);

const showQueryError = () => (next) => (action) => {
  if (isRejectedQuery(action)) {
    const { payload } = action;
    const statusCode = payload.originalStatus || payload.status;
    const message = t([`errors.${statusCode}`, 'errors.default']);
    toast.error(message);
  }
  return next(action);
};

export default showQueryError;
