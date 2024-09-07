import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider } from '@rollbar/react';
import Rollbar from 'rollbar';
import store from '#store';
import i18next from './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.NODE_ENV,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const rollbar = new Rollbar(rollbarConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RollbarProvider instance={rollbar}>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </Provider>
    </RollbarProvider>
  </React.StrictMode>,
);

reportWebVitals(rollbar.info.bind(rollbar, 'Web Vitals'));
