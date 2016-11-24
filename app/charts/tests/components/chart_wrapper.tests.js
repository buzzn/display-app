import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import { constants, actions } from '../../actions';
import ChartWrapperConnected, { ChartWrapper } from '../../components/chart_wrapper';
import InfoPanel from '../../components/info_panel';
import Chart from '../../components/chart';

describe('charts ChartWrapper', () => {
  const mockStore = configureStore();
  const initialState = {};
  // TODO: should be replaced with mountPoint
  initialState.charts = {
    setResolution: actions.setResolution,
    setTimestamp: actions.setTimestamp,
    chartUpdate: actions.chartUpdate,
    resolution: constants.RESOLUTIONS.DAY_MINUTE,
    timestamp: new Date(),
    loading: false,
    scores: {},
  };

  it('should render 4 InfoPanels', () => {
    const wrapper = mount(<Provider store={ mockStore(initialState) }><ChartWrapperConnected /></Provider>);
    expect(wrapper.find(InfoPanel)).to.have.length(4);
  });

  it('should render Chart', () => {
    const wrapper = mount(<Provider store={ mockStore(initialState) }><ChartWrapperConnected /></Provider>);
    expect(wrapper.find(Chart)).to.have.length(1);
  });

  it('should render loading on top of chart in case of loading prop', () => {
    const wrapper = shallow(<ChartWrapper loading={ false } scores={{}} />);
    expect(wrapper.find('.basic-loading').html()).to.have.string('z-index:-10');
    wrapper.setProps({ loading: true }).update();
    expect(wrapper.find('.basic-loading').html()).to.have.string('z-index:10');
  });

  it('should dispatch setResolution and chartUpdate actions when resolution buttons clicked', () => {
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={ store }><ChartWrapperConnected /></Provider>);
    wrapper.find('button.year').simulate('click');
    expect(store.getActions()[0]).to.eql({ type: constants.SET_RESOLUTION, resolution: constants.RESOLUTIONS.YEAR_MONTH });
    expect(store.getActions()[1]).to.eql({ type: constants.CHART_UPDATE });
    store.clearActions();
    wrapper.find('button.month').simulate('click');
    expect(store.getActions()[0]).to.eql({ type: constants.SET_RESOLUTION, resolution: constants.RESOLUTIONS.MONTH_DAY });
    expect(store.getActions()[1]).to.eql({ type: constants.CHART_UPDATE });
    store.clearActions();
    wrapper.find('button.day').simulate('click');
    expect(store.getActions()[0]).to.eql({ type: constants.SET_RESOLUTION, resolution: constants.RESOLUTIONS.DAY_MINUTE });
    expect(store.getActions()[1]).to.eql({ type: constants.CHART_UPDATE });
    store.clearActions();
    wrapper.find('button.hour').simulate('click');
    expect(store.getActions()[0]).to.eql({ type: constants.SET_RESOLUTION, resolution: constants.RESOLUTIONS.HOUR_MINUTE });
    expect(store.getActions()[1]).to.eql({ type: constants.CHART_UPDATE });
  });

  it('should dispatch setTimestamp and chartUpdate actions when pagination buttons clicked', () => {
    const pastDate = { ...initialState };
    const current = new Date();
    pastDate.charts.timestamp = moment(current).subtract(2, 'days').toDate()
    const store = mockStore(pastDate);
    const wrapper = mount(<Provider store={ store }><ChartWrapperConnected /></Provider>);
    wrapper.find('button.btn-chart-prev').simulate('click');
    expect(store.getActions()[0]).to.eql({ type: constants.SET_TIMESTAMP, timestamp: moment(current).subtract(3, 'days').toDate() });
    expect(store.getActions()[1]).to.eql({ type: constants.CHART_UPDATE });
    store.clearActions();
    wrapper.find('button.btn-chart-next').simulate('click');
    expect(store.getActions()[0]).to.eql({ type: constants.SET_TIMESTAMP, timestamp: moment(current).subtract(1, 'days').toDate() });
    expect(store.getActions()[1]).to.eql({ type: constants.CHART_UPDATE });
  });
});
