import { expect } from 'chai';
import { actions, constants } from '../actions';

describe('app actions', () => {
  it('should create an action to set group', () => {
    const group = 'group';
    const expectedAction = { type: constants.SET_GROUP, group };
    expect(actions.setGroup(group)).to.eql(expectedAction);
  });

  it('should create an action to set group from url', () => {
    const group = 'group';
    const expectedAction = { type: constants.SET_URL_GROUP, group };
    expect(actions.setUrlGroup(group)).to.eql(expectedAction);
  });
});
