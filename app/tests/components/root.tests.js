import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Root } from '../../root';
import GroupSelector from '../../components/group_selector';
import Bubbles from '@buzzn/module_bubbles';

describe('app Root', () => {
  // const props = {
  //   onGroupSelect() {},
  // };
  // const groups = [{ id: 1, attributes: { name: '' } }];
  // const group = { id: 1, attributes: { name: '' } };
  //
  // it('should render empty container if there is no groups or group.id provided', () => {
  //   const wrapper = shallow(<Root />);
  //   expect(wrapper.html()).to.eql('<div></div>');
  // });
  //
  // it('should render group selector if groups length > 0', () => {
  //   const wrapper = shallow(<Root { ...props } groups={ groups } />);
  //   expect(wrapper.find(GroupSelector)).to.have.length(1);
  // });
  //
  // it('should not render group selector if groups length === 0 and group.id provided', () => {
  //   const wrapper = shallow(<Root { ...props } group={ group } />);
  //   expect(wrapper.find(GroupSelector)).to.have.length(0);
  // });
  //
  // it('should render bubbles', () => {
  //   const wrapper = shallow(<Root { ...props } group={ group } />);
  //   expect(wrapper.find(Bubbles.container)).to.have.length(1);
  // });
});
