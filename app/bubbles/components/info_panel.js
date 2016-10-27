import React from 'react';
import connect from 'react-redux';

export default ({ type, data }) => (
  <div className="col-sm-12 col-md-6 col-lg-6">
    <div className="panel media pad-all">
      <div className="media-left">
        <span className={ `icon-wrap icon-wrap-sm icon-circle panel-colorful ${type === 'in' ? 'panel-primary' : 'panel-danger'}` }>
          <i className="fa fa-arrow-circle-o-right fa-2x"></i>
        </span>
      </div>
      <div className="media-body">
        <div className="group-ticker">
          <span className="text-2x text-thin">
            <div className="power-ticker">{ data ? data / 1000 : 'n.a.' }</div>
          </span>
        </div>
        <p>{ type === 'in' ? 'Aktueller Gesamtbezug (Watt)' : 'Aktuelle Gesamterzeugung (Watt)' }</p>
      </div>
    </div>
  </div>
);
