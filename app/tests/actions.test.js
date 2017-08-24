import { actions, constants } from '../actions';

describe('app actions', () => {
  test('should create an action to set groupId', () => {
    const groupId = 'groupId';
    const expectedAction = { type: constants.SET_GROUP_ID, groupId };
    expect(actions.setGroupId(groupId)).toEqual(expectedAction);
  });
});
