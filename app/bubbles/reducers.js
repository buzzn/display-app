import { constants } from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case constants.SET_GROUP:
      return { ...state, group: action.group };
    default:
      return state;
  }
};
