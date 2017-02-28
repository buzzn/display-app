import React from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import Bubbles from '@buzzn/module_bubbles';
import Charts from '@buzzn/module_charts';
import GroupSelector from './components/group_selector';
import FullScreenButton from './components/full_screen_button';
import ChartLayout from './components/chart_layout';
import BubblesLayout from './components/bubbles_layout';

import './styles/nifty.css';
import './styles/nifty_overrides.scss';
import './styles/main.scss';
import LogoImg from './images/bz_logo_115px_grey.png';

export const Root = ({ groups, group, onGroupSelect }) => (
  <div className="effect mainnav-lg" id="container">
    { (groups.length > 0 || group.id) &&
      <div className="boxed">
        <div id="content-container-no-click">
          { groups.length > 0 &&
            <div className="row">
              <GroupSelector groups={ groups } onGroupSelect={ onGroupSelect } />
            </div>
          }
          <div className="panel media pad-all">
            <div className="media-left">
              <span className="img-md img-user imc-circle icon-wrapper-md icon-circle bg-white fa fa-users fa-3x"></span>
            </div>
            <div className="media-body pad-lft float-left">
              <p className="text-3x mar-no">{ group.attributes.name }</p>
            </div>
            <div className="brand-title clear-width" style={{ marginLeft: 'auto', marginBottom: '30px', height: '37px' }}>
              <span className="brand-text">
                <img className="brand-logo" src={ LogoImg } style={{ float: 'right' }} />
              </span>
            </div>
          </div>
          <div id="page-content">
            <div className="row" style={{ position: 'relative', height: '30px' }}>
              <div style={{ position: 'absolute', right: '20px', top: '-30px' }}><FullScreenButton /></div>
            </div>
            <div className="row">
              <Bubbles.container Layout={ BubblesLayout } />
              <Charts.ChartWrapperContainer Layout={ ChartLayout } />
            </div>
          </div>
        </div>
      </div>
    }
  </div>
);

Root.propTypes = {
  groups: React.PropTypes.array.isRequired,
  group: React.PropTypes.object.isRequired,
  onGroupSelect: React.PropTypes.func.isRequired,
};

Root.defaultProps = {
  groups: [],
  group: { attributes: { name: '' } },
};

function mapStateToProps(state) {
  return {
    groups: state.app.groups,
    group: state.app.group,
  };
}

export default connect(mapStateToProps, { onGroupSelect: actions.setGroupId })(Root);
