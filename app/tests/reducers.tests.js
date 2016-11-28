import { expect } from 'chai';
import { appReducer } from '../reducers';
import { constants } from '../actions';

describe('app reducers', () => {
  it('should return initial state', () => {
    expect(appReducer(undefined, {})).to.eql({});
  });

  it('should handle SET_GROUP', () => {
    const group = 'group';
    const action = { type: constants.SET_GROUP, group };
    expect(appReducer(undefined, action)).to.eql({ group });
  });

  it('should handle SET_URL_GROUP', () => {
    const group = 'group';
    const action = { type: constants.SET_URL_GROUP, group };
    expect(appReducer(undefined, action)).to.eql({ urlGroup: group });
  });
});
