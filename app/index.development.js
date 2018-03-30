import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './configure_store';
import HotRoot from './hot_root';

ReactDOM.render(
  <Provider store={store}>
    <HotRoot />
  </Provider>,
  document.querySelector('#root'),
);
