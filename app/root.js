import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import chunk from 'lodash/chunk';
import { connect } from 'react-redux';
import { actions } from './actions';
import Bubbles from '@buzzn/module_bubbles';
import { calculateAutarchy } from './_util';
import BubblesLayout from './components/bubbles_layout';
import Chart from './components/chart';
import EnergySource from './components/energy_source';
import InfoPanel from './components/info_panel';

import 'buzzn-style';
import './styles/main.scss';
import LogoImg from './images/bz_logo_115px_white.png';

export class Root extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    charts: PropTypes.object.isRequired,
    sourcesLeft: PropTypes.object.isRequired,
    sourcesRight: PropTypes.object.isRequired,
    bubblesStatus: PropTypes.number,
  };

  static defaultProps = {
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
        .split('&')
        .forEach(function (item) {
          tmp = item.split('=');
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
      return result;
    }

    this.setState({ noTitle: findGetParameter('no-title') === 'true' });
  }

  componentWillReceiveProps(nextProps) {
    const { bubblesStatus, cancel } = nextProps;
    if (bubblesStatus === 403) cancel();
  }

  render() {
    const { group, charts, autarchy, sourcesLeft, sourcesRight, inSum, outSum } = this.props;

    return (
      <div style={{ width: '1920px' }}>
        {
          group.id ?
            <div>
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
            </div> :
            <div style={{
              fontSize: '40px',
              fontWeight: 500,
              letterSpacing: '1px',
              lineHeight: '54px',
              textAlign: 'center',
              color: 'white',
              marginTop: '50vh',
            }}>
              Deine Energiegruppe ist aktuell nicht für diese Ansicht freigeschaltet.
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
    inSum = chunk(state.app.charts.in, 4).reduce((sh, h) => (h.reduce((sv, v) => (sv + v.value), 0) / h.length) + sh, 0);
  }
  if (state.app.charts.out.length > 0) {
    outSum = chunk(state.app.charts.out, 4).reduce((sh, h) => (h.reduce((sv, v) => (sv + v.value), 0) / h.length) + sh, 0);
  }

  const solar = { id: 1, value: calcSource('production_pv', state.bubbles.registers.array) };
  const fire = { id: 2, value: calcSource('production_chp', state.bubbles.registers.array) };
  const consumption = { id: 4, value: calcSource('consumption', state.bubbles.registers.array) };
  const grid = { id: 3, value: consumption.value - (solar.value + fire.value) };
  const autarchy = { id: 5, value: calculateAutarchy(state.app.charts) };
  const prodStat = { id: 6, value: outSum };
  const consStat = { id: 7, value: inSum };

  return {
    group: state.app.group,
    charts: state.app.charts,
    sourcesLeft: { solar, fire, grid, consumption },
    sourcesRight: { autarchy, prodStat, consStat },
    autarchy: calculateAutarchy(state.app.charts),
    inSum,
    outSum,
    bubblesStatus: state.bubbles.registers._status,
  };
}

export default connect(mapStateToProps, { cancel: actions.cancel })(Root);
