import React, { Component } from 'react';
import get from 'lodash/get';
import last from 'lodash/last';
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
    const d3Date = timestamp => new Date(timestamp * 1000);
    const svgD3 = d3.select(this.svgDom);
    const width = 10000;
    const height = 1000;
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height + 200, -200]);
    const line = d3.line().curve(d3.curveCardinal.tension(0.5)).x(d => x(d.timestamp)).y(d => y(d.value));
    const inData = this.props.charts.in.map(({ value, timestamp }) => ({ value, timestamp: d3Date(timestamp) }));
    const outData = this.props.charts.out.map(({ value, timestamp }) => ({ value, timestamp: d3Date(timestamp) }));
    const startInDate = get(this.props.charts.in[0], 'timestamp');
    const startOutDate = get(this.props.charts.out[0], 'timestamp');
    const startDate = Math.min(startInDate, startOutDate) || startInDate || startOutDate;
    const endInDate = get(last(this.props.charts.in), 'timestamp');
    const endOutDate = get(last(this.props.charts.out), 'timestamp');
    const endDate = Math.max(endInDate, endOutDate) || endInDate || endOutDate;

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
      .attr('stroke-width', 40)
      .attr('fill', 'none');

    const outLine = svgD3.selectAll('.out-line')
      .data(outData)
      .enter()
      .append('path')
      .attr('d', d => line(outData))
      .attr('stroke', this.outColor)
      .attr('stroke-width', 40)
      .attr('fill', 'none');

    svgD3.append('line')
      .attr('x1', x(d3Date(endDate)) || 0)
      .attr('x2', x(d3Date(endDate)) || 0)
      .attr('y1', -400)
      .attr('y2', 1400)
      .attr('stroke-dasharray', '80, 20')
      .attr('stroke', 'black')
      .attr('stroke-width', 20)
      .attr('fill', 'none');
  }

  render() {
    return (
      <svg ref={ svgDom => this.svgDom = svgDom } width="100%" height="100%" viewBox="0 0 10000 1000" />
    );
  }
}
