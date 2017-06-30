import React from 'react';

import './bubbles_layout.scss';

export default ({ registers, loading, Bubbles, InfoIn, InfoOut, Chart }) => (
  <div className="bubbles-wrapper">
    <div className="row">
      <div style={{ position: 'relative', margin: '44px 156px' }}>
        <div style={{ width: '648px', height: '648px', display: 'inline-block', position: 'relative' }}>
          <Bubbles registers={ registers } />
        </div>
      </div>
      <div style={{ width: '832px', height: '150px', margin: '30px auto' }}>
        <Chart/>
      </div>
    </div>
  </div>
);
