import { combineReducers } from 'redux';
import Bubbles from '@buzzn/module_bubbles';
import config from './config';
import { constants } from './actions';

export function configReducer(state = config) {
  return state;
}

export const initialState = {
  loading: true,
  group: {},
  charts: { in: [], out: [], scores: {} },
  ui: { display: 'computer' },
};

export function uiReducer(state, action) {
  switch (action.type) {
    case constants.SET_UI:
      return { ...state, ...action.ui };

    default:
      return state;
  }
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_GROUP_ID:
      return { ...state, groupId: action.groupId };
    case constants.SET_URL_GROUP_ID:
      return { ...state, urlGroupId: action.urlGroupId };
    case constants.SET_GROUP:
      return { ...state, group: action.group };
    case constants.LOADING_GROUP:
      return { ...state, loading: true };
    case constants.LOADED_GROUP:
      return { ...state, loading: false };
    case constants.SET_CHARTS:
      return { ...state, charts: action.charts };

    case constants.SET_UI:
      return { ...state, ui: uiReducer(state.ui, action) };

    default:
      return state;
  }
}

export default combineReducers({
  config: configReducer,
  app: appReducer,
  bubbles: Bubbles.reducers,
});
