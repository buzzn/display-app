import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import last from 'lodash/last';
import { connect } from 'react-redux';
import { actions } from './actions';
import Bubbles from '@buzzn/module_bubbles';
import GroupSelector from './components/group_selector';
import FullScreenButton from './components/full_screen_button';
import BubblesLayout from './components/bubbles_layout';
import Chart from './components/chart';
import EnergySource from './components/energy_source';
import GroupStatus from './components/group_status';
import InfoPanel from './components/info_panel';

import 'buzzn-style';
import './styles/main.scss';
import LogoImg from './images/bz_logo_115px_grey.png';

export const Root = ({ groups, group, onGroupSelect, charts, sources, inSum, outSum }) => (
  <div>
    { (groups.length > 0 || group.id) &&
      <div>
        { groups.length > 0 &&
          <div className="row">
            <GroupSelector groups={ groups } onGroupSelect={ onGroupSelect } />
          </div>
        }
        <div>
          <div className="row">
            <div style={{ margin: '0 auto', fontSize: '66px', textAlign: 'center', color: 'white', textTransform: 'uppercase' }}>
              { group.name }
            </div>
          </div>
          <div className="row">
            <div style={{ width: '1880px', margin: '0 auto', position: 'relative', minHeight: '960px' }}>
              <div style={{ width: '460px', float: 'left', minHeight: '750px', background: '#f5f5f5', marginTop: '88px', borderRadius: '40px 0 0 40px', paddingTop: '40px', position: 'relative' }}>
                { Object.keys(sources).map(k => <EnergySource key={ sources[k].id } type={ k } value={ sources[k].value }/>) }
                <GroupStatus value={ charts.scores.autarchy } text="Autarkie" />
              </div>
              <Bubbles.container Layout={ BubblesLayout } Chart={ () => (<Chart charts={ charts } />) } InfoIn={ () => <InfoPanel type="in" data={ inSum }/> } InfoOut={ () => <InfoPanel type="out" data={ outSum }/> } />
              <div style={{ width: '460px', float: 'left', height: '544px', background: '#f5f5f5', marginTop: '192px', borderRadius: '0 40px 40px 0' }}>
                <div style={{ fontSize: '24px', margin: '40px auto', textAlign: 'center' }}>
                  Unsere Energiementoren
                </div>
                {
                  group.mentors.slice(0, 2).map(m => (
                    <div style={{ width: '152px', textAlign: 'center', margin: 'auto', fontSize: '18px', marginBottom: '40px' }} key={ m.id }>
                      <img style={{ width: '152px', height: '152px', borderRadius: '76px' }} src={ m.image } />
                      { `${m.firstName} ${m.lastName}` }
                    </div>
                  ))
                }
              </div>
              <img style={{ position: 'absolute', right: '0', bottom: '0' }} src={ LogoImg } />
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
  sources: PropTypes.object.isRequired,
};

Root.defaultProps = {
  groups: [],
  group: { name: '', mentors: [] },
  charts: { in: [], out: [] },
  sources: {},
};

function mapStateToProps(state) {
  const calcSource = (type, registers) => registers.reduce((s, r) => (r.label === type ? s + r.value : s), 0);

  const solar = { id: 1, value: calcSource('production_pv', state.bubbles.registers) / 1000 };
  const fire = { id: 2, value: calcSource('production_chp', state.bubbles.registers) / 1000 };
  const grid = { id: 3, value: calcSource('consumption', state.bubbles.registers) / 1000 - (solar.value + fire.value) };

  let inSum = 0;
  let outSum = 0;
  if (state.app.charts.in.length > 0) {
    const inHours = moment(last(state.app.charts.in).timestamp).hour() + 1;
    inSum = state.app.charts.in.reduce((s, d) => (d.value + s), 0) / inHours / 1000;
  }
  if (state.app.charts.out.length > 0) {
    const outHours = moment(last(state.app.charts.out).timestamp).hour() + 1;
    outSum = state.app.charts.out.reduce((s, d) => (d.value + s), 0) / outHours / 1000;
  }

  return {
    groups: state.app.groups,
    group: state.app.group,
    charts: state.app.charts,
    sources: { solar, fire, grid },
    inSum,
    outSum,
  };
}

export default connect(mapStateToProps, { onGroupSelect: actions.setGroupId })(Root);
