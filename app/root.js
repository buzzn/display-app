import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from './actions';
import Bubbles from '@buzzn/module_bubbles';
import GroupSelector from './components/group_selector';
import FullScreenButton from './components/full_screen_button';
import BubblesLayout from './components/bubbles_layout';
import Chart from './components/chart';
import EnergySource from './components/energy_source';
import GroupStatus from './components/group_status';

import 'buzzn-style';
import './styles/main.scss';
import LogoImg from './images/bz_logo_115px_grey.png';

export const Root = ({ groups, group, onGroupSelect, charts }) => (
  <div>
    { (groups.length > 0 || group.id) &&
      <div>
        { groups.length > 0 &&
          <div className="row">
            <GroupSelector groups={ groups } onGroupSelect={ onGroupSelect } />
          </div>
        }
        <div>
          <div className="row" style={{ position: 'relative', height: '30px' }}>
            <div style={{ position: 'absolute', right: '20px', top: '-30px' }}><FullScreenButton /></div>
          </div>
          <div className="row">
            <div style={{ minWidth: '1880px', margin: '0 auto' }}>
              <div style={{ width: '460px', float: 'left', minHeight: '750px', background: '#f5f5f5', marginTop: '88px', borderRadius: '40px 0 0 40px', paddingTop: '40px', position: 'relative' }}>
                <EnergySource type={ 'solar' } value={ 1000 } />
                <EnergySource type={ 'fire' } value={ 12500 } />
                <EnergySource type={ 'grid' } value={ 230 } />
                <GroupStatus />
              </div>
              <Bubbles.container Layout={ BubblesLayout } Chart={ () => (<Chart charts={ charts } />) } />
              <div style={{ width: '460px', float: 'left', height: '544px', background: '#f5f5f5', marginTop: '192px', borderRadius: '0 40px 40px 0' }}>
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  </div>
);

Root.propTypes = {
  groups: PropTypes.array.isRequired,
  group: PropTypes.object.isRequired,
  onGroupSelect: PropTypes.func.isRequired,
  charts: PropTypes.object.isRequired,
};

Root.defaultProps = {
  groups: [],
  group: { name: '' },
  charts: { in: [], out: [] },
};

function mapStateToProps(state) {
  return {
    groups: state.app.groups,
    group: state.app.group,
    charts: state.app.charts,
  };
}

export default connect(mapStateToProps, { onGroupSelect: actions.setGroupId })(Root);
