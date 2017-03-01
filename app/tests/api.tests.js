import 'isomorphic-fetch';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import api from '../api';

describe('app api', () => {
  const apiUrl = 'http://localhost:3000';
  const apiPath = '/api/v1';
  const groupId = 'groupId';
  const group1 = { id: 1, attributes: { name: 'group1' } };
  const group2 = { id: 2, attributes: { name: 'group2' } };

  chai.use(chaiAsPromised);
  const expect = chai.expect;

  it('should return all groups', () => {
    nock(apiUrl)
    .get(`${apiPath}/groups`)
    .reply(200, {
      meta: { total_pages: 2 },
    });

    nock(apiUrl)
    .get(`${apiPath}/groups/?page=1`)
    .reply(200, {
      data: [group1],
      meta: { total_pages: 2 },
    });

    nock(apiUrl)
    .get(`${apiPath}/groups/?page=2`)
    .reply(200, {
      data: [group2],
      meta: { total_pages: 2 },
    });

    return expect(api.fetchGroups({ apiUrl, apiPath }))
    .to.eventually.eql([group1, group2]);
  });

  it('should fetch group', () => {
    nock(apiUrl)
    .get(`${apiPath}/groups/${groupId}`)
    .reply(200, { data: group1 });

    return expect(api.fetchGroup({ apiUrl, apiPath, groupId }))
    .to.eventually.eql({ data: group1 });
  });
});
