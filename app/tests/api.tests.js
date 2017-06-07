import 'isomorphic-fetch';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import api from '../api';

describe('app api', () => {
  const apiUrl = 'http://localhost:3000';
  const apiPath = '/api';
  const groupId = 'groupId';
  const group1 = { id: 1, attributes: { name: 'group1' } };
  const group2 = { id: 2, attributes: { name: 'group2' } };
  const group3 = { id: 1, name: 'group1' };
  const group4 = { id: 2, name: 'group2' };

  chai.use(chaiAsPromised);
  const expect = chai.expect;

  it('should return all groups from old api', () => {
    nock(apiUrl)
    .get(`${apiPath}/groups`)
    .reply(200, { data: [group1, group2] });

    return expect(api.fetchGroups({ apiUrl, apiPath }))
    .to.eventually.eql([{ id: group1.id, ...group1.attributes }, { id: group2.id, ...group2.attributes }]);
  });

  it('should return all groups from new api', () => {
    nock(apiUrl)
    .get(`${apiPath}/groups`)
    .reply(200, [group3, group4]);

    return expect(api.fetchGroups({ apiUrl, apiPath }))
    .to.eventually.eql([group3, group4]);
  });

  it('should fetch group', () => {
    nock(apiUrl)
    .get(`${apiPath}/groups/${groupId}`)
    .reply(200, { data: group1 });

    return expect(api.fetchGroup({ apiUrl, apiPath, groupId }))
    .to.eventually.eql({ data: group1 });
  });
});
