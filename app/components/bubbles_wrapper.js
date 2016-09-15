import React, { Component } from 'react';
import Bubbles from './bubbles';
import Selector from './selector';
import 'whatwg-fetch';
import { getJson } from '../util/requests';
import { map } from 'lodash';
import { BUZZN_STORAGE_PREFIX } from '../util/constants';

export class BubblesWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      group: '',
      loading: true,
      groups: [],
    };
  }

  changeGroup(event) {
    this.setState({ group: event.target.value });
  }

  changeUrl(event) {
    this.setState({ url: event.target.value });
    localStorage.setItem(`${BUZZN_STORAGE_PREFIX}rootUrl`, event.target.value);
  }

  applySettings() {
    this.setState({ loading: true, groups: [], group: '' });
    this.loadGroups(this.state.url);
  }

  loadGroups(url) {
    const headers = {
      Accept: 'application/json',
    };

    fetch(`${url}/api/v1/groups`, { headers })
      .then(getJson)
      .then(json => {
        this.setState({ groups: map(json.data, g => ({ value: g.id, title: g.attributes.name })), loading: false });
      })
      .catch(error => console.log(error));
  }

  componentWillMount() {
    this.loadGroups(localStorage.getItem(`${BUZZN_STORAGE_PREFIX}rootUrl`) || 'https://staging.buzzn.net');
    this.setState({
      url: localStorage.getItem(`${BUZZN_STORAGE_PREFIX}rootUrl`) || 'https://staging.buzzn.net',
    });
  }

  render() {
    return <div>
            <label>URL:</label>
            <input value={ this.state.url } onChange={ ::this.changeUrl } />
            <button onClick={ ::this.applySettings }>Apply</button>
            <br />
            Groups:
            { this.state.loading ?
              'Loading...'
              : <Selector data={ this.state.groups } callback={ ::this.changeGroup } /> }
            <div style={{ width: '100vw', height: '100vh' }}>
              <Bubbles key={ this.state.group }
                       url={this.state.url }
                       group={ this.state.group } />
            </div>
          </div>;
  }
}
