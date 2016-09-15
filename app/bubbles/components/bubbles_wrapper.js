import React from 'react';
import { connect } from 'react-redux';
import Bubbles from './bubbles';

const BubblesWrapper = ({ group, url }) => (
  <div>
    <div style={{ width: '100vw', height: '100vh' }}>
      { group && <Bubbles key={ group } url={ url } group={ group } /> }
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    url: state.config.apiUrl,
    group: state.bubbles.group,
  };
}

export default connect(mapStateToProps)(BubblesWrapper);