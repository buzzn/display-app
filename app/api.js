import 'whatwg-fetch';
import map from 'lodash/map';
import { prepareHeaders, parseResponse, camelizeResponseArray } from './_util';

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
  fetchGroupManagers({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/groups/${groupId}/managers`, {
      headers: prepareHeaders(),
    })
    .then(parseResponse)
    .then(managers => {console.log(managers); return managers;})
    .then(managers => Promise.all(map(managers, manager => fetch(`${apiUrl}${apiPath}/users/${manager.id}/profile`, {
      headers: prepareHeaders(),
    }).then(parseResponse)
    )))
    .then(camelizeResponseArray);
  },
  fetchGroups({ apiUrl, apiPath }) {
    return fetch(`${apiUrl}${apiPath}/groups`, {
      headers: prepareHeaders(),
    })
    .then(parseResponse)
    .then(json => json.data ? json.data.map(g => ({ id: g.id, ...g.attributes })) : json);
  },
};
