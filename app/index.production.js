import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configure_store';
import Root from './root';

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector('#root')
);
