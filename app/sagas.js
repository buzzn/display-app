import { put, take, select, fork, spawn, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { setEndpointHost, setEndpointPath, readEndpoint } from 'redux-json-api';
import { constants } from './actions';
import Bubbles from './bubbles';
import Charts from './charts';

export const getConfig = state => state.config;
export const getGroup = state => state.app.group;

export function* bubbles() {
  const group = yield select(getGroup);
  yield put(Bubbles.actions.setGroup(group));
}

export function* charts() {
  const group = yield select(getGroup);
  yield put(Charts.actions.setGroup(group));
}

export default function* appLoop() {
  const { apiUrl, apiPath } = yield select(getConfig);
  yield put(setEndpointHost(apiUrl));
  yield put(setEndpointPath(apiPath));
  yield put(readEndpoint('groups'));

  yield fork(takeLatest, constants.SET_GROUP, bubbles);
  yield fork(takeLatest, constants.SET_GROUP, charts);

  yield fork(Charts.sagas);
}
