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
  mentors: { _status: null, array: [] },
  charts: { in: [], out: [], total: { in: 0, out: 0 } },
  health: {},
  ui: { display: 'computer' },
  widgetScale: 1,
  appVer: null,
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
    case constants.SET_GROUP_MENTORS:
      return { ...state, mentors: action.mentors };
    case constants.SET_GROUP:
      return { ...state, group: action.group };
    case constants.LOADING_GROUP:
      return { ...state, loading: true };
    case constants.LOADED_GROUP:
      return { ...state, loading: false };
    case constants.SET_CHARTS:
      const { production: outData, consumption: inData } = action.charts;
      const charts = {
        in: Object.keys(inData.data)
          .sort()
          .map(ts => ({ timestamp: ts / 1000, value: inData.data[ts] })),
        out: Object.keys(outData.data)
          .sort()
          .map(ts => ({ timestamp: ts / 1000, value: outData.data[ts] })),
        total: { in: inData.total, out: outData.total },
      };
      return { ...state, charts };

    case constants.SET_HEALTH:
      return { ...state, health: action.health };

    case constants.SET_UI:
      return { ...state, ui: uiReducer(state.ui, action) };

    case constants.SET_WIDGET_SCALE:
      return { ...state, widgetScale: action.scale };

    case constants.SET_APP_VER:
      return { ...state, appVer: action.appVer };

    case constants.SET_CUSTOM_TITLE:
      return { ...state, customTitle: action.customTitle };

    default:
      return state;
  }
}

export default combineReducers({
  config: configReducer,
  app: appReducer,
  bubbles: Bubbles.reducers,
});
