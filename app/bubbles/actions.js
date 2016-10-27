export const constants = {
  BUZZN_STORAGE_PREFIX: 'buzznKioskDemo',
  SET_GROUP: 'buzzn_bubbles/SET_GROUP',
  SET_DATA: 'buzzn_bubbles/SET_DATA',
};

export const actions = {
  setGroup: group => ({ type: constants.SET_GROUP, group }),
  setData: data => ({ type: constants.SET_DATA, data }),
};
