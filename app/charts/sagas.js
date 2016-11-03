import { constants, actions } from './actions';
import { delay } from 'redux-saga';
import { call, put, fork, take, select, race } from 'redux-saga/effects';
import moment from 'moment';
import api from './api';
import { getMomentPeriod } from './util/process_data';

export const getConfig = state => state.config;
export const getCharts = state => state.charts;

export function* clearAll() {
  yield put(actions.setIds({ inIds: [], outIds: [] }));
  yield put(actions.setData({ inData: [], outData: [] }));
}

export function* clearData() {
  yield put(actions.setData({ inData: [], outData: [] }));
}

export function* getIds({ apiUrl, apiPath }) {
  while (true) {
    yield put(actions.loading());

    const { group } = yield take(constants.SET_GROUP);
    if (group) {
      try {
        const { inIds, outIds } = yield call(api.getIds, { apiUrl, apiPath, group });
        yield put(actions.setIds({ inIds, outIds }));
      } catch (error) {
        yield call(clearAll);
      }
    } else {
      yield call(clearAll);
    }
  }
}

export function* getData({ apiUrl, apiPath }) {
  let { ids: { inIds, outIds } } = yield take(constants.SET_IDS);
  let resolution = constants.RESOLUTIONS.DAY_MINUTE;
  let timestamp = new Date();

  while (true) {
    yield put(actions.loading());

    // timestamp = moment(timestamp).startOf(getMomentPeriod(resolution)).toDate();
    // yield put(actions.setTimestamp(timestamp));

    try {
      const inData = yield call(api.getData, { apiUrl, apiPath, ids: inIds, timestamp, resolution });
      const outData = yield call(api.getData, { apiUrl, apiPath, ids: outIds, timestamp, resolution });
      yield put(actions.setData({ inData, outData }));
    } catch (error) {
      yield call(clearAll);
    }

    yield put(actions.loaded());

    const { newIds, newRes, newTime } = yield race({
      delay: call(delay, 1000 * 60 * 5),
      newIds: take(constants.SET_IDS),
      newRes: take(constants.SET_RESOLUTION),
      newTime: take(constants.SET_TIMESTAMP),
    });

    yield call(clearData);

    if (newIds) {
      inIds = newIds.ids.inIds;
      outIds = newIds.ids.outIds;
    }
    if (newRes) resolution = newRes.resolution;
    if (newTime) timestamp = newTime.timestamp;
  }
}

export default function* chartsSaga() {
  // TODO: replace with function parameter
  const { apiUrl, apiPath } = yield select(getConfig);

  yield fork(getIds, { apiUrl, apiPath });
  yield fork(getData, { apiUrl, apiPath });
}
