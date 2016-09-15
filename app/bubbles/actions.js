export const constants = {
  BUZZN_STORAGE_PREFIX: 'buzznKioskDemo',
  SET_GROUP: 'buzzn_bubbles/SET_GROUP',
};

export const actions = {
  setGroup: group => ({ type: constants.SET_GROUP, group }),
};
