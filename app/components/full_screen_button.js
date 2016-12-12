import React, { Component } from 'react';
import screenfull from 'screenfull';

export default class FullScreenButton extends Component {
  constructor(props) {
    super(props);

    this.state = { hovered: false };
  }

  render() {
    let className = 'fa ';
    className += screenfull.isFullscreen ? 'fa-window-restore ' : 'fa-window-maximize ';
    className += this.state.hovered ? 'fa-4x' : 'fa-2x';

    return (
      <i
        className={ className }
        onClick={ () => {
          if (screenfull.enabled) screenfull.toggle();
        } }
        onMouseEnter={ () => this.setState({ hovered: true })}
        onMouseLeave={ () => this.setState({ hovered: false }) }
        ></i>
    );
  }
}
