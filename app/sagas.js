import { put, select, fork, spawn, call, take, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import Bubbles from '@buzzn/module_bubbles';
import { constants, actions } from './actions';
import api from './api';
import { logException } from './_util';

export const getConfig = state => state.config;

export function setScale() {
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  const scale = scaleX < scaleY ? scaleX : scaleY;
  document.body.style.zoom = scale;
  document.body.style.MozTransform = `scale(${scale})`;
}

export function hackScale() {
  document.onload = setScale();
  window.addEventListener('resize', setScale);
}

export function getGroupFromUrl() {
  return window.location.href.split('/')[3].split('?')[0];
}

export function windowReload() {
  setInterval(() => {
    window.location.reload(true);
  }, 1000 * 60 * 60 * 24);
}

export function* bubbles({ groupId }) {
  yield put(Bubbles.actions.setGroupId(groupId));
}

export function* getCharts({ apiUrl, apiPath }, { groupId }) {
  while (true) {
    try {
      const charts = yield call(api.fetchGroupChart, { apiUrl, apiPath, groupId });
      yield put(actions.setCharts(charts));
    } catch (error) {
      logException(error);
    }
    yield call(delay, 15 * 60 * 1000);
  }
}

export default function* appLoop() {
  const { apiUrl, apiPath, secure, timeout } = yield select(getConfig);

  yield call(hackScale);

  if (secure && window.location.protocol !== 'https:') {
    window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
  }

  const groupId = yield call(getGroupFromUrl);

  if (!groupId) return false;

  yield spawn(windowReload);
  yield put(actions.setUrlGroupId(groupId));
  yield put(Bubbles.actions.setApiParams({ apiUrl, apiPath: `${apiPath}/groups`, timeout }));
  yield put(Bubbles.actions.setToken({ token: null }));

  while (true) {
    try {
      yield put(actions.loadingGroup());
      const group = yield call(api.fetchGroup, { apiUrl, apiPath, groupId });
      if (group.id) {
        const mentors = yield call(api.fetchGroupMentors, { apiUrl, apiPath, groupId });
        group.mentors = mentors.array;
        yield put(actions.setGroup(group));
        yield put(actions.loadedGroup());
        const chartSaga = yield fork(getCharts, { apiUrl, apiPath }, { groupId });
        yield put(Bubbles.actions.setGroupId(groupId));

        yield take(constants.CANCEL);

        yield put(actions.setGroup({}));
        yield cancel(chartSaga);
        yield put(Bubbles.actions.stopRequests());
      } else {
        yield call(delay, 10 * 60 * 1000);
      }
    } catch (error) {
      logException(error);
      // FIXME: temporary hack, please change to proper err code handling
      yield put(actions.loadedGroup());
      yield call(delay, 10 * 60 * 1000);
    }
  }
}
