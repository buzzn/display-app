import React from 'react';

export default ({ groups, onGroupSelect }) => (
  <select onChange={ event => onGroupSelect(event.target.value) }>
    <option value=''>-----</option>
    { groups.map(group => <option key={ group.id } value={ group.id }>{ group.attributes.name }</option>) }
  </select>
);
