import React from 'react';
import PropTypes from 'prop-types';
import { formatLabel } from '../_util';

const EnergySource = ({ type, value, position }) => {
  const icons = {
    type: '',
    arrow: 'fa-square',
    color: '#ffffff',
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
      icons.type = 'fa-users';
      icons.color = '#bdbdbd';
      break;
    case 'consumption':
      icons.type = 'fa-users';
      icons.color = '#80deea';
      break;
  }

  return (
    <div style={{
      width: '460px',
      height: '120px',
      position: 'relative',
      backgroundImage: `linear-gradient(to ${position === 'right' ? 'right' : 'left'}, #ffffff, ${icons.color})`,
      marginBottom: '20px' }}>
      <i className={ `fa fa-5x ${icons.type}` } style={{
        minWidth: '80px',
        float: position === 'right' ? 'right' : 'left',
        marginTop: '19px',
        [`margin${position === 'right' ? 'Right' : 'Left'}`]: '32px',
        color: '#9e9e9e' }} />
      <div className="power" style={{
        float: position === 'right' ? 'right' : 'left',
        marginTop: '40px',
        [`margin${position === 'right' ? 'Right' : 'Left'}`]: '60px',
        fontSize: '34px' }}>{ formatLabel(Math.abs(value)) }</div>
      {
        type !== 'consumption' &&
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
