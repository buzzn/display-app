import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import store from './configure_store';
import Root from './root';

Sentry.init({
  dsn: 'https://e30425e068d749a1a3a6a202342ab94d@sentry.io/187521',
  environment: process.env.NODE_ENV,
  // release: new Date(process.env.buildDate).toString(),
});

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector('#root'),
);
