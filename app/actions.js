export const constants = {
  SET_GROUP: 'SET_GROUP',
  SET_URL_GROUP: 'SET_URL_GROUP',
};

export const actions = {
  setGroup: (group) => ({ type: constants.SET_GROUP, group }),
  setUrlGroup: (group) => ({ type: constants.SET_URL_GROUP, group }),
};
