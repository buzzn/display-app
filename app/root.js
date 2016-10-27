import React from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import Bubbles from './bubbles';
import Charts from './charts';
import GroupSelector from './components/group_selector';
import './styles/main.scss';

const Root = props => (
  <div>
  { !!props.groups &&
    <div>
      <div className="row">
        <GroupSelector { ...props } />
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="panel">
                <Bubbles.container />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="panel">
                <Charts.chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  </div>
);

function mapStateToProps(state) {
  return {
    groups: state.api.groups ? state.api.groups.data : null,
  };
}

export default connect(mapStateToProps, { onGroupSelect: actions.setGroup })(Root);
