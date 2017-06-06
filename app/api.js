import 'whatwg-fetch';
import map from 'lodash/map';
import find from 'lodash/find';
import moment from 'moment';
import { prepareHeaders, parseResponse, camelizeResponseArray } from './_util';

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
    return fetch(`${apiUrl}${apiPath}/display/groups/${groupId}`, {
      headers: prepareHeaders(),
    })
    .then(parseResponse);
  },
  fetchGroupChart({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/display/groups/${groupId}/charts?duration=day`, {
      headers: { ...prepareHeaders(), 'Cache-Control': 'no-cache' },
    })
    .then(parseResponse);
  },
  fetchGroupMentors({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/display/groups/${groupId}/mentors`, {
      headers: prepareHeaders(),
    })
    .then(parseResponse)
    .then(camelizeResponseArray);
  },
  fetchGroupScores({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/display/groups/${groupId}/scores?timestamp=${encodeURIComponent(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'))}&interval=day`, {
      headers: prepareHeaders(),
    })
    .then(parseResponse)
    .then(formatScores);
  },
  fetchGroups({ apiUrl, apiPath }) {
    return fetch(`${apiUrl}${apiPath}/display/groups`, {
      headers: prepareHeaders(),
    })
    .then(parseResponse)
    .then(json => json.data ? json.data.map(g => ({ id: g.id, ...g.attributes })) : json);
  },
};
