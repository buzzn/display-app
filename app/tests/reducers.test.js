import { appReducer } from '../reducers';
import { constants } from '../actions';

describe('app reducer', () => {
  const initialState = { charts: { in: [], out: [], scores: {} } };

  it('should return initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_GROUP_ID', () => {
    const groupId = 'groupId';
    expect(appReducer(undefined, { type: constants.SET_GROUP_ID, groupId })).toEqual({ ...initialState, groupId });
  });

  it('should handle SET_URL_GROUP_ID', () => {
    const urlGroupId = 'groupId';
    expect(appReducer(undefined, { type: constants.SET_URL_GROUP_ID, urlGroupId }))
      .toEqual({ ...initialState, urlGroupId });
  });

  it('should handle SET_GROUPS', () => {
    const groups = ['groupId'];
    expect(appReducer(undefined, { type: constants.SET_GROUPS, groups }))
      .toEqual({ ...initialState, groups });
  });

  it('should handle SET_GROUP', () => {
    const group = {};
    expect(appReducer(undefined, { type: constants.SET_GROUP, group }))
      .toEqual({ ...initialState, group });
  });

  it('should handle SET_CHARTS', () => {
    const charts = { in: [{}], out: [{}], scores: { a: {} } };
    expect(appReducer(undefined, { type: constants.SET_CHARTS, charts }))
      .toEqual({ ...initialState, charts });
  });
});
