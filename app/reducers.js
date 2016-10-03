import { combineReducers } from 'redux';
import Bubbles from './bubbles';
import Charts from './charts';
import config from './config';
import { reducer as api } from 'redux-json-api';
import { constants } from './actions';

function configReducer(state = config) {
  return state;
}

function appReducer(state = {}, action) {
  switch (action.type) {
    case constants.SET_GROUP:
      return { ...state, group: action.group };
    default:
      return state;
  }
}

export default combineReducers({
  config: configReducer,
  api,
  app: appReducer,
  bubbles: Bubbles.reducers,
  charts: Charts.reducers,
});
