import React from 'react';

export default ({ icon, text, data }) => (
  <div className="col-sm-12 col-md-6 col-lg-6">
    <div className="panel media pad-all">
      <div className="media-left">
        <span className="icon-wrap icon-wrap-sm icon-circle panel-colorful panel-mint">
          <i className={ `fa fa-2x ${icon}` }></i>
        </span>
      </div>
      <div className="media-body">
        <div className="group-ticker">
          <span className="text-2x text-thin">
            <div className="power-ticker">{ data ? data / 1000 : 'n.a.' }</div>
          </span>
        </div>
        <p>{ text }</p>
      </div>
    </div>
  </div>
);
