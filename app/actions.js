export const constants = {
  SET_GROUP_ID: 'buzzn_display/SET_GROUP_ID',
  SET_URL_GROUP_ID: 'buzzn_display/SET_URL_GROUP_ID',
  SET_GROUPS: 'buzzn_display/SET_GROUPS',
  SET_GROUP: 'buzzn_display/SET_GROUP',
  SET_CHARTS: 'buzzn_display/SET_CHARTS',
};

export const actions = {
  setGroupId: (groupId) => ({ type: constants.SET_GROUP_ID, groupId }),
  setUrlGroupId: (urlGroupId) => ({ type: constants.SET_URL_GROUP_ID, urlGroupId }),
  setGroups: (groups) => ({ type: constants.SET_GROUPS, groups }),
  setGroup: (group) => ({ type: constants.SET_GROUP, group }),
  setCharts: charts => ({ type: constants.SET_CHARTS, charts }),
};
