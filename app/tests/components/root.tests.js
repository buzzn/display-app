import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Root } from '../../root';
import GroupSelector from '../../components/group_selector';
import Bubbles from '../../bubbles';
import Charts from '../../charts';

describe('app Root', () => {
  const props = {
    groups: [],
    urlGroup: 'group',
    groupTitle: 'title',
    onGroupSelect() {},
  };

  it('should render empty container if there is no groups or urlGroup provided', () => {
    const wrapper = shallow(<Root />);
    expect(wrapper.html()).to.eql('<div class="effect mainnav-lg" id="container"></div>');
  });

  it('should render group selector if there is no urlGroup provided', () => {
    const wrapper = shallow(<Root { ...props } urlGroup={ null } />);
    expect(wrapper.find(GroupSelector)).to.have.length(1);
  });

  it('should not render group selector if urlGroup provided', () => {
    const wrapper = shallow(<Root { ...props } />);
    expect(wrapper.find(GroupSelector)).to.have.length(0);
  });

  it('should render bubbles and charts', () => {
    const wrapper = shallow(<Root { ...props } />);
    expect(wrapper.find(Bubbles.container)).to.have.length(1);
    expect(wrapper.find(Charts.chart)).to.have.length(1);
  });
});
