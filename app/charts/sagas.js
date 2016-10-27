import { constants, actions } from './actions';
import { delay } from 'redux-saga';
import { call, put, fork, take, select, race } from 'redux-saga/effects';
import api from './api';

export const getConfig = state => state.config;
export const getCharts = state => state.charts;

export function* clearData() {
  yield put(actions.setIds({ inIds: [], outIds: [] }));
  yield put(actions.setData({ inData: [], outData: [] }));
}

export function* getIds({ apiUrl, apiPath }) {
  while (true) {
    const { group } = yield select(getCharts);
    if (group) {
      try {
        const { inIds, outIds } = yield call(api.getIds, { apiUrl, apiPath, group });
        yield put(actions.setIds({ inIds, outIds }));
      } catch (error) {
        yield call(clearData);
      }
    } else {
      yield call(clearData);
    }
    yield take(constants.SET_GROUP);
  }
}

export function* getData({ apiUrl, apiPath }) {
  while (true) {
    try {
      const { inIds, outIds } = yield select(getCharts);
      const inData = yield call(api.getData, { apiUrl, apiPath, ids: inIds, timestamp: new Date(), resolution: 'day_to_minutes' });
      const outData = yield call(api.getData, { apiUrl, apiPath, ids: outIds, timestamp: new Date(), resolution: 'day_to_minutes' });
      yield put(actions.setData({ inData, outData }));
    } catch (error) {
      yield call(clearData);
    }
    yield race({
      delay: call(delay, 1000 * 60 * 5),
      refresh: take(constants.SET_IDS),
    });
  }
}

export default function* chartsSaga() {
  const { apiUrl, apiPath } = yield select(getConfig);

  yield fork(getIds, { apiUrl, apiPath });
  yield fork(getData, { apiUrl, apiPath });
}
