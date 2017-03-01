import { combineReducers } from 'redux';
import Bubbles from '@buzzn/module_bubbles';
import Charts from '@buzzn/module_charts';
import config from './config';
import { constants } from './actions';

export function configReducer(state = config) {
  return state;
}

export function appReducer(state = {}, action) {
  switch (action.type) {
    case constants.SET_GROUP_ID:
      return { ...state, groupId: action.groupId };
    case constants.SET_URL_GROUP_ID:
      return { ...state, urlGroupId: action.urlGroupId };
    case constants.SET_GROUPS:
      return { ...state, groups: action.groups };
    case constants.SET_GROUP:
      return { ...state, group: action.group };
    default:
      return state;
  }
}

export default combineReducers({
  config: configReducer,
  app: appReducer,
  bubbles: Bubbles.reducers,
  charts: Charts.reducers,
});
