import React from 'react';
import { formatLabel } from '../_util';

export default ({ type, data }) => (
  <div>
    { type === 'in' ? 'Tagesverbrauch ' : 'Tagesproduktion ' }
    <span style={{ fontWeight: 'bold' }}>{ data ? formatLabel(data, 'h') : 'n.a.' }</span>
  </div>
);
