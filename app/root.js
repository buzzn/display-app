import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Helmet from 'react-helmet';
import last from 'lodash/last';
import chunk from 'lodash/chunk';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { actions } from './actions';
import Bubbles from '@buzzn/module_bubbles';
import { calculateAutarchy } from './_util';
import GroupSelector from './components/group_selector';
import BubblesLayout from './components/bubbles_layout';
import Chart from './components/chart';
import EnergySource from './components/energy_source';
import InfoPanel from './components/info_panel';
import GroupStatus from './components/group_status';

import 'buzzn-style';
import './styles/main.scss';
import LogoImg from './images/bz_logo_115px_white.png';

export class Root extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    group: PropTypes.object.isRequired,
    onGroupSelect: PropTypes.func.isRequired,
    charts: PropTypes.object.isRequired,
    sourcesLeft: PropTypes.object.isRequired,
    sourcesRight: PropTypes.object.isRequired,
  };

  static defaultProps = {
    groups: [],
    group: { name: '', mentors: [], slug: '' },
    charts: { in: [], out: [] },
    sourcesLeft: {},
    sourcesRight: {},
  };

  state = {
    noTitle: false,
  };

  componentWillMount() {
    function findGetParameter(parameterName) {
      let result = null;
      let tmp = [];
      location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
      return result;
    }

    this.setState({ noTitle: findGetParameter('no-title') === 'true' });
  }

  render() {
    const { groups, group, onGroupSelect, charts, autarchy, sourcesLeft, sourcesRight, inSum, outSum } = this.props;

    return (
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
            {
              !this.state.noTitle &&
              <div className="row">
                <div style={{ margin: '0 auto', fontSize: '66px', textAlign: 'center', color: 'white', textTransform: 'uppercase' }}>
                  { group.name }
                </div>
              </div>
            }
            <div className="row">
              <div style={{ width: '1880px', margin: this.state.noTitle ? '20px auto' : '0 auto', position: 'relative', minHeight: '960px' }}>
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
  }
}

function mapStateToProps(state) {
  const calcSource = (type, registers) => registers.reduce((s, r) => (r.label.toLowerCase() === type ? s + r.value : s), 0);

  let inSum = 0;
  let outSum = 0;
  if (state.app.charts.in.length > 0) {
    inSum = chunk(state.app.charts.in, 4).reduce((sh, h) => (h.reduce((sv, v) => (sv + v.value / 1000), 0) / h.length) + sh, 0);
  }
  if (state.app.charts.out.length > 0) {
    outSum = chunk(state.app.charts.out, 4).reduce((sh, h) => (h.reduce((sv, v) => (sv + v.value / 1000), 0) / h.length) + sh, 0);
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
