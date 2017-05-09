import { expect } from 'chai';
import { put, select, fork, spawn, call, takeLatest } from 'redux-saga/effects';
import appSaga, {
  getConfig,
  bubbles,
  charts,
  getGroup,
  getGroups,
  getGroupFromUrl,
  windowReload,
} from '../sagas';
import { constants, actions } from '../actions';
import api from '../api';
import Bubbles from '@buzzn/module_bubbles';
import Charts from '@buzzn/module_charts';

describe('app sagas', () => {
  describe('helper selectors should return proper state parts', () => {
    const state = { config: 'config' };

    it('config selector', () => {
      expect(getConfig(state)).to.eql(state.config);
    });
  });

  describe('main flow with groupId provided by URL', () => {
    const apiUrl = 'http://localhost:3000';
    const apiPath = '/api/v1/';
    const groupId = 'groupId';
    const generator = appSaga();

    it('should get apiUrl and apiPath from the state', () => {
      expect(generator.next().value)
      .to.eql(select(getConfig));
    });

    it('should get the part of a URL (possible groupId)', () => {
      expect(generator.next({ apiUrl, apiPath }).value)
      .to.eql(call(getGroupFromUrl));
    });

    it('should dispatch setUrlGroupId with groupId if groupId was provided by URL', () => {
      expect(generator.next(groupId).value)
      .to.eql(put(actions.setUrlGroupId(groupId)));
    });

    it('should run the getGroup saga', () => {
      expect(generator.next().value)
      .to.eql(call(getGroup, { apiUrl, apiPath }, groupId));
    });

    it('should dispatch setGroup action from Bubbles module', () => {
      expect(generator.next().value)
      .to.eql(put(Bubbles.actions.setGroup(groupId)));
    });

    it('should dispatch setGroup action from Charts module', () => {
      expect(generator.next().value)
      .to.eql(put(Charts.actions.setGroup(groupId)));
    });

    it('should spawn window reload timer', () => {
      expect(generator.next().value)
      .to.eql(spawn(windowReload));
    });

    it('should finish', () => {
      expect(generator.next().done).to.be.true;
    });
  });

  describe('main flow with groupId selected by dropdown', () => {
    const apiUrl = 'http://localhost:3000';
    const apiPath = '/api/v1/';
    const generator = appSaga();

    generator.next();
    generator.next({ apiUrl, apiPath });

    it('should call getGroup saga', () => {
      expect(generator.next().value)
      .to.eql(call(getGroups, { apiUrl, apiPath }))
    });

    it('should fork getGroupTitle saga with takeLatest helper for SET_GROUP', () => {
      expect(generator.next().value)
      .to.eql(fork(takeLatest, constants.SET_GROUP_ID, getGroup, { apiUrl, apiPath }));
    });

    it('should fork bubbles saga with takeLatest helper for SET_GROUP', () => {
      expect(generator.next().value)
      .to.eql(fork(takeLatest, constants.SET_GROUP_ID, bubbles));
    });

    it('should fork charts saga with takeLatest helper for SET_GROUP', () => {
      expect(generator.next().value)
      .to.eql(fork(takeLatest, constants.SET_GROUP_ID, charts));
    });
  });

  describe('bubbles group listener', () => {
    const groupId = 'groupId';
    const generator = bubbles({ groupId });

    it('should dispatch setGroup action from Bubbles module', () => {
      expect(generator.next().value)
      .to.eql(put(Bubbles.actions.setGroup(groupId)));
    });
  });

  describe('charts group listener', () => {
    const groupId = 'groupId';
    const generator = charts({ groupId });

    it('should dispatch setGroup action from Charts module', () => {
      expect(generator.next().value)
      .to.eql(put(Charts.actions.setGroup(groupId)));
    });
  });

  describe('getGroups saga', () => {
    const apiUrl = 'http://localhost:3000';
    const apiPath = '/api/v1/';
    const groups = [1, 2, 3];

    describe('normal flow', () => {
      const generator = getGroups({ apiUrl, apiPath });

      it('should call api.fetchGroups', () => {
        expect(generator.next().value)
        .to.eql(call(api.fetchGroups, { apiUrl, apiPath }));
      });

      it('should dispatch setGroups action with groups', () => {
        expect(generator.next(groups).value)
        .to.eql(put(actions.setGroups(groups)));
      });

      it('should finish', () => {
        expect(generator.next().done).to.be.true;
      });
    });
  });

  describe('getGroup saga', () => {
    const apiUrl = 'http://localhost:3000';
    const apiPath = '/api/v1/';
    const groupId = 'groupId';
    const group = { name: 'group' };

    describe('normal flow with string param', () => {
      const generator = getGroup({ apiUrl, apiPath }, groupId);

      it('should call api.fetchGroup', () => {
        expect(generator.next().value)
        .to.eql(call(api.fetchGroup, { apiUrl, apiPath, groupId }));
      });

      it('should dispatch setGroup action with group', () => {
        expect(generator.next(group).value)
        .to.eql(put(actions.setGroup(group)));
      });

      it('should finish', () => {
        expect(generator.next().done).to.be.true;
      });
    });

    describe('normal flow with action param', () => {
      const generator = getGroup({ apiUrl, apiPath }, { groupId });

      it('should call api.fetchGroup', () => {
        expect(generator.next().value)
        .to.eql(call(api.fetchGroup, { apiUrl, apiPath, groupId }));
      });

      it('should dispatch setGroup action with group', () => {
        expect(generator.next(group).value)
        .to.eql(put(actions.setGroup(group)));
      });

      it('should finish', () => {
        expect(generator.next().done).to.be.true;
      });
    });
  });
});
