import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Helmet from 'react-helmet';
import last from 'lodash/last';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { actions } from './actions';
import Bubbles from '@buzzn/module_bubbles';
import { calculateAutarchy } from './_util';
import GroupSelector from './components/group_selector';
import FullScreenButton from './components/full_screen_button';
import BubblesLayout from './components/bubbles_layout';
import Chart from './components/chart';
import EnergySource from './components/energy_source';
import InfoPanel from './components/info_panel';
import GroupStatus from './components/group_status';

import 'buzzn-style';
import './styles/main.scss';
import LogoImg from './images/bz_logo_115px_grey.png';

export const Root = ({ groups, group, onGroupSelect, charts, autarchy, sourcesLeft, sourcesRight, inSum, outSum }) => (
  <div style={{ width: '1920px' }}>
    { (groups.length > 0 || group.id) &&
      <div>
        { groups.length > 0 &&
          <div className="row" style={{ marginBottom: '10px' }}>
            <GroupSelector groups={ groups } onGroupSelect={ onGroupSelect } />
            <span style={{ color: 'white', marginLeft: '20px' }}>URL:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ `${window.location.href}${group.slug}` }</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <CopyToClipboard text={ `${window.location.href}${group.slug}` }><button className="btn btn-sm"><i className="fa fa-copy"/></button></CopyToClipboard>
          </div>
        }
        <Helmet>
          <title>Display: { group.name }</title>
        </Helmet>
        <div>
          <div className="row">
            <div style={{ margin: '0 auto', fontSize: '66px', textAlign: 'center', color: 'white', textTransform: 'uppercase' }}>
              { group.name }
            </div>
          </div>
          <div className="row">
            <div style={{ width: '1880px', margin: '0 auto', position: 'relative', minHeight: '960px' }}>
              <div style={{
                width: '460px',
                float: 'left',
                minHeight: '650px',
                background: '#f5f5f5',
                marginTop: '148px',
                borderRadius: '40px 0 0 40px',
                paddingTop: '40px',
                position: 'relative' }}>
                { Object.keys(sourcesLeft).map(k => <EnergySource key={ sourcesLeft[k].id } position="left" type={ k } value={ sourcesLeft[k].value }/>) }
              </div>
              <Bubbles.container Layout={ BubblesLayout } Chart={ () => (<Chart charts={ charts } />) } InfoIn={ () => <InfoPanel type="in" data={ inSum }/> } InfoOut={ () => <InfoPanel type="out" data={ outSum }/> } />
              <div style={{
                width: '460px',
                float: 'left',
                minHeight: '650px',
                background: '#f5f5f5',
                marginTop: '100px',
                borderRadius: '0 40px 40px 0',
                paddingTop: '40px',
                position: 'relative' }}>
                { Object.keys(sourcesRight).map(k => <EnergySource key={ sourcesRight[k].id } position="right" type={ k } value={ sourcesRight[k].value }/>) }
                <div style={{ fontSize: '24px', margin: '40px auto 20px auto', textAlign: 'center' }}>
                  Ansprechpartner
                </div>
                {
                  group.mentors.slice(0, 2).map(m => (
                    <div style={{
                      float: group.mentors.length > 1 ? 'left' : 'none',
                      width: '152px',
                      textAlign: 'center',
                      margin: group.mentors.length > 1 ? '0 0 0 50px' : 'auto',
                      fontSize: '18px',
                      marginBottom: '40px' }} key={ m.id }>
                      <img style={{ width: '152px', height: '152px', borderRadius: '76px', marginBottom: '10px' }} src={ m.image } />
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
  sourcesLeft: PropTypes.object.isRequired,
  sourcesRight: PropTypes.object.isRequired,
};

Root.defaultProps = {
  groups: [],
  group: { name: '', mentors: [], slug: '' },
  charts: { in: [], out: [] },
  sourcesLeft: {},
  sourcesRight: {},
};

function mapStateToProps(state) {
  const calcSource = (type, registers) => registers.reduce((s, r) => (r.label === type ? s + r.value : s), 0);

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

  const solar = { id: 1, value: calcSource('production_pv', state.bubbles.registers) / 1000 };
  const fire = { id: 2, value: calcSource('production_chp', state.bubbles.registers) / 1000 };
  const grid = { id: 3, value: calcSource('consumption', state.bubbles.registers) / 1000 - (solar.value + fire.value) };
  const consumption = { id: 4, value: calcSource('consumption', state.bubbles.registers) / 1000 };
  const autarchy = { id: 5, value: calculateAutarchy(state.app.charts) };
  const prodStat = { id: 6, value: outSum };
  const consStat = { id: 7, value: inSum };

  return {
    groups: state.app.groups,
    group: state.app.group,
    charts: state.app.charts,
    sourcesLeft: { solar, fire, grid, consumption },
    sourcesRight: { autarchy, prodStat, consStat },
    autarchy: calculateAutarchy(state.app.charts),
    inSum,
    outSum,
  };
}

export default connect(mapStateToProps, { onGroupSelect: actions.setGroupId })(Root);
