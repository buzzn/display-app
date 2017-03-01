import { expect } from 'chai';
import { actions, constants } from '../actions';

describe('app actions', () => {
  it('should create an action to set groupId', () => {
    const groupId = 'groupId';
    const expectedAction = { type: constants.SET_GROUP_ID, groupId };
    expect(actions.setGroupId(groupId)).to.eql(expectedAction);
  });

  it('should create an action to set groupId from url', () => {
    const urlGroupId = 'groupId';
    const expectedAction = { type: constants.SET_URL_GROUP_ID, urlGroupId };
    expect(actions.setUrlGroupId(urlGroupId)).to.eql(expectedAction);
  });

  it('should create action to set groups', () => {
    const groups = [1, 2, 3];
    const expectedAction = { type: constants.SET_GROUPS, groups };
    expect(actions.setGroups(groups)).to.eql(expectedAction);
  });

  it('should create action to set group', () => {
    const group = 'group';
    const expectedAction = { type: constants.SET_GROUP, group };
    expect(actions.setGroup(group)).to.eql(expectedAction);
  });
});
