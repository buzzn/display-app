import { constants } from './actions';

export default (state = { summedData: {} }, action) => {
  switch (action.type) {
    case constants.SET_GROUP:
      return { ...state, group: action.group };
    case constants.SET_DATA:
      return { ...state, summedData: action.data };
    default:
      return state;
  }
};
