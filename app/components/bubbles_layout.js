import React from 'react';

export default ({ group, url, summedData, loading, setData, setLoading, setLoaded, Bubbles, InfoPanel }) => (
  <div className="col-6 bubbles-wrapper">
    <div className="row">
      <div className="col-6">
        <InfoPanel type="in" data={ summedData.in } />
      </div>
      <div className="col-6">
        <InfoPanel type="out" data={ summedData.out } />
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="panel" style={{ position: 'relative' }}>
          <div style={{ width: '100%', height: '453px', display: 'inline-block', position: 'relative' }}>
            { !!group &&
              <Bubbles
                key={ group }
                url={ url }
                group={ group }
                setData={ setData }
                setLoading={ setLoading }
                setLoaded={ setLoaded } />
            }
          </div>
          <div className="basic-loading" style={{
            width: '100%',
            height: '100%',
            display: 'inline-block',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: loading ? 10 : -10,
            background: 'rgba(255, 255, 255, 0.7)',
          }}>
            <div style={{ color: 'grey', fontSize: '28px', fontWeight: 'bolder', marginLeft: '40%', marginTop: '35%' }}>
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
