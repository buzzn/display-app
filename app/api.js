import { prepareHeaders, parseResponse, camelizeResponseKeys } from './_util';

export default {
  fetchGroup({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/groups/${groupId}`, {
      headers: prepareHeaders(),
    })
      .then(parseResponse);
  },
  fetchGroupChart({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/groups/${groupId}/charts?duration=day`, {
      headers: prepareHeaders(),
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
  setUI(ui) { localStorage.setItem('buzznDisplayUI', JSON.stringify(ui || {})); },
  getUI() { return JSON.parse(localStorage.getItem('buzznDisplayUI')) || {}; },
};
