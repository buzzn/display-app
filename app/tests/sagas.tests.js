import { expect } from 'chai';
import { put, take, select, fork, spawn, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { setEndpointHost, setEndpointPath, readEndpoint } from 'redux-json-api';
import appSaga, { getConfig, getGroup, bubbles, charts, getGroupTitle, getGroupFromUrl } from '../sagas';
import { constants, actions } from '../actions';
import Bubbles from '@buzzn/module_bubbles';
import Charts from '@buzzn/module_charts';

describe('app sagas', () => {
  describe('helper selectors should return proper state parts', () => {
    const state = { config: 'config', app: { group: 'group' } };

    it('config selector', () => {
      expect(getConfig(state)).to.eql(state.config);
    });

    it('group selector', () => {
      expect(getGroup(state)).to.eql(state.app.group);
    });
  });

  describe('main flow with groupId provided by URL', () => {
    const apiUrl = 'http://localhost:3000';
    const apiPath = '/api/v1/';
    const group = 'group';
    const generator = appSaga();

    it('should get apiUrl and apiPath from the state', () => {
      expect(generator.next().value)
      .to.eql(select(getConfig));
    });

    it('should dispatch setEndpointHost action with api host address', () => {
      expect(generator.next({ apiUrl, apiPath }).value)
      .to.eql(put(setEndpointHost(apiUrl)));
    });

    it('should dispatch setEndpointPath action with api path', () => {
      expect(generator.next().value)
      .to.eql(put(setEndpointPath(apiPath)));
    });

    it('should get the part of a URL (possible groupId)', () => {
      expect(generator.next().value)
      .to.eql(call(getGroupFromUrl));
    });

    it('should dispatch setUrlGroup with groupId if groupId was provided by URL', () => {
      expect(generator.next(group).value)
      .to.eql(put(actions.setUrlGroup(group)));
    });

    it('should run the getGroupTitle saga with only group parameter', () => {
      expect(generator.next().value)
      .to.eql(call(getGroupTitle, null, group));
    });

    it('should dispatch setGroup action from Bubbles module', () => {
      expect(generator.next().value)
      .to.eql(put(Bubbles.actions.setGroup(group)));
    });

    it('should dispatch setGroup action from Charts module', () => {
      expect(generator.next().value)
      .to.eql(put(Charts.actions.setGroup(group)));
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
    generator.next();
    generator.next();
    // dispatching action for redux-json-api, deep compare not working here.
    generator.next();

    it('should fork getGroupTitle saga with takeLatest helper for SET_GROUP', () => {
      expect(generator.next().value)
      .to.eql(fork(takeLatest, constants.SET_GROUP, getGroupTitle));
    });

    it('should fork bubbles saga with takeLatest helper for SET_GROUP', () => {
      expect(generator.next().value)
      .to.eql(fork(takeLatest, constants.SET_GROUP, bubbles));
    });

    it('should fork charts saga with takeLatest helper for SET_GROUP', () => {
      expect(generator.next().value)
      .to.eql(fork(takeLatest, constants.SET_GROUP, charts));
    });
  });

  describe('bubbles group listener', () => {
    const generator = bubbles();
    const group = 'group';

    it('should select group from state', () => {
      expect(generator.next().value)
      .to.eql(select(getGroup));
    });

    it('should dispatch setGroup action from Bubbles module', () => {
      expect(generator.next(group).value)
      .to.eql(put(Bubbles.actions.setGroup(group)));
    });
  });

  describe('charts group listener', () => {
    const generator = charts();
    const group = 'group';

    it('should select group from state', () => {
      expect(generator.next().value)
      .to.eql(select(getGroup));
    });

    it('should dispatch setGroup action from Charts module', () => {
      expect(generator.next(group).value)
      .to.eql(put(Charts.actions.setGroup(group)));
    });
  });
});
