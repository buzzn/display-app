export const constants = {
  SET_GROUP_ID: 'SET_GROUP_ID',
  SET_URL_GROUP_ID: 'SET_URL_GROUP_ID',
  SET_GROUPS: 'SET_GROUPS',
  SET_GROUP: 'SET_GROUP',
};

export const actions = {
  setGroupId: (groupId) => ({ type: constants.SET_GROUP_ID, groupId }),
  setUrlGroupId: (urlGroupId) => ({ type: constants.SET_URL_GROUP_ID, urlGroupId }),
  setGroups: (groups) => ({ type: constants.SET_GROUPS, groups }),
  setGroup: (group) => ({ type: constants.SET_GROUP, group }),
};
