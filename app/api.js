import 'whatwg-fetch';
import flatten from 'lodash/flatten';
import { prepareHeaders, parseResponse, remainingPages } from './_util';

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
    .then(json => remainingPages({ apiUrl, apiPath, json, model: 'groups', endpoint: '' }))
    .then(jsonArr => flatten(jsonArr.map(json => json.data)));
  },
};
