import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import reduce from 'lodash/reduce';
import { connect } from 'react-redux';
import Bubbles from '@buzzn/module_bubbles';
import { actions } from './actions';
import { calculateAutarchy } from './_util';
import BubblesLayout from './components/bubbles_layout';
import Chart from './components/chart';
import EnergySource from './components/energy_source';
import InfoPanel from './components/info_panel';

import 'buzzn-style';
import './styles/main.scss';
import LogoImg from './images/bz_logo_180px_white.png';
import UserImg from './images/default_user.png';

export class Root extends Component {
  static propTypes = {
    noTitle: PropTypes.bool,
    display: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    group: PropTypes.object.isRequired,
    mentors: PropTypes.object.isRequired,
    charts: PropTypes.object.isRequired,
    sourcesLeft: PropTypes.object.isRequired,
    sourcesRight: PropTypes.object.isRequired,
    productionSources: PropTypes.number.isRequired,
    bubblesStatus: PropTypes.number,
    widgetScale: PropTypes.number.isRequired,
  };

  static defaultProps = {
    group: { name: '', slug: '' },
    mentors: { _status: null, array: [] },
    charts: { in: [], out: [] },
    sourcesLeft: {},
    sourcesRight: {},
    productionSources: 0,
    widgetScale: 1,
  };

  componentDidUpdate() {
    const { bubblesStatus, cancel } = this.props;
    if (bubblesStatus === 403) cancel();
  }

  render() {
    const {
      display,
      loading,
      group,
      mentors,
      charts,
      autarchy,
      productionSources,
      sourcesLeft,
      sourcesRight,
      inSum,
      outSum,
      noTitle,
      noClock,
      widgetScale,
      customTitle,
      day,
    } = this.props;

    if (day) {
      document.body.classList.add('day');
    } else {
      document.body.classList.remove('day');
    }

    return (
      <div
        id={`display-${display}`}
        style={{ width: '1920px', margin: 'auto' }}
      >
        {group.id ? (
          <div>
            <Helmet>
              <title>Display: {group.name}</title>
            </Helmet>
            <div>
              {noTitle ? (
                <div className="row" style={{ height: '40px' }} />
              ) : (
                <div className="row">
                  <div
                    style={{
                      margin: '0 auto',
                      fontSize: '66px',
                      textAlign: 'center',
                      color: 'white',
                      textTransform: 'uppercase',
                    }}
                  >
                    {customTitle || group.name}
                  </div>
                </div>
              )}
              <div className="row">
                <div
                  style={{
                    width: '1880px',
                    margin: noTitle ? '20px auto' : '0 auto',
                    position: 'relative',
                    minHeight: '960px',
                  }}
                >
                  <div
                    style={{
                      width: '460px',
                      float: 'left',
                      minHeight: '650px',
                      background: '#f5f5f5',
                      marginTop:
                        productionSources < 3
                          ? '148px'
                          : productionSources < 4 ? '108px' : '38px',
                      borderRadius: '40px 0 0 40px',
                      paddingTop: '40px',
                      position: 'relative',
                    }}
                  >
                    {Object.keys(sourcesLeft).map(k => (
                      <EnergySource
                        key={sourcesLeft[k].id}
                        position="left"
                        type={k}
                        value={sourcesLeft[k].value}
                        day={day}
                      />
                    ))}
                  </div>
                  <Bubbles.container
                    Layout={BubblesLayout}
                    widgetScale={widgetScale}
                    showClock={!noClock}
                    day={day}
                    Chart={() => <Chart charts={charts} />}
                    InfoIn={() => <InfoPanel type="in" data={inSum} />}
                    InfoOut={() => <InfoPanel type="out" data={outSum} />}
                  />
                  <div
                    style={{
                      width: '460px',
                      float: 'left',
                      minHeight: '650px',
                      background: '#f5f5f5',
                      marginTop: '100px',
                      borderRadius: '0 40px 40px 0',
                      paddingTop: '40px',
                      position: 'relative',
                    }}
                  >
                    {Object.keys(sourcesRight).map(k => (
                      <EnergySource
                        key={sourcesRight[k].id}
                        position="right"
                        type={k}
                        value={sourcesRight[k].value}
                        day={day}
                      />
                    ))}
                    {mentors.array.length > 0 && (
                      <React.Fragment>
                        <div
                          style={{
                            fontSize: '26px',
                            margin: '40px auto 20px auto',
                            textAlign: 'center',
                          }}
                        >
                          Ansprechpartner
                        </div>
                        {mentors.array.slice(0, 2).map(m => (
                          <div
                            style={{
                              float: mentors.array.length > 1 ? 'left' : 'none',
                              width: '152px',
                              textAlign: 'center',
                              margin:
                                mentors.array.length > 1
                                  ? '0 0 0 50px'
                                  : 'auto',
                              fontSize: '20px',
                              marginBottom: '40px',
                            }}
                            key={m.id}
                          >
                            <img
                              style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '76px',
                                marginBottom: '10px',
                              }}
                              src={m.image || UserImg}
                            />
                            {`${m.firstName} ${m.lastName}`}
                          </div>
                        ))}
                      </React.Fragment>
                    )}
                  </div>
                  <img
                    style={{ position: 'absolute', right: '0', bottom: '0' }}
                    src={LogoImg}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              fontSize: '40px',
              fontWeight: 500,
              letterSpacing: '1px',
              lineHeight: '54px',
              textAlign: 'center',
              color: 'white',
              marginTop: '50vh',
            }}
          >
            {loading ? (
              'Loading...'
            ) : mentors._status === 404 ? (
              <React.Fragment>
                <img src={LogoImg} />
                <br />
                Die von Dir gesuchte Seite wurde leider nicht gefunden.<br />
                Erfahre mehr über{' '}
                <a
                  href="https://www.buzzn.net"
                  style={{ color: 'white', textDecoration: 'underline' }}
                >
                  www.buzzn.net
                </a>
              </React.Fragment>
            ) : (
              <React.Fragment>
                Deine Energiegruppe ist aktuell nicht für diese Ansicht
                freigeschaltet.
                {mentors.array.length > 0 && (
                  <React.Fragment>
                    Bitte wende Dich an Deinen Stromgeber:
                    <img
                      style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '76px',
                        marginBottom: '10px',
                      }}
                      src={mentors.array[0].image || UserImg}
                    />
                    {`${mentors.array[0].firstName} ${
                      mentors.array[0].lastName
                    }`}
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const calcSource = (types, registers) =>
    registers.reduce(
      (s, r) =>
        types.includes(r.label.toLowerCase()) ? s + Math.round(r.value) : s,
      0,
    );

  const inSum = state.app.charts.total.in || 0;
  const outSum = state.app.charts.total.out || 0;
  const sources = {
    solar: 'production_pv',
    fire: 'production_chp',
    wind: 'production_wind',
    water: 'production_water',
  };
  const production = reduce(
    sources,
    (res, v, k) => {
      if (!state.bubbles.registers.array.find(r => r.label.toLowerCase() === v))
        return res;
      return {
        ...res,
        [k]: { id: v, value: calcSource([v], state.bubbles.registers.array) },
      };
    },
    {},
  );
  const consumption = {
    id: 3,
    value: calcSource(
      ['consumption', 'consumption_common'],
      state.bubbles.registers.array,
    ),
  };
  const grid = {
    id: 4,
    value: consumption.value - reduce(production, (res, v) => res + v.value, 0),
  };
  const autarchy = { id: 5, value: calculateAutarchy(state.app.charts) };
  const prodStat = { id: 6, value: outSum };
  const consStat = { id: 7, value: inSum };

  const day =
    (production.solar && !!production.solar.value) ||
    (new Date().getHours() <= 19 && new Date().getHours() >= 6);

  return {
    noTitle: state.app.ui.noTitle,
    display: state.app.ui.display,
    noClock: state.app.ui.noClock,
    loading: state.app.loading,
    group: state.app.group,
    mentors: state.app.mentors,
    charts: state.app.charts,
    productionSources: Object.keys(production).length,
    sourcesLeft: { ...production, grid, consumption },
    sourcesRight: { autarchy, prodStat, consStat },
    autarchy: calculateAutarchy(state.app.charts),
    inSum,
    outSum,
    bubblesStatus: state.bubbles.registers._status,
    widgetScale: state.app.widgetScale,
    customTitle: state.app.customTitle,
    day,
  };
}

export default connect(mapStateToProps, { cancel: actions.cancel })(Root);
