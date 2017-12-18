import { combineReducers } from 'redux';
import Bubbles from '@buzzn/module_bubbles';
import config from './config';
import { constants } from './actions';

export function configReducer(state = config) {
  return state;
}

export function appReducer(state = { group: {}, charts: { in: [], out: [], scores: {} } }, action) {
  switch (action.type) {
    case constants.SET_GROUP_ID:
      return { ...state, groupId: action.groupId };
    case constants.SET_URL_GROUP_ID:
      return { ...state, urlGroupId: action.urlGroupId };
    case constants.SET_GROUP:
      return { ...state, group: action.group };
    case constants.SET_CHARTS:
      return { ...state, charts: action.charts };
    default:
      return state;
  }
}

export default combineReducers({
  config: configReducer,
  app: appReducer,
  bubbles: Bubbles.reducers,
});
