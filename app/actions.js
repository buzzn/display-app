export const constants = {
  SET_GROUP_ID: 'buzzn_display/SET_GROUP_ID',
  SET_URL_GROUP_ID: 'buzzn_display/SET_URL_GROUP_ID',
  SET_GROUPS: 'buzzn_display/SET_GROUPS',
  SET_GROUP: 'buzzn_display/SET_GROUP',
  LOADING_GROUP: 'buzzn_display/LOADING_GROUP',
  LOADED_GROUP: 'buzzn_display/LOADED_GROUP',
  SET_CHARTS: 'buzzn_display/SET_CHARTS',
  CANCEL: 'buzzn_display/CANCEL',

  SET_UI: 'buzzn_display/SET_UI',
};

export const actions = {
  setGroupId: groupId => ({ type: constants.SET_GROUP_ID, groupId }),
  setUrlGroupId: urlGroupId => ({ type: constants.SET_URL_GROUP_ID, urlGroupId }),
  setGroups: groups => ({ type: constants.SET_GROUPS, groups }),
  setGroup: group => ({ type: constants.SET_GROUP, group }),
  loadingGroup: () => ({ type: constants.LOADING_GROUP }),
  loadedGroup: () => ({ type: constants.LOADED_GROUP }),
  setCharts: charts => ({ type: constants.SET_CHARTS, charts }),
  cancel: () => ({ type: constants.CANCEL }),

  setUI: ui => ({ type: constants.SET_UI, ui }),
};
