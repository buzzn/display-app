import React from 'react';
import PropTypes from 'prop-types';
import { formatLabel } from '../_util';

const EnergySource = ({ type, value, position }) => {
  const icons = {
    type: '',
    arrow: 'fa-square',
    color: '#ffffff',
    formatter: v => formatLabel(Math.abs(v)),
  };

  const arrow = `fa-4x ${(value > 0 && position === 'left') || (value < 0 && position === 'right') ? 'fa-chevron-right' : 'fa-chevron-left'}`;

  switch(type) {
    case 'solar':
      icons.type = 'fa-sun-o';
      icons.color = '#ffeb3b';
      break;
    case 'fire':
      icons.type = 'fa-fire';
      icons.color = '#ffa726';
      break;
    case 'grid':
      icons.color = '#bdbdbd';
      break;
    case 'consumption':
      icons.title = 'Aktueller Verbrauch';
      icons.color = '#80deea';
      break;
    case 'prodStat':
      icons.title = 'Tagesproduktion';
      icons.color = '#d4e157';
      break;
    case 'consStat':
      icons.title = 'Tagesverbrauch';
      icons.color = '#80deea';
      break;
    case 'autarchy':
      icons.title = 'Autarkie heute';
      icons.color = '#bdbdbd';
      icons.formatter = v => v ? `${Math.round(v * 100)}%` : 'n.a.';
      break;
  }

  return (
    <div style={{
      width: '460px',
      height: '120px',
      position: 'relative',
      backgroundImage: `linear-gradient(to ${position === 'right' ? 'right' : 'left'}, #ffffff, ${icons.color})`,
      marginBottom: '20px' }}>
      {
        ['consumption', 'autarchy', 'prodStat', 'consStat'].includes(type) ?
          false :
        type !== 'grid' ?
          <i className={ `fa fa-5x ${icons.type}` } style={{
            minWidth: '80px',
            float: position === 'right' ? 'right' : 'left',
            marginTop: '19px',
            [`margin${position === 'right' ? 'Right' : 'Left'}`]: '32px',
            color: '#9e9e9e' }} /> :
          <div style={{
            minWidth: '80px',
            float: position === 'right' ? 'right' : 'left',
            marginTop: '19px',
            [`margin${position === 'right' ? 'Right' : 'Left'}`]: '32px',
            color: '#9e9e9e' }} >
            <svg width="80" height="80" viewBox="0 0 565 687" version="1.1">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="noun_1053838_cc" transform="translate(5.000000, 5.000000)" stroke="#9e9e9e" strokeWidth="10" fill="#9e9e9e" fillRule="nonzero">
                  <path d="M554.4468,138.165286 L554.4468,137.272457 C554.4468,136.379628 553.553971,135.486799 552.661142,134.59397 C552.661142,134.59397 552.661142,134.59397 551.768313,134.59397 C550.875484,133.701141 550.875484,133.701141 549.982655,132.808312 L281.241131,0.66962174 C278.562644,-0.223207247 275.884157,-0.223207247 273.20567,0.66962174 L5.35697392,132.808312 C4.46414493,132.808312 3.57131594,133.701141 3.57131594,134.59397 C3.57131594,134.59397 3.57131594,134.59397 2.67848696,134.59397 C1.78565797,135.486799 0.892828986,136.379628 0.892828986,137.272457 L0.892828986,138.165286 C0.892828986,139.058115 0.892828986,139.950944 0,140.843773 L0,140.843773 L0,198.877657 C0,204.234631 3.57131594,207.805947 8.92828986,207.805947 C14.2852638,207.805947 17.8565797,204.234631 17.8565797,198.877657 L17.8565797,149.772062 L156.245073,149.772062 L156.245073,231.0195 L5.35697392,305.124306 C4.46414493,305.124306 3.57131594,306.017135 3.57131594,306.909964 C3.57131594,306.909964 3.57131594,306.909964 2.67848696,306.909964 C1.78565797,307.802793 0.892828986,308.695622 0.892828986,309.588451 L0.892828986,310.48128 C0.892828986,311.374109 0.892828986,312.266938 0,313.159767 L0,313.159767 L0,371.193651 C0,376.550625 3.57131594,380.121941 8.92828986,380.121941 C14.2852638,380.121941 17.8565797,376.550625 17.8565797,371.193651 L17.8565797,322.088057 L156.245073,322.088057 L156.245073,401.549837 L72.3191479,664.041558 C71.4263189,667.612874 72.3191479,672.077019 75.8904638,673.862677 C77.6761218,674.755506 79.4617798,675.648335 80.3546088,675.648335 C82.1402667,675.648335 84.8187537,674.755506 86.6044117,673.862677 L274.098499,508.689315 L463.378244,673.862677 C466.056731,676.541164 470.520876,676.541164 474.092192,674.755506 C477.663508,672.969848 478.556337,668.505703 477.663508,664.934387 L392.844754,402.442666 L392.844754,322.980886 L536.590221,322.980886 L536.590221,372.08648 C536.590221,377.443454 540.161537,381.01477 545.518511,381.01477 C550.875484,381.01477 554.4468,377.443454 554.4468,372.08648 L554.4468,314.052596 L554.4468,314.052596 C554.4468,313.159767 554.4468,312.266938 553.553971,311.374109 L553.553971,310.48128 C553.553971,309.588451 552.661142,308.695622 551.768313,307.802793 C551.768313,307.802793 551.768313,307.802793 550.875484,307.802793 C549.982655,306.909964 549.982655,306.909964 549.089826,306.017135 L391.951925,229.233842 L391.951925,150.664891 L535.697392,150.664891 L535.697392,199.770486 C535.697392,205.12746 539.268708,208.698776 544.625682,208.698776 C549.982655,208.698776 553.553971,205.12746 553.553971,199.770486 L553.553971,141.736602 L553.553971,141.736602 C554.4468,139.950944 554.4468,139.058115 554.4468,138.165286 Z M277.669815,18.5262015 L374.988174,66.7389667 L374.988174,131.915483 L174.994481,131.915483 L174.994481,69.4174537 L277.669815,18.5262015 Z M48.2127653,131.915483 L157.137902,78.3457435 L157.137902,131.915483 L48.2127653,131.915483 Z M48.2127653,304.231477 L157.137902,250.661738 L157.137902,304.231477 L48.2127653,304.231477 Z M174.994481,241.733448 L277.669815,190.842196 L374.988174,239.054961 L374.988174,304.231477 L174.994481,304.231477 L174.994481,241.733448 Z M169.637507,418.513587 L259.813235,496.189709 L99.1040175,638.149518 L169.637507,418.513587 Z M450.878638,639.042347 L287.490934,496.189709 L379.452319,418.513587 L450.878638,639.042347 Z M374.988174,398.87135 L273.20567,484.582932 L174.101652,398.87135 L174.101652,322.088057 L374.988174,322.088057 L374.988174,398.87135 Z M508.019693,304.231477 L392.844754,304.231477 L392.844754,247.983251 L508.019693,304.231477 Z M374.988174,219.412723 L281.241131,172.985616 C278.562644,172.092787 275.884157,172.092787 273.20567,172.985616 L174.994481,222.09121 L174.994481,149.772062 L375.881003,149.772062 L375.881003,219.412723 L374.988174,219.412723 Z M392.844754,131.915483 L392.844754,75.6672566 L507.126864,131.915483 L392.844754,131.915483 Z" id="Shape"/>
                </g>
              </g>
            </svg>
          </div>
      }
      {
        !['consumption', 'autarchy', 'prodStat', 'consStat'].includes(type) ?
          <div className="power" style={{
            float: position === 'right' ? 'right' : 'left',
            marginTop: '40px',
            [`margin${position === 'right' ? 'Right' : 'Left'}`]: '60px',
            fontSize: '34px' }}>{ icons.formatter(value) }</div> :
          <div className="power" style={{
            textAlign: 'center',
            paddingTop: '20px',
            width: '100%',
            fontSize: '34px' }}>
            <div>{ icons.formatter(value) }</div>
            <div style={{ fontSize: '20px' }}>{ icons.title }</div>
          </div>
      }
      {
        !['consumption', 'autarchy', 'prodStat', 'consStat'].includes(type) &&
        <div style={{
          position: 'absolute',
          background: 'white',
          borderRadius: '60px',
          [position === 'right' ? 'left' : 'right']: '-60px',
          top: '0',
          width: '120px',
          height: '120px' }}>
          <i className={ `fa ${value === 0 ? 'fa-square' : arrow}` } style={{
            marginTop: value === 0 ? '50px' : '30px',
            marginLeft: value === 0 ? '54px' : '40px' }} />
        </div>
      }
    </div>
  );
};

EnergySource.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

EnergySource.defaultProps = {
  value: 0,
};

export default EnergySource;
