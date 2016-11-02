import React from 'react';
import { connect } from 'react-redux';
import Bubbles from './bubbles';
import InfoPanel from './info_panel';
import { actions } from '../actions';
import '../styles/main.scss';

const BubblesWrapper = ({ group, url, summedData, setData }) => (
  <div className="col-sm-12 col-md-6 col-lg-6 bubbles-wrapper">
    <div className="row">
      <InfoPanel type="in" data={ summedData.in } />
      <InfoPanel type="out" data={ summedData.out } />
      <div className="col-sm-12 col-md-12 col-lg-12">
        <div className="panel">
          <div style={{ width: '100%', height: '453px', display: 'inline-block', position: 'relative' }}>
            { group && <Bubbles key={ group } url={ url } group={ group } setData={ setData } /> }
          </div>
        </div>
      </div>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    // TODO: replace with ownProps parameter
    url: state.config.apiUrl,
    // TODO: replace 'bubbles' with 'mountedPath' ownProps parameter or constant
    group: state.bubbles.group,
    summedData: state.bubbles.summedData,
  };
}

export default connect(mapStateToProps, { setData: actions.setData })(BubblesWrapper);
