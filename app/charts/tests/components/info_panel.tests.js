import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import InfoPanel from '../../components/info_panel';

describe('charts InfoPanel', () => {
  it('should render proper icon class', () => {
    const wrapper = shallow(<InfoPanel icon="test-icon" />);
    expect(wrapper.contains(<i className='fa fa-2x test-icon'></i>)).to.be.true;
  });

  it('should render text', () => {
    const wrapper = shallow(<InfoPanel text="test-text" />);
    expect(wrapper.contains(<p>test-text</p>)).to.be.true;
  });

  it('should render proper stars num', () => {
    const wrapper = shallow(<InfoPanel data='3' />);
    expect(wrapper.find('.fa-star')).to.have.length(3);
    expect(wrapper.find('.fa-star-o')).to.have.length(2);
  });
});
