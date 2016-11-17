import createSagaMiddleware from 'redux-saga';
import { call } from 'redux-saga/effects';
import appSaga from './sagas';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Bubbles from './bubbles';
import RootReducer from './reducers';

function* rootSaga() {
  yield [call(Bubbles.sagas), call(appSaga)];
}

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(RootReducer,
    {},
    compose(applyMiddleware(sagaMiddleware, thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));

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
