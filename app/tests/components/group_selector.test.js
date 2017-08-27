import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import GroupSelector from '../../components/group_selector';

describe('group selector component tests', () => {
  test('renders group list correctly', () => {
    const groups = [
      { id: '1', name: 'group1' },
      { id: '2', name: 'group2' },
    ];
    const tree = renderer.create(
      <GroupSelector groups={ groups }/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('calls callback with proper group id', () => {
    const onGroupSelect = jest.fn();
    const groups = [
      { id: '1', name: 'group1' },
      { id: '2', name: 'group2' },
    ];
    const rendered = shallow(
      <GroupSelector groups={ groups } onGroupSelect={ onGroupSelect }/>
    );
    rendered.find('select').simulate('change', { target: { value: groups[1].id } });
    // rendered.find('select').simulate('select', groups[1].id);
    expect(onGroupSelect.mock.calls[0][0]).toBe(groups[1].id);
  });
});
