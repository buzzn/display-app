import React from 'react';
import renderer from 'react-test-renderer';
import GroupStatus from '../../components/group_status';

describe('group status component tests', () => {
  test('renders n.a. value correctly', () => {
    const tree = renderer.create(
      <GroupStatus text="text"/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders value correctly', () => {
    const tree = renderer.create(
      <GroupStatus text="text" value={ 500 }/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
