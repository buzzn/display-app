import React from 'react';

const Selector = ({ data, callback, selected }) => <select value={ selected } onChange={ callback }>
    <option>-----</option>
    { data.map((item, idx) => <option key={ idx } value={ item.value }>{ item.title }</option>) }
  </select>;

Selector.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
  })).isRequired,
  callback: React.PropTypes.func.isRequired,
  selected: React.PropTypes.string,
};

export default Selector;
