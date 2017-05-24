import React, { Component } from 'react';
import get from 'lodash/get';
import moment from 'moment';

const d3 = require('d3');

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.svgDom = null;
    this.inColor = '#80DEEA';
    this.outColor = '#D4E157';

    [
      'draw',
    ].forEach(method => {
      this[method] = this[method].bind(this);
    });
  }

  componentDidMount() {
    this.draw();
  }

  componentWillReceiveProps(nextProps) {
    this.draw();
  }

  draw() {
    console.log('draw chart');
    console.log(this.props.charts);
    const d3Date = timestamp => new Date(timestamp * 1000);
    const svgD3 = d3.select(this.svgDom);
    const width = this.svgDom.getBoundingClientRect().width;
    const height = this.svgDom.getBoundingClientRect().height;
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const line = d3.line().curve(d3.curveCardinal.tension(0.5)).x(d => x(d.timestamp)).y(d => y(d.value));
    const inData = this.props.charts.in.map(({ value, timestamp }) => ({ value, timestamp: d3Date(timestamp) }));
    const outData = this.props.charts.out.map(({ value, timestamp }) => ({ value, timestamp: d3Date(timestamp) }));
    const startInDate = get(this.props.charts.in[0], 'timestamp');
    const startOutDate = get(this.props.charts.out[0], 'timestamp');
    const startDate = Math.min(startInDate, startOutDate) || startInDate || startOutDate;

    x.domain([d3Date(startDate), moment(startDate * 1000).add(1, 'day').toDate()]);
    y.domain(d3.extent([
      d3.min(inData, d => d.value),
      d3.min(outData, d => d.value),
      d3.max(inData, d => d.value),
      d3.max(outData, d => d.value),
    ]));

    const inLine = svgD3.selectAll('.in-line')
    .data(inData)
    .enter()
    .append('path')
    .attr('d', d => line(inData))
    .attr('stroke', this.inColor)
    .attr('stroke-width', 4)
    .attr('fill', 'none');

    const outLine = svgD3.selectAll('.out-line')
    .data(outData)
    .enter()
    .append('path')
    .attr('d', d => line(outData))
    .attr('stroke', this.outColor)
    .attr('stroke-width', 4)
    .attr('fill', 'none');

    // inLine.append('path').attr('class', 'line').attr('d', d => line(inData));
    // outLine.append('path').attr('class', 'line').attr('d', d => line(outData));
  }

  render() {
    return (
      <svg ref={ svgDom => this.svgDom = svgDom } style={{ width: '100%', height: '100%' }} />
    );
  }
}
