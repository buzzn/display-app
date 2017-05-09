import 'whatwg-fetch';
import { prepareHeaders, parseResponse } from './_util';

export default {
  fetchGroup({ apiUrl, apiPath, groupId }) {
    return fetch(`${apiUrl}${apiPath}/groups/${groupId}`, {
      headers: prepareHeaders(),
    })
    .then(parseResponse);
  },
  fetchGroups({ apiUrl, apiPath }) {
    return fetch(`${apiUrl}${apiPath}/groups`, {
      headers: prepareHeaders(),
    })
    .then(parseResponse)
    .then(json => json.data ? json.data.map(g => ({ id: g.id, ...g.attributes })) : json);
  },
};
