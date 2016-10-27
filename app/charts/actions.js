export const constants = {
  SET_GROUP: 'buzzn_charts/SET_GROUP',
  SET_IDS: 'buzzn_charts/SET_IDS',
  SET_DATA: 'buzzn_charts/SET_DATA',
};

export const actions = {
  setGroup: group => ({ type: constants.SET_GROUP, group }),
  setIds: ids => ({ type: constants.SET_IDS, ids }),
  setData: data => ({ type: constants.SET_DATA, data }),
};
