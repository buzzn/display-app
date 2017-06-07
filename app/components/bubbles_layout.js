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
      <div style={{ width: '832px', height: '150px', margin: 'auto' }}>
        <Chart/>
      </div>
      <div style={{ width: '832px', height: '150px', margin: 'auto' }}>
        <div style={{ width: '400px', height: '40px', fontSize: '20px', borderRadius: '0 0 0 20px', backgroundColor: '#d4e157', padding: '6px', textAlign: 'center', float: 'left', marginRight: '16px' }}>
          <InfoOut />
        </div>
        <div style={{ width: '400px', height: '40px', fontSize: '20px', borderRadius: '0 0 20px 0', backgroundColor: '#80deea', padding: '6px', textAlign: 'center', float: 'left'}}>
          <InfoIn />
        </div>
      </div>
    </div>
  </div>
);
