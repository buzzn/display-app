import reduce from 'lodash/reduce';
import { prepareHeaders, parseResponse, camelizeResponseKeys } from './_util';

export default {
  fetchGroup({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/groups/${groupId}`, {
      headers: prepareHeaders(),
    }).then(parseResponse);
  },
  fetchGroupChart({ apiUrl, apiPath, groupId }) {
    if (Array.isArray(groupId)) {
      return Promise.all(
        groupId.map(gid =>
          fetch(`${apiUrl}${apiPath}/groups/${gid}/charts?duration=day`, {
            headers: prepareHeaders(),
          })
            .then(parseResponse)
            .catch(error => error),
        ),
      ).then(chartsArr => {
        return chartsArr.reduce(
          (sum, value) => {
            if (
              value._status !== 200 ||
              !value.consumption ||
              !value.production
            ) {
              return sum;
            }
            const reduceValues = (baseVal, newVal) => ({
              total: baseVal.total + newVal.total,
              data: reduce(
                newVal.data,
                (sum, val, key) => ({
                  ...sum,
                  [key]: (baseVal.data[key] || 0) + val,
                }),
                {
                  ...baseVal.data,
                },
              ),
            });
            return {
              ...sum,
              consumption: reduceValues(sum.consumption, value.consumption),
              production: reduceValues(sum.production, value.production),
            };
          },
          {
            _status: 200,
            consumption: { total: 0, data: {} },
            production: { total: 0, data: {} },
          },
        );
      });
    } else {
      return fetch(
        `${apiUrl}${apiPath}/groups/${groupId}/charts?duration=day`,
        {
          headers: prepareHeaders(),
        },
      ).then(parseResponse);
    }
  },
  fetchGroupMentors({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/groups/${groupId}/mentors`, {
      headers: prepareHeaders(),
    })
      .then(parseResponse)
      .then(camelizeResponseKeys);
  },
  fetchGroups({ apiUrl, apiPath }) {
    return fetch(`${apiUrl}${apiPath}/groups`, {
      headers: prepareHeaders(),
    })
      .then(parseResponse)
      .then(camelizeResponseKeys);
  },
  fetchHealth({ apiUrl }) {
    return fetch(`${apiUrl}health`, {
      headers: prepareHeaders(),
    }).then(parseResponse);
  },
  fetchVersion() {
    return fetch(`${window.location.origin}/assets/version.json`, {
      headers: { 'Cache-Control': 'no-cache' },
    }).then(parseResponse);
  },
  setUI(ui) {
    localStorage.setItem('buzznDisplayUI', JSON.stringify(ui || {}));
  },
  getUI() {
    return JSON.parse(localStorage.getItem('buzznDisplayUI')) || {};
  },
};
