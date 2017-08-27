import { actions, constants } from '../actions';

describe('app actions', () => {
  test('should create an action to set groupId', () => {
    const groupId = 'groupId';
    const expectedAction = { type: constants.SET_GROUP_ID, groupId };
    expect(actions.setGroupId(groupId)).toEqual(expectedAction);
  });

  test('should create an action to set groupId from url', () => {
    const urlGroupId = 'groupId';
    const expectedAction = { type: constants.SET_URL_GROUP_ID, urlGroupId };
    expect(actions.setUrlGroupId(urlGroupId)).toEqual(expectedAction);
  });

  test('should create an action to set groups list', () => {
    const groups = ['groupId'];
    const expectedAction = { type: constants.SET_GROUPS, groups };
    expect(actions.setGroups(groups)).toEqual(expectedAction);
  });

  test('should create an action to set group', () => {
    const group = {};
    const expectedAction = { type: constants.SET_GROUP, group };
    expect(actions.setGroup(group)).toEqual(expectedAction);
  });

  test('should create an action to set chart data', () => {
    const charts = {};
    const expectedAction = { type: constants.SET_CHARTS, charts };
    expect(actions.setCharts(charts)).toEqual(expectedAction);
  });
});
