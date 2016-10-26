import { expect } from 'chai';
import { actions, constants } from '../actions';

describe('bubbles actions', () => {
  it('should create an action to set group', () => {
    const group = 'group';
    const expectedAction = { type: constants.SET_GROUP, group };
    expect(actions.setGroup(group)).to.eql(expectedAction);
  });
});
