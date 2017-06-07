import 'whatwg-fetch';
import map from 'lodash/map';
import find from 'lodash/find';
import moment from 'moment';
import { prepareHeaders, parseResponse, camelizeResponseKeys } from './_util';

function formatScores(json) {
  const scores = {};
  ['fitting', 'autarchy', 'closeness', 'sufficiency'].forEach(type => {
    const score = find(json, j => j.mode === type);
    scores[type] = score ? score.value : 0;
  });
  return scores;
}

export default {
  fetchGroup({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/groups/${groupId}`, {
      headers: prepareHeaders(),
    })
    .then(parseResponse);
  },
  fetchGroupChart({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/groups/${groupId}/charts?duration=day`, {
      headers: { ...prepareHeaders(), 'Cache-Control': 'no-cache' },
    })
    .then(parseResponse);
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
};
