import 'url-polyfill';
import 'whatwg-fetch';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Bubbles from '@buzzn/module_bubbles';
import appSaga from './sagas';
import RootReducer from './reducers';
import { logException } from './_util';

function* rootSaga() {
  yield all([call(Bubbles.sagas, logException), call(appSaga)]);
}

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(RootReducer,
    {},
    compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = configureStore();

export default store;
