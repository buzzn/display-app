import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';
import map from 'lodash/map';
import config from '../util/chart_config';
import { sumData } from '../util/process_data';

class Chart extends Component {
  componentDidMount() {
    this.chart = this.refs.chart.getChart();
  }

  componentWillReceiveProps(nextProps) {
    const resolution = 'day_to_minutes';

    const { inData, outData } = nextProps;
    const inSum = sumData({ data: inData, resolution });
    const outSum = sumData({ data: outData, resolution });

    this.chart.showLoading();

    this.chart.setTitle({ text: `Heute: ${moment(outSum[0].timestamp).format('DD.MM.YYYY')}` });

    if (this.chart.series.length === 0) {
      this.chart.addSeries({ name: 'Gesamtverbrauch', data: map(inSum, v => ([v.timestamp, v.powerMilliwatt])) });
      this.chart.addSeries({ name: 'Gesamterzeugung', data: map(outSum, v => ([v.timestamp, v.powerMilliwatt])) });
    } else {
      this.chart.series[0].setData(map(inSum, v => ([v.timestamp, v.powerMilliwatt])));
      this.chart.series[1].setData(map(outSum, v => ([v.timestamp, v.powerMilliwatt])));
    }

    // this.chart.xAxis[0].setExtremes();
    // this.chart.yAxis[0].setExtremes();

    this.chart.hideLoading();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <div className="panel-body">
        <div className="text-center"></div>
        <ReactHighcharts config={ config } ref="chart" ></ReactHighcharts>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inData: state.charts.inData,
    outData: state.charts.outData,
  };
}

export default connect(mapStateToProps)(Chart);
