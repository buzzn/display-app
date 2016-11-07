import { constants } from './actions';

const initialState = {
  group: '',
  inIds: [],
  outIds: [],
  resolution: constants.RESOLUTIONS.DAY_MINUTE,
  timestamp: new Date(),
  inData: [],
  outData: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_GROUP:
      return { ...state, group: action.group };
    case constants.SET_IDS:
      return { ...state, ...action.ids };
    case constants.SET_DATA:
      return { ...state, ...action.data };
    case constants.SET_RESOLUTION:
      return { ...state, resolution: action.resolution };
    case constants.SET_TIMESTAMP:
      return { ...state, timestamp: action.timestamp };
    case constants.LOADING:
      return { ...state, loading: true };
    case constants.LOADED:
      return { ...state, loading: false };
    case constants.CHART_UPDATE:
    default:
      return state;
  }
};
