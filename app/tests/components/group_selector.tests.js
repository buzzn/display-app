import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import spies from 'chai-spies';
import GroupSelector from '../../components/group_selector';

describe('app GroupSelector', () => {
  chai.use(spies);
  const expect = chai.expect;
  const props = {
    groups: [
      { id: '1', attributes: { name: 'group1' } },
      { id: '2', attributes: { name: 'group2' } },
    ],
    onGroupSelect: chai.spy(),
  };

  it('should render group select with all groups and default option', () => {
    const wrapper = shallow(<GroupSelector { ...props } />);
    expect(wrapper.find('option')).to.have.length(3);
  });

  it('should call provided onGroupSelect callback with group id on select change', () => {
    const wrapper = shallow(<GroupSelector { ...props } />);
    wrapper.find('select').simulate('change', { target: { value: '1' } });
    expect(props.onGroupSelect).to.have.been.called.with('1');
  });
});
