import { put, take, select, fork, spawn, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { setEndpointHost, setEndpointPath, readEndpoint } from 'redux-json-api';
import { constants, actions } from './actions';
import Bubbles from '@buzzn/module_bubbles';
import Charts from '@buzzn/module_charts';

export const getConfig = state => state.config;
export const getGroup = state => state.app.group;

export function getGroupFromUrl() {
  return window.location.href.split('/')[3];
}

export function windowReload() {
  setInterval(() => {
    window.location.reload(true);
  }, 1000 * 60 * 60 * 24);
}

export function* bubbles() {
  const group = yield select(getGroup);
  yield put(Bubbles.actions.setGroup(group));
}

export function* charts() {
  const group = yield select(getGroup);
  yield put(Charts.actions.setGroup(group));
}

export function* getGroupTitle(groupAction, group) {
  const groupId = group || groupAction.group;
  yield put(readEndpoint(`groups/${groupId}`));
}

export default function* appLoop() {
  const { apiUrl, apiPath } = yield select(getConfig);
  yield put(setEndpointHost(apiUrl));
  yield put(setEndpointPath(apiPath));
  const group = yield call(getGroupFromUrl);
  if (group) {
    yield put(actions.setUrlGroup(group));
    yield call(getGroupTitle, null, group);
    yield put(Bubbles.actions.setGroup(group));
    yield put(Charts.actions.setGroup(group));
    yield spawn(windowReload);
  } else {
    yield put(readEndpoint('groups'));
    yield fork(takeLatest, constants.SET_GROUP, getGroupTitle);
    yield fork(takeLatest, constants.SET_GROUP, bubbles);
    yield fork(takeLatest, constants.SET_GROUP, charts);
  }
}
