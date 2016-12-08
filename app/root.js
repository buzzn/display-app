import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import { actions } from './actions';
import Bubbles from '@buzzn/module_bubbles';
import Charts from './charts';
import GroupSelector from './components/group_selector';
import './styles/nifty.css';
import './styles/nifty_overrides.scss';
import './styles/main.scss';
import LogoImg from './images/bz_logo_115px_grey.png';

export const Root = props => (
  <div className="effect mainnav-lg" id="container">
    { (!!props.groups || !!props.urlGroup) &&
      <div className="boxed">
        <div id="content-container-no-click">
          { !props.urlGroup &&
            <div className="row">
              <GroupSelector { ...props } />
            </div>
          }
          <div className="panel media pad-all">
            <div className="media-left">
              <span className="img-md img-user imc-circle icon-wrapper-md icon-circle bg-white fa fa-users fa-3x"></span>
            </div>
            <div className="media-body pad-lft">
              <p className="text-3x mar-no">{ props.groupTitle }</p>
            </div>
            <div className="brand-title clear-width" style={{ marginLeft: 'auto' }}>
              <span className="brand-text">
                <img className="brand-logo" src={ LogoImg } />
              </span>
            </div>
          </div>
          <div id="page-content">
            <div className="row">
              <Bubbles.container />
              <Charts.chart />
            </div>
          </div>
        </div>
      </div>
    }
  </div>
);

function groupTitle(groups, urlGroupId, groupId) {
  let title = '';
  const id = urlGroupId || groupId;
  if (groups && id) {
    const group = find(groups.data, g => g.id === id);
    if (group) title = group.attributes.name;
  }
  return title;
}

function mapStateToProps(state) {
  return {
    groups: state.api.groups ? state.api.groups.data : null,
    urlGroup: state.app.urlGroup,
    groupTitle: groupTitle(state.api.groups, state.app.urlGroup, state.app.group),
  };
}

export default connect(mapStateToProps, { onGroupSelect: actions.setGroup })(Root);
