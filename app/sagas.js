import { put, select, fork, spawn, call, takeLatest } from 'redux-saga/effects';
import { constants, actions } from './actions';
import api from './api';
import Bubbles from '@buzzn/module_bubbles';
import Charts from '@buzzn/module_charts';

export const getConfig = state => state.config;

export function getGroupFromUrl() {
  return window.location.href.split('/')[3];
}

export function windowReload() {
  setInterval(() => {
    window.location.reload(true);
  }, 1000 * 60 * 15);
}

export function* bubbles({ groupId }) {
  yield put(Bubbles.actions.setGroup(groupId));
}

export function* charts({ groupId }) {
  yield put(Charts.actions.setGroup(groupId));
}

export function* getGroup({ apiUrl, apiPath }, param) {
  const groupId = typeof(param) === 'string' ? param : param.groupId;
  try {
    const group = yield call(api.fetchGroup, { apiUrl, apiPath, groupId });
    yield put(actions.setGroup(group));
  } catch (error) {
    console.log(error);
  }
}

export function* getGroups({ apiUrl, apiPath }) {
  try {
    const groups = yield call(api.fetchGroups, { apiUrl, apiPath });
    yield put(actions.setGroups(groups));
  } catch (error) {
    console.log(error);
  }
}

export default function* appLoop() {
  const { apiUrl, apiPath } = yield select(getConfig);
  const groupId = yield call(getGroupFromUrl);
  if (groupId) {
    yield put(actions.setUrlGroupId(groupId));
    yield call(getGroup, { apiUrl, apiPath }, groupId);
    yield put(Bubbles.actions.setGroup(groupId));
    yield put(Charts.actions.setGroup(groupId));
    yield spawn(windowReload);
  } else {
    yield call(getGroups, { apiUrl, apiPath });
    yield fork(takeLatest, constants.SET_GROUP_ID, getGroup, { apiUrl, apiPath });
    yield fork(takeLatest, constants.SET_GROUP_ID, bubbles);
    yield fork(takeLatest, constants.SET_GROUP_ID, charts);
  }
}
