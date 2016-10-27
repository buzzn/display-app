import { constants } from './actions';

export default (state = { group: '', inIds: [], outIds: [], inData: [], outData: [] }, action) => {
  switch (action.type) {
    case constants.SET_GROUP:
      return { ...state, group: action.group };
    case constants.SET_IDS:
      return { ...state, ...action.ids };
    case constants.SET_DATA:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
