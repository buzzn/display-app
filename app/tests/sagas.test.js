import { put, select, fork, spawn, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { cloneableGenerator } from 'redux-saga/utils';
import Bubbles from '@buzzn/module_bubbles';
import { constants, actions } from '../actions';
import api from '../api';
import { logException } from '../_util';
import appSaga, {
  getConfig,
  hackScale,
  getGroupFromUrl,
  windowReload,
  bubbles,
  getCharts,
  getGroup,
  getGroups,
} from '../sagas';

describe('app sagas', () => {
  const apiUrl = 'http://localhost:3000';
  const apiPath = '/api/v1/';
  const secure = true;
  const groupId = 'groupId';

  describe('selectors should return proper state parts', () => {
    test('config selector', () => {
      const state = { config: 'config' };
      expect(getConfig(state)).toEqual(state.config);
    });
  });

  describe('main app saga', () => {
    const generators = { urlGroup: cloneableGenerator(appSaga)() };

    test('should get api params from the state', () => {
      expect(generators.urlGroup.next().value)
        .toEqual(select(getConfig));
    });

    test('should call window scaling hack', () => {
      expect(generators.urlGroup.next({ apiUrl, apiPath, secure }).value)
        .toEqual(call(hackScale));
    });

    test('should try to get groupId from URL', () => {
      expect(generators.urlGroup.next().value)
        .toEqual(call(getGroupFromUrl));
    });


    describe('groupId received from URL', () => {
      test('should dispatch configuration to Bubbles module', () => {
        generators.noGroup = generators.urlGroup.clone();

        expect(generators.urlGroup.next(groupId).value)
          .toEqual(put(Bubbles.actions.setApiParams({ apiUrl, apiPath: `${apiPath}/groups` })));
        expect(generators.urlGroup.next().value)
          .toEqual(put(Bubbles.actions.setToken({ token: null })));
      });

      test('should set groupId to state', () => {
        expect(generators.urlGroup.next().value)
          .toEqual(put(actions.setUrlGroupId(groupId)));
      });

      test('should run getGroup saga with groupId parameter', () => {
        expect(generators.urlGroup.next().value)
          .toEqual(call(getGroup, { apiUrl, apiPath }, { groupId }));
      });

      test('should fork getCharts saga with groupId parameter', () => {
        expect(generators.urlGroup.next().value)
          .toEqual(fork(getCharts, { apiUrl, apiPath }, { groupId }));
      });

      test('should dispatch groupId to Bubbles module', () => {
        expect(generators.urlGroup.next().value)
          .toEqual(put(Bubbles.actions.setGroupId(groupId)));
      });

      test('should spawn app autorefresh function', () => {
        expect(generators.urlGroup.next().value)
          .toEqual(spawn(windowReload));
      });

      test('should finish', () => {
        expect(generators.urlGroup.next().done)
          .toBeTruthy();
      });
    });

    describe('no groupId in URL', () => {
      test('should dispatch configuration to Bubbles module', () => {
        expect(generators.noGroup.next().value)
          .toEqual(put(Bubbles.actions.setApiParams({ apiUrl, apiPath: `${apiPath}/groups` })));
        expect(generators.noGroup.next().value)
          .toEqual(put(Bubbles.actions.setToken({ token: null })));
      });

      test('should run getGroups saga', () => {
        expect(generators.noGroup.next().value)
          .toEqual(call(getGroups, { apiUrl, apiPath }));
      });

      test('should fork getGroup, getCharts and bubbles sagas waiting for the latest SET_GROUP_ID', () => {
        expect(generators.noGroup.next().value)
          .toEqual(fork(takeLatest, constants.SET_GROUP_ID, getGroup, { apiUrl, apiPath }));
        expect(generators.noGroup.next().value)
          .toEqual(fork(takeLatest, constants.SET_GROUP_ID, getCharts, { apiUrl, apiPath }));
        expect(generators.noGroup.next().value)
          .toEqual(fork(takeLatest, constants.SET_GROUP_ID, bubbles));
      });

      test('should finish', () => {
        expect(generators.urlGroup.next().done)
          .toBeTruthy();
      });
    });
  });

  describe('bubbles saga', () => {
    const gen = bubbles({ groupId });

    test('should dispatch groupId to Bubbles module', () => {
      expect(gen.next().value)
        .toEqual(put(Bubbles.actions.setGroupId(groupId)));
    });

    test('should finish', () => {
      expect(gen.next().done)
        .toBeTruthy();
    });
  });

  describe('getCharts saga', () => {
    const charts = { in: [{}], out: [{}] };
    const gen = getCharts({ apiUrl, apiPath }, { groupId });

    test('should get charts data', () => {
      expect(gen.next().value)
        .toEqual(call(api.fetchGroupChart, { apiUrl, apiPath, groupId }));
    });

    test('should set charts data to state', () => {
      expect(gen.next(charts).value)
        .toEqual(put(actions.setCharts(charts)));
    });

    test('should wait for 15 minutes', () => {
      expect(gen.next().value)
        .toEqual(call(delay, 15 * 60 * 1000));
    });

    test('should start again', () => {
      expect(gen.next().value)
        .toEqual(call(api.fetchGroupChart, { apiUrl, apiPath, groupId }));
    });
  });

  describe('getGroup saga', () => {
    const group = { id: groupId };
    const mentors = { array: [{ id: 1 }, { id: 2 }] };
    const gen = getGroup({ apiUrl, apiPath }, { groupId });

    test('should get group', () => {
      expect(gen.next().value)
        .toEqual(call(api.fetchGroup, { apiUrl, apiPath, groupId }));
    });

    test('should get mentors', () => {
      expect(gen.next(group).value)
        .toEqual(call(api.fetchGroupMentors, { apiUrl, apiPath, groupId }));
    });

    test('should set group to state', () => {
      expect(gen.next(mentors).value)
        .toEqual(put(actions.setGroup({ ...group, mentors: mentors.array })));
    });

    test('should finish', () => {
      expect(gen.next().done)
        .toBeTruthy();
    });
  });

  describe('getGroups saga', () => {
    const groups = { array: [{ id: 1 }, { id: 2 }] };
    const gen = getGroups({ apiUrl, apiPath });

    test('should get groups', () => {
      expect(gen.next().value)
        .toEqual(call(api.fetchGroups, { apiUrl, apiPath }));
    });

    test('should set groups to state', () => {
      expect(gen.next(groups).value)
        .toEqual(put(actions.setGroups(groups.array)));
    });

    test('should finish', () => {
      expect(gen.next().done)
        .toBeTruthy();
    });
  });
});
