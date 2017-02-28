import { expect } from 'chai';
import { appReducer } from '../reducers';
import { constants } from '../actions';

describe('app reducers', () => {
  it('should return initial state', () => {
    expect(appReducer(undefined, {})).to.eql({});
  });

  it('should handle SET_GROUP_ID', () => {
    const groupId = 'groupId';
    const action = { type: constants.SET_GROUP_ID, groupId };
    expect(appReducer(undefined, action)).to.eql({ groupId });
  });

  it('should handle SET_URL_GROUP_ID', () => {
    const urlGroupId = 'groupId';
    const action = { type: constants.SET_URL_GROUP_ID, urlGroupId };
    expect(appReducer(undefined, action)).to.eql({ urlGroupId });
  });

  it('should handle SET_GROUPS', () => {
    const groups = [1, 2, 3];
    const action = { type: constants.SET_GROUPS, groups };
    expect(appReducer(undefined, action)).to.eql({ groups });
  });

  it('should handle SET_GROUP', () => {
    const group = 'group';
    const action = { type: constants.SET_GROUP, group };
    expect(appReducer(undefined, action)).to.eql({ group });
  });
});
