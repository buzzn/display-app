import React from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import Bubbles from './bubbles';
import Charts from './charts';
import GroupSelector from './components/group_selector';
import './styles/nifty.css';
import './styles/nifty_overrides.scss';
import './styles/main.scss';

const Root = props => (
  <div className="effect" id="container">
    { (!!props.groups || !!props.urlGroup) &&
      <div id="page-content">
        { !props.urlGroup &&
          <div className="row">
            <GroupSelector { ...props } />
          </div>
        }
        <div className="row">
          <Bubbles.container />
          <Charts.chart />
        </div>
      </div>
    }
  </div>
);

function mapStateToProps(state) {
  return {
    groups: state.api.groups ? state.api.groups.data : null,
    urlGroup: state.app.urlGroup,
  };
}

export default connect(mapStateToProps, { onGroupSelect: actions.setGroup })(Root);
