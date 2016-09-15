import React from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import Bubbles from './bubbles';
import GroupSelector from './components/group_selector';

const Root = props => (
  <div className="container">
  { !!props.groups &&
    <div>
      <GroupSelector { ...props } />
      <Bubbles.container />
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
